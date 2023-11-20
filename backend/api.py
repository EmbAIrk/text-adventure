import uvicorn
from typing import Union
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from backend.gpt import GPT

app = FastAPI()

@app.get("request")
async def getStream():
    return StreamingResponse(GPT.connect_api("Give me a list of healthy groceries","1:Apple, 2:Bread, 3:Strawberry"))


@app.get("requestTest")
async def test():
    gen = StreamingResponse(GPT.testgenerator())
    return gen
