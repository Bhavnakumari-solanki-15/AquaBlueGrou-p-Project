# Aqua Blue Group - Frontend Project

This repository contains the frontend code for the Aqua Blue Group website, a comprehensive platform for aquaculture solutions. The application is built with React, Vite, and TypeScript, and it uses Supabase as its backend for database, authentication, and storage.

---

## Features

- **Product Management:** Admins can add, edit, and delete products, categories, and sub-categories.
- **Order Management:** Admins can view and manage customer orders.
- **Dynamic Content:** Testimonials and other content are fetched dynamically from the Supabase backend.
- **User Authentication:** Secure login/signup functionality for users and admins.
- **Responsive Design:** A clean and modern UI built with Tailwind CSS that works on all devices.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Bhavnakumari-solanki-15/AquaBlueGrou-p-Project.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd AquaBlueGrou-p-Project
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Set up your environment variables:**
    Create a `.env` file in the root of the project and add the necessary variables. You can use the `.env.example` file as a template.
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL_HERE
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
    VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID_HERE
    VITE_EMAILJS_CONFIRM_TEMPLATE_ID=YOUR_CONFIRM_TEMPLATE_ID_HERE
    VITE_EMAILJS_REJECT_TEMPLATE_ID=YOUR_REJECT_TEMPLATE_ID_HERE
    VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY_HERE
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will open the application in your browser at `http://localhost:5173`.

---

## Deployment

This project is set up for continuous deployment with Netlify. Any push to the `main` branch will automatically trigger a new build and deployment.

-   **Build Command:** `npm run build`
-   **Publish Directory:** `dist` 