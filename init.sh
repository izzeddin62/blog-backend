#!/bin/sh

echo "Waiting for database to be ready..."
./wait-for-it.sh db:5432 -t 60


echo "Running database migrations..."
npm run db:setup

echo "Starting the application..."
npm start