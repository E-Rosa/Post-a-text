const express = require('express');
let router = express.Router();
const db = require('../db/db-connection.js');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    let accessToken = req.body.accessToken;
    //verify token comparing to secret
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, response)=>{
        //if not valid, send 403
        if(err){res.sendStatus(403); console.log('invalid token');}
        //if valid, send 200
        else{res.sendStatus(200); next();}
    })
}

router.route('/')
.post(authenticateToken, (req, res)=>{
    //after token verified, do
    console.log(req.body);
    let accessToken = req.body.accessToken;
})

module.exports = router;