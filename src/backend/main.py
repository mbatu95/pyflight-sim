import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import json

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # src/
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
app.mount("/static", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")

FILE = "items.json"

class Item(BaseModel):
    name: str

# Helper functions
def load_items():
    try:
        with open(FILE, "r") as f:
            return set(json.load(f))
    except FileNotFoundError:
        return set()

def save_items(items):
    with open(FILE, "w") as f:
        json.dump(list(items), f)

items_set = load_items()

@app.get("/items")
def get_items():
    return {"items": list(items_set)}
@app.get("/health")
async def health_check():
    return {"status": "ok"}
@app.get("/naber")
def naber(name: str = "Guest"):
    # If no name is provided, it defaults to "Guest"
    return {"message": f"Naber, {name}!"}
@app.post("/items")
def add_item(item: Item):
    items_set.add(item.name)
    save_items(items_set)
    return {"message": f"Added {item.name}", "items": list(items_set)}