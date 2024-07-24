FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy the application
COPY . .

# clean the node modules
# RUN rm -rf node_modules
# Install app dependencies
RUN npm install

# build the app
RUN npm run build

# setup the database
RUN npm run db:setup

# run the application
CMD [ "npm", "start" ]

# Expose the port the app runs on
EXPOSE 3000