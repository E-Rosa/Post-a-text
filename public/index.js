//query elements
const loginContainer = document.getElementById('login-container');
const loginInput = document.getElementById('login-input');
const passInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const signUpButton = document.getElementById('signup-button');
const signUpContainer = document.getElementById('signup-container');


//test query
//console.log(loginButton.innerHTML,loginInput,passInput,signUp);

//adds events
loginButton.addEventListener("click", checkData);
signUpButton.addEventListener("click", showSignUpContainer);

//checks if login matches
function checkData(){
    //checks the api
    fetch('http://localhost:5001/api/user/credentials')
    //parses the data to json
    .then (res => res.json())          
    //takes the json data               
    .then (data => {   
        //array = data
        const array = data.rows;  
        //array = data amount                             
        const arrayLength = data.rows.length;
        //execute for each element in the array
        for (let i=0; i < arrayLength; i++){
            //if login and password match
            if(array[i].user_email == loginInput.value && array[i].user_password == passInput.value){
                //login sucessfull
                console.log('login succesfull');   
            }
        }
    })         
}
//Hide login board and show sign-up board
function showSignUpContainer(){
    //hide login container
    loginContainer.style.opacity = "0%";
    setTimeout(()=>{loginContainer.style.display = "none"}, 500);
    //show sign-up container
    setTimeout(()=>{signUpContainer.style.display = "flex";signUpContainer.style.opacity="100%"}, 500);
}

//Sign up--------------------------------------------------------------------
//queries elements
const signUpEmailInput = document.getElementById('signup-email-input');
const signUpLoginInput = document.getElementById('signup-username-input');
const signUpPassInput = document.getElementById('signup-password-input');
const signUpGoBackButton = document.getElementById('signup-goback-button');
const signUpSendButton = document.getElementById('signup-send-button');

//adds listeners
signUpGoBackButton.addEventListener("click", showLoginContainer);

//hide signup container, show login container
function showLoginContainer(){
    //hide signup container
    signUpContainer.style.opacity = "0%";
    setTimeout(()=>{signUpContainer.style.display = "none"}, 500);
    //show login container
    setTimeout(()=>{loginContainer.style.display = "flex"; loginContainer.style.opacity="100%";}, 500);
}
