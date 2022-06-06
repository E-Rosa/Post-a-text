let accessToken = document.cookie.split(';')[1].split('=')[1]; //access Token
let email = document.cookie.split(';')[0].split('=')[1]; //email
//document.cookie= "accessToken=";

function getUserData(){
    fetch('http://localhost:5001/api/posts',{
    method: 'GET',
    headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
    }
    }).then(res => console.log(res));
}
getUserData();