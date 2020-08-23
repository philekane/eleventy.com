  //save data
document.getElementById ('saveData').addEventListener ('click', function () {
  sendData ();  
});
  
  function sendData () {
  caches.keys ().then (function (names) {
    for (let name of names) caches.delete (name);
  });

  //const url = 'https://afamilysstand.com/process.php'
  // const url = 'http://localhost:8080/process.php'
  //const url = 'http://localhost:8080/horseshoeData.json'
  //const url = 'https://ghibliapi.herokuapp.com/films';
  const formName = 'pitchersForm';
  const formElement = document.forms.namedItem (formName);
  const formData = new FormData (formElement);

  //get totals that are not in the form
  const totalShoesPitched = document.getElementById ('totalShoesPitched')
    .innerText;
  const pitcherAtotalScore = document.getElementById ('pitcherAtotalScore')
    .innerText;
  const pitcherAtotalRingers = document.getElementById ('pitcherAtotalRingers')
    .innerText;
  const pitcherAtotalSingles = document.getElementById ('pitcherAtotalSingles')
    .innerText;
  const pitcherAringerAverage = document.getElementById (
    'pitcherAringerAverage'
  ).innerText;

  const pitcherBtotalScore = document.getElementById ('pitcherBtotalScore')
    .innerText;
  const pitcherBtotalRingers = document.getElementById ('pitcherBtotalRingers')
    .innerText;
  const pitcherBtotalSingles = document.getElementById ('pitcherBtotalSingles')
    .innerText;
  const pitcherBringerAverage = document.getElementById (
    'pitcherBringerAverage'
  ).innerText;
  const proof = document.getElementById ('proof').innerText;

  formData.append ('pitcher_A_total_Score', `${pitcherAtotalScore}`);
  formData.append ('pitcher_A_total_Ringers', `${pitcherAtotalRingers}`);
  formData.append ('pitcher_A_total_Singles', `${pitcherAtotalSingles}`);
  formData.append ('pitcher_A_ringer_average', `${pitcherAringerAverage}`);

  formData.append ('pitcher_B_total_Score', `${pitcherBtotalScore}`);
  formData.append ('pitcher_B_total_Ringers', `${pitcherBtotalRingers}`);
  formData.append ('pitcher_B_total_Singles', `${pitcherBtotalSingles}`);
  formData.append ('pitcher_B_ringer_average', `${pitcherBringerAverage}`);

  formData.append ('total_shoes_pitched', `${totalShoesPitched}`);
  formData.append ('proof', `${proof}`);
  formData.append ('username', 'pkane');
  //console.log(formData);

  const url = 'https://afamilysstand.com/token.php';

  function fetchWithAuthorizationCode (url) {
    let key = 'authclient';
    let secret = 'authpass';
    let reqHeader = new Headers ();
    reqHeader.append ('Content-Type', 'application/x-www-form-urlencoded');
   // reqHeader.append('Authorization', 'authorization_code' +' ' + 'code' + ' ' + '717f7fcf90ee661ea765f44ded2e72924a7089a4');
    //reqHeader.append( 'Authorization', key + ':' + secret);
   //  reqHeader.append('Authorization',  'code:717f7fcf90ee661ea765f44ded2e72924a7089a4' );
   
    //reqHeader.append('Access-Control-Allow-Origin', '*');
    let initObject = {
      //mode: 'no-cors',
      method: 'POST',
      headers: reqHeader,
      //body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret 
      body: 'grant_type=authorization_code&code=717f7fcf90ee661ea765f44ded2e72924a7089a4&state=WA&client_id=' + key + '&client_secret=' + secret  
    };
    var userRequest = new Request (url, initObject);
    fetch (userRequest)
      .then (response => {
        return response.json ();
      })
      .then (function (data) {
        // Log the API data
        console.log ('jwt', data);
      })
      .catch (function (err) {
        console.log ('Something went wrong!', err);
      });
  }

  function fetchWithClientId (url) {
    let key = 'testclient';
    let secret = 'testpass';
    let reqHeader = new Headers ();
    reqHeader.append ('Content-Type', 'application/x-www-form-urlencoded');
    //reqHeader.append('Authorization', 'authorization_code' +' ' + 'code' + ' ' + '607d61856f48e106b9b3e90968e1a8fd43fb5fc1');
    let initObject = {
      method: 'POST',
      headers: reqHeader,
      body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
    };
    var userRequest = new Request (url, initObject);
    fetch (userRequest)
      .then (response => {
        return response.json ();
      })
      .then (function (data) {
        // Log the API data
        console.log ('jwt', data);
      })
      .catch (function (err) {
        console.log ('Something went wrong!', err);
      });
  }
 
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
        //let tokenUrl =  'https://afamilysstand.com/request/api_response';
        let userRequest2 = new Request (tokenUrl, init2 );
        // Return a second API call
        // This one uses the token we received for authentication
        fetch (userRequest2)
          .then (function (response) {
            console.log (response);
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
            let resourceUrl = 'https://afamilysstand.com/request/resource';
            
            let userRequest3 = new Request (resourceUrl, init3);
            fetch (userRequest3)
              .then (function (response) {
                console.log (response);
                return response.json ();
              })
              .then (function (data) {
                console.log (data);
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
  //fetchGetJSON('http://localhost:8000/basicphp/public/request/jwt_bearer');
  fetchJwtJSON('http://localhost:8000/basicphp/public/request/jwt_bearer');
  //fetchWithClientId(url);
 // fetchWithAuthorizationCode(url);
  
}
