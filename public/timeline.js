let accessToken = document.cookie.split(';')[1].split('=')[1]; //access Token
let email = document.cookie.split(';')[0].split('=')[1]; //email
//document.cookie= "accessToken=";

function getUserData(){
    fetch('http://localhost:5001/api/posts').then(data =>{return data.json()})
    .then(data => {
        console.log(data[0]);
        const postTitle = data[0].post_title;
        const postBody = data[0].post_body;
        const postDescription = data[0].post_description;
        const postTags = data[0].post_tags_reference;
        const postAuthor = data[0].post_author_reference;

        console.log(postTitle, postBody, postDescription, postTags, postAuthor);
    });
}
getUserData();