import uvicorn
import json
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

db = Database("sqlite:///game_database.db")

@app.post('/request')
async def getStream(request: Request):
    converted = await request.json()
    return StreamingResponse(GPT.connect_api(converted))

@app.post('/requestTest')
async def getStream(request: Request):
     texts = await request.json()
     gen = StreamingResponse(GPT.testgenerator(texts))
     return gen

@app.post('/saveGame')
async def save_game(key: str, data: str):
    saved_key = db.save_data(key, data)
    return {"key": saved_key}

@app.get('/loadGame/{key}')
async def load_game(key: str):
    saved_data = db.get_save_data(key)
    
    if saved_data:
        return {"data": saved_data[0]}
    else:
        raise HTTPException(status_code=404, detail="Save data not found")