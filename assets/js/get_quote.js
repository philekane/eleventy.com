  

  const url = 'https://afamilysstand.com/token.php';

  
  function addHeader () {}
  function logResult (result) {
    console.log (result);
  }
  function logError (error) {
    console.log ('Looks like there was a problem: \n', error);
  }
  function validateTextResponse (response) {
    if (!response.ok) {
      throw Error (response.statusText);
    }
    return response;
  }

  function validateJsonResponse (response) {
    return response.json ();
  }

  function readResponseAsJSON (response) {
    return response.json ();
  }

  function readResponseJwtAsJSON (response) {
    //return response.json ();
    return response.jwt_bearer;
  }
  /**
   * Handle errors for fetch
   * @param {} response
   */
  function handleErrors (response) {
    if (!response.ok) {
      throw Error (response.statusText);
    }
    return response;
  }

  let headers = new Headers ();
  headers.append ('Content-Type', 'application/x-www-form-urlencoded');
  console.log('head', 'headers');
  let jwtInit = {
    method: 'GET',
    headers: headers,
  };

  function fetchJwtJSON (url) {
    var pathToResource = new Request (url, jwtInit);
    fetch (pathToResource) // 1
      .then (validateJsonResponse) // 2
      .then (function (readResponseJwtAsJSON) {
        let jwt = readResponseJwtAsJSON.jwt_bearer;
        let init2 = {
          method: 'POST',
          headers: headers,
          body: 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt
         };
        let tokenUrl =  'https://afamilysstand.com/request/oauth_token';
          let userRequest2 = new Request (tokenUrl, init2 );
        // Return a second API call
        // This one uses the token we received for authentication
        fetch (userRequest2)
          .then (function (response) {
            //console.log (response);
            return response.json ();
          })
          .then (function (data) {
            let access_token = data.access_token;
            let init3 = {
              //mode: 'no-cors',
              method: 'POST',
              headers: headers,
              body: 'access_token=' + access_token
             };
            let resourceUrl = 'https://afamilysstand.com/request/quotes';
            
            let userRequest3 = new Request (resourceUrl, init3);
            fetch (userRequest3)
              .then (function (response) {
               // console.log (response);
                return response.json ();
              })
              .then (function (data) {
                console.log ('quotes', data);

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
      .then (logResult) // 4
      .catch (logError);
  }

  function fetchGetJSON (getUrl) {
    var pathToResource = new Request (getUrl, getInit);
    fetch (pathToResource) // 1
      .then (validateJsonResponse)
      .then (readResponseAsText)
      .then (logResult) // 4
      .catch (logError);
  }
  
  fetchJwtJSON('http://localhost:8000/basicphp/public/request/jwt_bearer');
  

