# tree-calculation-service
This repo is the backend source code for *tree-calculation-ui*, https://github.com/tianchez/tree-calculation-ui. 

## Intorduction
With this Tree calculation app, users can calulate the sum of longest path in the tree. This app is implemented in MERN stack(MongoDB, Express.js, ReactJS, and Node.js) andd composes of UI andd Service parts. UI is written in React.js and Service are supported by Node.js and MongoDB. This repo contains the source code for Service part.

Technologies are using:
Node.js, Express.js, MongoDB, JSON Web Tokens, bcrypt.js
 
<p align='center'>
<img src='https://github.com/tianchez/tree-calculation-service/blob/master/doc/tree.png' width='400' alt='tree-screenshot'>
<img src='https://github.com/tianchez/tree-calculation-service/blob/master/doc/signin.png' width='400' alt='signin-screenshot'>
</p>

## Prerequisites
To run and build this repo locally, you have to make sure following tools are installed in your environment
* Node.js v6.11.1 or above
* Latest npm package manager (https://www.npmjs.com/package/npm) 
* Latest mongoDB server: (https://docs.mongodb.com/manual/installation/)
* Latest Docker container if you prefer running in docker: (https://www.docker.com/products/docker-desktop)

## Overview
* This repo is written in Node.js. It contains TreeService and UserService. treeService is to handle HTTP requesst from client side, calculate the tree sum, and send it back to *tree-calculation-ui*. UserService is to handle user authentication in the UI and store the authentication in the MongoDB server.
* To make the app safer, all HTTP request are authenticated by JWT tokens (https://jwt.io/). Once the user logins successsfully, server will send back a JWT token for UI to process further HTTP requests safely
* To keep password safely in Database, all user passwords are stored in hashed value, which is encrypted by bcryptjs (https://www.npmjs.com/package/bcryptjs)

## API routes
 * GET `/` : To test if the API connects. It will print out `Hello word`.
 * POST `/calculate`, the endponit to process tree sum calculation request.
 * POST `/signin`, the endponit to process user login request.
 * POST `/signup`, the endponit to process user signup request.


## Local development on desktop
1. Git clone this repository by running `git clone https://github.com/tianchez/tree-calculation-service.git`
2. Run `npm install` to install all dependency packages
3. Run `mongod` to start the MongoDB server
4. Modify `config.js` to `MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/treecalc'`
5. To run the app locally, run  `npm start`
6. Now you can make HTTP request to `http://localhost:3000`


## Local development by Docker
1. Git clone this repository by running `git clone https://github.com/tianchez/tree-calculation-service.git`
2. Modify `config.js` to `MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/treecalc'`
3. Run `docker-compose build` to pacakage the docker image
4. Run `docker-compose up` to run the docker image
5. Once you see `MongoDB is connected` in your console, you can make HTTP request to `http://localhost:3000`

## Test
Run `npm test` to check unit tests

## Copyright and License
Code Copyright 2019 Frank Zhang. Code released under the MIT license. See the included license file [License](LICENSE) .