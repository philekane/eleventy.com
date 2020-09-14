
  function logResult (result) {
    console.log (result);
   }
  function logError (error) {
    console.log ('Looks like there was a problem: \n', error);
  }
  
  function validateJsonResponse (response) {
    return response.json ();
  }

  function readResponseJwtAsJSON (response) {
    //return response.json ();
    return response.jwt_bearer;
  }
  
  let headers = {'Content-Type': 'application/x-www-form-urlencoded'
  }
 
  let jwtInit = {
    method: 'GET',
    headers: headers,
  };

/**
 * Using fetch it uses oauth2 first at api on familysstand.com gets the jwt
 * then using the jwt gets the access code and thereafter gets quotes from the 
 * quotes api.
 * 
 * @param {string} url 
 * 
 * @return {json} displays data to html
 */
  function fetchJwtJSON (url) {
    let headers = {'Content-Type': 'application/x-www-form-urlencoded'
  }
 
  let jwtInit = {
    method: 'GET',
    headers: headers,
  };
    fetch (url, jwtInit) // 1
      .then (validateJsonResponse) // 2
      .then (function (readResponseJwtAsJSON) {
        let jwt = readResponseJwtAsJSON.jwt_bearer;
        let init2 = {
          method: 'POST',
          headers: headers,
          body: 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt
         };
        let tokenUrl =  'https://afamilysstand.com/request/oauth_token';
         // Return a second API call
        // This one uses the token we received for authentication
        fetch (tokenUrl, init2)
          .then (function (response) {
            return response.json ();
          })
          .then (function (data) {
            let access_token = data.access_token;
          
            let init3 = {
              method: 'POST',
              headers: headers,
              body: 'access_token=' + access_token
             };
            let resourceUrl = 'https://afamilysstand.com/request/quotes';
            
            fetch (resourceUrl, init3)
              .then (function (response) {
                return response.json ();
              })
              .then (function (data) {
                const card = document.getElementById('quote_card');
                const h1 = document.createElement('h1');
                h1.textContent = data.quote_title;
                const quote = document.createElement('p');
                quote.textContent = data.quote;
                const title = document.createElement('p');
                title.setAttribute('class', 'italics') ;
                title.textContent = data.book_title;
                const author = document.createElement('p');
                author.textContent = data.Author;
               
                card.appendChild(h1);
                card.appendChild(quote);
                card.appendChild(title);
                card.appendChild(author);
               
              })
              .catch (function (err) {
                console.log ('Something went wrong! 3', err);
              });
          })
          .catch (function (err) {
            console.log ('Something went wrong!2', err);
          });
      })
      .catch (logError);
  }

  //fetchJwtJSON('http://localhost:8000/basicphp/public/request/jwt_bearer');
  fetchJwtJSON('https://afamilysstand.com/request/jwt_bearer');
  

