#!/bin/bash

# Define variables
APP_NAME="Udacity project 4"
DEPLOY_DIR="starter/backend"

# Print start message
echo "Starting deployment of $APP_NAME..."

# Navigate to the deployment directory
# cd $DEPLOY_DIR

# Install dependencies
echo "Installing dependencies..."
npm update --save
npm audit fix

# For the first time, create an application in your org in Serverless portal
serverless

# Next time, deploy the app and note the endpoint url in the end
# serverless deploy --verbose

# If you face a permissions error, you may need to specify the user profile
# sls deploy -v --aws-profile serverless


# Print end message
echo "Deployment of $APP_NAME completed successfully!"