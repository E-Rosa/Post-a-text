const { response } = require('express');
const { Pool, Client } = require('pg')
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})


const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})
client.connect();

//getter functions
async function getUserCredentials(email){
  try{
    const res = client.query("SELECT * FROM user_credentials");
    console.log(res);
    return res;
  } catch (err){
    console.log(err);
  }
}

//get user info (for profile)
async function getUserInfo(email){
    try{
      const userInfo = client.query("SELECT * FROM user_info WHERE user_email_reference = $1", [email]);
      return userInfo;
    }catch(err){
      return err;
    }
}

//get user info (based on username)
async function getUserInfoWithUsername(username){
  try{
    const userInfo = client.query("SELECT * FROM user_info WHERE username_reference = $1", [username]);
    return userInfo;
  }catch(err){
    return err;
  }
}

//get single user password
async function getUserPass(email){
  try{
    const pass = client.query("SELECT user_password FROM user_credentials WHERE user_email = $1", [email]);
    console.log(pass);
    return pass;
  } catch (err){
    return "an error occured, try again";
  }
}

//get posts from all_posts limit 5
async function getAllPosts(){
  try{
  const posts = await client.query("SELECT post_title, post_body, post_description, post_tags_reference, post_author_reference FROM all_posts LIMIT 5");
  return posts.rows;
  }catch(err){return 'error'};
}


//checks if username is already in use
async function checkUsername(username){
  try{
    const query = client.query("SELECT user_username FROM user_credentials WHERE user_username = $1;", [username]);
    return query;
  }catch (err){
    return err;
  }
}

//checks if email is already in use
async function checkEmail(email){
  try{
    const query = client.query("SELECT user_email FROM user_credentials WHERE user_email = $1;", [email]);
    //query.then(data=>console.log(data.rowCount));
    return query;
    }
  catch (err){
    return err;
  }
}
//checkEmail('elias_rrosa@hotmail.com');


//insert username pass and email into user_credentials
async function signUserUp(email, password, username){
  try{
    const res = client.query("INSERT INTO user_credentials (user_email, user_password, user_username) VALUES ($1, $2, $3);", [email, password, username]);
    const insertUID = client.query("INSERT INTO user_info(user_uid, user_name) VALUES (uuid_generate_v4(), $1);", [username]);
    const insertReference = await client.query("UPDATE user_info SET username_reference = '$1' WHERE user_name = '$1';", [username]);
    //return res;
  } catch (err){
    return "an error occured, try again";
  }
}
//finish that function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function followUser(user_following, user_followed){
    try{
      //user followed = username
      //user follwoing = email
      //add user following +1
      client.query("UPDATE user_info SET user_following = user_following + 1 WHERE user_email_reference = $1", [user_following]);
      //add user follower +1
      client.query("UPDATE user_info SET user_followers = user_followers + 1 WHERE username_reference = $1", [user_followed]);
      //add user follower reference
      client.query("UPDATE user_info SET user_following_reference =  WHERE user_email_reference = $1", [user_following]);

    }catch(err){
      return err;
    }
}


module.exports = {getUserInfoWithUsername, getUserCredentials, signUserUp, getUserPass, getAllPosts, checkUsername, checkEmail, getUserInfo}