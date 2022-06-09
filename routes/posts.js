const express = require('express');
let router = express.Router();
const db = require('../db/db-connection.js');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
   
    //check if there are cookies
    if(req.headers.cookie.split(';').length === 2){
        let accessToken = req.headers.cookie.split(';')[1].split('=')[1]; //access Token
        let email = req.headers.cookie.split(';')[0].split('=')[1]; //email

        //check if token is valid 
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
            //if not valid, send 403
            if(err){
                res.sendStatus(403);
                console.log('invalid token');
                res.end();
            }
            //if valid, send 200
            else{
                next();   
            }
        })
    }else{
        res.sendStatus(403); console.log('no-token or no-email');
    }

    //verify token comparing to secret
    
}

router.route('/')
.get(authenticateToken, (req, res)=>{
    //after token verified, do
    //console.log(req.body);
    //let accessToken = req.body.accessToken;

    const data = db.getAllPosts().then(data => {res.json(data)});
})

module.exports = router;