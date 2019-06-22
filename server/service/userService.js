const jwt = require('jsonwebtoken');
const config = require('../config.js');
const User = require('../model/user');


let login = (req, res, db)=>{
    if (!db){
      res.status(500).json({
        success: false,
        message: 'Database is not running'
      });
      return;
    }

    let username = req.body.username;
    let password = req.body.password;

    if (username && password){
      User.findOne({ username: username }, function(err, user) {
        if (err){
          console.log(err);
          res.status(403).json({
            success: false,
            message: 'No username! ' + err
          });
          return;
        }
  
  
        // check if the password matches the one in DB
        new User(user).comparePassword(password, (err, isMatch)=>{
  
          if (err || !isMatch){
            res.status(403).json({
              success: false,
              message: 'Incorrect username or password. '+ err
            });
            return;
          }
  
          let token = jwt.sign({username: username},
            config.secret,
            { expiresIn: '1h' // expires in 1 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            firstName: user.first,
            token: token
          });
  
        });
      });
    }
    else{
      res.status(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }

}

let signup = (req, res, db)=>{
    if (!db){
        res.status(500).json({
          success: false,
          message: 'Database is not running'
        });
        return;
      }
  
      let username = req.body.username;
      let password = req.body.password;
      let first = req.body.first;
      let last = req.body.last;

      var cred = new User({
        first: first,
        last: last,
        username: username,
        password: password 
      });
  
      cred.save(function(err) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Signup failed! ' + err
              });
            return;
        }

        let token = jwt.sign({username: username},
            config.secret,
            { expiresIn: '1h' // expires in 1 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Signup successful!',
            firstName: first,
            token: token
          });
      
        console.log('Signup successfully!');
      });  
}

// check JWT token
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };

module.exports = {
    login: login,
    signup: signup,
    checkToken: checkToken
};