let accessToken = document.cookie.split(';')[1].split('=')[1]; //access Token
let email = document.cookie.split(';')[0].split('=')[1]; //email

function getUserData(){
    fetch('http://localhost:5001/api/posts',{
    method: 'POST',
    headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
    },
    body: JSON.stringify({
        accessToken: accessToken,
        email: email
    })
    }).then(res => console.log(res));
}
getUserData();