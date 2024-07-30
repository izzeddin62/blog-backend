FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy the application
COPY . .

# Copy the .env file
COPY .env .env

# Install app dependencies
RUN npm install

# build the app
RUN npm run build

RUN chmod +x init.sh wait-for-it.sh


# run the application
CMD [ "npm", "start" ]

# Expose the port the app runs on
EXPOSE 3000