const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();
const db = require('../db/db-connection.js');

router.use(checkToken);

function checkToken(req, res, next){
    console.log('hit checkToken middleware');
    console.log('Token is ' + req.headers.append);
    
    jwt.verify(req.headers.append, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
        //if not valid, send 403
        if(err){
            res.sendStatus(404);
            console.log('invalid token');
            res.end();
        }
        //if valid, next
        else{
            next();   
        }
    })
}

router.route('/')
.get((req, res)=>{
    console.log('hit the user/info api and past checkToken middleware')
    const email = jwt.verify(req.headers.append, process.env.ACCESS_TOKEN_SECRET);
    db.getUserInfo(email).then(data => {
        //console.log(data.rows[0]);
        res.json(data);
    });
})

module.exports = router;
