# Use a Node.js base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
RUN npm install -g serve

# Copy all files from the current directory to the working directory in the container
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port the app runs on
EXPOSE 8081

# Command to run the app
CMD ["serve", "-s", "dist","-l","8081"]
