# Custom Bicycle Building System (CBBS)

A web application for building custom bicycles from individual components. Customers can select parts, check compatibility, place orders, and track them. Staff roles (admin, manager, clerk) manage components, orders, stock, and reports.

## Demo

Frontend: [Live Site](https://your-frontend.netlify.app)  
Backend API: [https://custom-bicycle-system-backend.onrender.com](https://custom-bicycle-system-backend.onrender.com)

## Features

- **Customer**
  - Browse components by category, price, and name
  - Build a custom bicycle with compatibility checks
  - Add builds to cart and place orders
  - View order history and profile
- **Clerk**
  - Manage orders (pending → assembling)
  - Assembly queue (assembling → ready)
  - Fulfillment queue (ready → completed)
- **Manager**
  - Stock management (update stock levels)
  - Reports dashboard (orders, revenue, low stock)
- **Admin**
  - Manage components (CRUD with image upload)
  - Manage compatibility rules
  - Create admin, manager, and clerk accounts
  - Dashboard with API status

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL (Neon)
- **File storage**: Cloudinary
- **Deployment**: Netlify (frontend), Render (backend)

## Setup (Local Development)

1. Clone this repository:
