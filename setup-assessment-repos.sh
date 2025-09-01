#!/bin/bash

# Setup Assessment Repositories for anucampa28 organization
# This script helps create the initial assessment repository structure

echo "🚀 Setting up Assessment Repositories for anucampa28 organization"
echo "================================================================"

# Organization name
ORG="anucampa28"

# Assessment repositories to create
ASSESSMENTS=(
    "techcorp-frontend-enhancement-2024"
    "innovationlabs-backend-api-2024"
    "bigtech-system-design-2024"
    "codeacademy-algorithms-2024"
)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Assessment Repositories to be created:${NC}"
for assessment in "${ASSESSMENTS[@]}"; do
    echo -e "  • ${GREEN}$ORG/$assessment${NC}"
done

echo ""
echo -e "${YELLOW}⚠️  Before running this script, ensure:${NC}"
echo "  1. You have access to the anucampa28 organization"
echo "  2. You have the necessary permissions to create repositories"
echo "  3. GitHub CLI is installed and authenticated (gh auth login)"
echo ""

read -p "Do you want to proceed? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Setup cancelled${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🔧 Creating Assessment Repositories...${NC}"

# Create each assessment repository
for assessment in "${ASSESSMENTS[@]}"; do
    echo ""
    echo -e "${YELLOW}Creating: $ORG/$assessment${NC}"
    
    # Create repository using GitHub CLI
    if gh repo create "$ORG/$assessment" \
        --public \
        --description "Savyre Assessment: $assessment" \
        --add-readme \
        --clone; then
        
        echo -e "${GREEN}✅ Successfully created $ORG/$assessment${NC}"
        
        # Navigate to the cloned repository
        cd "$assessment"
        
        # Create basic structure
        mkdir -p src/components src/styles src/utils tests .github/workflows
        
        # Create package.json for React projects
        if [[ "$assessment" == *"frontend"* ]]; then
            cat > package.json << EOF
{
  "name": "$assessment",
  "version": "1.0.0",
  "description": "Savyre Assessment: $assessment",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF
        fi
        
        # Create README.md
        cat > README.md << EOF
# $assessment

## Overview
This repository contains the assessment materials for the $assessment challenge.

## Problem Statement
[To be filled with specific assessment requirements]

## Getting Started
1. Clone this repository
2. Install dependencies: \`npm install\`
3. Start development server: \`npm start\`

## Assessment Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Submission
Complete the assessment and submit your solution according to the provided instructions.

## Time Limit
[To be specified]

## Contact
For questions about this assessment, contact the assessment team.
EOF
        
        # Create .github/workflows/assessment.yml
        cat > .github/workflows/assessment.yml << EOF
name: Assessment Check

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Run tests
      run: npm test -- --passWithNoTests
EOF
        
        # Create .gitignore
        cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
EOF
        
        # Commit and push the initial structure
        git add .
        git commit -m "Initial assessment repository setup"
        git push origin main
        
        echo -e "${GREEN}✅ Repository structure created and pushed${NC}"
        
        # Go back to parent directory
        cd ..
        
    else
        echo -e "${RED}❌ Failed to create $ORG/$assessment${NC}"
    fi
done

echo ""
echo -e "${GREEN}🎉 Assessment Repository Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📁 Created Repositories:${NC}"
for assessment in "${ASSESSMENTS[@]}"; do
    echo -e "  • ${GREEN}https://github.com/$ORG/$assessment${NC}"
done

echo ""
echo -e "${YELLOW}🔗 Next Steps:${NC}"
echo "1. Configure GitHub Codespaces for each repository"
echo "2. Add specific assessment content and requirements"
echo "3. Set up assessment evaluation criteria"
echo "4. Test the complete assessment workflow"
echo ""
echo -e "${BLUE}✨ Happy Assessing!${NC}"
