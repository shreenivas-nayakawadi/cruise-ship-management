# Cruise Ship Management System

## Overview

This project is a comprehensive Cruise Ship Management System that allows different user roles (Admin, Manager, Head Cook, Supervisor, and Voyager) to manage various aspects of a cruise ship's operations. The system includes features for managing food items, movies, spa services, activities, events, and gift shop products, as well as handling bookings and orders.

## Features

### Admin Features
- Manage food items (add, update, delete)
- Manage movies (add, update, delete)
- Manage spa services (add, update, delete)
- Manage activities (add, update, delete)
- Manage events (add, update, delete)
- Manage gift shop products (add, update, delete)

### Manager Features
- View and manage all bookings (movies, spa, activities, events)
- Update booking statuses

### Head Cook Features
- View and manage food orders
- Update order statuses (e.g., preparing, delivered)

### Supervisor Features
- View and manage gift shop orders
- Update order statuses (e.g., processing, shipped)

### Voyager (Guest) Features
- Place food orders
- Place gift shop orders
- Book movie tickets
- Book spa appointments
- Book activities
- Book entertainment events
- View personal bookings and orders

## Technologies Used

- **Frontend**: React.js
- **Backend**: Firebase (Authentication, Firestore Database)
- **State Management**: React Context API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shreenivas-nayakawadi/cruise-ship-management.git
   cd cruise-ship-management
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   * Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   * Enable Authentication (Email/Password)
   * Set up Firestore Database
   * Create a `firebase/config.js` file with your Firebase configuration:

     ```javascript
     import { initializeApp } from "firebase/app";
     import { getAuth } from "firebase/auth";
     import { getFirestore } from "firebase/firestore";
     import { getStorage } from "firebase/storage";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     export const storage = getStorage(app);
     ```

4. Start the development server:

   ```bash
   npm start
   ```

## Context Structure

The application uses several context providers to manage state and functionality:

* **AuthContext**: Handles user authentication and role management
* **AdminContext**: Provides admin-specific functionality for managing all services
* **ManagerContext**: Provides manager-specific functionality for managing bookings
* **HeadCookContext**: Provides head cook-specific functionality for managing food orders
* **SupervisorContext**: Provides supervisor-specific functionality for managing gift orders
* **VoyagerContext**: Provides guest-specific functionality for making bookings and orders

## Usage

1. **Register/Login**: Users can register with an email and password, specifying their role (admin, manager, head cook, supervisor, or voyager).

2. **Role-Based Access**:

   * Admins can access all management features
   * Managers can view and update bookings
   * Head Cooks can view and update food orders
   * Supervisors can view and update gift orders
   * Voyagers can make bookings and orders

3. **Making Bookings/Orders**:

   * Voyagers can book services through their dashboard
   * All actions are reflected in real-time across the system

## Database Collections

The system uses the following Firestore collections:

* `users` – Stores user information and roles
* `foodItems` – Stores menu items
* `movies` – Stores movie information
* `spaServices` – Stores spa services
* `activities` – Stores cruise activities
* `events` – Stores entertainment events
* `giftProducts` – Stores gift shop products
* `foodOrders` – Stores food orders
* `giftOrders` – Stores gift shop orders
* `movieBookings` – Stores movie bookings
* `spaBookings` – Stores spa bookings
* `activityBookings` – Stores activity bookings
* `entertainmentBookings` – Stores event bookings
