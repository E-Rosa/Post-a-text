
const bcrypt = require('bcrypt');
const express = require('express');
let router = express.Router();
const db = require('../db/db-connection.js');
const jwt = require('jsonwebtoken');


router.use(express.static('../public'));

router
.route('/credentials') //don't use user/api/credentials because /api/user/ is already the root of this router
.get((req, res) =>{
    // dealing with: localhost:5001/api/user/credentials
    console.log('you hit the user credentials api');
    //bcrypt.compare()
})
.post((req, res) =>{
    console.log('you hit the user credentials api FOR POST');
    //receives email and password
    const email = req.body.email;
    const pass = req.body.password;

    //gets user hashed password according to email (returns promise)
    const hashedPass = db.getUserPass(email).then(data => {
        //make empty var
        let hashedPass2 = '';
        //if some password was found
        if(data.rows[0] != undefined){
            //assigns pass to hashedPass2
            hashedPass2=data.rows[0].user_password
        }   
        //else this email is not listed
        else{hashedPass2= 'invalid email'};
        
        //compares the pass provided with the hashed pass from the database (returns promise)
        bcrypt.compare(pass, hashedPass2, (err, response)=>{
            //if there it is right
            if(response){
                console.log('sucesss');
                const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
                res.json({accessToken: accessToken});
            }
            //if it is wrong
            else{
                console.log('invalid pass');
                res.json(null);
            }
        });
        
    })
})
.put((req, res) =>{
    res.status(200);
    console.log('you hit the user credentials api FOR PUT');
})

module.exports = router;