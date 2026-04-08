# Portfolio Backend API - Folder Structure Explanation

This document explains the organization and purpose of the directories and files within the `backend` directory, which powers the portfolio website and admin panel.

## Directory Structure

### `src/`
Contains the core logic, data models, and configurations for the Node.js/Express server.

*   **`config/`**: Centralized configuration for external services and middleware.
    *   `db.js`: MongoDB connection logic using Mongoose.
    *   `cloudinary.js`: Cloudinary configuration for image hosting.
    *   `upload.js`: Multer configuration for handling multipart/form-data (image uploads).
    *   `mailConfig.js`: Nodemailer configuration for sending emails.
*   **`controllers/`**: Contains the business logic for each API endpoint.
    *   **`admin/`**: Controllers for admin panel operations (CRUD for projects, skills, experience, etc.).
    *   **`website/`**: Controllers for public website operations (fetching data, submitting contact forms).
*   **`models/`**: Defines the data structure (schemas) for MongoDB using Mongoose.
    *   `Experience.Schema.js`, `Portfolio.Schema.js`, `Skills.Schema.js`, etc.
*   **`routes/`**: Defines the API endpoints and maps them to controllers.
    *   **`admin/`**: Routes requiring admin access (prefixed with `/api/backend/`).
    *   **`website/`**: Publicly accessible routes (prefixed with `/api/website/`).

### Root Files
*   **`server.js`**: The main entry point of the server. It initializes Express, connects to the database, and loads all routes.
*   **`.env`**: Stores sensitive environment variables (Database URL, Cloudinary credentials, SMTP details).
*   **`package.json`**: Lists server-side dependencies and scripts.

## Getting Started

### 1. Configure Environment
Create a `.env` file in the `backend` directory with the following keys:
```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_app_password
```

### 2. Start the Server
```bash
# Install dependencies
npm install

# Start the server with Nodemon (auto-restarts on changes)
nodemon server.js
```

The API will be available at `http://localhost:5000`.

## Key Technologies
*   **Node.js & Express**: Server framework
*   **MongoDB & Mongoose**: Database and ODM
*   **Cloudinary**: Image management and hosting
*   **Multer**: Middleware for handling file uploads
*   **Nodemailer**: For sending email notifications
*   **CORS**: Cross-Origin Resource Sharing for frontend communication
