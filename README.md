# Farm to Home Mini Project (Avishkarna Andhra Internship)

**Farm to Home** is a full-stack e-commerce web application that connects local farmers directly with consumers, eliminating middlemen and creating a transparent marketplace for fresh agricultural products. The platform enables farmers to showcase and sell their produce online while allowing consumers to purchase fresh, locally sourced, and high-quality products directly from the source.

The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and provides a seamless shopping experience for customers along with efficient inventory and order management tools for farmers. By fostering direct farmer-to-consumer interactions, the platform promotes fair pricing, sustainable agriculture, and stronger local farming communities.

## 🚀 Live Demo Credentials
Want to test the platform quickly without registering? Use these pre-configured demo accounts to explore different roles:

**Consumer Account (For buying products):**
* **Email:** `user@demo.com` *(or easily register your own)*
* **Password:** `password123`

**Farmer Accounts (For selling, try different ones to see specific products!):**
* **General Demo:** `farmer@demo.com`
* **Vegetables & Organics:** `rattaiah@farmer.com`
* **Fruits:** `kiran@farmer.com`
* **Dairy:** `suresh@farmer.com`
* **Password (for all farmers):** `password123`

---

## 📸 Section-by-Section Walkthrough & Screenshots

### 1. Home Page (Landing Experience)
![Home Page](screenshots/home.png)
**Explanation:** 
The Home Page serves as the welcoming storefront for the platform. It features a modern, hero-banner design introducing the Farm to Home concept. The page highlights the core value proposition: fresh, middleman-free produce. It also displays featured products categorized by "Best Sellers" or "Seasonal Freshness" to immediately engage users. A clear navigation bar allows users to quickly jump to the Products page or log in to their respective portals.

### 2. Products Marketplace (Consumer View)
![Products Page](screenshots/products.png)
**Explanation:**
This is the primary shopping interface for consumers. It presents a responsive grid layout of all available fresh produce directly sourced from registered farmers. 
* **Filtering & Search:** Users can filter products by categories (e.g., Fruits, Vegetables, Dairy) and search for specific items.
* **Product Details:** Each card displays the product image, farmer name, price per unit, and available stock.
* **Interaction:** Consumers can instantly add items to their cart or view more detailed information about the product's origin and farming practices.

### 3. Secure Authentication (Login/Register)
![Login Page](screenshots/login.png)
**Explanation:**
The platform features a secure, dual-role authentication portal. 
* **Role Selection:** Users must specify whether they are joining as a "Consumer" or a "Farmer". This is crucial because it determines the dashboard and permissions they receive after logging in.
* **Security:** The system is powered by JWT token encryption, ensuring all user data, order history, and sensitive credentials are safely protected. It features form validation and instant error feedback.

### 4. Farmer Dashboard (Management Portal)
![Farmer Dashboard](screenshots/farmer_dashboard.png)
**Explanation:**
A dedicated, secure management panel strictly accessible by verified farmers. 
* **Business Overview:** Farmers can track their total earnings, total orders, and active products at a glance.
* **Order Fulfillment:** Displays incoming orders from consumers. Farmers can update the status of these orders (Pending -> Processing -> Delivered).
* **Inventory Management:** Farmers can seamlessly add new products with images, set pricing, and update stock levels to ensure their store is always up-to-date.

---

## Core Features

### 1. Dual-Role Architecture (Role-Based Access Control)
* **Consumer Portal:** Browse and search fresh farm products, filter by categories, view detailed information, add to cart, and track order status securely.
* **Farmer Dashboard:** Add new products with images, descriptions, and pricing, manage inventory, and update order fulfillment status for incoming customer orders.

### 2. Secure Authentication and Authorization
* Secure user authentication using JSON Web Tokens (JWT).
* Separate registration and login systems for Consumers and Farmers.
* Protected routes to prevent unauthorized access.

### 3. Advanced Shopping Cart and Checkout System
* Dynamic shopping cart with automatic subtotal calculations.
* Quantity management and delivery fee calculations.
* Premium **FarmPass Membership** benefits, offering a 10% discount on purchases and free delivery on eligible orders.

### 4. Real-Time Chat System
* Built using **Socket.io** for instant communication.
* Direct messaging between consumers and farmers to inquire about product freshness, farming practices, and delivery details.

### 5. Comprehensive Order Management
* **Consumer:** View complete order history, track current status, and receive updates.
* **Farmer:** Receive notifications for new orders, manage processing, and update statuses (Pending, Processing, Shipped, Delivered).

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
