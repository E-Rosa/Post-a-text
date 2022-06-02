require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./db/db-connection.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoute = require('./routes/user.js'); //require router



//Authentication with Bcrypt----------------
const saltRounds = 10; //encoding complexity
const fakePassword = 'eliasrosa'; //fake password
function encryptPassword(){
bcrypt.genSalt(saltRounds, (err, salt)=>{ //generates a salt (encoded password), returns a salt
    bcrypt.hash(fakePassword, salt, (err, hash)=>{ //returns a hash (encoded password plus random length)
        return hash;
    })
});}
const hash = encryptPassword(); //stores hash in variable
bcrypt.compare(fakePassword, hash, (err, result)=>{ //compares hash with raw password
    console.log('it matches');
})

app.use('/api/user/', userRoute); //use the user file to handle endpoints that start with /api/user/
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//JWT Testing--------------------------------------------------------------------------------------------------------------------------------------
const fakePosts = [
    {
        username:'elias',
        title:'post 1'
    },
    {
        username:'rosa',
        title:'post 2'
    }
]

app.post('/login', (req, res)=>{
    const username = req.body.username //gets the request from the body
    const user = {name: username} //our payload (data in JWT token)

    const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)//serializes user
    res.json({acessToken: acessToken}) //sends the acess token in json format
})

app.get('/posts', authenticateToken, (req, res)=>{
    res.json(fakePosts.filter(post => post.username === req.user.name)); //looks for the post that has she same username as the request
})

function authenticateToken(req, res, next){
    //get token
    const authHeader =req.headers['authorization']; //returns Bearer TOKEN
    const token = authHeader & authHeader.split(' ')[1]; //returns the TOKEN bit only if there is an authHeader
    //verify user
    if (token === null) return res.sendStatus(401); //if there is no token, send 401
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{ //takes token, secret key and returns err (erorr) and user (payload)
        if (err) return res.sendStatus(403)
        req.user = user //take the user from request (serialized) and assign to it the new user returned by the jwt.verify function
        next() //move on from middleware
    }) 
    //return user
    //header looks like: Bearer TOKEN

}

//GET endpoints--------------------------------------------------------------------------------------------------------

app.get('/api/user/info', (req, res) =>{
    res.status(200);
    console.log('you hit the user info api');
})
app.get('/api/posts', (req, res) =>{
    res.status(200);
    console.log('you hit the user posts api');
})
app.get('/api/tags', (req, res) =>{
    res.status(200);
    console.log('you hit the user tags api');
})



//POST endpoints--------------------------------------------------------------------------------------------------------------------------------------

app.post('/api/user/info', (req, res) =>{
    res.status(200);
    console.log('you hit the user info api FOR POST');
})
app.post('/api/posts', (req, res) =>{
    res.status(200);
    console.log('you hit the user posts api FOR POST');
})
app.post('/api/tags', (req, res) =>{
    res.status(200);
    console.log('you hit the user tags api FOR POST');
})

//DELETE endpoints--------------------------------------------------------------------------------------------------------------------------------------
app.delete('/api/posts', (req, res) =>{
    res.status(200);
    console.log('you hit the user posts api FOR DELETE');
})

//PUT endpoints--------------------------------------------------------------------------------------------------------------------------------------

app.put('/api/user/info', (req, res) =>{
    res.status(200);
    console.log('you hit the user info api FOR POST');
})
app.put('/api/posts', (req, res) =>{
    res.status(200);
    console.log('you hit the user posts api FOR POST');
})

//Deafult 404--------------------------------------------------------------------------------------------------------------------------------------
app.all('*', (req, res) => {
    res.status(404).send('resource not found')
  })

//listens to server--------------------------------------------------------------------------------------------------------------------------------------
app.listen(5001, () => {
    console.log('server is listening on port 5001');
});