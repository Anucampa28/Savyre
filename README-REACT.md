# Savyre Assessment Portal - React Frontend

A modern, responsive assessment portal built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive platform for real-life on-job skill assessments and professional development.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Python 3.12+
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/savyre/assessment-portal.git
   cd assessment-portal
   ```

2. **Install frontend dependencies**
   ```bash
   npm run install:frontend
   ```

3. **Install backend dependencies**
   ```bash
   npm run install:backend
   ```

4. **Start the development servers**
   ```bash
   npm run dev:full
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

## ✨ Features

- **Modern React Architecture** - Built with React 18, TypeScript, and modern hooks
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Assessments** - Dynamic content switching between skill categories
- **User Authentication** - JWT-based login system with demo accounts
- **Real-time Updates** - Live data updates and progress tracking
- **Industry-Specific Solutions** - Tailored assessments for different professional domains
- **Comprehensive Dashboard** - User statistics, assessment history, and analytics
- **Contact & Support** - Integrated contact forms and company information

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.3.x** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible UI components

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Alembic** - Database migration tool
- **JWT Authentication** - Secure user authentication

### Development Tools
- **Create React App** - React development environment
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code quality and consistency
- **Concurrently** - Run multiple commands simultaneously

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx     # Navigation component
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Landing page
│   │   ├── Login.tsx      # Authentication
│   │   ├── Dashboard.tsx  # User dashboard
│   │   └── Demo.tsx       # Assessment demos
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # App entry point
│   └── index.css          # Global styles & Tailwind
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration

backend/
├── app/                    # FastAPI application
├── alembic/               # Database migrations
├── requirements.txt        # Python dependencies
└── run.sh                 # Backend startup script
```

## 🎯 Key Components

### Home Page (`/`)
- **Hero Section** - Compelling introduction with call-to-action
- **Features** - Why choose Savyre platform
- **Assessment Categories** - Interactive tabs for different skill types
- **Industries** - Industry-specific solutions
- **Pricing Plans** - Flexible subscription options
- **Contact Form** - Get in touch with the team

### Login Page (`/login`)
- **Authentication Forms** - Sign in and sign up
- **Demo Account** - Try the platform with sample credentials
- **Form Validation** - Input validation and error handling
- **Responsive Design** - Works on all device sizes

### Dashboard (`/dashboard`)
- **User Overview** - Welcome message and quick stats
- **Assessment History** - Track completed assessments
- **Performance Metrics** - Success rates and completion times
- **Search & Filter** - Find specific assessments
- **Quick Actions** - Start new assessments

### Demo Page (`/demo`)
- **Assessment Showcase** - Preview available assessments
- **Interactive Elements** - Sample questions and scenarios
- **Start Assessment** - Begin demo assessments
- **Progress Tracking** - Monitor assessment completion

## 🚀 Development Commands

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Backend Development
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### Full-Stack Development
```bash
npm run dev:full   # Start both frontend and backend
npm run frontend   # Start only frontend
npm run backend    # Start only backend
```

## 🔌 API Endpoints

The backend provides RESTful API endpoints for:

- **Authentication**: `/auth/login`, `/auth/signup`, `/auth/verify`
- **Users**: `/users/me`, `/users/profile`
- **Assessments**: `/assessments/`, `/assessments/{id}`
- **Results**: `/results/`, `/results/{id}`
- **Analytics**: `/analytics/performance`, `/analytics/progress`

## 🎨 Customization

### Colors & Theme
The application uses a custom color scheme defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
  },
  secondary: {
    50: '#ecfdf5',
    500: '#10b981',
    600: '#059669',
  },
  accent: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  }
}
```

### Component Classes
Custom utility classes are defined in `src/index.css`:

```css
@layer components {
  .btn-primary { /* Primary button styles */ }
  .btn-secondary { /* Secondary button styles */ }
  .card { /* Card component styles */ }
  .input-field { /* Input field styles */ }
}
```

## 🚀 Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

The build output will be in the `build/` directory, ready for deployment to any static hosting service.

### Backend Deployment
The FastAPI backend can be deployed using:
- **Docker**: Use the provided `docker-compose.yml`
- **Cloud Platforms**: Deploy to Heroku, AWS, or Google Cloud
- **VPS**: Traditional server deployment with uvicorn

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Server-side validation of all inputs
- **CORS Protection** - Configured for production environments
- **Environment Variables** - Secure configuration management
- **HTTPS Ready** - SSL/TLS support for production

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Optimized for small screens and touch interfaces
- **Tablet**: Responsive layouts for medium-sized devices
- **Desktop**: Full-featured experience on large screens
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test           # Run all tests
npm run test:watch # Watch mode for development
npm run test:coverage # Generate coverage report
```

### Backend Testing
```bash
cd backend
source .venv/bin/activate
pytest             # Run all tests
pytest --cov       # With coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and feature requests on GitHub
- **Email**: hello@savyre.com
- **Phone**: +1 (555) 123-4567

---

**Built with ❤️ by the Savyre Team**

Transform your assessment experience with real-world workplace simulations and comprehensive skill evaluation.
