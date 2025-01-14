# Use Node.js for building the app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the app and build it
COPY . .
RUN yarn build

# Use Nginx to serve the app
FROM nginx:stable-alpine

# Copy built files to Nginx's default location
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
