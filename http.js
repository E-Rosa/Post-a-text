require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./db/db-connection.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoute = require('./routes/user.js'); //require router
const signUpRoute = require('./routes/signUp.js');
const postsRoute = require('./routes/posts.js');

//Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/user', userRoute); //use the user file to handle endpoints that start with /api/user/
app.use('/signup', signUpRoute);
app.use('/api/posts', postsRoute);


//GET endpoints--------------------------------------------------------------------------------------------------------
app.get('/api/user/info', (req, res) =>{
    res.status(200);
    console.log('you hit the user info api');
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
app.post('/api/tags', (req, res) =>{
    res.status(200);
    console.log('you hit the user tags api FOR POST');
})

//DELETE endpoints--------------------------------------------------------------------------------------------------------------------------------------
//PUT endpoints--------------------------------------------------------------------------------------------------------------------------------------

app.put('/api/user/info', (req, res) =>{
    res.status(200);
    console.log('you hit the user info api FOR POST');
})

//Deafult 404--------------------------------------------------------------------------------------------------------------------------------------
app.all('*', (req, res) => {
    res.status(404).send('resource not found')
  })

//listens to server--------------------------------------------------------------------------------------------------------------------------------------
app.listen(5001, () => {
    console.log('server is listening on port 5001');
});