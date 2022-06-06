const express = require('express');
let router = express.Router();
const db = require('../db/db-connection.js');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
   
    //check if there are cookies
    if(req.headers.cookie.split(';').length === 2){
        console.log('yes');
        let accessToken = req.headers.cookie.split(';')[1].split('=')[1]; //access Token
        let email = req.headers.cookie.split(';')[0].split('=')[1]; //email

        //check if token is valid 
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
            //if not valid, send 403
            if(err){
                res.sendStatus(403);
                console.log('invalid token');
            }
            //if valid, send 200
            else{
                res.sendStatus(200);
                
                next();
            }
        })
    }else{
        res.sendStatus(403); console.log('no-token or no-email'); next();
    }

    //verify token comparing to secret
    
}

router.route('/')
.get(authenticateToken, (req, res)=>{
    //after token verified, do
    console.log(req.body);
    let accessToken = req.body.accessToken;
})

module.exports = router;