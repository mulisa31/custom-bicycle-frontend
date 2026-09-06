# Custom Bicycle Building System (CBBS)

A web application for building custom bicycles from individual components. Customers can select parts, check compatibility, place orders, and track them. Staff roles (admin, manager, clerk) manage components, orders, stock, and reports.

## Live Demo

Frontend: [CBBS Live Site](https://cbbs.netlify.app/index.html)  
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
git clone https://github.com/mulisa31/custom-bicycle-frontend.git

2. Open `index.html` in a browser or use a static server.

3. Ensure the backend is running. Update the `API_BASE` in all JS/HTML files if needed:

4. Start the backend server (separate repo) and configure the database and Cloudinary.
   

## Deployment

### Frontend (Netlify)

- Push this repository to GitHub.
- In Netlify, choose "Import from Git".
- Select the repository.
- Leave build command empty (static site).
- Set publish directory to `.` (or the folder containing `index.html`).
- Deploy.

### Backend (Render)

- Push the backend repository to GitHub.
- Create a Web Service on Render.
- Set build command: `npm install`
- Start command: `npm start`
- Add environment variables:
- `DATABASE_URL` – Neon connection string
- `JWT_SECRET` – any long secret
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `NODE_ENV=production`

## Template Attribution

This project was adapted from the open-source e-commerce template:

[Evara E-commerce](https://billalben.github.io/evara-ecommerce/)

Several pages were modified, and new features were added to support the custom bicycle building system.

## Notes

- Component images are stored on Cloudinary. Uploads from the admin panel will automatically use Cloudinary.
- The backend is hosted on Render and may take a few seconds to wake up after idle periods.
- This project is for educational purposes.
