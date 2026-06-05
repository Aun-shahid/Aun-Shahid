# Storybook Application

A comprehensive creative writing platform that helps authors manage books, chapters, characters, world-building, and generate AI-powered content.

## 🚀 Quick Links

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Full API Documentation](STORYBOOK_API_DOCUMENTATION.md)** - Complete endpoint reference
- **[Test API](Backend/test_api.py)** - Automated API testing script

## 📚 Project Structure

```
Book/
├── Backend/              # FastAPI backend
│   ├── src/
│   │   ├── api/v1/      # API endpoints
│   │   ├── models/      # Beanie document models
│   │   ├── schemas/     # Pydantic schemas
│   │   ├── services/    # Business logic & AI services
│   │   ├── config.py    # Configuration
│   │   └── database.py  # Database setup
│   ├── requirements.txt
│   └── test_api.py      # API test suite
├── Frontend/            # React + TypeScript frontend
└── README.md
```

## ✨ Features

### Core Modules
- **📖 Books** - Main story containers with metadata
- **📝 Chapters** - Sequential story segments with auto-numbering
- **👤 Characters** - Character management with AI portrait generation
- **🌍 Worlds & Locations** - Rich world-building settings
- **⚡ Elements** - Flexible world-building (magic systems, cultures, religions)
- **🤖 AI Generation** - Context-aware content generation using GPT-4

### AI Capabilities
- Generate chapter content with context awareness
- Create character portraits using DALL-E
- Intelligent prompt building with character/location/element context
- Fallback to placeholder content when API key not configured

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance async Python framework
- **MongoDB** - NoSQL database for flexible document storage
- **Beanie ODM** - Async MongoDB object-document mapper
- **OpenAI API** - GPT-4 for text, DALL-E for images
- **Pydantic** - Data validation and serialization

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first styling

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- MongoDB (local or cloud)
- Node.js 18+ (for frontend)
- OpenAI API key (optional, for AI features)

### Quick Start

1. **Install Backend**
   ```bash
   cd Backend
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   ```bash
   # Create .env file
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running
   mongosh  # Test connection
   ```

4. **Run Backend**
   ```bash
   uvicorn src.main:app --reload
   ```

5. **Access API**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

6. **Test API** (optional)
   ```bash
   python test_api.py
   ```

For detailed instructions, see [QUICKSTART.md](QUICKSTART.md)

## 📖 API Overview

### Books
```http
POST   /api/v1/books/           # Create book
GET    /api/v1/books/           # List books
GET    /api/v1/books/{id}       # Get book
PUT    /api/v1/books/{id}       # Update book
DELETE /api/v1/books/{id}       # Delete book
```

### Chapters (with auto-sequencing)
```http
POST   /api/v1/chapters/books/{book_id}/chapters/  # Create chapter
GET    /api/v1/chapters/books/{book_id}/chapters/  # List chapters
GET    /api/v1/chapters/{id}                       # Get chapter
PUT    /api/v1/chapters/{id}                       # Update chapter
DELETE /api/v1/chapters/{id}                       # Delete chapter
```

### Characters (with AI image generation)
```http
POST   /api/v1/characters/                         # Create character
GET    /api/v1/characters/                         # List characters
POST   /api/v1/characters/{id}/generate-image      # Generate portrait
```

### Worlds & Locations
```http
POST   /api/v1/worlds/                             # Create world
GET    /api/v1/worlds/{id}                         # Get world + locations
POST   /api/v1/worlds/{world_id}/locations/        # Create location
```

### Elements (with category filtering)
```http
GET    /api/v1/elements/?category=Magic%20System   # Filter by category
```

### AI Generation
```http
POST   /api/v1/generation/chapter-content          # Generate content
```

See [STORYBOOK_API_DOCUMENTATION.md](STORYBOOK_API_DOCUMENTATION.md) for complete details.

## 🧪 Testing

Run the automated test suite:

```bash
cd Backend
python test_api.py
```

This will:
- Test all CRUD operations
- Create sample data
- Test AI generation
- Verify endpoints work correctly

## 🔧 Configuration

Key environment variables in `.env`:

```env
# Database
DATABASE_URL=mongodb://localhost:27017
MONGO_DB_NAME=storybook

# OpenAI (for AI features)
OPENAI_API_KEY=sk-your-key-here

# JWT Authentication
SECRET_KEY=your-secret-key
ALGORITHM=HS256

# API
API_STR=/api/v1
BACKEND_URL=http://localhost:8000
```

## 🧰 Storage Migration (GridFS → S3)

The project now stores all media (images, audio, video) in an S3-compatible bucket (Railway Bucket). To migrate existing files that were stored in GridFS, run the migration helper from the Backend folder:

```bash
cd Backend
python -m scripts.migrate_gridfs_to_s3 --commit
```

By default the script runs a dry-run. Use `--commit` to actually copy files to S3 and update document references. Ensure the S3 variables in `.env` are set before committing.


## 📝 Example Usage

### Create a Complete Story

```python
import requests

BASE = "http://localhost:8000/api/v1"

# Create book
book = requests.post(f"{BASE}/books/", json={
    "title": "The Lost Kingdom",
    "description": "An epic fantasy tale"
}).json()

# Create chapter
chapter = requests.post(
    f"{BASE}/chapters/books/{book['_id']}/chapters/",
    json={"title": "Chapter 1", "content": "Once upon a time..."}
).json()

# Create character
hero = requests.post(f"{BASE}/characters/", json={
    "name": "Aria",
    "description": "A brave warrior"
}).json()

# Generate AI content
result = requests.post(f"{BASE}/generation/chapter-content", json={
    "chapter_id": chapter["_id"],
    "prompt": "Write an action scene",
    "context_character_ids": [hero["_id"]]
}).json()

print(result["generated_text"])
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

- **Documentation**: [STORYBOOK_API_DOCUMENTATION.md](STORYBOOK_API_DOCUMENTATION.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **Issues**: File an issue on GitHub

## 🎯 Roadmap

- [ ] Timeline management
- [ ] Plot structure templates
- [ ] Character relationship graphs
- [ ] Export to EPUB/PDF
- [ ] Collaborative writing
- [ ] Version control for chapters
- [ ] Grammar checking
