import torch
import torch.nn as nn
from torchvision import models, transforms
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

# ─── Setup ─────────────────────────────────────
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Load Model ────────────────────────────────
checkpoint = torch.load("hybrid_model.pth", map_location=device)

classes = checkpoint['classes']

model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.last_channel, len(classes))

model.load_state_dict(checkpoint['state_dict'])
model.to(device)
model.eval()

# ─── Image Transform ───────────────────────────
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

# ─── Routes ────────────────────────────────────
@app.get("/")
def home():
    return {"message": "LeafScan API running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.nn.functional.softmax(outputs[0], dim=0)
        confidence, pred = torch.max(probs, 0)

    return {
        "prediction": classes[pred.item()],
        "confidence": round(confidence.item() * 100, 2)
    }