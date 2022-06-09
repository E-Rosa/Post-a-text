//User authorization*******************************************************************************************************
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
//*****
//*****
//*****
//*****
//*****
//*****
//*****
//Profile************************************************************************************************
//queries elements
let closeProfileIcon = document.getElementById('close-profile-icon');
let profileContainer = document.getElementById('profile-container');
let openProfileIconContainer = document.getElementById('open-icon-container');
let followButton = document.getElementById('follow-button');

//adds initial styles (correct animation bugs)
profileContainer.style.display = 'flex';

//adds listeners
closeProfileIcon.addEventListener("click", toggleProfilePanel);
followButton.addEventListener("click", follow);

//close profile panel, open profile panel
function toggleProfilePanel(){
    //if profile container isn't hidden
    if(profileContainer.style.display != 'none'){
        //hide it
        profileContainer.style.opacity = '0%';
        setTimeout(()=>{profileContainer.style.display = 'none';}, 500)

        //show open icon
        openProfileIconContainer.style.display = 'block';

        //if the open icon wasn't created yet
        if(openProfileIconContainer.childElementCount === 0){
            //create it
            let openPanelIcon = document.createElement('img');
            openPanelIcon.src = './images/back-icon.png';
            openPanelIcon.id = 'close-profile-icon';
            openPanelIcon.style.backgroundColor = 'pink';
            openPanelIcon.style.border = '1px solid pink';
            openPanelIcon.style.borderRadius = '100%';
            openPanelIcon.style.padding = '0px 5px 0px 5px';
            openPanelIcon.style.animation = 'all 0.5s ease';
            openPanelIcon.style.opacity = '0%';
            openPanelIcon.addEventListener("click", toggleProfilePanel);
            openProfileIconContainer.appendChild(openPanelIcon);
            setTimeout(()=>{openPanelIcon.style.opacity = '100%'}, 500);
        }
    //else if the profile container is hidden
    }else if (profileContainer.style.display == 'none'){
        //display it
        profileContainer.style.display = 'flex';
        setTimeout(()=>{profileContainer.style.opacity = '100%';}, 500)

        //hide open icon
        openProfileIconContainer.style.display = 'none';
    }
}
//Gets initial user info
fetch('http://localhost:5001/api/userInfo', {
    method: 'GET',
    credentials: "include",
    cache: 'default',
    headers: {
        'append': document.cookie.split(';')[1].split('=')[1]
    }
}).then(res =>{ return res.json()})
.then(data => {
    console.log(data.rows[0]);
    const username = data.rows[0].username_reference;
    const user_bio = data.rows[0].user_bio;
    const user_following = data.rows[0].user_following;
    const user_followers = data.rows[0].user_followers;
    const user_fav_tags = data.rows[0].user_favorite_tags_reference;

    //console.log(username, user_followers, user_following, user_bio, user_fav_tags);
    createUserInfo(username, user_followers, user_following, user_bio, user_fav_tags);
});
//changes HTML tags to user info
function createUserInfo(username, followers, following, bio, tags){
    //query elements
    let profileContainer = document.getElementById('profile-container');
    let usernameTag = document.querySelector('.username')
    let followersNumber = document.getElementById('followers-number');
    let followingNumber = document.getElementById('following-number');
    let bioTag = document.getElementById('bio');
    let favTagsContainer = document.getElementById('favorite-tags-container');
    let favTag1 = document.getElementById('fav-tag-1');
    let favTag2 = document.getElementById('fav-tag-2');
    let favTag3 = document.getElementById('fav-tag-3');

    //append HTML to elements
    if(followers === undefined || followers === null){followersNumber.innerHTML = '0';}
    else{followersNumber.innerHTML = followers;}
    if(following === undefined || following === null){followingNumber.innerHTML = '0'}
    else{followingNumber.innerHTML = following;}
    if(bio === undefined || bio === null){bioTag.innerHTML = 'No bio'}
    else{bioTag.innerHTML = bio;}
    if(username === undefined || username === null){usernameTag.innerHTML = 'No username'}
    else{usernameTag.innerHTML = username;}

    //if tags exist
    if(tags){
        //if there is just one tag
        if(typeof(tags) === 'string'){
            favTag1.innerHTML = tags;
        }else if(tags.length === 2){
            favTag1.innerHTML = tags[0];
            favTag2.innerHTML = tags[1];
        }
        else if(tags.length === 3){
            favTag1.innerHTML = tags[0];
            favTag2.innerHTML = tags[1];
            favTag3.innerHTML = tags[2];
        }
    }
}
//shows profile panel with user info when click on post username
function showProfile(){
    //defines username
    username = this.innerHTML;

    //fetches user info on db based on username
    fetch(`http://localhost:5001/api/userInfo/${username}`,{
    method: 'GET',
    credentials: "include",
    cache: 'default',
    headers: {
        //appends token to header so it can be checked on back-end
        'append': document.cookie.split(';')[1].split('=')[1]
    }}).then(res => {return res.json()})
    .then(data => {
        console.log(data.rows[0]);
        const username = data.rows[0].username_reference;
        const user_bio = data.rows[0].user_bio;
        const user_following = data.rows[0].user_following;
        const user_followers = data.rows[0].user_followers;
        const user_fav_tags = data.rows[0].user_favorite_tags_reference;

        //console.log(username, user_followers, user_following, user_bio, user_fav_tags);
        createUserInfo(username, user_followers, user_following, user_bio, user_fav_tags);
        if(profileContainer.style.display != 'flex'){
            toggleProfilePanel();
        }

    })

}
function follow(){
    //finds username (closest sibling)
    let username = this.previousElementSibling.innerHTML;

    //fetches api to add a counter on number of followers and to add the relationship
    fetch(`http://localhost:5001/api/userInfo/${username}`, {
    method: 'PUT',
    credentials: "include",
    cache: 'default',
    headers: {
        'append': document.cookie.split(';')[1].split('=')[1]
    }
    })
}
//*****
//*****
//*****
//*****
//*****
//*****
//Timeline*****************************************************************************************************
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

    //appends listeners
    username.addEventListener("click", showProfile);

    //append styles
    username.style.cursor='pointer';

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
            tag1.innerHTML = tags[0];
            tag2.innerHTML = tags[1];
            tag3.innerHTML = tags[2];
        }
    postTitle.innerHTML = title;
    postDescription.innerHTML = description;

    /*  <div class="post">
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

