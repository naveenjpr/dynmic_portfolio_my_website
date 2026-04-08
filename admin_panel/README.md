# Portfolio Admin Panel - Folder Structure Explanation

This document explains the organization and purpose of the directories and files within the `admin_panel` directory.

## Directory Structure

### `src/`
The core of the application, containing all React components, logic, and assets.

*   **`Common/`**: Contains components that are shared across multiple pages.
    *   `Header.jsx`: The top navigation bar.
*   **`DropDown/`**: Organized by feature module. These directories contain the specific forms and tables for managing portfolio data.
    *   `Experience/`: `AddExperience.jsx` (form) and `ViewExperience.jsx` (data table).
    *   `Portfolio/`: Components for managing your projects.
    *   `Skills/`: Components for managing your professional skills.
    *   `Achievements/`: Components for manageing your certificates and awards.
    *   (and more...)
*   **`Middle-Section/`**: Contains layout-specific components that sit between the header and the main content.
    *   `Sidebar.jsx`: The main vertical navigation menu.
*   **`Pages/`**: The top-level components for each route in the application.
    *   `Home.jsx`: The main dashboard page.
    *   `Login.jsx`: The authentication page.
*   **`Redux/`**: State management using Redux Toolkit.
    *   `AdminSlice.js`: Manages authentication state and UI states like sidebar visibility.
    *   `store.js`: The central Redux store configuration.
*   **`App.jsx`**: The main application component where routes are defined.
*   **`index.jsx`**: The entry point for the React application that mounts the app to the DOM.

### Root Files
*   **`.env`**: Stores environment variables such as `VITE_API_URL` for backend communication.
*   **`vite.config.js`**: Configuration file for the Vite build tool.
*   **`tailwind.config.js`**: Configuration for Tailwind CSS styling.
*   **`package.json`**: Lists project dependencies and scripts (e.g., `npm run dev`).

## Getting Started

To get the project running on your local machine, follow these steps:

### 1. Start the Backend Server
Navigate to the `backend` directory and run:
```bash
# Install dependencies
npm install

# Start the server with Nodemon
npm start
```
The backend server will typically run on `http://localhost:5000`.

### 2. Start the Admin Panel (Frontend)
Navigate to the `admin_panel` directory and run:
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The admin panel will typically run on `http://localhost:5173`.

---
*Note: Make sure your `.env` files are properly configured in both directories before starting the servers.*
