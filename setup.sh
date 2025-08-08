#!/bin/bash

# Playwright Test Environment Setup Script
# This script ensures consistent setup across all environments (local, CI/CD)

set -euo pipefail

echo "🚀 Setting up Playwright test environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    print_warning "nvm not found. Please install nvm first:"
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "Then restart your terminal and run this script again."
    exit 1
fi

# Source nvm to ensure it's available in this script
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if .nvmrc file exists
if [ ! -f ".nvmrc" ]; then
    print_error ".nvmrc file not found in current directory"
    exit 1
fi

NODE_VERSION=$(cat .nvmrc)
print_status "Using Node.js version: $NODE_VERSION"

# Install and use the specified Node.js version
echo "📦 Installing Node.js version $NODE_VERSION..."
nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"

# Verify Node.js version
CURRENT_NODE_VERSION=$(node --version)
print_status "Node.js version: $CURRENT_NODE_VERSION"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found in current directory"
    exit 1
fi

# Install dependencies using npm ci for reproducible builds
echo "📚 Installing dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci
    print_status "Dependencies installed using npm ci (clean install)"
else
    print_warning "package-lock.json not found. Installing with npm install..."
    npm install
    print_status "Dependencies installed with npm install"
fi

# Verify Playwright installation
echo "🎭 Verifying Playwright installation..."
if ! npx playwright --version &> /dev/null; then
    print_error "Playwright installation failed"
    exit 1
fi

PLAYWRIGHT_VERSION=$(npx playwright --version)
print_status "Playwright version: $PLAYWRIGHT_VERSION"

# Install Playwright browsers (this is handled by postinstall script, but let's be explicit)
echo "🌐 Installing Playwright browsers..."
npx playwright install

# Verify browsers are installed
echo "🔍 Verifying browser installations..."
npx playwright install --dry-run

print_status "Setup complete! Environment is ready for testing."
echo ""
echo "Available commands:"
echo "  npm test              - Run all tests"
echo "  npm run test:headed   - Run tests in headed mode"
echo "  npm run test:debug    - Debug tests"
echo "  npm run test:ui       - Open Playwright UI mode"
echo "  npm run show-report   - Show test report"
echo ""
print_status "You can now run 'npm test' to execute your Playwright tests!"