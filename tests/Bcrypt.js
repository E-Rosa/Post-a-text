const bcrypt = require('bcrypt');

bcrypt.compare(pass, hashedPass, (err, res)=>{
    if(res){
        console.log('sucess');
        return 'sucess';
    }
    else{
        console.log('invalid pass');
        return 'invalid pass';
    }
});
