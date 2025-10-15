import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import numpy as np
from src.backend.airfoil import naca4

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # src/
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
app.mount("/static", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")



class NACAInput(BaseModel):
    m: float
    p: float
    t: float
    n: int = 100
    span: float = 0.2

@app.post("/api/naca")
def generate_airfoil(data: NACAInput):
    xU, yU, xL, yL = naca4(data.m, data.p, data.t, data.n)
    
    # Combine upper and lower surfaces
    x = np.concatenate([xU, xL[::-1]])
    y = np.concatenate([yU, yL[::-1]])
    z = [0, data.span]  # two slices for extrusion

    return {"x": x.tolist(), "y": y.tolist(), "z": z}