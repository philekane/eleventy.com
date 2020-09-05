const nJwt = require('njwt');
const fs = require('fs');
//const axios = require('axios');
const fetch = require("node-fetch");

// The private key without line breaks
//const private_key = fs.readFileSync('c:\\Users\\Philip Kane\\realhazards.com\\src\\_data\\keys\\id_rsa', 'utf8');
//const private_key = fs.readFileSync(__dirname + '\\keys\\id_rsa', 'utf8');
//const public_key =  fs.readFileSync('c:\\Users\\Philip Kane\\realhazards.com\\src\\_data\\\keys\\id_rsa.pub', 'utf8');

const claims = {
    iss: "biz-sites-etc",  // The URL of your service
    sub: "pkane@spindry.com",    // The UID of the user in your system
    aud: "https://afamilysstand.com",
    scope: 'quotes',
    exp: null,
    iat: null,
    nbf: null,
    jti: null
};

const jwt = nJwt.create(claims, private_key, 'RS256');
const jwt_token = jwt.compact() ;

let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
let init2 = {
  method: 'POST',
  headers: headers,
  body: 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt_token
 };
let tokenUrl =  'https://afamilysstand.com/request/oauth_token';

// get access token with jwt_token
fetch (tokenUrl, init2).then (function (response) {
    //console.log (response);
    return response.json ();
  })
  .then (function (data) {
    //console.log (data);
    let access_token = data.access_token;
    let init3 = {
      method: 'POST',
      headers: headers,
      body: 'access_token=' + access_token
     };
    let resourceUrl = 'https://afamilysstand.com/request/resource';
      fetch (resourceUrl, init3)
      .then (function (response) {
        //console.log (response);
       // return response.json ();
      })
      .then (function (data) {
       // console.log (data);
      })
    })
      .catch (function (err) {
        console.log ('Something went wrong! 33', err);
      });

/*
module.exports = async function() {
  
    let tokenUrl =  'https://afamilysstand.com/request/oauth_token';
       axios.post(tokenUrl,
        {
           grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
           assertion:  jwt_token
        })
        .then(function (response) {       
           //console.log(response)
           // return response.data;
              let resourceUrl =  'https://afamilysstand.com/request/resource';
              let access_token = response.data.access_token;
                           
             //let access_token = '09f6859f2c89cbf4c97e9ee8f0cf7e2a7850243b';
            return axios.post(resourceUrl, { 
                 access_token:  access_token
                },
                {
                  mode: 'no-cors',
                  withCredentials: true,
                  credentials: 'same-origin',
                  headers: { 'Content-Type' : 'application/x-www-form-urlencoded',
                  'Accept-Encoding': 'gzip',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                   }                
              }).then(function (response) {
                  console.log('yep', response.data)
                  return response.data; 
                }).catch(function(error) {
                    console.log('errorr', error.response);
                });
      }).catch(function(error) {
          console.log('error1', error);
        });
      
        
  }
  */
 