# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy both package.json files and install dependencies
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install server dependencies
RUN cd server && npm install

# Install client dependencies
RUN cd client && npm install

# Bundle app source inside Docker image
COPY . .

# Build the client app
RUN cd client && npm run build

# Expose port 3000 for the server and 3001 for the client (if needed)
EXPOSE 3000 3001

# Define environment variable
ENV NODE_ENV production

# Run server.js when the container launches
CMD ["node", "server/server.js"]
