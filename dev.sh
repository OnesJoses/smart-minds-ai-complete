#!/bin/bash

# Smart Minds AI - Development Scripts
# Collection of useful development commands

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in the right directory
check_project_root() {
    if [ ! -f "package.json" ] || [ ! -d "src" ]; then
        print_error "This script must be run from the project root directory"
        exit 1
    fi
}

# Setup development environment
setup() {
    print_status "Setting up Smart Minds AI development environment..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm install
    
    # Create .env.local if it doesn't exist
    if [ ! -f ".env.local" ]; then
        print_status "Creating .env.local file..."
        cat > .env.local << EOF
# Smart Minds AI - Local Environment Variables
VITE_APP_NAME="Smart Minds AI"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_EXPERIMENTS=true
EOF
    fi
    
    print_success "Development environment setup complete!"
    print_status "Run 'npm run dev' to start the development server"
}

# Start development server
dev() {
    check_project_root
    print_status "Starting development server..."
    npm run dev
}

# Build for production
build() {
    check_project_root
    print_status "Building for production..."
    
    # Clean previous build
    rm -rf dist
    
    # Type check
    print_status "Running TypeScript type check..."
    npx tsc --noEmit
    
    # Build
    npm run build
    
    print_success "Build completed successfully!"
    print_status "Build files are in the 'dist' directory"
}

# Preview production build
preview() {
    check_project_root
    
    if [ ! -d "dist" ]; then
        print_warning "No build found. Building first..."
        build
    fi
    
    print_status "Starting preview server..."
    npm run preview
}

# Check for errors and issues
check() {
    check_project_root
    print_status "Running project health check..."
    
    # TypeScript check
    print_status "Checking TypeScript..."
    npx tsc --noEmit
    
    # Check for unused dependencies
    print_status "Checking for unused dependencies..."
    if command -v npx &> /dev/null; then
        npx depcheck --ignores="@types/*,vite,typescript"
    else
        print_warning "depcheck not available. Install with: npm install -g depcheck"
    fi
    
    # Build test
    print_status "Testing build..."
    npm run build > /dev/null 2>&1
    
    print_success "All checks passed!"
}

# Clean project
clean() {
    check_project_root
    print_status "Cleaning project..."
    
    # Remove build artifacts
    rm -rf dist
    rm -rf node_modules/.vite
    
    # Remove dependencies and reinstall
    read -p "Do you want to reinstall dependencies? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf node_modules package-lock.json
        npm install
    fi
    
    print_success "Project cleaned!"
}

# Update dependencies
update() {
    check_project_root
    print_status "Updating dependencies..."
    
    # Check for outdated packages
    print_status "Checking for outdated packages..."
    npm outdated
    
    # Update packages
    read -p "Do you want to update all packages? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm update
        print_success "Dependencies updated!"
    else
        print_status "Update cancelled"
    fi
}

# Analyze bundle size
analyze() {
    check_project_root
    print_status "Analyzing bundle size..."
    
    # Build with analysis
    npm run build
    
    # Check if bundle analyzer is available
    if command -v npx &> /dev/null; then
        print_status "Opening bundle analyzer..."
        npx vite-bundle-analyzer dist
    else
        print_warning "Install vite-bundle-analyzer for detailed analysis: npm install -g vite-bundle-analyzer"
    fi
}

# Generate component template
generate_component() {
    if [ -z "$1" ]; then
        print_error "Please provide a component name"
        print_status "Usage: ./dev.sh generate:component ComponentName"
        exit 1
    fi
    
    COMPONENT_NAME=$1
    COMPONENT_DIR="src/components/$COMPONENT_NAME"
    
    if [ -d "$COMPONENT_DIR" ]; then
        print_error "Component $COMPONENT_NAME already exists"
        exit 1
    fi
    
    print_status "Generating component: $COMPONENT_NAME"
    
    # Create component directory
    mkdir -p "$COMPONENT_DIR"
    
    # Create component file
    cat > "$COMPONENT_DIR/$COMPONENT_NAME.tsx" << EOF
/**
 * $COMPONENT_NAME Component
 * Description of what this component does
 */

import { useState } from 'react'
import { Button } from '../ui/button'

interface ${COMPONENT_NAME}Props {
  title?: string
  className?: string
}

export default function $COMPONENT_NAME({ 
  title = 'Default Title',
  className = ''
}: ${COMPONENT_NAME}Props) {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={\`component-container \${className}\`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button 
        onClick={handleToggle}
        variant={isActive ? 'default' : 'outline'}
      >
        {isActive ? 'Active' : 'Inactive'}
      </Button>
    </div>
  )
}
EOF

    # Create index file
    cat > "$COMPONENT_DIR/index.ts" << EOF
export { default } from './$COMPONENT_NAME'
EOF

    print_success "Component $COMPONENT_NAME generated successfully!"
    print_status "Location: $COMPONENT_DIR"
}

# Show help
help() {
    echo "Smart Minds AI - Development Scripts"
    echo ""
    echo "Usage: ./dev.sh <command>"
    echo ""
    echo "Commands:"
    echo "  setup              Setup development environment"
    echo "  dev                Start development server"
    echo "  build              Build for production"
    echo "  preview            Preview production build"
    echo "  check              Run health checks"
    echo "  clean              Clean project and dependencies"
    echo "  update             Update dependencies"
    echo "  analyze            Analyze bundle size"
    echo "  generate:component Create new component"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./dev.sh setup"
    echo "  ./dev.sh dev"
    echo "  ./dev.sh generate:component MyComponent"
}

# Main script logic
case "$1" in
    setup)
        setup
        ;;
    dev)
        dev
        ;;
    build)
        build
        ;;
    preview)
        preview
        ;;
    check)
        check
        ;;
    clean)
        clean
        ;;
    update)
        update
        ;;
    analyze)
        analyze
        ;;
    generate:component)
        generate_component "$2"
        ;;
    help|--help|-h)
        help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac
