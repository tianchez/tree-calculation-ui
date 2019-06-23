# tree-calculation-ui

This repo is the source code for *tree-calculation-ui*, deployed on https://tianchez.github.io/tree-calculation-ui

## Intorduction
With this Tree calculation app, users can calulate the sum of longest path in the tree. This app is implemented in MERN stack(MongoDB, Express.js, ReactJS, and Node.js) and composes of UI and Service parts. UI is written in React.js and Service are supported by Node.js and MongoDB. This repo contains the source code for UI part.

Technologies are using:
Client: React.js, Materialize CSS, Webpack, Babel, Jest, Enzyme
Server: Node.js, Express.js, JSON Web Tokens, bcrypt.js, Mocha, MongoDB

<p align='center'>
<img src='https://github.com/tianchez/tree-calculation-ui/blob/master/doc/tree.png' width='400' alt='tree-screenshot'>
</p>

## Prerequisites
To run and build this repo locally, you have to make sure following tools are installed in your environment
* Node.js v6.11.1 or above
* Latest npm package manager (https://www.npmjs.com/package/npm)
* Latest mongoDB server: (https://docs.mongodb.com/manual/installation/)
* Latest Docker container if you prefer running in docker: (https://www.docker.com/products/docker-desktop) 

## Overview
* UI is written in React v16. 
* To keep the UX experience consistent, UI follows Google Material Design and uses Materialize CSS framework(https://materializecss.com/) for a more user-friendly interface. 
* Webpack v4 is used to bundle the code and static assets. Babel is utilized to transcompile our ES6 and JSX code base to browser-compatible JavaScript
* Service is written in Node.js. It contains TreeService and UserService. treeService is to handle HTTP requesst from client side, calculate the tree sum, and send it back to *tree-calculation-ui*. UserService is to handle user authentication in the UI and store the authentication in the MongoDB server.
* To keep password safely in Database, all user passwords are stored in hashed value, which is encrypted by bcryptjs (https://www.npmjs.com/package/bcryptjs)

## API routes
 * GET `/` : To test if the API connects. It will print out `Hello word`.
 * POST `/calculate`, the endponit to process tree sum calculation request.
 * POST `/signin`, the endponit to process user login request.
 * POST `/signup`, the endponit to process user signup request.
  
## Local development on desktop
To run this repo locally, you have to run `server` andd `client` in this repo at this time. 
### Server
1. Go to `server` by running `cd server`
2. Run `npm install` to install all dependency packages
3. Run `mongod` to start the MongoDB server
4. Modify `config.js` to `MONGO_URI: process.env.MONGODB_URI || 'mongodb://localhost/treecalc'`
5. To run the app locally, run  `npm start`
6. Now you can make HTTP request to `http://localhost:3000`
 
### Client
1. Make sure `server` is running locally. You could check in `http://localhost:3000` to see if `Hello word` prints
2. Go to `client` by running `cd server`
3. Run `npm install` to install all dependency packages
4. To run the app locally, run  `npm start`
5. Open `http://localhost:8080` in Chrome. Bingo! You can see our lovely site in your browser.

## Local development by Docker
1. Git clone this repository by running `git clone https://github.com/tianchez/tree-calculation-ui.git`
2. Modify `server/config.js` to `MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/treecalc'`
3. Run `docker-compose build` to pacakage the docker image
4. Run `docker-compose up` to run the docker image
5. Once you see `MongoDB is connected` in your console, you can see our lovely site in your browser in `http://localhost:8080`

## Test
Unit tests are covered in both `client` and `server`
### Server
Unit tests are supported by Mocha. Run `npm test` to check unit tests

### client
Unit tests are supported by Jest and Enzyme. Run `npm test` to check unit tests

## Copyright and License
Code Copyright 2019 Frank Zhang. Code released under the MIT license. See the included license file [License](LICENSE) .