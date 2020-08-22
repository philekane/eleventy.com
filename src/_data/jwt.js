const nJwt = require('njwt');
//const fs = require('fs');
var axios = require('axios');
//const secureRandom = require('secure-random');
//const signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes

//$public_key = file_get_contents('c:\Users\Philip Kane\afamilysstand\oauth2-server-php\test\config\keys\id_rsa.pub');
//$private_key = file_get_contents('c:\Users\Philip Kane\afamilysstand\oauth2-server-php\test\config\keys\id_rsa');
const signingKey =  'c:\Users\Philip Kane\afamilysstand\oauth2-server-php\test\config\keys\id_rsa';


console.log("key", signingKey);
const claims = {
  iss: "biz-sites-etc",  // The URL of your service
  sub: "pkane@spindry.com",    // The UID of the user in your system
  scope: "quote",
  aud: "https://afamilysstand.com" 
}

const jwt = nJwt.create(claims, signingKey);
const jwt_token = jwt.compact();

module.exports = async function() {
    let tokenUrl =  'https://afamilysstand.com/request/oauth_token';
    console.log(jwt_token);
    return axios.post(tokenUrl,
        {
            //access_token: access_token
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion:  jwt_token
        })
        .then(function (response) {
            console.log(response.data)
          return response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
  }
  