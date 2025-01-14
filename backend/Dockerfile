FROM node:16-alpine

#set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application code 
COPY . .

# Expose the port the app runs on
EXPOSE 8000

CMD [ "npm", "start" ]