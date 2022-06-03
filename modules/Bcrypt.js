const bcrypt = require('bcrypt');

//Authentication with Bcrypt----------------
//const saltRounds = 10; //encoding complexity
//const fakePassword = 'eliasrosa'; //fake password
function encryptPassword(saltRounds, password){ //receives 10 and password
bcrypt.genSalt(saltRounds, (err, salt)=>{ //generates a salt (encoded password), returns a salt
    bcrypt.hash(password, salt, (err, hash)=>{ //returns a hash (encoded password plus random length)
        console.log(hash);
        return hash;
    })
});}
//const hash = encryptPassword(password); //stores hash in variable
function comparePassword(password, hash){
bcrypt.compare(password, hash, (err, result)=>{ //compares hash with raw password
    console.log('it matches');
})
}
module.exports = {encryptPassword}
