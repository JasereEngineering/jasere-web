# Use an existing image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install any dependencies
RUN npm install

EXPOSE 8080

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Specify the command to run when the container starts
CMD ["npm", "start"]

# SET environment variables

# ENV REACT_APP_BASE_URL=https://tfs-prod-gateway-52fyzijn.uc.gateway.dev, REACT_APP_GOOGLE_KEY=AIzaSyAmjKtdfyguikjmlMI7HzOmh8Us