# Farm to Home

**Farm to Home** is a full-stack e-commerce web application that connects local farmers directly with consumers, eliminating middlemen and creating a transparent marketplace for fresh agricultural products. The platform enables farmers to showcase and sell their produce online while allowing consumers to purchase fresh, locally sourced, and high-quality products directly from the source.

The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and provides a seamless shopping experience for customers along with efficient inventory and order management tools for farmers. By fostering direct farmer-to-consumer interactions, the platform promotes fair pricing, sustainable agriculture, and stronger local farming communities.

## Core Features

### 1. Dual-Role Architecture (Role-Based Access Control)
* **Consumer Portal:** Browse and search fresh farm products, filter by categories, view detailed information, add to cart, and track order status securely.
* **Farmer Dashboard:** Add new products with images, descriptions, and pricing, manage inventory, and update order fulfillment status for incoming customer orders.

### 2. Secure Authentication and Authorization
* Secure user authentication using JSON Web Tokens (JWT).
* Separate registration and login systems for Consumers and Farmers.
* Protected routes to prevent unauthorized access.
* Role-based access control ensuring users can only access features relevant to their account type.

### 3. Advanced Shopping Cart and Checkout System
* Dynamic shopping cart with automatic subtotal calculations.
* Quantity management and delivery fee calculations.
* Seamless checkout process with order confirmation.
* Premium **FarmPass Membership** benefits, offering a 10% discount on purchases and free delivery on eligible orders.

### 4. Real-Time Chat System
* Built using **Socket.io** for instant communication.
* Direct messaging between consumers and farmers to inquire about product freshness, farming practices, and delivery details.

### 5. Comprehensive Order Management
* **Consumer:** View complete order history, track current status, and receive updates.
* **Farmer:** Receive notifications for new orders, manage processing, and update statuses (Pending, Processing, Shipped, Delivered).

### 6. Modern and Responsive User Interface
* Built with **React.js** and **Vite** for fast performance.
* Responsive design perfectly optimized for desktop, tablet, and mobile devices.
* Smooth client-side navigation with interactive toast notifications.

---

## 📸 Screenshots & Application Walkthrough

### 1. Home Page
![Home Page](screenshots/home.png)
*The landing page features a modern, welcoming design introducing the Farm to Home concept, showcasing featured products, and providing easy navigation to start shopping or selling.*

### 2. Products Marketplace
![Products Page](screenshots/products.png)
*The main shopping interface where consumers can view all available fresh produce. It features real-time filtering, responsive grid layouts, and visual badges for premium discounts.*

### 3. Authentication (Login/Register)
![Login Page](screenshots/login.png)
*A secure, intuitive authentication portal allowing users to securely log in or register as either a Consumer or a Farmer, powered by JWT token encryption.*

### 4. Farmer Dashboard
![Farmer Dashboard](screenshots/farmer_dashboard.png)
*A dedicated management panel strictly for verified farmers. Here, they can track their earnings, view current stock levels, process incoming orders, and manage their product listings effortlessly.*

---

## Technology Stack

### Frontend
* **React.js** & **Vite**
* **Custom Vanilla CSS** (Responsive and Mobile-First)

### Backend & Database
* **Node.js** & **Express.js**
* **MongoDB** & Mongoose

### Authentication & Real-Time
* **JSON Web Token (JWT)**
* **Socket.io**
* **React Context API** (State Management)

---

## How to Run Locally

### 1. Database
Ensure you have MongoDB running locally, or have a MongoDB Atlas connection string ready.

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside the `/backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/farm-to-home
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend folder:
```bash
cd frontend
npm install
```
Create a `.env` file in the `/frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the React application:
```bash
npm run dev
```

The application will now be running at `http://localhost:5173`!

---
## Project Impact

Farm to Home creates a sustainable digital marketplace that empowers local farmers by providing direct access to consumers while ensuring fair pricing and increased profitability. Consumers benefit from access to fresh, high-quality produce, transparent sourcing information, and a convenient online shopping experience. The platform strengthens local agricultural ecosystems and promotes a more efficient farm-to-consumer supply chain.
