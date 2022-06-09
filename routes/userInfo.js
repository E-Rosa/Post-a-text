const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();
const db = require('../db/db-connection.js');

//router.use(checkToken);

//Middleware********************************************************************************
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

//Endpoints********************************************************************************** */
router.route('/')
.get((req, res)=>{
    console.log('hit the user/info api and past checkToken middleware')
    const email = jwt.verify(req.headers.append, process.env.ACCESS_TOKEN_SECRET);
    db.getUserInfo(email).then(data => {
        //console.log(data.rows[0]);
        res.json(data);
    });
})
router.route('/:username')
.get((req, res)=>{
    console.log('hit the userinfo/username api');
    //get username from params
    const username = req.params.username;
    //gets info using username and returns it as JSON
    db.getUserInfoWithUsername(username).then(data => res.json(data));
})
.put((req, res)=>{
    const user_toBeFollowed = req.params.username;
    const user_following = jwt.verify(req.headers.append, process.env.ACCESS_TOKEN_SECRET);
    console.log(user_toBeFollowed, user_following);
})

module.exports = router;
