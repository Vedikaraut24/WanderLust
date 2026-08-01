# 🌍 WanderLust – Airbnb Inspired Property Rental Platform

WanderLust is a full-stack web application inspired by Airbnb that allows users to explore unique travel destinations, create and manage property listings, upload images, and share experiences through reviews. The platform includes secure authentication, authorization, cloud-based image storage, and an interactive map for property locations.

---
🚀 Live Demo

🌐 Live Website: Coming Soon

📂 **GitHub Repository:** https://github.com/Vedikaraut24/WanderLust

---

# 📌 Project Overview

WanderLust is a modern property rental platform where users can:

* Browse vacation rentals from different locations.
* Create and manage their own property listings.
* Upload listing images using Cloudinary.
* Leave ratings and reviews on properties.
* View property locations on an interactive map.
* Securely sign up, log in, and manage their account.

The project follows the **MVC (Model–View–Controller)** architecture and demonstrates real-world backend development using **Node.js**, **Express.js**, and **MongoDB Atlas**.

---

# ✨ Features

## 🔐 User Authentication

The application uses **Passport.js** for secure user authentication.

### Authentication Features

* User Registration
* Secure Login
* Logout
* Password hashing using Passport Local Mongoose
* Persistent login sessions
* Session storage using MongoDB Atlas

---

## 🏡 Property Listings

Users can browse and manage travel properties.

### Listing Features

* View all listings
* Create new listings
* View detailed listing information
* Edit existing listings
* Delete owned listings

Each listing contains:

* Title
* Description
* Price
* Image
* Location
* Country
* Owner Information

---

## ⭐ Review System

Authenticated users can share their experiences.

Features include:

* Add reviews
* Give star ratings
* View reviews
* Delete own reviews

Each review stores:

* Rating
* Comment
* Author

Reviews are associated with both the listing and the user.

---

## 🛡 Authorization

Authorization middleware protects application resources.

### Listing Protection

Only the listing owner can:

* Edit listings
* Delete listings

### Review Protection

Only the review author can:

* Delete their review

Unauthorized users cannot modify other users' data.

---

## 🖼 Cloud Image Upload

Property images are uploaded using:

* Multer
* Cloudinary
* Multer Storage Cloudinary

Images are securely stored in the cloud instead of the local server.

---

## 🗺 Interactive Maps

Listing locations are displayed using:

* Mapbox API
* Leaflet.js

Users can easily view the exact location of each property.

---

## 💬 Flash Messages

The application displays user-friendly notifications for:

* Successful login
* Successful signup
* Listing creation
* Listing update
* Listing deletion
* Review creation
* Authentication errors
* Authorization errors

---

## ⚠ Error Handling

A centralized error handling mechanism improves application reliability.

Implemented using:

* Custom `ExpressError` class
* `wrapAsync` utility
* Express error-handling middleware

---

# 🏗 Project Architecture

The project follows the **MVC (Model–View–Controller)** architecture.

## Models

Located in:

```
models/
```

Models used:

* User
* Listing
* Review

---

## Controllers

Located in:

```
controllers/
```

Controllers manage business logic for:

* Listings
* Reviews
* Authentication

---

## Routes

Located in:

```
routes/
```

Routes include:

* Listing Routes
* Review Routes
* User Routes

---

## Views

Frontend is built using:

* EJS
* EJS-Mate

Pages include:

* Home
* Listings
* Listing Details
* Login
* Signup
* Edit Listing

---

# 🛠 Tech Stack

## Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS
* EJS Mate

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB Atlas
* Mongoose

---

## Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose

---

## Image Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

---

## Maps

* Mapbox API
* Leaflet.js

---

## Other Libraries

* Joi
* dotenv
* express-session
* connect-mongo
* connect-flash
* method-override

---

# 🔐 Authentication & Authorization

### Authentication

Users can:

* Register
* Login
* Logout

Passwords are securely hashed before storage.

---

### Authorization

Protected operations include:

#### Listings

Only owners can:

* Edit
* Delete

#### Reviews

Only authors can:

* Delete reviews

---

# 📂 Project Structure

```
WanderLust
│
├── cloudConfig.js
├── controllers
├── init
├── middleware.js
├── models
├── public
│   ├── css
│   ├── js
│
├── routes
├── utils
├── views
│   ├── includes
│   ├── layouts
│   ├── listings
│   └── users
│
├── app.js
├── schema.js
├── package.json
└── README.md
```

---

# ⚙ Environment Variables

Create a `.env` file.

```env
ATLASDB_URL=

SECRET=

CLOUD_NAME=

CLOUD_API_KEY=

CLOUD_API_SECRET=

MAP_TOKEN=
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/Vedikaraut24/WanderLust.git
```

Move into the project directory

```bash
cd WanderLust
```

Install dependencies

```bash
npm install
```

Run the application

```bash
nodemon app.js
```

Open your browser

```
http://localhost:8080/listings
```

---

# 🚀 Future Enhancements

* ❤️ Wishlist / Favorites
* 📅 Booking System
* 💳 Online Payment Integration
* 📱 Fully Responsive Mobile Design
* 🔎 Advanced Search & Filters
* 🌍 Multi-language Support
* 📍 Nearby Places Recommendations
* 📧 Email Notifications

---

# 📚 Learning Outcomes

This project helped me understand:

* Full Stack Web Development
* MVC Architecture
* RESTful Routing
* CRUD Operations
* Authentication with Passport.js
* Authorization Middleware
* Session Management
* MongoDB Relationships
* Cloudinary Image Upload
* Mapbox & Leaflet Integration
* Error Handling
* Deployment on Render

---

# 👩‍💻 Author

**Vedika Krupasagar Raut**

* 🎓 B.Tech CSE Student
* 📍 Prof. Ram Meghe Institute of Technology & Research
* 💻 MERN Stack Developer

**GitHub:** https://github.com/Vedikaraut24

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub. Your support is greatly appreciated!

