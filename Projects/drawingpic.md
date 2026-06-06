# DrawingPic API

This is the backend service for DrawingPic, an application that generates unique, style-infused images using Google's Gemini AI. The API allows for image generation from text prompts, refinement of existing images, and generation of new images based on a subject image, all while applying a specific artistic style.

The frontend for this project is for demonstration purposes only and is not intended for production use.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [Get Available Art Styles](#get-available-art-styles)
  - [Generate a New Image](#generate-a-new-image)
  - [Generate an Image from a Subject Image](#generate-an-image-from-a-subject-image)
  - [Refine an Existing Image](#refine-an-existing-image)
  - [Get All Images](#get-all-images)
  - [Get a Specific Image](#get-a-specific-image)
- [Getting Started (Local Setup)](#getting-started-local-setup)
- [Deployment Guide](#deployment-guide)
- [Integration Guide](#integration-guide)

## Tech Stack

- **Python 3.11**
- **FastAPI:** For building the RESTful API.
- **Uvicorn:** As the ASGI server.
- **Pydantic:** For data validation.
- **Motor:** Asynchronous driver for MongoDB.
- **Google Generative AI (Gemini):** For the core image generation capabilities.
- **Cloudinary:** For cloud-based image storage and delivery.
- **Docker:** For containerization.

## Features

- **AI-Powered Image Generation:** Create images from textual descriptions.
- **Style-Based Generation:** Apply a variety of predefined art styles to the generated images.
- **Image Refinement:** Iteratively refine and modify existing images with new prompts.
- **Image-to-Image Generation:** Use a source image as a base for a new, stylized creation.
- **Cloud Storage:** All generated images are stored in Cloudinary for easy access and management.
- **Database Integration:** Image metadata is saved in a MongoDB database.

## API Endpoints

Here are the available endpoints for the DrawingPic API.

### Get Available Art Styles

Retrieves a list of all available art styles that can be used for image generation.

- **Endpoint:** `GET /styles`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `["Sculpted Impasto", "Ethereal Watercolor", "Gothic Oil Painting", "Art Deco Nouveau", "Synthwave Surrealism"]`

---

### Generate a New Image

Generates a new image based on a text prompt and a specified art style.

- **Endpoint:** `POST /images/generate`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "prompt": "A futuristic city skyline at sunset",
    "style": "Synthwave Surrealism"
  }
  ```

- **Response Body (`ImageGenerationResponse`):**

  ```json
  {
    "id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "prompt": "A futuristic city skyline at sunset",
    "style": "Synthwave Surrealism",
    "image_url": "https://res.cloudinary.com/your-cloud-name/image/upload/v16.../image.png",
    "created_at": "2025-11-17T12:00:00",
    "parent_image_id": null,
    "refinement_query": null
  }
  ```

---

### Generate an Image from a Subject Image

Generates a new image by applying a style to a user-provided subject image.

- **Endpoint:** `POST /images/generate-from-image`
- **Method:** `POST`
- **Request Body:** `multipart/form-data`
  - `prompt`: (string) A text prompt describing the desired transformation.
  - `style`: (string) The art style to apply (e.g., "Gothic Oil Painting").
  - `image`: (file) The subject image file.

- **Response Body (`ImageGenerationResponse`):** Same as "Generate a New Image".

---

### Refine an Existing Image

Refines an existing image using a new query. This is useful for making iterative changes.

- **Endpoint:** `POST /images/refine/{image_id}`
- **Method:** `POST`
- **Path Parameter:**
  - `image_id`: The ID of the image to refine.
- **Request Body:**

  ```json
  {
    "refinement_query": "Make the colors more vibrant and add a glowing moon"
  }
  ```

- **Response Body (`ImageGenerationResponse`):**

  ```json
  {
    "id": "64f5a1b2c3d4e5f6g7h8i9j1",
    "prompt": "A futuristic city skyline at sunset",
    "style": "Synthwave Surrealism",
    "image_url": "https://res.cloudinary.com/your-cloud-name/image/upload/v16.../refined_image.png",
    "created_at": "2025-11-17T12:05:00",
    "parent_image_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "refinement_query": "Make the colors more vibrant and add a glowing moon"
  }
  ```

---

### Get All Images

Retrieves a list of all generated images.

- **Endpoint:** `GET /images`
- **Method:** `GET`
- **Response Body:** An array of `ImageGenerationResponse` objects.

---

### Get a Specific Image

Retrieves a single image by its ID.

- **Endpoint:** `GET /images/{image_id}`
- **Method:** `GET`
- **Path Parameter:**
  - `image_id`: The ID of the image to retrieve.
- **Response Body:** A single `ImageGenerationResponse` object.

## Getting Started (Local Setup)

Follow these steps to run the backend service on your local machine.

### Prerequisites

- Python 3.11 or later
- `pip` (Python package installer)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Aun-shahid/DrawingPicAPI.git
cd DrawingPicAPI/Backend
```

### 2. Create a Virtual Environment

It's recommended to use a virtual environment to manage dependencies.

```bash
# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the `Backend` directory and add the following variables. Replace the placeholder values with your actual credentials.

```env
# MongoDB Configuration
MONGO_DETAILS="mongodb+srv://<user>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"

# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### 5. Run the Application

Use `uvicorn` to start the server.

```bash
uvicorn src.main:app --reload --port 8080
```

The API will be available at `http://127.0.0.1:8080`. You can access the interactive API documentation at `http://127.0.0.1:8080/docs`.

## Deployment Guide

This project is configured for easy deployment to [Railway](https://railway.app/).

### Prerequisites

- A Railway account.
- The project pushed to a GitHub repository.

### Steps to Deploy

1.  **Create a New Project on Railway:**
    - Log in to your Railway dashboard.
    - Click "New Project" and select "Deploy from GitHub repo".
    - Choose the repository for this project.

2.  **Configure the Service:**
    - Railway will automatically detect the `railway.toml` file and use the Dockerfile to build and deploy the service.
    - The `railway.toml` file is configured to use the `Backend/Dockerfile`.

3.  **Add Environment Variables:**
    - In your Railway project, go to the "Variables" tab.
    - Add the same environment variables as defined in the `.env` file for local setup (`MONGO_DETAILS`, `GEMINI_API_KEY`, `CLOUDINARY_CLOUD_NAME`, etc.).
    - Railway will automatically set the `PORT` variable, which is used by the `Dockerfile`.

4.  **Deploy:**
    - Once the variables are set, Railway will trigger a new deployment.
    - After the deployment is complete, Railway will provide a public URL for your API.

## Integration Guide

To integrate this backend into your existing application, you only need to store the `image_url` returned by the API.

When you make a request to any of the image generation or refinement endpoints (`/images/generate`, `/images/refine/{image_id}`, etc.), the API will respond with a JSON object containing an `image_url`.

**Example Workflow:**

1.  Your application sends a request to `POST /images/generate`.
2.  The DrawingPic API generates the image, uploads it to Cloudinary, and saves the metadata.
3.  The API returns a response like this:

    ```json
    {
      "id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "prompt": "A beautiful landscape",
      "style": "Sculpted Impasto",
      "image_url": "https://res.cloudinary.com/your-cloud-name/image/upload/v16.../image.png",
      ...
    }
    ```

4.  Your application should then extract the `image_url` from the response and store it in your own database, associate it with a user, or use it directly in your frontend.

The `image_url` is a permanent link to the image hosted on Cloudinary's CDN, ensuring fast and reliable access.
