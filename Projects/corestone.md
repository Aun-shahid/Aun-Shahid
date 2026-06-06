# Corestone: AI-Powered Essay Evaluation Platform

Corestone is a full-stack web application designed to provide AI-powered evaluation for IBDP Extended Essays and Theory of Knowledge (TOK) essays. It offers a comprehensive suite of tools for students, teachers, and administrators to manage the essay submission and grading process efficiently.

## High-Level Overview


The project is a monorepo containing two main parts:

-   **`Frontend/`**: A modern, responsive web application built with React, TypeScript, and Vite. It provides the user interface for all user roles.
-   **`Backend/`**: A robust and scalable API built with FastAPI and Python. It handles business logic, database interactions, and communication with the OpenAI API for essay evaluation.

## Key Features

-   **AI-Powered Essay Grading**: Leverages OpenAI's GPT models to provide detailed, rubric-based feedback on student essays.
-   **Role-Based Access Control**: Separate interfaces and permissions for Students, Teachers, and Administrators.
-   **Comprehensive Dashboards**: Analytics and data visualization for tracking submissions, user activity, and system performance.
-   **Secure Authentication**: JWT-based authentication ensures secure access to the platform.
-   **File Management**: Supports `.pdf` and `.docx` file uploads for essay submissions.
-   **Real-time Feedback**: Users can track the status of their essay evaluations in real-time.
-   **Stripe Integration**: Manages subscriptions and payments for different service tiers.

## Technology Stack

### Frontend

-   **Framework**: React 18 with TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Routing**: React Router v6
-   **State Management**: React Context API & Custom Hooks
-   **HTTP Client**: Axios

### Backend

-   **Framework**: FastAPI
-   **Language**: Python 3.9+
-   **Database**: MongoDB with Motor (asynchronous driver)
-   **Authentication**: JWT with `python-jose`
-   **AI Integration**: OpenAI API
-   **Payments**: Stripe
-   **Server**: Uvicorn

## Getting Started

To run the full application, you will need to set up and run both the backend and the frontend servers.

### 1. Backend Setup

1.  Navigate to the `Backend` directory: `cd Backend`
2.  Install dependencies: `pip install -r requirements.txt`
3.  Set up your `.env` file with database, OpenAI, and Stripe credentials.
4.  Run the server: `uvicorn src.main:app --reload`

*For detailed instructions, see the `Backend/README.md`.*

### 2. Frontend Setup

1.  Navigate to the `Frontend` directory: `cd Frontend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and set `VITE_API_BASE_URL` to your backend's address (e.g., `http://localhost:8000`).
4.  Run the development server: `npm run dev`

*For detailed instructions, see the `Frontend/README.md`.*

Once both servers are running, you can access the application in your browser at the URL provided by the frontend development server (usually `http://localhost:5173`).