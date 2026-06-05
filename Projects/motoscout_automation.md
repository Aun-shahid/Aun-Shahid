# Corestone Essay Checker Backend

Corestone is a comprehensive, AI-powered essay evaluation platform designed to assist students and educators with grading IBDP Extended Essays and Theory of Knowledge (TOK) essays. The backend is built with FastAPI and leverages MongoDB for data storage, providing a robust and scalable solution for managing users, rubrics, evaluations, and more.

## Features

-   **AI-Powered Evaluation**: Utilizes OpenAI's GPT models for automated essay assessment based on customizable rubrics.
-   **User Management**: Role-based access control for Students, Teachers, Admins, and Super Admins, with JWT-based authentication.
-   **Rubric Management**: Allows creation, modification, and management of detailed evaluation criteria.
-   **Subscription System**: Integrates with Stripe for subscription plans and credit-based usage.
-   **Dashboard Analytics**: Provides comprehensive analytics on submission trends, user activity, and evaluation metrics.
-   **File Uploads**: Supports `.docx` and `.pdf` file uploads for essay submissions.
-   **External Links**: Manages and tracks clicks on educational resources.
-   **Asynchronous Operations**: Built with an async-first approach using `asyncio`, `motor`, and `FastAPI`.

## Tech Stack

-   **Framework**: FastAPI
-   **Database**: MongoDB with Motor (async driver)
-   **Authentication**: JWT (JSON Web Tokens) with `python-jose`
-   **AI Integration**: OpenAI API
-   **Payments**: Stripe
-   **Environment Management**: Pydantic Settings with `.env` files
-   **File Processing**: `python-docx`, `PyPDF2`
-   **Server**: Uvicorn

## Project Structure

The backend follows a modular structure to separate concerns and improve maintainability.

```
Backend/
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── auth/         # Authentication endpoints
│   │       ├── dashboard/    # Dashboard analytics endpoints
│   │       ├── evaluation/   # Essay evaluation endpoints
│   │       ├── rubrics/      # Rubric management endpoints
│   │       ├── users/        # User management endpoints
│   │       └── ...           # Other API modules
│   ├── auth/
│   │   ├── dependencies.py   # FastAPI dependencies for auth
│   │   ├── jwt.py            # JWT creation and validation logic
│   │   └── permissions.py    # Role-based permission checks
│   ├── models/
│   │   ├── users.py          # Pydantic models for users
│   │   ├── evaluation.py     # Pydantic models for evaluations
│   │   └── ...               # Other data models
│   ├── services/
│   │   ├── ai_evaluation_service.py # Handles AI-based evaluation
│   │   ├── evaluation_service.py    # Core evaluation logic
│   │   ├── user_service.py          # User-related business logic
│   │   └── ...                      # Other service modules
│   ├── config.py             # Application configuration
│   ├── database.py           # Database connection and collections
│   ├── logging_config.py     # Logging setup
│   ├── main.py               # FastAPI application entry point
│   └── startup_validator.py  # Startup configuration validation
├── requirements.txt          # Python dependencies
└── .env                      # Environment variables
```

## Core Components

### `main.py`

The entry point of the FastAPI application. It initializes the app, sets up middleware (CORS, Sessions), and includes all the API routers. It also manages the application's lifecycle with a `lifespan` context manager to connect to and disconnect from the database.

### `config.py`

Manages all environment variables and application settings using Pydantic's `BaseSettings`. It loads configuration from a `.env` file and provides a centralized `settings` object for accessing configuration values throughout the application.

### `database.py`

Handles the MongoDB connection using the `motor` async driver. It provides a `db` object and utility functions to get specific collections, abstracting the database connection details from the rest of the application.

### `startup_validator.py`

Contains functions that run on application startup to validate the environment and configuration. It checks for required API keys, validates settings ranges (e.g., `AI_TEMPERATURE`), and ensures the application is in a valid state to start.

### `logging_config.py`

Configures the application's logging using Python's `logging` module. It sets up structured logging to ensure consistent and readable log output across the application.

## Setup and Running the Application

### Prerequisites

-   Python 3.9+
-   MongoDB instance (local or cloud-based)
-   An OpenAI API key
-   A Stripe account with API keys

### 1. Install Dependencies

Navigate to the `Backend` directory and install the required Python packages:

```bash
pip install -r requirements.txt
```

### 2. Environment Setup

Create a `.env` file in the `Backend` directory by copying the example or creating a new one. Fill in the required environment variables:

```env
# API Configuration
API_STR=/api/v1
BACKEND_URL=http://localhost:8000

# JWT Authentication
SECRET_KEY=<your_strong_secret_key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Database
DATABASE_URL=<your_mongodb_connection_string>
MONGO_DB_NAME=corestone

# Frontend URL
FRONTEND_URL=http://localhost:5173

# OpenAI
OPENAI_API_KEY=<your_openai_api_key>

# Stripe
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
```

### 3. Running the Server

Once the dependencies are installed and the `.env` file is configured, you can start the backend server using `uvicorn`.

From the `Backend` directory, run:

```bash
uvicorn src.main:app --reload
```

-   `src.main:app`: Points to the `app` instance in `src/main.py`.
-   `--reload`: Enables auto-reloading, so the server restarts automatically on code changes.

The API will be available at `http://localhost:8000`, and the interactive API documentation (Swagger UI) can be accessed at `http://localhost:8000/docs`.

## API Endpoints

The API is versioned under `/api/v1`. Below are some of the key endpoints:

-   **Authentication**: `/api/v1/auth/` (login, signup, token refresh)
-   **Users**: `/api/v1/users/` (user management)
-   **Evaluations**: `/api/v1/evaluation/` (submit and retrieve evaluations)
-   **Rubrics**: `/api/v1/rubrics/` (manage rubrics)
-   **Dashboard**: `/api/v1/dashboard/` (analytics and stats)
-   **Subscriptions**: `/api/v1/subscription/` (Stripe plans and subscriptions)

For a full list of endpoints and their details, refer to the Swagger documentation at `/docs`.