FROM node:22-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json /app
COPY tsconfig.json /app
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
RUN npm start