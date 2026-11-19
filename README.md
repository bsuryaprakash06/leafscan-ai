<div align="center">
  <img src="./frontend/public/logos/logo.png" alt="LeafScan AI Logo" width="120" style="border-radius: 20%;" />

  <h1>LeafScan AI</h1>
  <p><strong>Production Full-Stack Deep Learning Application for Real-Time Plant Disease Diagnosis</strong></p>

  <div>
    <img src="https://img.shields.io/badge/Frontend-React_19-blue?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Bundler-Vite-purple?logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Style-TailwindCSS_v4-38B2AC?logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/ML-PyTorch-red?logo=pytorch" alt="PyTorch" />
    <img src="https://img.shields.io/badge/Container-Docker-2496ED?logo=docker" alt="Docker" />
    <img src="https://img.shields.io/badge/Model-HuggingFace-yellow?logo=huggingface" alt="HuggingFace" />
    <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
  </div>

  <br />

  <a href="https://leafscan-ai.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo_On_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://huggingface.co/xshane">
    <img src="https://img.shields.io/badge/HuggingFace_Model-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="HuggingFace Model" />
  </a>
</div>

<hr />

## Architectural Overview

LeafScan AI is an automated diagnostic platform designed for rapid identification of plant pathologies from leaf imagery. The system pairs a lightweight PyTorch vision model with a high-throughput FastAPI inference server and a reactive React/TypeScript frontend.

The inference pipeline performs client-side blur and illumination sanity checks prior to multipart upload, minimizing invalid inference requests. The backend preprocesses incoming byte streams into normalized tensor representations and evaluates classification logits across 38 distinct crop-disease categories.

```
Client Browser (React / Vite)
        │
        ├── 1. Client-Side Image Pre-validation (blur & darkness checks)
        │
        └── 2. Multipart POST /predict (Raw Image Stream)
                        │
                        ▼
                FastAPI Gateway (Port 7860)
                        │
                        ├── Tensor Transformation (224x224, ImageNet normalization)
                        │
                        └── MobileNetV2 Inference (PyTorch)
                                │
                                ├── Argmax Prediction & Confidence Score
                                ├── Top-3 Differential Diagnostic Classes
                                └── Plant Species & Pathology Parsing
                                        │
                                        ▼
                        JSON Response -> Client Visualization
```

---

## Model Specifications

The classification engine uses a fine-tuned MobileNetV2 architecture selected for low-latency CPU and edge inference.

