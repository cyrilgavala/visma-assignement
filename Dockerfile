# Use a lightweight Node image as a base
FROM node:18-alpine
# Set the working directory in the container
WORKDIR /app
# Copy the package.json to the working directory
COPY package.json .
# Install dependencies
RUN npm install
# Copy the rest of the application
COPY . .
# Build the application
RUN npm run build
# Start the application
CMD [ "npm", "run", "preview" ]