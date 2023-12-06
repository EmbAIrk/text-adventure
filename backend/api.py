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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Database("sqlite:///game_database.db")

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
async def save_game(key: str, data: str):
    """
    Saves current game state using key value pair
 
    Args:
        a (str): key
        b (str): value
 
    Returns:
        A save key
    """
    saved_key = db.save_data(key, data)
    return {"key": saved_key}

@app.get('/loadGame/{key}')
async def load_game(key: str):
    """
    Loads any saved game state given a save key
 
    Args:
        a (str): Save key
 
    Returns:
        Saved data or no data if key is not found
    """
    saved_data = db.get_save_data(key)
    
    if saved_data:
        return {"data": saved_data[0]}
    else:
        raise HTTPException(status_code=404, detail="Save data not found")
