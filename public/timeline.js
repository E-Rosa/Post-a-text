//if there are cookies
if (document.cookie){
    //if there are two or more cookies
    if (document.cookie.split(';').length >= 2){
        //grab accessToken and email
        let accessToken = document.cookie.split(';')[1].split('=')[1]; //access Token
        let email = document.cookie.split(';')[0].split('=')[1]; //email
    }
        //else go back to login page;
        else{window.location.href="http://localhost:5001/index.html";}
    }
    //else go back to login page
    else{window.location.href="http://localhost:5001/index.html";}

//returns a limit of 10 posts
function getPostData(){
    fetch('http://localhost:5001/api/posts')                
    .then(data =>{return data.json()})
    .then(data => {
        console.log(data);
        /*const postTitle = data[0].post_title;
        const postBody = data[0].post_body;
        const postDescription = data[0].post_description;
        const postTags = data[0].post_tags_reference;
        const postAuthor = data[0].post_author_reference;*/

        for(let i=0; i < data.length; i++){
            createPost(data[i].post_title,  data[i].post_description, data[i].post_tags_reference, data[i].post_author_reference);
        }

        //createPost(postTitle, postDescription, postTags, postAuthor);
        //console.log(postTitle, postBody, postDescription, postTags, postAuthor);
    });
}
getPostData();

function createPost(title, description, tags, author){
    //query existing elements
    let timeline = document.getElementById("timeline");

    //creates elements
    let post = document.createElement('div');
    let postHeaderContainer = document.createElement('div');
    let profilePicContainer = document.createElement('div');
    let profilePic = document.createElement('img');
    let username = document.createElement('h3');
    let tag1 = document.createElement('h4');
    let tag2 = document.createElement('h4');
    let tag3 = document.createElement('h4');
    let postBodyContainer = document.createElement('h4');
    let postTitleContainer = document.createElement('div');
    let saveIcon = document.createElement('img');
    let postTitle = document.createElement('h2');
    let postDescription = document.createElement('p');

    //append classes
    post.className = "post";
    postHeaderContainer.className = "post-header-container";
    profilePicContainer.className = "profile-pic-container";
    profilePicContainer.id = "timeline-pic-container";
    profilePic.className = "profile-pic";
    profilePic.id = "timeline-pic";
    profilePic.src = "./images/default user.jpg";
    username.className = "username";
    username.id = "timeline-username";
    tag1.className = "tag";
    tag2.className = "tag";
    tag3.className = "tag";
    postBodyContainer.className = "post-body-container";
    postTitleContainer.className = "post-title-container";
    saveIcon.className = "save-icon";
    saveIcon.src = "/images/save-icon.png";
    postTitle.className = "post-title";
    postDescription.className = "post-description";

    //appends elements to body
    timeline.appendChild(post);
    post.appendChild(postHeaderContainer);
    post.appendChild(postBodyContainer);
    postHeaderContainer.appendChild(profilePicContainer);
    postHeaderContainer.appendChild(username);
    postHeaderContainer.appendChild(tag1);
    postHeaderContainer.appendChild(tag2);
    postHeaderContainer.appendChild(tag3);
    profilePicContainer.appendChild(profilePic);
    postBodyContainer.appendChild(postTitleContainer);
    postBodyContainer.appendChild(postDescription);
    postTitleContainer.appendChild(saveIcon);
    postTitleContainer.appendChild(postTitle);

    //append innerHTML
    username.innerHTML = author;
    
        if(typeof tags === 'string'){
            tag1.innerHTML = tags;
        }
        else if(tags.length == 2){
            tag1.innerHTML = tags[0];
            tag2.innerHTML = tags[1];
        }else if (tags.length == 3){
            tag2.innerHTML = tags[1];
            tag3.innerHTML = tags[2];
        }
    postTitle.innerHTML = title;
    postDescription.innerHTML = description;

    /*  <div class="post"3
                    <div class="post-header-container">
                        <div class="profile-pic-container" id="timeline-pic-container">
                            <img class="profile-pic" id="timeline-pic" src="./images/default user.jpg">
                        </div>
                        <h3 class="username" id="timeline-username">Username</h3>
                        <h4 class="tag">Drama</h4>
                        <h4 class="tag">Shakespeare</h4>
                        <h4 class="tag">Dostoievsky</h4>
                    </div>
                    <div class="post-body-container">
                        <div class="post-title-container">
                            <img src="./images/save-icon.png" class="save-icon">
                            <h2 class="post-title">Post title</h2>
                            
                        </div>
                        <p class="post-description">This is some text</p>
                    </div>
        </div>*/
}