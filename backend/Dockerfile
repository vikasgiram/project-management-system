# Use the official Node.js image
FROM node:22.11.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock from the root directory
COPY ../package*.json ./

# Install dependencies
RUN yarn install

# Copy backend code from the backend directory
COPY ./backend ./

# Expose the port the backend uses
EXPOSE 5000

# Start the backend application
CMD ["node", "server.js"]
