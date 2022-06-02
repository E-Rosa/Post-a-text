//query elements
const loginInput = document.getElementById('login-input');
const passInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');

console.log(loginInput.value);

//test query
//console.log(loginButton.innerHTML,loginInput,passInput,signUp);

//adds events
loginButton.addEventListener("click", checkData);

function checkData(){
    fetch('http://localhost:5001/api/user/credentials')//returns a promise
    .then (res => res.json())                          //returns a promise
    .then (data => {   
        const array = data.rows;                                //returns the data
        const arrayLength = data.rows.length;
        for (let i=0; i < arrayLength; i++){
            if(array[i].user_email == loginInput.value && array[i].user_password == passInput.value){
                console.log('login succesfull');
                
            }
        }
    })         
}