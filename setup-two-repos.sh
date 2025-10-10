#!/bin/bash

# 🚀 Two-Repository Setup Script
# This script helps you setup frontend and backend as separate repositories

echo "🚀 Indian Creative Star - Two Repository Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current directory
CURRENT_DIR=$(pwd)
BACKEND_DIR="$CURRENT_DIR/backend"

# Step 1: Frontend Repository
echo -e "${BLUE}📦 Step 1: Setup Frontend Repository${NC}"
echo "Current directory: $CURRENT_DIR"
echo ""

read -p "Enter your GitHub username: " GITHUB_USERNAME
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add and commit frontend
echo "Adding frontend files to git..."
git add .
git status

echo ""
read -p "Commit message (default: '🚀 Frontend ready'): " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"🚀 Frontend ready - Optimized images + webhooks"}

git commit -m "$COMMIT_MSG"

echo ""
echo -e "${GREEN}✅ Frontend committed!${NC}"
echo ""
echo "To push to GitHub, run:"
echo -e "${YELLOW}git remote add origin https://github.com/$GITHUB_USERNAME/indiancreativestar.git${NC}"
echo -e "${YELLOW}git branch -M main${NC}"
echo -e "${YELLOW}git push -u origin main${NC}"
echo ""

# Step 2: Backend Repository
echo -e "${BLUE}📦 Step 2: Setup Backend Repository${NC}"
echo ""

if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "❌ Backend directory not found at: $BACKEND_DIR"
    exit 1
fi

read -p "Setup backend as separate repository? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$BACKEND_DIR"
    
    # Initialize backend git
    if [ ! -d ".git" ]; then
        echo "Initializing backend git repository..."
        git init
    fi
    
    # Add and commit backend
    echo "Adding backend files to git..."
    git add .
    git status
    
    echo ""
    read -p "Commit message (default: '🚀 Backend ready'): " BACKEND_COMMIT_MSG
    BACKEND_COMMIT_MSG=${BACKEND_COMMIT_MSG:-"🚀 Backend ready - Cashfree production + security"}
    
    git commit -m "$BACKEND_COMMIT_MSG"
    
    echo ""
    echo -e "${GREEN}✅ Backend committed!${NC}"
    echo ""
    echo "To push backend to GitHub, run:"
    echo -e "${YELLOW}cd $BACKEND_DIR${NC}"
    echo -e "${YELLOW}git remote add origin https://github.com/$GITHUB_USERNAME/indiancreativestar-backend.git${NC}"
    echo -e "${YELLOW}git branch -M main${NC}"
    echo -e "${YELLOW}git push -u origin main${NC}"
    
    # Go back to frontend directory
    cd "$CURRENT_DIR"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Create two repositories on GitHub:"
echo "   - indiancreativestar (frontend)"
echo "   - indiancreativestar-backend (backend)"
echo ""
echo "2. Push frontend:"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/indiancreativestar.git"
echo "   git push -u origin main"
echo ""
echo "3. Push backend:"
echo "   cd backend"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/indiancreativestar-backend.git"
echo "   git push -u origin main"
echo ""
echo "4. Deploy on Vercel:"
echo "   - Deploy backend first (add environment variables)"
echo "   - Copy backend URL"
echo "   - Update frontend with backend URL"
echo "   - Deploy frontend"
echo ""
echo "📚 See TWO_REPO_DEPLOYMENT_GUIDE.md for full instructions"
echo ""
