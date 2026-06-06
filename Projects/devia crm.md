# DevIA - Full-Stack Construction Management SaaS

DevIA is a comprehensive SaaS platform designed for construction management companies. This repository contains the full-stack application, including a React/TypeScript frontend and a FastAPI/Python backend.

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Full Stack](#running-the-full-stack)
- [Project Structure](#project-structure)

## Architecture

The project is a monorepo containing two main components:

-   **Frontend**: A modern, responsive single-page application built with **React**, **TypeScript**, and **Vite**. It features a tab-based navigation system and communicates with the backend via a REST API.
-   **Backend**: A high-performance REST API built with **FastAPI** and **Python**. It uses **MongoDB** for data storage and provides secure, asynchronous endpoints for all application features.

## Features

### Frontend
- Tab-based single-page architecture for a seamless user experience.
- Role-based dashboards (Admin role fully implemented).
- AI Assistant with voice and text capabilities powered by OpenAI.
- Rich feature modules: Quotes, Invoices, Clients, Calendar, Expenses, and Reports.
- Internationalization (i18n) with English and French language support.

### Backend
- High-performance API with automatic interactive documentation (Swagger UI).
- Secure JWT-based authentication with access and refresh tokens.
- Asynchronous database operations with MongoDB.
- Third-party integrations for email (Mailjet), payments (Stripe), and calendar (Google Calendar).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Python](https://www.python.org/) (v3.11 or later)
-   A running [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud-hosted).

### Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd Backend
    ```

2.  **Create and activate a virtual environment**:
    ```bash
    # Create
    python -m venv venv
    
    # Activate (Windows)
    .\venv\Scripts\activate
    
    # Activate (macOS/Linux)
    source venv/bin/activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure environment variables**:
    -   Create a `.env` file in the `Backend` directory.
    -   Use the template in `Backend/README.md` to fill in your database connection string, API keys (OpenAI, Google, etc.), and a new `SECRET_KEY`.

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd Frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    -   Create a `.env` file in the `Frontend` directory.
    -   Use the template in `Frontend/README.md` to set `VITE_API_URL` to your running backend's URL (e.g., `http://localhost:8000/api/v1`) and add any optional API keys.

## Running the Full Stack

To run the entire application, you need to start both the backend and frontend servers.

1.  **Start the Backend Server**:
    Open a terminal in the `Backend` directory and run:
    ```bash
    uvicorn src.main:app --reload
    ```
    The backend will be available at `http://localhost:8000`.

2.  **Start the Frontend Server**:
    Open a second terminal in the `Frontend` directory and run:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

You can now access the application in your browser at `http://localhost:5173`.

## Project Structure

The repository is organized into two main folders:

```
.
├── Backend/        # FastAPI backend application
│   ├── src/
│   └── requirements.txt
└── Frontend/       # React frontend application
    ├── src/
    └── package.json
```

For more detailed information on the structure of each part, please refer to the `README.md` files located within the `Frontend` and `Backend` directories.
