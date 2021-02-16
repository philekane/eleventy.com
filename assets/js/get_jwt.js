/**
 * Using fetch it uses oauth2 first at api on familysstand.com gets the jwt
 * then using the jwt gets the access code and thereafter gets quotes from the 
 * quotes api.
 * 
 * @param {string} url 
 * 
 * @return {json} displays data to html
 */
  async function fetchJwtJSON (url) {
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    } 
    let jwtInit = {
        method: 'GET',
        headers: headers,
    };
    await fetch (url, jwtInit) // 1
      .then (function (responsejwt) {
        //console.log(responsejwt);
        
        return responsejwt.json ();
      }).then (function (response) {
            let jwt_token = response.jwt_bearer;
            console.log(jwt_token); 
            return jwt_token;       
          }).catch (function (err) {
            console.log ('Something went wrong!2', err);
          });
     
  }

  fetchJwtJSON('http://localhost:8000/basicphp/public/request/jwt_bearer');
  //fetchJwtJSON('https://afamilysstand.com/request/jwt_bearer');
  //fetchJwtJSON('https://afamilysstand.com/users/login';
  

