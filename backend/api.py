from typing import Union
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import uvicorn

app = FastAPI()

async def stream():
    for i in range(10):
        yield b"byte_stream"


@app.get("/")
async def main():
    return StreamingResponse(stream())