| Parameter | Specification |
|:---|:---|
| **Base Architecture** | MobileNetV2 (Inverted Residual Blocks, Depthwise Separable Convolutions) |
| **Output Head** | Linear classifier projecting `last_channel` to 38 output logits |
| **Input Dimensions** | 3-channel RGB, resized to `224 x 224` pixels |
| **Normalization** | ImageNet standard (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`) |
| **Training Dataset** | PlantVillage Dataset |
| **Dataset Volume** | 54,306 annotated images |
| **Crop Coverage** | 14 crop species (Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, Tomato) |
| **Classification Classes** | 38 diagnostic categories (healthy and pathological variants) |
| **Validation Accuracy** | 97.0% |
| **Inference Latency** | Sub-2-second end-to-end turnaround on commodity hardware |

---

## Monorepo Layout

```
leafscan-ai/
├── backend/
│   ├── app.py              # FastAPI application, CORS middleware, and REST routes
│   ├── model.py            # MobileNetV2 loader, tensor transformations, and top-3 scoring
│   ├── main.py             # Standalone monolithic reference script
│   ├── utils.py            # Auxiliary backend utilities
│   ├── requirements.txt    # Python runtime dependencies
│   ├── Dockerfile          # Container specification for Python inference engine
│   └── .dockerignore       # Docker build context exclusions
├── frontend/
│   ├── public/             # Static SVGs, logos, and icons
│   ├── src/
│   │   ├── pages/          # View routing (Home, Detect, Analysis)
│   │   ├── data/           # Disease database taxonomy and i18n localizations
│   │   ├── utils/          # Client-side image quality validation algorithms
│   │   ├── App.tsx         # Root application component
│   │   └── main.tsx        # Application bootstrap entrypoint
│   ├── package.json        # Frontend dependencies and Vite configuration
│   ├── Dockerfile          # Multi-stage production container specification
│   ├── .env.example        # Environment variable template
│   └── .dockerignore       # Frontend Docker context exclusions
├── docker-compose.yml       # Multi-service container orchestration
├── package.json            # Monorepo task automation scripts
├── LICENSE                 # MIT License
└── README.md               # Technical project documentation
```

---

## Prerequisites

- **Python**: Version 3.10 or higher
- **Node.js**: Version 18.0.0 or higher (with `npm`)
- **Docker & Docker Compose** *(optional, for containerized execution)*

---

## Quick Start: Local Development

### 1. Model Checkpoint Setup

The backend expects the model checkpoint file `hybrid_model.pth` located inside the `backend/` directory:

1. Download `hybrid_model.pth` from the official repository at [HuggingFace (xshane)](https://huggingface.co/xshane).
2. Place the downloaded checkpoint file into `backend/hybrid_model.pth`.

### 2. Backend Service Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install runtime dependencies
pip install -r requirements.txt

# Start the FastAPI development server
uvicorn app:app --reload --port 7860
```

The inference server will start listening at `http://localhost:7860`. Interactive Swagger API documentation is accessible at `http://localhost:7860/docs`.

### 3. Frontend Application Setup

In a separate terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The client application will become available at `http://localhost:5173`.

---

## Docker Launch Guide

A multi-container setup is orchestrated via `docker-compose.yml`, deploying the FastAPI backend alongside an NGINX-served frontend build.

### Launch Containers

Ensure `hybrid_model.pth` is present in `backend/`, then execute from the repository root:

```bash
docker compose up --build
```

### Services Deployed

| Service | Container Name | Port Mapping | Description |
|:---|:---|:---|:---|
| **backend** | `leafscan-backend` | `7860:7860` | FastAPI PyTorch Inference Server |
| **frontend** | `leafscan-frontend` | `5173:80` | React / Vite SPA served via NGINX |

To terminate all running containers:

```bash
docker compose down
```

---

## API Reference

### Health Check

```http
GET /
```

**Response (`200 OK`)**:
```json
{
  "status": "online",
  "message": "LeafScan API running"
}
```

### Disease Prediction

```http
POST /predict
Content-Type: multipart/form-data
```

**Request Parameters**:
| Field | Type | Description |
|:---|:---|:---|
| `file` | Binary File | Leaf image file (`image/jpeg`, `image/png`, `image/webp`) |

**Sample Response (`200 OK`)**:
```json
{
  "prediction": "Tomato___Early_blight",
  "confidence": 98.42,
  "plant": "Tomato",
  "disease": "Early_blight",
  "top3": [
    {
      "class": "Tomato___Early_blight",
      "confidence": 98.42
    },
    {
      "class": "Tomato___Late_blight",
      "confidence": 1.25
    },
    {
      "class": "Tomato___healthy",
      "confidence": 0.33
    }
  ]
}
```

**Status Codes**:
- `200 OK`: Successful inference with classification probabilities and top-3 differentials.
- `400 Bad Request`: Invalid image format or corrupted byte stream.
- `503 Service Unavailable`: Model weights missing or backend checkpoint failed to load.

---

## Internationalization Support

The frontend contains native multi-language string tables (`frontend/src/data/i18n.ts`) supporting:
- English (`en`)
- Tamil (`ta`)
- Hindi (`hi`)

Translations include diagnostic guidance, symptom descriptions, and recommended agricultural treatments.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

## Author

**Surya Prakash B**  
AI & Systems Automation Engineer  
Email: [suryaprakashb2006@gmail.com](mailto:suryaprakashb2006@gmail.com)  
GitHub: [@bsuryaprakash06](https://github.com/bsuryaprakash06)  
LinkedIn: [Surya Prakash B](https://www.linkedin.com/in/bsuryaprakash06)
