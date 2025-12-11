#!/bin/bash

# Start the Digdir Leaderboard Server

echo "🚀 Starting Digdir Leaderboard Server..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🔍 Checking if port 3000 is in use..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 3000 is in use. Trying to free it..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

echo "✅ Starting server on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

PORT=3000 node server.js

