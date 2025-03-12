# 📦 Inventory Management System

- This is a full-stack Inventory Management System with CRM integration, built using React, Node.js, Express, and MySQL. The system allows a company to track product stock, manage customer orders, and receive stock alerts dynamically.

## 🚀 Features

- ✅ Add Products – Add new products to the inventory with stock and price.
- ✅ Manage Inventory – Update inventory dynamically when orders are placed.
- ✅ Place Orders – Customers can place orders, and stock is updated in real time.
- ✅ Stock Alerts – Receive alerts when stock is low.
- ✅ User-Friendly UI – Clean and responsive interface for better usability.

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL

## Project Structure

    ```bash

    /inventory-management
    │── /backend
    │   │── server.js             # Main backend server file
    │   │── database.js           # Database connection file
    │   │── routes.js             # API routes for managing products & orders
    │── /inventory-frontend
    │   │── src
    │   │   │── App.js            # Main React component
    │   │   │── api.js            # API calls using Axios
    │   │   │── App.css           # Styled components for UI
    │── README.md                 # Project documentation

    ```


## 🔧 Setup & Installation

1️⃣ Clone the Repository

    ```bash

    git clone https://github.com/dhruvjaiswal2981/inventory-management.git
    cd inventory-management

    ```

2️⃣ Backend Setup
- Make sure you have MySQL installed and running.
1. Install dependencies

    ```bash

    cd backend
    npm install
    
    ```

2. Run Backend Server

    ```bash
    node server.js
    ```
- Backend will run at http://localhost:5000/

3️⃣ Frontend Setup

1. Install dependencies

    ```bash
    cd inventory-frontend
    npm install
    ```

2. Run React app

    ```bash
    npm start
    ```
- 🚀 App will run at http://localhost:3000/

## 📡 API Endpoints

### **Product Management**
| Method | Endpoint    | Description         |
|--------|------------|---------------------|
| `GET`  | `/products` | Fetch all products |
| `POST` | `/products` | Add a new product  |

### **Order Management**
| Method  | Endpoint  | Description   |
|---------|----------|---------------|
| `POST`  | `/order` | Place an order |

### **Stock Alerts**
| Method | Endpoint       | Description                  |
|--------|---------------|------------------------------|
| `GET`  | `/stock-alerts` | Get products with low stock |

## 🚀 Deployment

- Backend Deployment

    - Live Demo: The application is hosted on Render
    - Access it here: 

- Frontend Deployment

    - Live Demo: The application is hosted on Netlify.
    - Access it here: 

## 👨‍💻 Author

- 💡 Developed by Dhruv Jaiswal
- 📧 Contact: dhruvujjain@gmail.com







