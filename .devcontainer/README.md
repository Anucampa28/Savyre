# 🚀 Savyre Assessment Environment

This devcontainer provides a complete development environment for Savyre coding assessments with all necessary tools pre-configured.

## ✨ Features

- **Python 3.12** with FastAPI backend
- **Node.js 18** with React frontend
- **Pre-installed extensions** for Python, TypeScript, and web development
- **GitHub integration** with GitHub CLI and Copilot
- **Code quality tools** (Black, Flake8, Prettier, ESLint)
- **Port forwarding** for frontend (3000) and backend (8001)

## 🎯 Getting Started

1. **Click "Start Assessment"** button on any assessment tab
2. **GitHub Codespace** will open in a new tab
3. **Wait for environment** to build (usually 2-3 minutes)
4. **Start coding** in the fully configured IDE!

## 🛠️ Available Commands

```bash
# Start both frontend and backend
npm run dev:full

# Start only frontend
npm run frontend

# Start only backend
npm run backend

# Install dependencies
npm run install:frontend
npm run install:backend
```

## 📁 Project Structure

```
├── frontend/          # React + TypeScript frontend
├── backend/           # FastAPI + Python backend
├── .devcontainer/     # Development environment config
└── README.md         # Project documentation
```

## 🔧 Assessment Types

- **Leadership Assessments** - Team management scenarios
- **Technical Assessments** - Coding challenges
- **Soft Skills Assessments** - Communication exercises
- **Industry Assessments** - Domain-specific problems

## 🚀 Ready to Code!

Your assessment environment is now ready with:
- ✅ Full-stack development setup
- ✅ Code quality tools
- ✅ GitHub integration
- ✅ Pre-configured extensions
- ✅ Hot reload development

Happy coding! 🎉
