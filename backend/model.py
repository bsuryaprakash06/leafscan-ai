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

    model_path = os.path.join(os.path.dirname(__file__), "hybrid_model.pth")
    if not os.path.exists(model_path):
        print(f"Warning: Model checkpoint '{model_path}' not found.")
        print("Please download 'hybrid_model.pth' from https://huggingface.co/xshane and place it in backend/ directory.")
        return

    print("Loading Hybrid Model...")
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
    if model is None or classes is None:
        raise RuntimeError(
            "Model checkpoint not loaded. Please ensure 'hybrid_model.pth' "
            "is downloaded from https://huggingface.co/xshane and placed in the backend/ directory."
        )

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