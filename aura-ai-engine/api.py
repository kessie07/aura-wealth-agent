from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# --- 1. THE BULLETPROOF FOLDER SEARCH ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENGINE_DIR = None

# Scan every folder until we find the teammate's code
for root, dirs, files in os.walk(BASE_DIR):
    if 'engine.py' in files and 'banking_rules.txt' in files:
        ENGINE_DIR = root
        break

if not ENGINE_DIR:
    print("🚨 ERROR: Could not find the 'engine' folder!")
    sys.exit(1)

print(f"✅ Found teammate's engine folder at: {ENGINE_DIR}")

# --- 2. THE SAFE IMPORT ---
sys.path.append(ENGINE_DIR)
os.chdir(ENGINE_DIR) 
from engine import AuraBrain

app = FastAPI()

# --- 3. WIDE OPEN CORS (Hackathon Safe Mode) ---
# --- 3. STRICT CORS ALLOWANCE ---
app.add_middleware(
    CORSMiddleware,
    # Explicitly trust both localhost and 127.0.0.1 on port 3000
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("🧠 Booting up AuraBrain...")
brain = AuraBrain()

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    # Simulated forecast from the PyTorch model
    mock_forecast = "Balance today is ₹15,000. Expected to drop to -₹2,000 by next week due to a ₹17,000 Rent payment."
    
    # Pass the Next.js message into the RAG engine
    reply = brain.ask_aura(request.message, mock_forecast)
    
    # Send it back using the exact key the frontend expects
    return {"response": str(reply)}

if __name__ == "__main__":
    import uvicorn
    # Running on standard localhost port 8000
    uvicorn.run(app, host="0.0.0.0", port=8001)