//check cookies if necessary 
//console.log(document.cookie);

//query elements
const loginContainer = document.getElementById('login-container');
const loginInput = document.getElementById('login-input');
const passInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const signUpButton = document.getElementById('signup-button');
const signUpContainer = document.getElementById('signup-container');

//adds events
loginButton.addEventListener("click", checkLoginData);
signUpButton.addEventListener("click", showSignUpContainer);

//checks if login matches
function checkLoginData(){
    //checks the api
    fetch('http://localhost:5001/api/user/credentials',{
    method: 'POST',
    headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
    },
    //turns body into a string
    body: JSON.stringify({      
        email: loginInput.value,
        password: passInput.value
    })    
    })
    //parses the response to json
    .then (res =>{return res.json()})          
    //takes the response               
    .then (data => {
        //if there is a response
        if(data){
            let email = loginInput.value;
            let accessToken = data.accessToken;
            //date = two hours after now
            let date = new Date();
            date.setTime(date.getTime() + (0.1 * 24 * 60 * 60 * 1000)); //next two hours
            
            //sets up cookies with email and accessToken
            document.cookie = "email=" + email + "; SameSite=None; Secure";
            document.cookie = "accessToken=" + accessToken + "; expires=" + date.toUTCString() +";";

            //redirects user to timeline page
            window.location.href = "http://localhost:5001/timeline.html";
        }else{window.alert("Invalid password");}
    })
    .catch(err => console.log(err));
    
    
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
signUpSendButton.addEventListener("click", sendSignUpData);

//hide signup container, show login container
function showLoginContainer(){
    //hide signup container
    signUpContainer.style.opacity = "0%";
    setTimeout(()=>{signUpContainer.style.display = "none"}, 500);
    //show login container
    setTimeout(()=>{loginContainer.style.display = "flex"; loginContainer.style.opacity="100%";}, 500);
}

//triggers when user presses sign-up, transmits the username,pass and email to server
function sendSignUpData(){
    //api location
    fetch("http://localhost:5001/signup",{
        method: 'POST',
        headers:{'Content-Type': 'application/json', 'Accept': 'application/json'},
        //transforms the body into string
        body: JSON.stringify({
            email: signUpEmailInput.value,
            username: signUpLoginInput.value,
            password: signUpPassInput.value
        })
        //transforms the body into JSON and returns it
    }).then(res =>{
            console.log(res.status);
            return res;
        })
            //catches errors
    .then(res => {
        console.log(res.status);
        //if email and username are available
        if(res.status === 200){
            window.alert('signup successful!');
            showLoginContainer();
        }else if (res.status===301){
            window.alert('email already in use');
            signUpEmailInput.value = '';
        }else if(res.status===302){
            window.alert('username already in use');
            signUpLoginInput.value = '';
        }
        
    }).catch(error => console.log(error))
}


