# AI Powered Chatbot

An intelligent, full-stack chatbot application that enables users to create, deploy, and manage AI-powered chatbots with document processing, embeddings, and multi-user support. Built with FastAPI backend and React TypeScript frontend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Configuration](#configuration)
- [User Roles & Permissions](#user-roles--permissions)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Chatbot Features
- 🤖 **AI-Powered Conversations**: Integration with OpenAI API for intelligent responses
- 📄 **Document Processing**: Upload and process various file types for context
- 🔍 **Vector Search**: Semantic search using embeddings for relevant context retrieval
- 💬 **Real-time Conversations**: WebSocket support for real-time chat interactions
- 📊 **Chat Analytics**: Track conversation metrics and user engagement
- 🌐 **Public Embeds**: Deploy chatbots on external websites via iframe

### User Management
- 👤 **Multi-tier Role System**: Customer, Moderator, Admin, Super Admin
- 🔐 **JWT Authentication**: Secure token-based authentication
- 📧 **Email Verification**: Email-based account verification
- 🔑 **API Key Management**: Users can generate and manage API keys for public chatbots

### Dashboard Features
- 📈 **Admin Dashboard**: Monitor system metrics and user activity
- 🎯 **Course Admin Dashboard**: Manage chatbots and student interactions
- 👨‍💼 **Super Admin Dashboard**: Full system control and analytics
- 📋 **Chatbot Management**: Create, edit, and manage multiple chatbots
- 👥 **User Management**: Administrative user management interface

### Additional Features
- 🌍 **Multi-language Support**: i18n support for English and Spanish
- 💳 **Subscription Plans**: Free and Pro tier subscriptions
- 🎨 **Dark Mode Support**: Theme switching capability
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔐 **CAPTCHA Integration**: Security verification for sensitive operations

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: MongoDB (Motor async driver)
- **Authentication**: JWT (PyJWT)
- **API Documentation**: OpenAPI/Swagger
- **Task Queue**: Async/await with FastAPI
- **Vector Embeddings**: OpenAI Embeddings API
- **Text Processing**: BeautifulSoup4, NLTK
- **Image Processing**: PIL, opencv-python

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Markdown Support**: react-markdown with GitHub Flavored Markdown
- **Icons**: Lucide React
- **Internationalization**: i18next
- **PDF Generation**: html2pdf.js

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Deployment**: Railway (Production)
- **Database**: PostgreSQL with pgvector extension (vector search)
- **Reverse Proxy**: Nginx

---

## 📁 Project Structure

```
AiPoweredChatbot/
├── Backend/                          # Python FastAPI Backend
│   ├── src/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth/            # Authentication endpoints
│   │   │       ├── chatbots/        # Chatbot CRUD & management
│   │   │       ├── users/           # User management
│   │   │       └── dashboard/       # Dashboard data endpoints
│   │   ├── auth/                    # JWT, permissions, utilities
│   │   ├── models/                  # Pydantic & MongoDB models
│   │   ├── services/                # Business logic
│   │   │   ├── embedding_service.py    # OpenAI embeddings
│   │   │   ├── document_processor.py   # File processing
│   │   │   ├── vector_search.py        # Semantic search
│   │   │   ├── conversation_service.py # Chat management
│   │   │   └── text_chunker.py         # Text splitting
│   │   ├── config.py                # Settings management
│   │   ├── database.py              # MongoDB connection
│   │   ├── logging_config.py        # Logging setup
│   │   └── main.py                  # FastAPI app initialization
│   ├── requirements.txt             # Python dependencies
│   ├── .env                         # Environment variables (local)
│   ├── .env.production              # Production environment variables
│   ├── .python-version              # Python version specification
│   └── README.md                    # Backend documentation
│
├── Frontend/                         # React TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/                # Login, signup, password reset
│   │   │   ├── chatbot/             # Chat UI & settings
│   │   │   ├── dashboard/           # Admin dashboards
│   │   │   ├── admin/               # System admin features
│   │   │   └── shared/              # Reusable components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API service layer
│   │   ├── stores/                  # Zustand state stores
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── utils/                   # Utility functions
│   │   ├── contexts/                # React context providers
│   │   ├── i18n/                    # Internationalization setup
│   │   ├── config/                  # Frontend configuration
│   │   ├── lib/                     # API client
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Node dependencies
│   ├── vite.config.ts               # Vite configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── .env                         # Environment variables
│   └── nginx.conf.template          # Nginx configuration for production
│
├── docker-compose.yml               # Docker services definition
├── README.md                        # This file (Project documentation)
└── CODE_INTERPRETER_UPGRADE.md      # Code enhancement notes

```

---

## 📋 Prerequisites

### System Requirements
- **Python**: 3.9 or higher
- **Node.js**: 18 or higher
- **npm** or **yarn**: Latest stable version
- **Docker**: 20.10+ (optional, for containerized deployment)
- **Docker Compose**: 1.29+ (optional)

### External Services
- **MongoDB**: Atlas or local instance
- **OpenAI API Key**: For AI-powered conversations and embeddings
- **SMTP Server**: For email notifications (optional)

### Development Tools
- **Git**: For version control
- **VS Code** or other IDE: For development

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AiPoweredChatbot
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
cd Backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

#### Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - DATABASE_URL: MongoDB connection string
# - OPENAI_API_KEY: Your OpenAI API key
# - JWT_SECRET_KEY: Secret key for JWT tokens
# - FRONTEND_URL: Frontend application URL
```

#### Initialize Database

```bash
# Run database initialization script
python init_db.py

# Create a super admin user
python create_super_admin.py
```

### 3. Frontend Setup

```bash
cd Frontend

# Install Node dependencies
npm install
# or
yarn install

# Configure environment variables
cp .env.example .env
# Edit .env with your API backend URL:
# VITE_API_URL=http://localhost:8000
```

---

## ▶️ Running the Application

### Option 1: Local Development

#### Terminal 1 - Backend

```bash
cd Backend
# Activate virtual environment (if not already active)
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Start FastAPI server
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

#### Terminal 2 - Frontend

```bash
cd Frontend

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Option 2: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout` - User logout

### User Management
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update user profile
- `POST /api/v1/users/verify-email` - Verify email address
- `GET /api/v1/users` - List users (admin only)
- `PUT /api/v1/users/{user_id}` - Update user (admin only)
- `DELETE /api/v1/users/{user_id}` - Delete user (admin only)

### Chatbot Management
- `POST /api/v1/chatbots` - Create new chatbot
- `GET /api/v1/chatbots` - List user's chatbots
- `GET /api/v1/chatbots/{chatbot_id}` - Get chatbot details
- `PUT /api/v1/chatbots/{chatbot_id}` - Update chatbot
- `DELETE /api/v1/chatbots/{chatbot_id}` - Delete chatbot
- `POST /api/v1/chatbots/{chatbot_id}/documents` - Upload documents
- `GET /api/v1/chatbots/{chatbot_id}/documents` - List documents

### Conversations
- `POST /api/v1/chatbots/{chatbot_id}/conversations` - Start conversation
- `POST /api/v1/chatbots/{chatbot_id}/conversations/{conv_id}/messages` - Send message
- `GET /api/v1/chatbots/{chatbot_id}/conversations/{conv_id}` - Get conversation history
- `DELETE /api/v1/chatbots/{chatbot_id}/conversations/{conv_id}` - Delete conversation

### Public Chatbot
- `GET /api/v1/chatbots/{chatbot_id}/public/info` - Get public chatbot info
- `POST /api/v1/chatbots/{chatbot_id}/public/message` - Send message to public chatbot

### Dashboard
- `GET /api/v1/chatbots/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/chatbots/dashboard/analytics` - Get detailed analytics

For complete API documentation, visit `http://localhost:8000/docs` when running locally.

---

## 🗄️ Database

### MongoDB Collections

The application uses the following MongoDB collections:

1. **users** - User accounts with roles and subscription info
2. **chatbots** - Chatbot configurations and metadata
3. **conversations** - Chat conversation records
4. **messages** - Individual messages in conversations
5. **documents** - Uploaded documents and file metadata
6. **embeddings** - Vector embeddings for semantic search
7. **api_keys** - User API keys for public chatbot access

### PostgreSQL (Optional)

The Docker Compose file includes PostgreSQL with pgvector extension for advanced vector search capabilities.

---

## ⚙️ Configuration

### Backend Configuration (src/config.py)

Key environment variables:

```env
# MongoDB
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/database_name

# OpenAI
OPENAI_API_KEY=sk-xxxx
OPENAI_MODEL=gpt-4

# JWT
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Application
PROJECT_NAME=AI Powered Chatbot
VERSION=1.0.0
API_STR=/api/v1
FRONTEND_URL=http://localhost:5173

# SMTP (optional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Frontend Configuration (src/config/config.ts)

```typescript
export const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const isDevelopment = import.meta.env.DEV
```

---

## 👥 User Roles & Permissions

### Customer (Default)
- Create and manage own chatbots
- Upload documents to chatbots
- View chatbot analytics
- Access subscription dashboard
- Limited to subscription tier features

### Moderator
- All customer permissions
- Moderate user content
- View system-wide analytics
- Access moderation dashboard
- Unlimited chatbot creation

### Admin
- All moderator permissions
- Manage users (create, edit, deactivate)
- Change user roles (except admin/super admin)
- Manage subscription plans
- View system logs

### Super Admin
- All permissions
- Manage other admins
- Access super admin dashboard
- Full system configuration
- Complete audit logs

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make your changes following the code style guidelines

3. Test your changes:
   - Backend: `pytest Backend/tests/`
   - Frontend: `npm run lint && npm run build`

4. Commit with clear messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. Push and create a Pull Request

### Code Style
- **Python**: Follow PEP 8 (use `black` for formatting)
- **TypeScript/React**: Follow ESLint configuration (`npm run lint`)
- **Comments**: Add JSDoc/docstrings for complex functions

### Testing
- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Maintain test coverage above 80%

---

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🆘 Support & Resources

- **Documentation**: See [Backend README](Backend/README.md) and [Frontend README](Frontend/README.md)
- **API Documentation**: Available at `/docs` endpoint when running
- **Issues**: Report bugs and feature requests in the issue tracker
- **Email Support**: support@aipoweredchatbot.com

---

## 🚢 Deployment

### Production Deployment (Railway)

The application is configured for deployment on Railway:

1. Set environment variables in Railway dashboard
2. Connect your Git repository
3. Railway automatically builds and deploys on push to main branch

**Production URLs:**
- Frontend: https://aipoweredchatbot-frontend-production.up.railway.app
- Backend API: https://aipoweredchatbot-production.up.railway.app

### Docker Deployment

Build production Docker images:

```bash
# Backend
cd Backend
docker build -t ai-chatbot-backend:latest .
docker push your-registry/ai-chatbot-backend:latest

# Frontend
cd Frontend
docker build -t ai-chatbot-frontend:latest .
docker push your-registry/ai-chatbot-frontend:latest
```

---

## 📞 Contact & Support

For support, feature requests, or bug reports, please reach out to support@aipoweredchatbot.com

---

**Last Updated**: June 2026
**Version**: 1.0.0
