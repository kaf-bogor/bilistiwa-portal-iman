#!/bin/bash

# Firebase Deployment Script for Bilistiwa Portal Iman

echo "🚀 Starting Firebase deployment process..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file based on .env.example and add your Firebase configuration."
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to Firebase
echo "🔥 Deploying to Firebase..."
firebase deploy

if [ $? -eq 0 ]; then
    echo "🎉 Deployment completed successfully!"
    echo "Your app is now live on Firebase Hosting!"
else
    echo "❌ Deployment failed! Please check the errors above."
    exit 1
fi
