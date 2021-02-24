[![Coverage Status](https://coveralls.io/repos/github/ericus123/TODO_APP/badge.svg?branch=develop)](https://coveralls.io/github/ericus123/TODO_APP?branch=develop) [![Build Status](https://www.travis-ci.com/ericus123/TODO_APP.svg?branch=develop)](https://www.travis-ci.com/ericus123/TODO_APP)

# TODO APP

An app that helps in creation of things todo to oraganise your daily activities

## Documentation

This app's API documentation is done using [swagger](https://swagger.io/)
Documentation can be found [here](https://amani-todo.herokuapp.com/api/api-docs)

## Technologies Used

### Language

- Javascript(Node js)

### Framework

- Express node js framework

### Testing

- [Jest](https://jestjs.io/docs/en/configuration)
- [supertest](https://www.npmjs.com/package/supertest)

### Database

- [Mongo Db atlas](https://www.mongodb.com/) with monoose

### NPM packages

- babel
- express
- and many more

### Password encryption

- [bycryptjs](https://www.npmjs.com/package/bcryptjs)

### Input validation

- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi)

### CI/CD

- [travis](https://travis-ci.org/)
- [coverrals](https://coveralls.io/)

### Deployment/Hosting

### Heroku

    The app is hosted on heroku with two environments(staging & production)

    - Staging [here](https://amani-todo-staging.herokuapp.com/)
    - Production [here](https://amani-todo.herokuapp.com/)

## Scripts

- test: `npm run test` this is for testing the application endpoints
- dev: `npm run dev` this is for starting the development server
- start: `npm run start` this is for starting the app in production mode
- build: `npm run build` this is for building the application for production

## Endpoints

### Authentication

- Signup `api/auth/signup` method `POST`
- Login `api/auth/login` method `POST`

### Todos (CRUD)

- Get todos `api/todos` method `GET`
- Get a todo `api/todos/:id` method `GET`
- Create a todo `api/todos` method `POST`
  > Request body schema
  > {
  > title:"title",
  > description:"description of your todo",
  > priority:"priority of your todo" ex: LOW,MEDIUM,HIGH
  > }
  > `required:true`
- Update a todo `api/todos/:id` method `PATCH`
  > Request body schema
  > {
  > title:"title",
  > description:"description of your todo",
  > priority:"priority of your todo" ex: LOW,MEDIUM,HIGH
  > }
  > `required:false`
- Delete todos `api/todos` method `DELETE`
- Delete todos `api/todos/:id` method `DELETE`

## How should this app be tested or used ?

> Before jumping to the codes, make sure you have a mongo account with two databases.One for production/development and another for testing

- Add environment variables as shown in .env-example
- Clone this repo `git clone https://github.com/ericus123/TODO_APP`
- Change directory `cd TODO_APP` and open it in your text editor
- Install all dependencies `npm install`

#### For development

    - Start dev server `npm run dev`
    - Navigate to your server url (localhost:port)
    - check all endpoints

#### For production

    - Build the production `npm run build`
    - Start production server `npm run start`
    - Navigate to your server url (localhost:port)
    - check all endpoints

#### For testing

    - Run `npm run test` and check tests

#### Testing hosted version

    Visit the deployed url and check all endpoints using an API testing tool. > Ex: Postman
    - Staging url [https://amani-todo-staging.herokuapp.com/](https://amani-todo-staging.herokuapp.com/)
    - Production url [https://amani-todo-staging.herokuapp.com/](https://amani-todo-staging.herokuapp.com/)
