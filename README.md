# tree-calculation-ui

This repo is the front end source code for *tree-calculation-service*, https://github.com/tianchez/tree-calculation-service. 

## Intorduction
With this Tree calculation app, users can calulate the sum of longest path in the tree. This app is implemented in MERN stack(MongoDB, Express.js, ReactJS, and Node.js) andd composes of UI andd Service parts. UI is written in React.js and Service are supported by Node.js and MongoDB. This repo contains the source code for UI part.

Technologies are using:
React.js, Materialize CSS, Webpack, Babel

<p align='center'>
<img src='https://github.com/tianchez/tree-calculation-service/blob/master/doc/tree.png' width='400' alt='tree-screenshot'>
<img src='https://github.com/tianchez/tree-calculation-service/blob/master/doc/signin.png' width='400' alt='signin-screenshot'>
</p>

## Prerequisites
To run and build this repo locally, you have to make sure following tools are installed in your environment
* Node.js v6.11.1 or above
* Latest npm package manager (https://www.npmjs.com/package/npm) 

## Overview
* This repo is written in React v16. It has to be run with *tree-calculation-service*, https://github.com/tianchez/tree-calculation-service
* To keep the UX experience consistent, UI follows Google Material Design and uses Materialize CSS framework(https://materializecss.com/) for a more user-friendly interface. 
* Webpack v4 is used to bundle the code and static assets. Babel is utilized to transcompile our ES6 and JSX code base to browser-compatible JavaScript


## Local development on desktop
1. Make sure *tree-calculation-service* is running locally. You could check in `http://localhost:3000` to see if `Hello word` prints
2. Run `npm install` to install all dependency packages
3. To run the app locally, run  `npm start`
4. Open `http://localhost:8080` in Chrome. Bingo! You can see our lovely site in your browser.


## Copyright and License
Code Copyright 2019 Frank Zhang. Code released under the MIT license. See the included license file [License](LICENSE) .