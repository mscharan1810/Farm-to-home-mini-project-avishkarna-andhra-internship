# Farm to Home

Farm to Home is a full-stack e-commerce web app I built to connect farmers directly with customers. It cuts out the middlemen so farmers get better prices for their crops, and customers get fresh, organic produce delivered straight to their doors.

## What it does

The app has two main sides to it:
- **For Farmers:** Once registered as a farmer, you get access to a dashboard where you can add new products, manage your stock, and keep an eye on your earnings and incoming orders. 
- **For Customers:** Users can browse the marketplace, filter produce by categories (like leafy greens, dairy, etc.), add items to their cart, and place orders. 

It also includes a real-time chat feature so customers can message farmers directly if they have questions about the produce.

## Tech Stack

This project uses the MERN stack:
- **Frontend:** React (Vite), React Router, Context API for state management, and plain CSS for styling.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB and Mongoose.
- **Real-time:** Socket.io for the chat functionality.
- **Auth:** JWT (JSON Web Tokens).

## How to run it locally

If you want to test it out on your machine, here's how to get it running:

### 1. Database
Make sure you have MongoDB installed and running locally, or have a MongoDB Atlas connection string ready.

### 2. Backend
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
```
Create a `.env` file inside the `/backend` folder with these variables:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/farm-to-home
JWT_SECRET=add_your_secret_key_here
CLIENT_URL=http://localhost:5173
```
Then start the server:
```bash
npm run dev
```

### 3. Frontend
Open another terminal window and go to the frontend folder:
```bash
cd frontend
npm install
```
Create a `.env` file in the `/frontend` folder:
```
VITE_API_URL=http://localhost:5000/api
```
Run the React app:
```bash
npm run dev
```

The app will be running at `http://localhost:5173`. You can create an account as either a "Customer" or a "Farmer / Seller" to see the different dashboards.

## Features

- Role-based access control (Admin, Farmer, Customer)
- Shopping cart functionality
- Product filtering and sorting
- Real-time chat system between users
- Local image uploads for products
- Order tracking and management

## License
MIT
