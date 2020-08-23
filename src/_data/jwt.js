const nJwt = require('njwt');
//const nJwt = require('jsonwebtoken');
//const nodejws = require('node-jws');
const fs = require('fs');
const axios = require('axios');

//$public_key = file_get_contents('c:\Users\Philip Kane\afamilysstand\oauth2-server-php\test\config\keys\id_rsa.pub');
//const private_key = 'c:\Users\Philip Kane\afamilysstand\oauth2-server-php\test\config\keys\id_rsa';
//const signingKey =  'c:\Users\Philip Kane\afamilysstand\oauth2-server-php\test\config\keys\id_rsa';

//const private_key = "-----BEGIN RSA PRIVATE KEY----- MIICXQIBAAKBgQC8fpi06NfVYHAOAnxNMVnTXr/ptsLsNjP+uAt2eO0cc5J9H5XV 8lFVujOrRu/JWi1TDmAvOaf/6A3BphIA1Pwp0AAqlZdwizIum8j0KzpsGYH5qReN QDwF3oUSKMsQCCGCDHrDYifG/pRi9bN1ZVjEXPr35HJuBe+FQpZTs8DewwIDAQAB AoGARfNxNknmtx/n1bskZ/01iZRzAge6BLEE0LV6Q4gS7mkRZu/Oyiv39Sl5vUlA +WdGxLjkBwKNjxGN8Vxw9/ASd8rSsqeAUYIwAeifXrHhj5DBPQT/pDPkeFnp9B1w C6jo+3AbBQ4/b0ONSIEnCL2xGGglSIAxO17T1ViXp7lzXPECQQDe63nkRdWM0OCb oaHQPT3E26224maIstrGFUdt9yw3yJf4bOF7TtiPLlLuHsTTge3z+fG6ntC0xG56 1cl37C3ZAkEA2HdVcRGugNp/qmVz4LJTpD+WZKi73PLAO47wDOrYh9Pn2I6fcEH0 CPnggt1ko4ujvGzFTvRH64HXa6aPCv1j+wJBAMQMah3VQPNf/DlDVFEUmw9XeBZg VHaifX851aEjgXLp6qVj9IYCmLiLsAmVa9rr6P7p8asD418nZlaHUHE0eDkCQQCr uxis6GMx1Ka971jcJX2X696LoxXPd0KsvXySMupv79yagKPa8mgBiwPjrnK+EPVo cj6iochA/bSCshP/mwFrAkBHEKPi6V6gb94JinCT7x3weahbdp6bJ6/nzBH/p9VA HoT1JtwNFhGv9BCjmDydshQHfSWpY9NxlccBKL7ITm8R -----END RSA PRIVATE KEY-----";
//const public_key = '-----BEGIN CERTIFICATE----- MIICiDCCAfGgAwIBAgIBADANBgkqhkiG9w0BAQQFADA9MQswCQYDVQQGEwJVUzEL MAkGA1UECBMCVVQxITAfBgNVBAoTGFZpZ25ldHRlIENvcnBvcmF0aW9uIFNCWDAe Fw0xMTEwMTUwMzE4MjdaFw0zMTEwMTAwMzE4MjdaMD0xCzAJBgNVBAYTAlVTMQsw CQYDVQQIEwJVVDEhMB8GA1UEChMYVmlnbmV0dGUgQ29ycG9yYXRpb24gU0JYMIGf MA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8fpi06NfVYHAOAnxNMVnTXr/ptsLs NjP+uAt2eO0cc5J9H5XV8lFVujOrRu/JWi1TDmAvOaf/6A3BphIA1Pwp0AAqlZdw izIum8j0KzpsGYH5qReNQDwF3oUSKMsQCCGCDHrDYifG/pRi9bN1ZVjEXPr35HJu Be+FQpZTs8DewwIDAQABo4GXMIGUMB0GA1UdDgQWBBRe8hrEXm+Yim4YlD5Nx+1K vCYs9DBlBgNVHSMEXjBcgBRe8hrEXm+Yim4YlD5Nx+1KvCYs9KFBpD8wPTELMAkG A1UEBhMCVVMxCzAJBgNVBAgTAlVUMSEwHwYDVQQKExhWaWduZXR0ZSBDb3Jwb3Jh dGlvbiBTQliCAQAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQQFAAOBgQBjhyRD lM7vnLn6drgQVftW5V9nDFAyPAuiGvMIKFSbiAf1PxXCRn5sfJquwWKsJUi4ZGNl aViXdFmN6/F13PSM+yg63tpKy0fYqMbTM+Oe5WuSHkSW1VuYNHV+24adgNk/FRDL FRrlM1f6s9VTLWvwGItjfrof0Ba8Uq7ZDSb9Xg== -----END CERTIFICATE-----';

// The private key without line breaks
const private_key = fs.readFileSync(__dirname + '\\keys\\id_rsa', 'utf8');

//const pemHeader = "-----BEGIN RSA PRIVATE KEY-----";
//const pemFooter = "-----END RSA PRIVATE KEY-----";
//const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);

const claims = {
    iss: "biz-sites-etc",  // The URL of your service
    sub: "pkane@spindry.com",    // The UID of the user in your system
    aud: "https://afamilysstand.com",
    scope: null,
    exp: null,
    iat: null,
    nbf: null,
    jti: null
};

const jwt = nJwt.create(claims, private_key, 'RS256');
const jwt_token = jwt.compact() ;

//console.log("jwt token=", jwt_token);

module.exports = async function() {
    let tokenUrl =  'https://afamilysstand.com/request/oauth_token';
    //console.log(jwt_token);
    return axios.post(tokenUrl,
        {
           grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
           assertion:  jwt_token, 
           headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }          
        }
        )
        .then(function (response) {
            console.log(response.data)
          return response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
  }
 