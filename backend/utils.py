from PIL import Image
import io

def read_image(file_bytes):
    return Image.open(io.BytesIO(file_bytes)).convert("RGB")