#!/bin/bash
# ---------------------------------
# AeroViz-3D Setup Script
# ---------------------------------

# 1️⃣ Navigate to backend folder
cd src/backend || { echo "Backend folder not found!"; exit 1; }

# 2️⃣ Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# 3️⃣ Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# 4️⃣ Upgrade pip and install dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# 5️⃣ Run FastAPI backend in the background
echo "Starting FastAPI backend..."
uvicorn main:app --reload &

BACKEND_PID=$!

# 6️⃣ Start frontend server
cd ../../frontend || { echo "Frontend folder not found!"; exit 1; }

echo "Starting frontend HTTP server on port 8080..."
python3 -m http.server 8080 &

FRONTEND_PID=$!

# 7️⃣ Open browser automatically (Mac/Linux)
echo "Opening browser..."
sleep 2
if which xdg-open > /dev/null; then
    xdg-open http://localhost:8080
elif which open > /dev/null; then
    open http://localhost:8080
else
    echo "Please open your browser and visit http://localhost:8080"
fi

# 8️⃣ Wait for user to press Ctrl+C to stop servers
echo "Press Ctrl+C to stop the servers..."
wait $BACKEND_PID $FRONTEND_PID
