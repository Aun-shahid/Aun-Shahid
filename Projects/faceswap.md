# Cartoon Face Swap Application

A full-stack application that converts faces to cartoon style and performs face swapping using AI models via Replicate API.

## Architecture

- **Backend**: FastAPI with Python
- **Frontend**: React with TypeScript
- **AI Processing**: Replicate API for face-to-cartoon conversion and face swapping

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env`:
   ```
   REPLICATE_API_TOKEN=your_replicate_token_here
   SEGMIND_API_KEY=your_segmind_key_here
   ```

4. Start the FastAPI server:
   ```bash
   python run_server.py
   ```
   
   Or directly with uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. API will be available at:
   - API: `http://localhost:8000`
   - Documentation: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Frontend will be available at `http://localhost:5173`

## API Endpoints

### POST `/api/v1/process-face-swap`
- **Description**: Process face swap with cartoon conversion
- **Input**: 
  - `source_image`: Image file containing the face to cartoonize
  - `target_files`: List of image files or PDFs where cartoon face will be swapped
- **Output**: ZIP file containing all processed results

### POST `/api/v1/create-cartoon`
- **Description**: Convert a face to cartoon style only
- **Input**: `source_image`: Image file containing the face to convert
- **Output**: Cartoon version of the face (PNG)

### GET `/health`
- **Description**: Health check endpoint
- **Output**: `{"status": "healthy"}`

## Features

- **Image to Cartoon**: Convert any face photo to cartoon style
- **PDF Face Swap**: Replace faces in PDF documents with cartoon versions
- **Multiple File Support**: Process multiple images or PDFs at once
- **Real-time Processing**: Live updates during AI processing
- **Download Results**: Get processed files as ZIP archives
- **Health Monitoring**: Frontend shows backend connection status

## Usage

1. **For Image to Cartoon**:
   - Upload a clear face photo
   - Choose style settings (optional)
   - Click "Transform to Cartoon"
   - Download the result

2. **For PDF Face Swap**:
   - Upload a PDF document
   - Upload a face image to use for swapping
   - Click "Start Face Swap"
   - Download the ZIP file with results (PDF + individual images)

## Environment Variables

### Backend (.env)
```
REPLICATE_API_TOKEN=your_replicate_api_token
SEGMIND_API_KEY=your_segmind_api_key
```

### Frontend (config.ts)
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  // ... other config
};
```

## Development

- Backend runs on port 8000
- Frontend runs on port 5173
- CORS is configured to allow frontend-backend communication
- Hot reload enabled for both frontend and backend during development

## Troubleshooting

1. **Backend not starting**: Check if all dependencies are installed and environment variables are set
2. **Frontend can't connect**: Verify backend is running on port 8000 and CORS is properly configured
3. **API errors**: Check the FastAPI docs at `http://localhost:8000/docs` for detailed error messages
4. **Processing failures**: Ensure Replicate API token is valid and has sufficient credits