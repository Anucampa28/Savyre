# 🚀 Laksham Assessment Portal - React Version

A modern, professional assessment portal built with **React + TypeScript** frontend and **FastAPI + PostgreSQL** backend. Perfect for GitHub Codespaces and modern development workflows.

## ✨ **What's New in React Version**

### **Frontend Improvements**
- 🎯 **React 18** with TypeScript for type safety
- 🎨 **Tailwind CSS** for modern, responsive design
- 🚀 **React Router** for seamless navigation
- 🔐 **Context API** for state management
- 📱 **Mobile-first responsive design**
- 🎭 **Component-based architecture**

### **Development Experience**
- 🔥 **Hot reloading** for instant feedback
- 🧪 **TypeScript** for better IDE support
- 📦 **Modern build tools** with Create React App
- 🎯 **ESLint & Prettier** ready
- 🐳 **Docker integration** for database
- 📚 **Comprehensive component library**

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │   FastAPI Backend│    │   PostgreSQL   │
│   (Port 3000)   │◄──►│   (Port 8001)   │◄──►│   (Port 5432)  │
│                 │    │                 │    │                 │
│ • TypeScript    │    │ • Python 3.12   │    │ • Docker       │
│ • Tailwind CSS  │    │ • SQLAlchemy    │    │ • Migrations   │
│ • React Router  │    │ • JWT Auth      │    │ • ORM Models   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
# Install frontend dependencies
npm run install:frontend

# Install backend dependencies
npm run install:backend
```

### **2. Start the Database**
```bash
# Start PostgreSQL in Docker
docker-compose up -d db
```

### **3. Run the Application**
```bash
# Option A: Run both frontend and backend
npm run dev:full

# Option B: Run separately
npm run backend    # Terminal 1
npm run frontend   # Terminal 2
```

### **4. Access Your App**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs

## 🎯 **Features**

### **Authentication System**
- ✅ User registration and login
- ✅ JWT token management
- ✅ Email verification (ready for implementation)
- ✅ Demo account: `demo@laksham.com` / `demo123`

### **Assessment Management**
- ✅ Interactive assessment dashboard
- ✅ Real-time progress tracking
- ✅ Search and filtering
- ✅ Responsive card layouts

### **Modern UI/UX**
- ✅ **Tailwind CSS** utility classes
- ✅ **Heroicons** for consistent icons
- ✅ **Responsive design** for all devices
- ✅ **Smooth animations** and transitions
- ✅ **Dark mode ready** (easily implementable)

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible components

### **Backend**
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Python ORM
- **PostgreSQL** - Production database
- **Alembic** - Database migrations
- **JWT** - Authentication tokens

### **Development Tools**
- **Create React App** - React development setup
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Docker** - Containerized database
- **Concurrently** - Run multiple services

## 📁 **Project Structure**

```
laksham-assessment-portal/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Business logic
│   │   └── core/           # Configuration
│   ├── alembic/            # Database migrations
│   └── requirements.txt    # Python dependencies
├── docker-compose.yml      # Database setup
└── package.json            # Root scripts
```

## 🔧 **Development Commands**

### **Frontend Development**
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from CRA (irreversible)
```

### **Backend Development**
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8001
```

### **Database Management**
```bash
# Start database
docker-compose up -d db

# Run migrations
cd backend
alembic upgrade head

# View database
docker exec -it laksham_postgres psql -U laksham -d laksham
```

## 🌐 **API Endpoints**

### **Authentication**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify` - Email verification

### **Assessments**
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/{id}` - Get assessment details

### **Candidates**
- `GET /api/candidates` - List candidates
- `POST /api/candidates` - Create candidate

## 🎨 **Customization**

### **Colors & Theme**
The color scheme is defined in `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#6366f1',    // Main brand color
    600: '#4f46e5',
  },
  secondary: {
    500: '#10b981',    // Success/accent color
  }
}
```

### **Components**
All components are built with Tailwind CSS and can be easily customized:
- **Buttons**: Use `btn-primary`, `btn-secondary` classes
- **Cards**: Use `card` class for consistent styling
- **Forms**: Use `input-field` class for inputs

## 🚀 **Deployment**

### **Frontend (React)**
```bash
cd frontend
npm run build
# Deploy the 'build' folder to:
# - Netlify
# - Vercel
# - AWS S3
# - GitHub Pages
```

### **Backend (FastAPI)**
```bash
cd backend
# Deploy to:
# - Heroku
# - DigitalOcean
# - AWS EC2
# - Google Cloud Run
```

## 🔒 **Security Features**

- ✅ **JWT Authentication** with secure tokens
- ✅ **Password hashing** with bcrypt
- ✅ **CORS protection** for API endpoints
- ✅ **Input validation** with Pydantic
- ✅ **SQL injection protection** with SQLAlchemy

## 📱 **Responsive Design**

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 **Testing**

### **Frontend Testing**
```bash
cd frontend
npm test           # Run test suite
npm run test:coverage  # Coverage report
```

### **Backend Testing**
```bash
cd backend
pytest             # Run Python tests
pytest --cov       # With coverage
```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Port conflicts**: Ensure ports 3000, 8001, and 5432 are available
2. **Database connection**: Check if PostgreSQL container is running
3. **Dependencies**: Run `npm install` in both frontend and root directories
4. **Python environment**: Ensure virtual environment is activated

### **Reset Everything**
```bash
# Stop all services
docker-compose down
pkill -f "uvicorn"
pkill -f "react-scripts"

# Clean install
rm -rf frontend/node_modules
rm -rf backend/.venv
npm run install:frontend
npm run install:backend
```

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with clear messages
6. **Push** to your branch
7. **Submit** a pull request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🎉 **Why React is Better for Codespaces**

- **Hot Reloading**: Instant feedback during development
- **Component Debugging**: Better DevTools integration
- **TypeScript Support**: Enhanced IDE experience
- **Modern Tooling**: ESLint, Prettier, and more
- **Dependency Management**: Clear package.json structure
- **Testing Framework**: Jest and React Testing Library
- **Build Process**: Webpack for optimization
- **Team Collaboration**: Consistent development environment

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

**Ready for GitHub Codespaces and modern development workflows!** 🚀
