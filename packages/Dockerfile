FROM node:22-alpine AS build

# Create app directory
RUN mkdir -p /packages
WORKDIR /packages

# Install app dependencies
COPY package*.json /packages
COPY tsconfig.json /packages
RUN npm install

# Bundle app source
COPY . .

CMD ["tsc", "-b"]

# Run this command to build the image
# docker build -t packages .