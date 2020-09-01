const fetch = require("node-fetch");
let tokenUrl =  'https://afamilysstand.com/request/oauth_token';

let key = 'authclient';
let secret = 'authpass';
let reqHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
// reqHeader.append('Authorization', 'authorization_code' +' ' + 'code' + ' ' + '717f7fcf90ee661ea765f44ded2e72924a7089a4');
//reqHeader.append( 'Authorization', key + ':' + secret);
 // 'Authorization':  'code:717f7fcf90ee661ea765f44ded2e72924a7089a4' 
}

//reqHeader.append('Access-Control-Allow-Origin', '*');
let initObject = {
  //mode: 'no-cors',
  method: 'POST',
  headers: reqHeader,
  //body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret 
  body: 'grant_type=authorization_code&code=86e01760c4de5939a60edb97a2ed06d135cd&state=WA&client_id=' + key + '&client_secret=' + secret + '&redirect_uri=http://fake/' 
};
module.exports = async function() {

return fetch (tokenUrl, initObject)
  .then (response => {
    return response.json ();
  })
  .then (function (data) {
    // Log the API data
    console.log ('auth.js', data);
  })
  .catch (function (err) {
    console.log ('Something went wrong!', err);
  });
}
