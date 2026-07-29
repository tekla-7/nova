# NOVA - Modern E-Commerce Platform

NOVA is a full-stack e-commerce application built with React, TypeScript, and Express.js.

The application provides a complete online shopping experience including authentication, product browsing, shopping cart, wishlist, checkout, and order management.

The project demonstrates modern frontend and backend development practices such as reusable components, REST API integration, JWT authentication with refresh tokens, protected routes, and efficient state management.

---

## Live Demo

Frontend:
https://nova-store-fzh6wam2m-tekla-7s-projects.vercel.app

Backend API:
https://nova-1-usvd.onrender.com

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS
- TanStack Query
- Redux Toolkit
- Lucide React

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- Refresh Token Authentication
- HTTP-only Cookies
- Cookie Parser
- JSON File Storage

### Testing

- Vitest
- React Testing Library
- Jest DOM

---

# Features

## Authentication

- User registration
- User login
- JWT access token authentication
- Refresh token authentication
- HTTP-only cookie sessions
- Protected routes
- Automatic session refresh
- Automatic logout
- Password recovery using recovery phrase

---

## Product Management

- Browse products
- Product details
- Product categories
- Category filtering
- Price filtering
- Rating filtering
- Product sorting

---

## Shopping Cart

- Add products to cart
- Remove products from cart
- Update product quantity
- Persistent cart data
- Optimistic UI updates

---

## Wishlist

- Add products to wishlist
- Remove products from wishlist
- Move wishlist products to cart

---

## Checkout

- Multi-step checkout flow
- Shipping information
- Address management
- Payment information
- Order creation

---

## User Features

- User profile
- Personal information management
- Order history
- Order details
- Order tracking

---

# Authentication Flow

The application uses JWT authentication with refresh token support.

## Access Token

- Used for API authorization
- Sent through the Authorization header
- Short-lived for improved security

## Refresh Token

- Stored in an HTTP-only cookie
- Used to generate new access tokens
- Validated on the backend
- Removed during logout

## Client Side Handling

The custom API client automatically:

- Attaches access tokens to requests
- Detects expired tokens
- Requests a new access token
- Retries failed requests
- Logs the user out when refresh fails

---

# Technical Highlights

- Custom API client implementation
- JWT authentication system
- Refresh token flow
- REST API architecture
- Centralized error handling
- TanStack Query server state management
- Redux Toolkit global state management
- Optimistic UI updates
- Query cache invalidation
- Reusable custom hooks
- Protected routes
- Type-safe development with TypeScript
- Responsive design
- Component-based architecture

---

# Application Architecture

```
                    React Application
                 TypeScript + Vite
                          |
                          |
            TanStack Query + Redux Toolkit
                          |
                          |
                    Custom API Client
              JWT + Refresh Token Handling
                          |
                          |
                    REST API Requests
                          |
                          |
                    Express.js API
                          |
        -------------------------------------
        Authentication | Users | Products
        Cart | Wishlist | Orders
        -------------------------------------
                          |
                          |
              JSON File-based Storage

              users.json
              products.json
              cart.json
              wishlist.json
              orders.json
```

The project uses JSON file storage for demonstration purposes.

A production application would typically use a database solution such as PostgreSQL, MongoDB, or MySQL.

---

# Project Structure

```
nova/

├── frontend/
│
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── utils/
│   └── config/
│
└── backend/

    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── utils/
    ├── data/
    └── app.js
```

---

# API Endpoints

## Authentication

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/resetPassword
```

## Users

```
GET /api/users/me
GET /api/users/me/cart
GET /api/users/me/wishlist
```

## Orders

```
GET /api/order/:orderId
```

---

# Environment Variables

## Frontend

Create a `.env` file:

```env
VITE_BACKEND_API=http://localhost:8000/api/
VITE_PRODUCTS_API=https://dummyjson.com/products
```

## Backend

Create a `.env` file:

```env
PORT=8000
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/tekla-7/nova.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

# Testing

Run tests:

```bash
npm test
```

Generate coverage report:

```bash
npm run coverage
```

---

# Author

Tekla
