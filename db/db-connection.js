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
async function getUserCredentials(){
  try{
    const res = client.query("SELECT * FROM user_credentials");
    console.log(res);
    return res;
  } catch (err){
    console.log(err);
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


async function signUserUp(email, password, username){
  try{
    const res = client.query("INSERT INTO user_credentials (user_uid, user_email, user_password, user_username) VALUES (uuid_generate_v4(), $1, $2, $3)", [email, password, username]);
    return res;
  } catch (err){
    return "an error occured, try again";
  }
}


module.exports = {getUserCredentials, signUserUp, getUserPass}