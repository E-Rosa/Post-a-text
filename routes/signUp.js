const express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/db-connection.js');



router
.route('/')
.post((req, res) =>{
    //takes password,username and email from request
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    //generates a salt to encode the password
    bcrypt.genSalt(10, (err, salt) =>{
        //hashes the password (encodes it more)
        bcrypt.hash(password, salt, (err, hash)=>{
            //Can only acess hash inside of this callback
            //insert it into database
            db.signUserUp(email, hash, username);
        })
    });
    res.status(201);
    
})

module.exports = router;