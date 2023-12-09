from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from backend.gpt import GPT
from fastapi.middleware.cors import CORSMiddleware
from backend.database import Database

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Database()


async def shutdown_event():
    """
    Attempts to close database connection when system is shut down.
    """
    db.close_connection()

app.add_event_handler("shutdown", shutdown_event)

@app.post('/request')
async def getStream(request: Request):
    """
    Takes a request and converts it to a json object to then be sent to gpt file
 
    Args:
        a (json): request stream
        
    Example:
    [
        {
            "role": "system",
            "content": "The player would like to face USERINPUT as obstacles, have USERINPUT as the final goal, and have the setting as USERINPUT."
        },
        {
            "role": "user",
            "content": "Start the story"
        }
    ]    
 
    Returns:
        converted json object sent to generator function
    """
    converted = await request.json()
    return StreamingResponse(GPT.connect_api(converted))

@app.post('/saveGame')
async def save_game(request: Request):
    """
    Saves current game state using key value pair. 
    NOTE: context must be pre-serialized into JSON (aka be a string). JSON.stringify can be used.
 
    Args:
        request (Request) : JSON that contains context and notes
        
    Example:
    {
        "context": "[{\"role\":\"user\", \"message\":\"bruh\"}]",
        "notes": "blah blah blah test2"
    }
 
    Returns:
        A save key
        
    Example:
    {
        "key": "FVoDxxJQAnIjihvt"
    }
    """
    request = await request.json()
    try:
        context = request["context"]
        print('Received Request Body:', request)
    except KeyError:
        raise HTTPException(status_code=400, detail="Context not found in JSON")
    try:
        notes = request["notes"]
    except KeyError:
        raise HTTPException(status_code=400, detail="Notes not found in JSON")
    try:
        saved_key = db.save_data(context, notes)
    except TypeError:
        raise HTTPException(status_code=400, detail="Context must be a string (serialize into JSON (JSON.stringify))")
    return {"key": saved_key}

@app.post('/loadGame')
async def load_game(request: Request):
    """
    Loads any saved game state given a save key
 
    Args:
        request (Request): JSON object containing key
    
    Example:
    {
        "key": "FVoDxxJQAnIjihvt"
    }
 
    Returns:
        Saved data or message if key is not found. 
        NOTE: context is pre-serialized into JSON (aka it is a string), so it will have to be deserialized in the front end (JSON.parse).
        
    Example:
    {
        "context": "[{\"role\":\"user\", \"message\":\"bruh\"}]",
        "notes": "blah blah blah test2"
    }
    """
    request = await request.json()
    try:
        key = request["key"]
    except KeyError:
        raise HTTPException(status_code=400, detail="Key not found in JSON")
        
    
    saved_data = db.fetch_data(key)
    
    if saved_data:
        return saved_data
    else:
        raise HTTPException(status_code=404, detail="Save data not found")