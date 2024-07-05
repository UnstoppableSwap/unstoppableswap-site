# Use the official Node.js image as the base
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Build the Vite app
RUN npm run build

# Use a lightweight web server to serve the static files
RUN npm install -g serve

# Expose the specified port
EXPOSE ${PORT}

# Serve
CMD serve -s dist -l tcp://0.0.0.0:$PORT
