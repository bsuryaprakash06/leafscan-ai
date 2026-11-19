# Multi-stage build for React/Vite Frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Copy application source code
COPY . .

# Build-time API URL argument (defaults to local backend)
ARG VITE_API_URL=http://localhost:7860
ENV VITE_API_URL=$VITE_API_URL

# Build static production assets
RUN npm run build

# Production web server
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
