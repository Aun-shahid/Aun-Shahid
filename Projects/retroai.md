# RetroAI

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.121.0-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

**RetroAI** is a full-stack web application that generates retro-style images and videos with a distinctive 1940s-1950s archival film aesthetic. Users can create personalized messages overlaid on vintage-styled visuals, perfect for special occasions, greetings, or nostalgic content creation.

🌐 **Live Demo:** [https://www.retromsg.ai](https://www.retromsg.ai)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- 🎨 **AI-Powered Image Generation**: Create retro-styled images using Google Gemini's image generation model
- 🎬 **AI-Powered Video Generation**: Generate vintage film-style videos using Google Veo
- 📝 **Custom Messages**: Add personalized text overlays with elegant retro typography
- 🎭 **Style Customization**: Define custom visual styles and occasions (birthday, anniversary, custom)
- 🖼️ **Public Gallery**: Browse and share generated images and videos
- 📱 **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### Visual Aesthetics
- **Monochrome Styling**: High-contrast black and white imagery
- **Film Grain Effect**: Heavy, noticeable grain for authentic vintage feel
- **Soft Focus**: Avoiding sharp digital clarity for old film stock aesthetic
- **Cinematic Lighting**: Deep shadows and bright highlights
- **Vintage Artifacts**: Dust, scratches, and vignetting effects
- **Rounded Corners**: Simulating vintage film projector or CRT screen frames
- **Period-Authentic Content**: 1940s-1950s era styling in all generated content

### Technical Features
- **Dual AI Providers**: Support for Google Gemini and OpenAI (when available)
- **GridFS Storage**: Efficient storage of large media files in MongoDB
- **RESTful API**: Clean, documented API endpoints
- **Real-time Processing**: Asynchronous video generation with status tracking
- **CORS Support**: Configured for cross-origin requests
- **Health Monitoring**: Built-in health check endpoints

---

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Database**: MongoDB with Motor (async driver)
- **Storage**: GridFS for large media files
- **AI APIs**:
  - Google Gemini 2.5 Flash Image (image generation)
  - Google Veo 3.1 (video generation)
  - OpenAI (placeholder for future Sora integration)
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic v2
- **Configuration**: Python-dotenv, Pydantic Settings

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Backend Integration**: Supabase JS client
- **Font**: Special Elite (Google Fonts) for retro typography

### Infrastructure
- **Containerization**: Docker
- **Deployment**: Railway (Backend & Frontend)
- **Database Hosting**: MongoDB Atlas
- **API Management**: FastAPI built-in docs (Swagger/OpenAPI)

---

## 🏗 Architecture

### System Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│   React     │ ◄─────► │   FastAPI   │ ◄─────► │  MongoDB    │
│  Frontend   │  HTTP   │   Backend   │  Motor  │   Atlas     │
│             │         │             │         │   (GridFS)  │
└─────────────┘         └─────────────┘         └─────────────┘
                               │
                               │
                               ▼
                        ┌─────────────┐
                        │   AI APIs   │
                        │             │
                        │  • Gemini   │
                        │  • Veo      │
                        │  • OpenAI   │
                        └─────────────┘
```

### Data Flow

1. **User Request**: User submits message, style, and occasion through React UI
2. **API Processing**: FastAPI receives request and validates input
3. **AI Generation**: Request forwarded to Google Gemini/Veo for generation
4. **Storage**: Generated media stored in MongoDB GridFS
5. **Response**: URL to generated content returned to frontend
6. **Display**: Frontend fetches and displays the generated media

### Database Schema

#### Images Collection
```javascript
{
  _id: ObjectId,
  message: String (optional),
  style_prompt: String,
  occasion: String,
  provider: String ("gemini" | "openai"),
  image_url: String,
  created_at: DateTime
}
```

#### Videos Collection
```javascript
{
  _id: ObjectId,
  message: String (optional),
  style_prompt: String,
  occasion: String,
  provider: String ("gemini" | "openai"),
  video_url: String (optional),
  duration: Integer (3-10 seconds),
  status: String ("processing" | "completed" | "failed"),
  created_at: DateTime,
  updated_at: DateTime (optional),
  operation_name: String (optional),
  error_message: String (optional)
}
```

#### GridFS Collections
- **images_fs.files**: Image file metadata
- **images_fs.chunks**: Image file chunks
- **videos_fs.files**: Video file metadata
- **videos_fs.chunks**: Video file chunks

---

## 🔧 How It Works

### Image Generation Flow

1. **Input Processing**
   - User provides optional message text
   - User selects occasion type (birthday, anniversary, custom)
   - User writes style prompt describing desired aesthetics
   - System defaults to Gemini provider

2. **Prompt Engineering**
   ```python
   full_prompt = f"""
   Create an image with the aesthetic of a 1940s/1950s archival film still.
   Core Visuals:
   - Color: Strictly monochrome (high-contrast black and white)
   - Texture: Heavy, noticeable film grain throughout
   - Focus: Soft-focus aesthetic
   - Lighting: Cinematic, with deep shadows and bright highlights
   - Artifacts: Dust, scratches, slight vignetting
   - Frame: Rounded corners simulating vintage film projector
   
   {style_prompt}
   {message_text_if_provided}
   """
   ```

3. **AI Generation**
   - Request sent to Google Gemini 2.5 Flash Image model
   - Model generates image based on detailed prompt
   - Response contains inline image data

4. **Storage & Retrieval**
   - Image converted to bytes (PNG format)
   - Uploaded to MongoDB GridFS with metadata
   - Unique URL generated: `/api/gallery/{file_id}`
   - Document saved to images collection

5. **Response**
   - JSON response with image URL and metadata returned
   - Frontend fetches and displays the image

### Video Generation Flow

1. **Input Processing**
   - Similar to images, with additional duration parameter (3-10 seconds)
   - Duration defaults to 5 seconds

2. **Prompt Engineering**
   ```python
   full_prompt = f"""
   Generate a {duration} second video with 1940s/1950s aesthetic.
   Core Visuals:
   - Monochrome (black and white)
   - Heavy film grain
   - Soft-focus aesthetic
   - Cinematic lighting
   - Vintage artifacts
   - Rounded corners
   
   Audio Style: Monophonic (mono) retro-style audio with tinny quality
   
   {style_prompt}
   {message_text_if_provided}
   """
   ```

3. **Async Video Generation**
   - Request sent to Google Veo 3.1 Generate model
   - Returns long-running operation object
   - System polls operation status every 10 seconds
   - Generation typically takes 1-3 minutes

4. **Video Processing**
   ```python
   # Poll until complete
   while not operation.done:
       await asyncio.sleep(10)
       operation = await asyncio.to_thread(client.operations.get, name=operation.name)
   
   # Download generated video
   generated_video = operation.response.generated_videos[0]
   client.files.download(file=generated_video.video)
   ```

5. **Storage & Response**
   - Video saved as MP4 to GridFS
   - Metadata includes content type, size, provider info
   - URL generated and returned to client

### Gallery System

The gallery router provides unified access to both images and videos:

```python
@router.get("/{file_id}")
async def get_media(file_id: str):
    # Try images first
    file_data = await db.images_fs.open_download_stream(ObjectId(file_id))
    if not file_data:
        # Try videos
        file_data = await db.videos_fs.open_download_stream(ObjectId(file_id))
    
    # Stream file with appropriate content type
    return StreamingResponse(file_data, media_type=content_type)
```

### Frontend State Management

The frontend uses custom React hooks for state management:

- **`useImage`**: Manages image generation requests and state
- **`useVideo`**: Handles video generation with polling for status
- **`useGallery`**: Fetches and displays gallery items

```typescript
// Example: useVideo hook
export const useVideo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateVideo = async (request: VideoRequest) => {
    setLoading(true);
    try {
      const response = await videoService.generateVideo(request);
      return response;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { generateVideo, loading, error };
};
```

---

## 📁 Project Structure

```
Retroai/
├── Backend/
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── config.py               # Configuration and settings
│   │   ├── database.py             # MongoDB connection and GridFS setup
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── image.py            # Image request/response models
│   │   │   └── video.py            # Video request/response models
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── image.py            # Image generation endpoints
│   │       ├── video.py            # Video generation endpoints
│   │       └── gallery.py          # Media retrieval endpoints
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Container configuration
│   ├── railway.toml               # Railway deployment config
│   ├── run.py                      # Application runner
│   └── test_config.py             # Configuration tests
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx            # Landing page hero section
│   │   │   ├── InputSection.tsx    # User input form
│   │   │   ├── VideoOutput.tsx     # Video display component
│   │   │   ├── Gallery.tsx         # Gallery grid view
│   │   │   ├── RetroGallery.tsx    # Retro-styled gallery
│   │   │   ├── FilmGrain.tsx       # Visual effects overlay
│   │   │   └── ...                 # Other components
│   │   ├── pages/
│   │   │   ├── HomePage.tsx        # Main landing page
│   │   │   └── CreateMessage.tsx   # Message creation page
│   │   ├── hooks/
│   │   │   ├── useImage.ts         # Image generation hook
│   │   │   ├── useVideo.ts         # Video generation hook
│   │   │   └── useGallery.ts       # Gallery data hook
│   │   ├── services/
│   │   │   ├── image.service.ts    # Image API client
│   │   │   ├── video.service.ts    # Video API client
│   │   │   └── gallery.service.ts  # Gallery API client
│   │   ├── types/
│   │   │   ├── image.ts            # Image TypeScript types
│   │   │   ├── video.ts            # Video TypeScript types
│   │   │   └── gallery.ts          # Gallery TypeScript types
│   │   ├── context/
│   │   │   └── ThemeContext.tsx    # Theme management
│   │   ├── lib/
│   │   │   └── supabase.ts         # Supabase client config
│   │   ├── config/
│   │   │   └── config.ts           # Frontend configuration
│   │   ├── App.tsx                 # Main app component
│   │   ├── main.tsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── public/                     # Static assets
│   ├── package.json                # Node dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   ├── tsconfig.json              # TypeScript config
│   └── index.html                  # HTML entry point
│
├── README.md                       # This file
└── OPEN_SOURCE_ATTRIBUTIONS.md    # Open source licenses
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm
- **MongoDB** (local or Atlas)
- **Google Gemini API Key**
- **OpenAI API Key** (optional)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Retroai/Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file**
   ```bash
   cd src
   # Create .env with the following variables:
   ```
   
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=retroai
   BACKEND_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:5173
   ```

5. **Run the backend**
   ```bash
   cd ..
   python run.py
   ```
   
   Server will start at `http://localhost:8000`
   
   API documentation available at:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (if needed)
   ```bash
   # Create .env.local with:
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   App will be available at `http://localhost:5173`

### Docker Setup (Alternative)

1. **Build and run with Docker**
   ```bash
   # Backend
   cd Backend
   docker build -t retroai-backend .
   docker run -p 8000:8080 --env-file src/.env retroai-backend
   
   # Frontend
   cd ../Frontend
   docker build -t retroai-frontend .
   docker run -p 5173:80 retroai-frontend
   ```

---

## 📚 API Documentation

### Base URL
- **Production**: `https://retroai-backend-production.up.railway.app`
- **Local**: `http://localhost:8000`

### Endpoints

#### Images

**Generate Image**
```http
POST /api/images/generate
Content-Type: application/json

{
  "message": "Happy Birthday!",
  "style_prompt": "Vintage postcard, sepia tones, elegant typography",
  "occasion": "birthday",
  "provider": "gemini"
}
```

**Response**
```json
{
  "id": "64f5a1b2c3d4e5f6g7h8i9j0",
  "message": "Happy Birthday!",
  "style_prompt": "Vintage postcard, sepia tones, elegant typography",
  "occasion": "birthday",
  "provider": "gemini",
  "image_url": "http://localhost:8000/api/gallery/64f5a1b2c3d4e5f6g7h8i9j0",
  "created_at": "2025-11-30T12:00:00"
}
```

**List Images**
```http
GET /api/images?limit=10&skip=0
```

**Get Single Image**
```http
GET /api/images/{image_id}
```

**Delete Image**
```http
DELETE /api/images/{image_id}
```

#### Videos

**Generate Video**
```http
POST /api/videos/generate
Content-Type: application/json

{
  "message": "Happy Anniversary!",
  "style_prompt": "Romantic 1950s scene, soft lighting, vintage ambiance",
  "occasion": "anniversary",
  "provider": "gemini",
  "duration": 5
}
```

**Response**
```json
{
  "id": "64f5a1b2c3d4e5f6g7h8i9j0",
  "message": "Happy Anniversary!",
  "style_prompt": "Romantic 1950s scene, soft lighting, vintage ambiance",
  "occasion": "anniversary",
  "provider": "gemini",
  "video_url": "http://localhost:8000/api/gallery/64f5a1b2c3d4e5f6g7h8i9j0",
  "duration": 5,
  "status": "completed",
  "created_at": "2025-11-30T12:00:00"
}
```

**List Videos**
```http
GET /api/videos?limit=10&skip=0
```

**Get Single Video**
```http
GET /api/videos/{video_id}
```

**Delete Video**
```http
DELETE /api/videos/{video_id}
```

#### Gallery

**Get Media File**
```http
GET /api/gallery/{file_id}
```

Returns the actual image or video file with appropriate content-type header.

#### Health & Info

**Health Check**
```http
GET /health
```

**API Info**
```http
GET /
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | - |
| `MONGODB_URL` | MongoDB connection string | No | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Database name | No | `retroai` |
| `BACKEND_URL` | Backend URL | No | `http://localhost:8000` |
| `FRONTEND_URL` | Frontend URL (for CORS) | No | `http://localhost:5173` |

### Frontend (.env.local)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_BACKEND_URL` | Backend API URL | No | `http://localhost:8000` |

---

## 🚢 Deployment

### Railway Deployment

**Backend**
1. Create new project on Railway
2. Connect GitHub repository
3. Select Backend folder as root
4. Add environment variables from `.env`
5. Railway will automatically:
   - Detect Dockerfile
   - Build and deploy
   - Assign public URL

**Frontend**
1. Create new project on Railway
2. Connect GitHub repository
3. Select Frontend folder as root
4. Add build configuration:
   ```
   Build Command: npm run build
   Start Command: npm run preview
   ```
5. Add environment variables
6. Deploy

### MongoDB Atlas Setup

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IP addresses (or allow from anywhere for development)
4. Get connection string
5. Update `MONGODB_URL` in environment variables

### Custom Domain Setup

1. Add custom domain in Railway settings
2. Update DNS records with provided values
3. Update `BACKEND_URL` and `FRONTEND_URL` accordingly
4. Update CORS origins in `main.py`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add type hints for Python code
- Use TypeScript for all frontend code
- Write descriptive commit messages
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📄 License

This project uses various open-source libraries and frameworks. See [OPEN_SOURCE_ATTRIBUTIONS.md](./OPEN_SOURCE_ATTRIBUTIONS.md) for complete license information.

---

## 🙏 Acknowledgments

- **Google Gemini & Veo** - AI image and video generation
- **FastAPI** - Modern Python web framework
- **React & Vite** - Frontend framework and tooling
- **MongoDB** - Database and GridFS storage
- **Tailwind CSS** - Utility-first CSS framework
- **Railway** - Deployment platform

---

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact: info@codecape.solutions

---

**Made with ❤️ for nostalgic content creation**
