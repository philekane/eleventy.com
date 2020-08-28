const nJwt = require('njwt');
const fs = require('fs');
const fetch = require("node-fetch");

module.exports = async function() {
// The private key without line breaks
const private_key = fs.readFileSync('c:\\Users\\Philip Kane\\realhazards.com\\src\\_data\\keys\\id_rsa', 'utf8');
//const private_key = fs.readFileSync(__dirname + '\\keys\\id_rsa', 'utf8');

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
 return fetch (tokenUrl, init2).then (function (response) {
     return response.json ();
  }).then (function (data) {
    let access_token = data.access_token;
    let init3 = {
      method: 'POST',
      headers: headers,
      body: 'access_token=' + access_token
     };
    let quotesUrl = 'https://afamilysstand.com/request/quotes';
    return  fetch (quotesUrl, init3)
      .then (function (response) {
        return response.json();
      }).then (function (data) {
        //console.log('quote', data2);
        return data;
      })
    }).catch (function (err) {
        console.log ('Something went wrong! 3', err);
      });
    }
