import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # src/
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")



app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
