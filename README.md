# EventFlow

EventFlow is a modern web application designed to simplify event discovery and creation. Users can browse a variety of events, sign up for an account, and create their own events, complete with details like images, categories, and pricing.

## ✨ Features

* **User Authentication:** Secure sign-up and sign-in functionality using JWTs.
* **Event Creation:** Intuitive form to create new events with various details (title, description, date, time, location, category, type, capacity, price, tags, and image upload).
* **Event Discovery:** Browse all available events on a dedicated "Discover" page.
* **Filtering & Search:** Filter events by category and search by title, description, location, or tags.
* **Responsive UI:** A sleek, modern user interface built with Shadcn UI and Tailwind CSS, ensuring a great experience across devices.
* **Database Integration:** Stores user and event data persistently in MongoDB.

## 🚀 Technologies Used

**Frontend:**

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool for modern web projects.
* **TypeScript:** A superset of JavaScript that adds static typing.
* **Shadcn UI:** A collection of re-usable components built with Radix UI and Tailwind CSS.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **React Router DOM:** For declarative routing in React applications.
* **Lucide React:** A set of beautiful and customizable open-source icons.

**Backend:**

* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** A NoSQL document database.
* **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **bcryptjs:** A library for hashing passwords to securely store them.
* **jsonwebtoken (JWT):** For implementing secure user authentication tokens.
* **dotenv:** To load environment variables from a `.env` file.
* **cors:** Node.js middleware for enabling Cross-Origin Resource Sharing.
* **express-validator:** Middleware for request data validation.

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** [Download & Install Node.js](https://nodejs.org/) (includes npm)
* **npm:** Node Package Manager (comes with Node.js)
* **MongoDB Atlas Account:** [Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (free tier is sufficient for development)

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd sparkle-craft-dash-main/sparkle-craft-dash-main # Navigate to the parent directory if needed
    ```
2.  **Navigate to the `server` directory:**
    ```bash
    cd server
    ```
3.  **Install backend dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file:**
    In the `server` directory, create a file named `.env` and add the following content. Replace the placeholder values with your actual MongoDB Atlas connection string and a strong JWT secret.

    ```env
    PORT=5000
    MONGODB_URI=mongodb+srv://<your_atlas_username>:<your_atlas_password>@<your_cluster_name>.mongodb.net/<your_database_name>?retryWrites=true&w=majority
    JWT_SECRET=YOUR_SUPER_SECURE_JWT_SECRET_KEY # Make this a long, random string!
    ```
    * **To get your `MONGODB_URI`:**
        1.  Log in to your MongoDB Atlas dashboard.
        2.  Go to **Security > Database Access** and ensure you have a user with "Read and write to any database" or "Atlas Admin" privileges. If not, create one.
        3.  Go to **Security > Network Access** and add your current IP address (or "Allow Access from Anywhere" for development, but restrict for production).
        4.  Go to **Database** (or Clusters), click "Connect" on your cluster, select "Connect your application", choose "Node.js" and copy the connection string. Replace `<username>` and `<password>` in the copied string with your actual database user credentials.
        5.  The `<your_database_name>` part (e.g., `eventflow_db`) should be added to the URI if it's not already there.

### 2. Frontend Setup

1.  **Navigate back to the project root directory** (the one containing `src`, `public`, `package.json` etc., usually `sparkle-craft-dash-main/sparkle-craft-dash-main`).
    ```bash
    cd .. # If you are in the server directory
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Ensure correct `EventCard` import:**
    Verify that in `src/components/ui/EventsSection.tsx`, the `EventCard` import is a named import:
    ```typescript
    import { EventCard } from "./EventCard";
    ```
    (Not `import EventCard from "./EventCard";`)

## ▶️ Running the Application

You will need two separate terminal windows for the backend and frontend.

### 1. Start the Backend Server

Open your first terminal window, navigate to the `server` directory:

```bash
cd sparkle-craft-dash-main/sparkle-craft-dash-main/server
npm start

You should see output similar to:

Server started on port 5000
MongoDB Connected...

2. Start the Frontend Development Server
Open your second terminal window, navigate to the project root directory (the one containing src, public, etc.):

Bash

cd sparkle-craft-dash-main/sparkle-craft-dash-main
npm run dev
You should see output indicating the local URL where your frontend is running, typically:

VITE v... ready in ... ms
-> Local: http://localhost:8080/
Open your browser and navigate to http://localhost:8080 (or whatever local address is shown).

💡 Usage
Sign Up / Sign In: Navigate to the authentication page (usually /auth) to create a new account or log in with existing credentials.

Create Event: After logging in, go to the "Create Event" page (you might have a link in the Navbar or need to manually navigate to /create-event if you haven't implemented it yet). Fill out the form and publish your event.

Discover Events: Your newly created event should appear on the main "Discover Events" page (your homepage /). You can also use the search and filter options to find specific events.