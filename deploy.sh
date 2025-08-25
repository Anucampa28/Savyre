#!/bin/bash

# 🚀 Laksham Assessment Portal - Deployment Script

echo "🚀 Starting deployment of Laksham Assessment Portal..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Project files found. Starting deployment process..."

# Option 1: Deploy to Netlify (if netlify CLI is installed)
if command -v netlify &> /dev/null; then
    echo "🌐 Netlify CLI found. Deploying to Netlify..."
    netlify deploy --prod --dir=.
    echo "✅ Netlify deployment completed!"
    exit 0
fi

# Option 2: Deploy to Vercel (if vercel CLI is installed)
if command -v vercel &> /dev/null; then
    echo "🚀 Vercel CLI found. Deploying to Vercel..."
    vercel --prod
    echo "✅ Vercel deployment completed!"
    exit 0
fi

# Option 3: GitHub Pages deployment
echo "📚 Setting up GitHub Pages deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Laksham Assessment Portal"
    echo "✅ Git repository initialized."
    echo ""
    echo "📝 Next steps:"
    echo "1. Create a GitHub repository named 'laksham-assessment-portal'"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/laksham-assessment-portal.git"
    echo "3. Run: git push -u origin main"
    echo "4. Enable GitHub Pages in repository settings"
else
    echo "✅ Git repository already exists."
    echo "📝 To deploy to GitHub Pages:"
    echo "1. Push your changes: git push origin main"
    echo "2. Enable GitHub Pages in repository settings"
fi

echo ""
echo "🌐 Alternative deployment options:"
echo "1. Netlify: Drag and drop your project folder to netlify.com"
echo "2. Vercel: Install with 'npm i -g vercel' then run 'vercel'"
echo "3. AWS S3: Upload files to S3 bucket and enable static hosting"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions."
echo ""
echo "🎉 Deployment setup completed!"
