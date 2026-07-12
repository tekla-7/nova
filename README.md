NOVA E-Commerce Platform

A full-stack e-commerce web application built with React and Express.

## Tech Stack

**Frontend**
- React 18 + TypeScript
- React Router v6 (client-side routing)
- TailwindCSS (styling)
- Context API (cart, wishlist, auth state)
- Axios (API calls)
- Lucide React / Tabler Icons

**Backend**
- Node.js + Express
- REST API
- JWT authentication
- DummyJSON API integration

## Features

-  Product browsing with filter, sort, search
-  Live search with debounced autocomplete
-  Shopping cart with quantity controls
-  Wishlist with saved items
-  User authentication (login / register)
-  Multi-step checkout (shipping → payment → confirm)
-  Payment methods (card, PayPal, Apple Pay UI)
-  User profile (orders, addresses, notifications)
-  Fully responsive (desktop, tablet, mobile)
-  Grid / list view toggle on shop page

## Pages

Home · Shop · Product Detail · Cart · Wishlist
Checkout · Login · Register · Profile · Orders · 404

## Getting Started

### Frontend
cd client
npm install
npm run dev

### Backend
cd server
npm install
npm run dev

## Environment Variables

VITE_API_BASE_URL=http://localhost:5173
JWT_SECRET=your_secret_here
DUMMYJSON_BASE_URL=https://dummyjson.com
