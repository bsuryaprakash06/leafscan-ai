from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import predict

app = FastAPI(
    title="LeafScan AI Backend",
    description="Real-Time Plant Disease Diagnosis REST API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "online", "message": "LeafScan API running"}

@app.post("/predict")
async def predict_api(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        result = predict(image_bytes)
        return result
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image processing failed: {str(e)}")
