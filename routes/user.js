
const express = require('express');
let router = express.Router();

router.use(express.static('../public/loginPage'));

router
.route('/credentials') //don't use user/api/credentials because /api/user/ is already the root of this router
.get((req, res) =>{
    // dealing with: localhost:5001/api/user/credentials
    console.log('you hit the user credentials api');
    res.status(200);
    res.send('hi route')
    //console.log(db.getUserCredentials().then(data => {res.json(data)}));
})
.post((req, res) =>{
    console.log('you hit the user credentials api FOR POST');
    res.status(200);
})
.put((req, res) =>{
    res.status(200);
    console.log('you hit the user credentials api FOR PUT');
})

module.exports = router;