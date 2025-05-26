# Cruise Ship Management System
live at: https://cruise-ship-management-ca45e.web.app/
A comprehensive web-based management system for cruise ships that handles various aspects of cruise operations including entertainment, activities, spa services, movies, food, and more. The system caters to different user roles including Admin, Manager, Supervisor, Head Cook, and Voyagers (passengers).

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Routes & Navigation](#routes--navigation)
5. [Installation & Setup](#installation--setup)
6. [User Roles & Permissions](#user-roles--permissions)
7. [Screenshots](#screenshots)
8. [Development Guidelines](#development-guidelines)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

## Features

### Core Features
- Multi-role user authentication system
- Real-time updates using Firebase
- Responsive dashboard for each user role
- Booking management system
- Service management system
- Interactive UI with modern design

## Screenshots

### Landing Page
![Landing Page](./screenshots/landingpage.png)

### Admin Dashboard
![Admin Dashboard](./screenshots/admindashboard.png)

#### Admin Features
- Food Management
  ![Food Management](./screenshots/adminfood.png)
- Product Management
  ![Product Management](./screenshots/adminproduct.png)
- Movies Management
  ![Movies Management](./screenshots/adminmovies.png)
- Spa Services Management
  ![Spa Management](./screenshots/adminspa.png)
- Activities Management
  ![Activities Management](./screenshots/adminactivities.png)
- Entertainment Management
  ![Entertainment Management](./screenshots/adminentertainment.png)

### Manager Dashboard
![Manager Dashboard](./screenshots/managerdashboard.png)

#### Manager Features
- Entertainment Management
  ![Entertainment Management](./screenshots/managerentertainment.png)
- Activities Management
  ![Activities Management](./screenshots/manageractivities.png)
- Spa Services Management
  ![Spa Management](./screenshots/managerspa.png)
- Movies Management
  ![Movies Management](./screenshots/managermovies.png)

### Supervisor Dashboard
![Supervisor Dashboard](./screenshots/supervisordashboard.png)

### Head Cook Dashboard
![Head Cook Dashboard](./screenshots/headcookdashboard.png)

### Voyager (Passenger) Features

#### Dashboard and Services
![Voyager Dashboard](./screenshots/voyagerdashboard.png)

- Food Services
  ![Food Services](./screenshots/voyagerfood.png)
- Product Shopping
  ![Product Shopping](./screenshots/voyagerproduct.png)
- Movie Booking
  ![Movies](./screenshots/voyagermovies.png)
  ![Movie Booking](./screenshots/voyagermoviebooking.png)
- Spa Services
  ![Spa Services](./screenshots/voyagerspa.png)
  ![Spa Booking](./screenshots/voyagerspabooking.png)
- Activities
  ![Activities](./screenshots/voyageractivity.png)
  ![Activity Booking](./screenshots/voyageractivitybooking.png)
- Entertainment
  ![Entertainment](./screenshots/voyagerentertainment.png)
  ![Entertainment Booking](./screenshots/voyagerentertainmentbooking.png)

## Technology Stack

### Frontend
- React.js 18.2.0
- Vite 4.4.5 (Build tool)
- React Router DOM for routing
- Context API for state management
- Material-UI/Tailwind CSS for styling
- Axios for API requests

### Backend & Services
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- Firebase Hosting

### Development Tools
- ESLint for code linting
- Git for version control
- npm for package management

## Project Structure

```plaintext
cruise-ship-management/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication related components
│   │   ├── common/         # Shared components
│   │   ├── voyager/        # Voyager-specific components
│   │   ├── manager/        # Manager-specific components
│   │   ├── supervisor/     # Supervisor-specific components
│   │   ├── headCook/       # Head Cook-specific components
│   │   └── admin/         # Admin-specific components
│   ├── context/           # React Context providers
│   ├── firebase/          # Firebase configuration and utilities
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ManagerDashboard.jsx
│   │   ├── SupervisorDashboard.jsx
│   │   ├── HeadCookDashboard.jsx
│   │   └── VoyagerDashboard.jsx
│   ├── assets/           # Static assets
│   ├── App.jsx          # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Public assets
├── screenshots/        # Application screenshots
├── vite.config.js     # Vite configuration
├── package.json       # Project dependencies
├── eslint.config.js   # ESLint configuration
└── README.md         # Project documentation
```

## Routes & Navigation

### Public Routes
- `/` - Landing Page
- `/login` - User Login
- `/register` - User Registration

### Protected Routes

#### Admin Routes
- `/admin/dashboard` - Admin Dashboard
- `/admin/food` - Food Management
- `/admin/products` - Product Management
- `/admin/movies` - Movie Management
- `/admin/spa` - Spa Services Management
- `/admin/activities` - Activities Management
- `/admin/entertainment` - Entertainment Management

#### Manager Routes
- `/manager/dashboard` - Manager Dashboard
- `/manager/entertainment` - Entertainment Management
- `/manager/activities` - Activities Management
- `/manager/spa` - Spa Management
- `/manager/movies` - Movie Management

#### Supervisor Routes
- `/supervisor/dashboard` - Supervisor Dashboard
- `/supervisor/staff` - Staff Management
- `/supervisor/reports` - Reports and Analytics

#### Head Cook Routes
- `/headcook/dashboard` - Head Cook Dashboard
- `/headcook/menu` - Menu Management
- `/headcook/inventory` - Kitchen Inventory

#### Voyager Routes
- `/voyager/dashboard` - Voyager Dashboard
- `/voyager/food` - Food Services
- `/voyager/products` - Product Shopping
- `/voyager/movies` - Movie Booking
- `/voyager/spa` - Spa Services
- `/voyager/activities` - Activities
- `/voyager/entertainment` - Entertainment

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account and project

### Installation Steps

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
- Create a `.env` file in the root directory
- Add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## User Roles & Permissions

### Admin
- Full system access
- User management
- Service configuration
- System monitoring

### Manager
- Service management
- Staff supervision
- Schedule management

### Supervisor
- Staff oversight
- Service quality control
- Customer service

### Head Cook
- Kitchen management
- Menu control
- Inventory management

### Voyager
- Service booking
- Entertainment access
- Food ordering
- Shopping access

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### State Management
- Use Context API for global state
- Implement local state with useState
- Use useReducer for complex state logic
- Maintain clean state update patterns

### Firebase Integration
- Use custom hooks for Firebase operations
- Implement proper security rules
- Handle real-time updates efficiently
- Maintain data consistency

### Performance Optimization
- Implement lazy loading for routes
- Use React.memo for expensive components
- Optimize Firebase queries
- Implement proper caching strategies

## Testing

### Unit Testing
```bash
npm run test
```

### E2E Testing
```bash
npm run test:e2e
```

## Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Firebase Deployment
```bash
npm run deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Write clean, maintainable code
- Follow the existing code style
- Add appropriate comments
- Update documentation as needed
- Test your changes thoroughly

## License

[Your License] - See LICENSE file for details

## Contact

Your Name - [your-email@example.com]

Project Link: [https://github.com/yourusername/cruise-ship-management]

## Acknowledgments

- React.js team
- Firebase team
- All contributors
