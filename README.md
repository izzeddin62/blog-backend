# Blog backend

## Project description
This project is a backend application for managing a blog creation. It is built using TypeScript, Express.js, PostgreSQL, and Drizzle ORM. The application allows users to create an account, login, view a list of blogs already, add new blog post, update their existing blog post, and delete blog postt. Authentication is implemented using tokens, which need to be included in the request headers for protected routes.

## tools used
- TypeScript
- Express.js
- PostgreSQL
- Drizzle ORM
- Docker
- Docker-compose

## CI/CD

The project utilizes GitHub Actions to create a CI/CD pipeline. The pipeline consists of the following steps:

1. Linting: The code is first linted to ensure adherence to coding standards and best practices.
2. Testing: The tests are executed to verify the functionality and correctness of the code.
3. Building: The code is then built to generate the necessary artifacts.
4. Docker Image Creation: The built artifacts are used to create a Docker image.
5. Docker Image Push: The Docker image is pushed to Docker Hub for easy deployment and distribution.


## Project Setup
1. Clone the repository: `git clone https://github.com/izzeddin62/blog-backend.git`
2. Navigate into the project directory: `cd blog-backend`
3. Create a new .env file and copy the contents of .env.example into it.
3. Install the dependencies: `npm install`

## Database Setup
1. Install PostgreSQL.
2. Create a new database: `createdb <database-name>`
3. Update .env with the new database configurations.
4. Generate migration: `npm run db:generate`
5. Run migration: `npm run db:migrate`

## project setup with Docker
1. clone the repository
2. run `docker-compose up --build` to build the image and run the container
3. You will get the server running at `http://localhost:3000`

## Endpoints

## Post /api/auth/signup
Create a new user account. The body of the request should following details:
- email
- password

it returns a token that you can use to authenticate future requests.

## Post /api/auth/login
Login to the application. The body of the request should include the following details:
- email
- password

it returns a token that you can use to authenticate future requests.

### GET /api/blogs

Returns a list of all blogs. This is not a protected route, so you don't need to include the token in the request headers.


### POST /api/blogs

Creates a new blog. The body of the request should include the blog details. This is a protected route, so you need to include the token in the request headers.

You will need to include the following details in the body of the request:
- title(text)
- content(text)



### PATCH /api/blogs/:id

Updates the blog with the given ID. The body of the request should include the updated blog details. This is a protected route, so you need to include the token in the request headers.

You will need to include the following details in the body of the request:
- title(optional)
- content(optional)

### DELETE /api/blogs/:id

Deletes the blog post with the given ID. This is a protected route, so you need to include the token in the request headers.

# project structure
The project entry point is `src/index.ts`. The project is structured as follows:

- `src/controllers`: This directory contains the controller functions for the application.
- `src/database`: This directory contains the database configuration and migrations.
- `src/middleware`: This directory contains the middleware functions for the application. ex: authentication middleware
- `src/routes`: This directory contains the route definitions for the application.
- `src/services`: This directory contains the service functions for the application.

## Running the Project

1. Start the server: `npm run dev`
2. The server will be running at `http://localhost:3000` (or whatever port you have configured).# Blog backend

