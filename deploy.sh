#!/bin/bash

# Build and deploy the React application to GitHub Pages
echo "Building and deploying the application..."
echo ""

# Build the application
echo "Step 1: Building..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""

    # Deploy to GitHub Pages
    echo "Step 2: Deploying to GitHub Pages..."
    npm run deploy

    if [ $? -eq 0 ]; then
        echo "✅ Deployment completed successfully!"
        echo ""
        echo "🌐 Your site should be live at: https://cinqueforcongress.com"
        echo "📝 Note: GitHub Pages may take a few minutes to update"
    else
        echo "❌ Deployment failed. Please check the errors above."
        exit 1
    fi
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi