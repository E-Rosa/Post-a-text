const express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/db-connection.js');


function checkEmail(req, res, next){
    //returns data if the email is used
    db.checkEmail(req.body.email).then(data=>{
        //if the email is used
        if (data.rowCount > 0){
            //console.log('there is an email like that');
            res.status(301);
            res.end();  
        }else{
            //console.log('there isnt that email');
            next();
        }
    });
}
function checkUsername(req, res, next){
    console.log(req.body.username);
    //returns data if the username is used
    db.checkUsername(req.body.username).then(data=>{
        //if the username is used
        if (data.rowCount > 0){
            //console.log('there is an username like that');
            res.status(301);
            res.end();  
        }else{
            //console.log('there isnt username like that');
            res.status(200);
            next();
        }
    });
}
router
.route('/')
.post(checkEmail, checkUsername, (req, res) =>{
    //takes password,username and email from request
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;

    console.log('past middleware');
    
    //generates a salt to encode the password
    bcrypt.genSalt(10, (err, salt) =>{
        //hashes the password (encodes it more)
        bcrypt.hash(password, salt, (err, hash)=>{
            //Can only acess hash inside of this callback
            //insert it into database
            //db.signUserUp(email, hash, username);
        })
    });
    res.end();
    //res.status(201);
    
})

module.exports = router;