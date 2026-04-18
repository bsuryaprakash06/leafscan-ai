<div align="center">
  <img src="./frontend/public/logos/logo.png" alt="LeafScan AI Logo" width="120" style="border-radius: 20%;" />
  
  <h1>🌱 LeafScan AI</h1>
  <p><strong>A Full-Stack Deep Learning Application for Real-Time Plant Disease Diagnosis</strong></p>

  <div>
    <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Bundler-Vite-purple?logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Code-TypeScript-blue?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/ML-PyTorch-red?logo=pytorch" alt="PyTorch" />
    <img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" alt="Vercel" />
    <img src="https://img.shields.io/badge/Model-HuggingFace-yellow?logo=huggingface" alt="HuggingFace" />
    <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
  </div>

  <br />
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo_On_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://leafscan-ai.vercel.app/)
  &nbsp;
  [![HuggingFace Model](https://img.shields.io/badge/HuggingFace_Model-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/xshane)
  
</div>

<hr />

## 📖 Overview

**LeafScan AI** is an AI-powered agricultural tool designed to empower farmers and agronomists with instantaneous plant disease detection. Early disease identification prevents crop loss and increases agricultural yields by up to 30%. Through an ultra-fast REST API and a beautifully designed interactive user interface, anyone can upload a picture of a leaf and receive professional diagnostic verdicts in seconds.

## ✨ Key Features

- **Blazing Fast API**: Diagnostics processed in **<2 Seconds** using lightweight AI deployments.
- **Dynamic Localization**: Built-in multi-language string support (English, Tamil, Hindi) strictly engineered for regional accessibility.
- **Intelligent Pre-processing**: Auto-brightness checks and blur validation to ensure image quality before model prediction.
- **Visual Feedback System**: Animated glow tracking and high-performance Framer Motion interface designed like modern B2B SaaS.

---

## 🧠 Model & Dataset

This application utilizes a fine-tuned **MobileNetV2** deep learning architecture strictly optimized for edge/mobile delivery via PyTorch. 

**Dataset utilized: [PlantVillage Dataset]**
- **Total Images**: `54,306`
- **Supported Crops**: `14` (Tomato, Potato, Apple, Corn, Grape, Pepper, etc.)
- **Disease Classes**: `38` 

### 📊 Verdicts & Performance
- **Test Accuracy**: **97%**
- **Confidence Output**: Provides Top-3 differential diagnoses to prevent false-negative treatment routes.

---

## 🛠️ Architecture

The codebase operates in a monorepo format seamlessly segregating Frontend and Backend environments:

- **Frontend (`/frontend`)**
  - Compiled using **Vite** and highly strictly typed in **TypeScript**.
  - Powered by **React** + **Tailwind CSS** + **Framer Motion** for a seamless, glassmorphism-based aesthetic interface.
- **Backend (`/backend`)**
  - **FastAPI** drives the endpoint layer securely and optimally.
  - The model runs predictions utilizing raw **PyTorch** byte ingestion.

---

## 🚀 Live Deployment Links

- **Frontend Web App**: Hosted on Vercel utilizing zero-config deployment architecture.
- **Backend Inference API**: Containerized leveraging Docker and deployed continuously.
- **Model Storage**: Utilizes HuggingFace Spaces/Git-LFS for rapid model binary hosting.

> Make sure to update the repository links to match your actual deployed URLs!

## 🤝 Contact & Developer Info

Built with passion to transform the agritech sector.  
**Built By**: Surya Prakash B  
**Email**: [suryaprakashb2006@gmail.com](mailto:suryaprakashb2006@gmail.com)  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bsuryaprakash06)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bsuryaprakash06)
