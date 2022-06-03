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
