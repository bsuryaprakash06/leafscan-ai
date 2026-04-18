import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
import os

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = None
classes = None

def load_model():
    global model, classes

    print("Loading Hybrid Model...")

    model_path = os.path.join(os.path.dirname(__file__), "hybrid_model.pth")

    checkpoint = torch.load(model_path, map_location=device)

    classes = checkpoint["classes"]

    model = models.mobilenet_v2(weights=None)
    model.classifier[1] = nn.Linear(model.last_channel, len(classes))

    model.load_state_dict(checkpoint["state_dict"])

    model.to(device)
    model.eval()

    print("Model loaded successfully")


load_model()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

def predict(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    img_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(img_tensor)
        probs = torch.nn.functional.softmax(outputs[0], dim=0)

        confidence, pred = torch.max(probs, 0)

    pred_class = classes[pred.item()]

    top3_prob, top3_idx = torch.topk(probs, 3)

    top3 = []
    for i in range(3):
        top3.append({
            "class": classes[top3_idx[i].item()],
            "confidence": round(top3_prob[i].item() * 100, 2)
        })

    return {
        "prediction": pred_class,
        "confidence": round(confidence.item() * 100, 2),
        "plant": pred_class.split("___")[0],
        "disease": pred_class.split("___")[1] if "___" in pred_class else "Healthy",
        "top3": top3
    }