#!/bin/bash

# Build the React application
echo "Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    echo ""
    echo "To deploy to GitHub Pages, run:"
    echo "npm run deploy"
    echo ""
    echo "The built files are in the 'build' directory."
    echo "You can serve them locally by running:"
    echo "npx serve -s build"
else
    echo "Build failed. Please check the errors above."
    exit 1
fi