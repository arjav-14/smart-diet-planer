# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Smart Diet Planner

A full-stack web application that helps users plan and track their diet with AI-powered recommendations, food recognition, and community features.

## 🚀 Features

- **User Authentication**
  - Login/Register with role-based access (User/Admin)
  - JWT-based authentication
  - Password change functionality

- **Diet Planning**
  - BMI Calculator with personalized diet suggestions
  - AI-powered meal planning using Cohere API
  - View and manage meal plans

- **Food Recognition**
  - Image-based food detection using Clarifai API
  - Calorie and nutrition tracking using CalorieNinja API
  - Visual nutrition breakdown with charts

- **Community Features**
  - Post and share diet experiences
  - Comment on posts
  - Filter personal posts and replies

- **Interactive Chatbot**
  - AI-powered diet consultation
  - Chat history management
  - Dietary preferences analysis

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router
- TailwindCSS
- Chart.js
- JWT Decode

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads

### APIs
- Clarifai Food Recognition API
- CalorieNinja Nutrition API
- Cohere AI API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install frontend dependencies:
```bash
cd dietplanner
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create `.env` file in backend directory with:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
COHERE_API_KEY=your_cohere_api_key
CLARIFAI_PAT=your_clarifai_pat
CALORIENINJA_API_KEY=your_calorieninja_api_key
PORT=3000
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd dietplanner
npm run dev
```

## 📱 Features Breakdown

### User Management
- User registration with role selection
- Secure login with JWT authentication
- Password change functionality
- Profile settings management

### Diet Planning
- BMI calculation and analysis
- Personalized meal plan generation
- Plan history tracking
- Edit and delete meal plans

### Food Recognition
- Upload food images
- Automatic food detection
- Nutrition analysis
- Calorie tracking
- Historical meal tracking

### Community
- Create and view posts
- Add replies to posts
- Filter personal posts
- Real-time updates

### Chatbot
- AI-powered diet consultation
- Chat history
- Dietary preference analysis
- Real-time responses

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Secure file uploads

## 📄 API Documentation

### Auth Routes
- POST `/api/register` - User registration
- POST `/api/login` - User login
- POST `/api/change-password` - Change password

### Meal Routes
- GET `/api/latest-meal-plan` - Get latest meal plan
- GET `/api/my-meal-plans` - Get all meal plans
- DELETE `/api/delete-meal-plan/:id` - Delete meal plan
- PATCH `/api/update-meal-plan/:id` - Update meal plan

### Food Recognition Routes
- POST `/api/analyze-food` - Analyze food image
- POST `/api/upload` - Upload food image

### Community Routes
- GET `/api/getposts` - Get all posts
- POST `/api/posts` - Create new post
- POST `/api/replies/:postId` - Add reply to post

## 👥 Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details