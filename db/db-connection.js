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

    return res;
  } catch (err){
    console.log(err);
  }

}
getUserCredentials();

module.exports = {getUserCredentials}