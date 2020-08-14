let A_counts = document.querySelectorAll ('[name=A_count]');
let B_counts = document.querySelectorAll ('[name=B_count]');
let ringers = document.querySelectorAll ('[name=ringer]');

const differance = function (a_number, b_number, stage) {
  //check if numbers
  //get differance between a and b
  let dif = Math.abs (a_number - b_number);
  switch (stage) {
    case "a":
      return Number (dif);
      break;
    case "b": //for ringers
      return dif * 3;
      break;
  }  
};

const proof = function (a, b, c) {
  let array = [a, b, c];
  array.sort (function (a, b) {
    return a - b;
  });
  let min = array[0];
  let second = array[1];
  let max = array[2];
  let sum = min + second;

  if (max == sum) {
    return true;
  } else {
    return false;
  }
};

const ringerAverage = function (pitches, ringers) {
  let average = Number (ringers) / Number (pitches) * 100;
  return average.toFixed (2) + '%';
};

//get the count of pitches pitched
const getPitchCount = function () {
  let pitchNumber = localStorage.getItem ('pitchNumber');
  if (pitchNumber == null) {
    localStorage.setItem ('pitchNumber', 2);
    pitchNumber = 2;
  }
  return pitchNumber;
};
//let clearRingerButton = document.querySelector("[id=clearRingers]");
document.getElementById ('clearRingers').addEventListener ('click', function () {
    //  clearRingerButton.addEventListener("click", () => {
    document.querySelector ('input[name=ringer]:checked').checked = false;
  });

function sendData () {
  caches.keys ().then (function (names) {
    for (let name of names) caches.delete (name);
  });

  //const url = 'https://afamilysstand.com/process.php'
  // const url = 'http://localhost:8080/process.php'
  //const url = 'http://localhost:8080/horseshoeData.json'
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

//save data
document.getElementById ('saveData').addEventListener ('click', function () {
  sendData ();
  //let jsonData['pitcherALastname'] = document.getElementById("pitcherAlastName");
  const jsonData = {
    pitcherALastname: pitchersForm.pitcherAlastName.value,
    pitcherAfirstname: pitchersForm.pitcherAfirstName.value,
  };
});

//let button = document.querySelector("[id=Next]");
// button.addEventListener("click", () => {
document.getElementById ('Next').addEventListener ('click', function () {
  let pitchNumber = getPitchCount ();  
  let pitchCount = document.getElementById ('totalShoesPitched').innerText;
  if(pitchNumber > pitchCount)
  {
    localStorage.removeItem ('pitchNumber');
    let pitchNumber = getPitchCount ();      
  }

  let A_count = 0;
  if (document.querySelector ('[name=A_count]:checked') != null) {
    A_count = document.querySelector ('[name=A_count]:checked').value;
  }

  let B_count = 0;
  if (document.querySelector ('[name=B_count]:checked') != null) {
    B_count = document.querySelector ('[name=B_count]:checked').value;
  }

  if (A_count != 0) {
    set_pitchers_score ('A', A_count);
  }
  if (B_count != 0) {
    set_pitchers_score ('B', B_count);
  }
  if (A_count == 0 && B_count == 0) {
    set_pitchers_score ('B', 0);
  }
  let pitch = Number (pitchNumber) + 2;
  localStorage.setItem ('pitchNumber', pitch);
  if (pitchNumber == pitchCount) {
    //set final scores and difs
    let pitchAClass = 'pitcher-A-score-' + pitchNumber;
    let pitchBClass = 'pitcher-B-score-' + pitchNumber;
    let pitcherAScore = Number (
      document.getElementById (pitchAClass).innerText
    );
    let pitcherBScore = Number (
      document.getElementById (pitchBClass).innerText
    );
    let differance_A = differance (pitcherAScore, pitcherBScore, 'a');
    document.getElementById ('difa').innerText = differance_A;

    if (pitcherAScore > pitcherBScore) {
      alert ('Pitcher A is the winner');
    } else if (pitcherAScore == pitcherBScore) {
      alert ('The match was a tie');
    } else {
      alert ('Pitcher B is the winner');
    }

    let pitcherAringers = document.getElementById ('pitcherAtotalRingers')
      .innerText;
    let pitcherBringers = document.getElementById ('pitcherBtotalRingers')
      .innerText;
    let differance_B = differance (pitcherAringers, pitcherBringers, 'b');
    document.getElementById ('difb').innerText = differance_B;

    let singleBCount = document.getElementById ('pitcherBtotalSingles')
      .innerText;
    let singleACount = document.getElementById ('pitcherAtotalSingles')
      .innerText;
    let differance_C = differance (singleACount, singleBCount, 'a');
    document.getElementById ('difc').innerText = differance_C;

    let proofed = proof (differance_A, differance_B, differance_C);
    if (proofed == true) {
      document.getElementById ('proof').innerText = 'OK';
    } else {
      document.getElementById ('proof').innerText = 'Nope';
    }

    document.getElementById (
      'pitcherAringerAverage'
    ).innerText = ringerAverage (pitchNumber, pitcherAringers);
    document.getElementById (
      'pitcherBringerAverage'
    ).innerText = ringerAverage (pitchNumber, pitcherBringers);

    localStorage.removeItem ('pitchNumber');
  }
 
});

//get the count of ringers pitched
const ringerCount = function () {
  if (document.querySelector ('[name=ringer]:checked') != null) {
    count = document.querySelector ('[name=ringer]:checked').value;
  } else {
    count = 0;
  }
  return count;
};

//get the count of ringers pitched
const getRingers = function (count) {
  let ringersCount = ringerCount ();
  let ringers = Array;
  switch (Number (ringersCount)) {
    case 1:
      if (count == 3 || count == 4) {
        ringers[0] = '0';
        ringers[1] = '';
      }
      break;
    case 2:
      if (count == 1) {
        ringers[0] = 'X';
        ringers[1] = 'X';
      } else if (count == 6) {
        ringers[0] = '00';
        ringers[1] = '';
      }
      break;
    case 3:
      if (count == 3) {
        ringers[0] = '0X';
        ringers[1] = 'X';
      }
      break;
    case 4:
      ringers[0] = 'XX';
      ringers[1] = 'XX';
      break;
    case 0:
      ringers[0] = '';
      ringers[1] = '';
      break;
  }
  return ringers;
};

//create class for <td> example pitcher-A-Score-2
const pitcherClass = function (pitcher, tdClass) {
  let pitchClass =
    'pitcher-' + pitcher + '-' + tdClass + '-' + getPitchCount ();
  return pitchClass;
};

//get the existing score of pitcher
const existingPitcherScore = function (pitcher) {
  let pitch = getPitchCount ();
  if (pitch == 2) {
    score = 0;
  } else {
    let pitchClass = 'pitcher-' + pitcher + '-score-' + (pitch - 2);
    score = Number (document.getElementById (pitchClass).innerText);
  }
  return score;
};

//get the score of pitcher
const pitcherScore = function (pitcher, newCount) {
  let oldScore = Number (existingPitcherScore (pitcher));
  let score = oldScore + Number (newCount);
  return score;
};
const set_pitchers_score = function (pitcher, count) {
  let ringersAClass = pitcherClass ('A', 'ringer');
  let ringersBClass = pitcherClass ('B', 'ringer');
  let pitchersACountClass = pitcherClass ('A', 'count');
  let pitchersBCountClass = pitcherClass ('B', 'count');
  let pitchersAScoreClass = pitcherClass ('A', 'score');
  let pitchersBScoreClass = pitcherClass ('B', 'score');

  //if  count value 1,2 or 4 it's a single count
  if (count == 1 || count == 4) {
    origTotalSingle = document.getElementById (
      'pitcher' + pitcher + 'totalSingles'
    ).innerText;
    document.getElementById ('pitcher' + pitcher + 'totalSingles').innerText =
      Number (origTotalSingle) + 1;
  } else if (count == 2) {
    origTotalSingle = document.getElementById (
      'pitcher' + pitcher + 'totalSingles'
    ).innerText;
    document.getElementById ('pitcher' + pitcher + 'totalSingles').innerText =
      Number (origTotalSingle) + 2;
  }
  rings = getRingers (count);
  if (pitcher == 'A') {
    pitcher_A_Score = pitcherScore ('A', count);
    pitcher_B_Score = pitcherScore ('B', 0);
    ringA = rings[0];
    ringB = rings[1];
    document.getElementById (`${ringersAClass}`).innerText = ringA;
    document.getElementById (`${ringersBClass}`).innerText = ringB;

    //pitcher A cancels pitcher B count
    document.getElementById (`${pitchersACountClass}`).innerText = count;
    document.getElementById (`${pitchersBCountClass}`).innerText = 0;

    let origRingerCountA = document.getElementById ('pitcherAtotalRingers')
      .innerText;
    if (origRingerCountA == 0) {
      document.getElementById ('pitcherAtotalRingers').innerText = ringA.length;
    } else {
      document.getElementById ('pitcherAtotalRingers').innerText =
        Number (origRingerCountA) + ringA.length;
    }

    let origRingerCountB = document.getElementById ('pitcherBtotalRingers')
      .innerText;
    if (origRingerCountB == 0) {
      document.getElementById ('pitcherBtotalRingers').innerText = ringB.length;
    } else {
      document.getElementById ('pitcherBtotalRingers').innerText =
        Number (origRingerCountB) + ringB.length;
    }
  } else if (pitcher == 'B') {
    pitcher_A_Score = pitcherScore ('A', 0);
    pitcher_B_Score = pitcherScore ('B', count);
    ringB = rings[0];
    ringA = rings[1];
    document.getElementById (`${ringersBClass}`).innerText = ringB;
    document.getElementById (`${ringersAClass}`).innerText = ringA;

    //pitcher B cancels pitcher A count
    document.getElementById (`${pitchersACountClass}`).innerText = 0;
    document.getElementById (`${pitchersBCountClass}`).innerText = count;

    let origRingerCountA = document.getElementById ('pitcherAtotalRingers')
      .innerText;
    if (origRingerCountA == 0) {
      document.getElementById ('pitcherAtotalRingers').innerText = ringA.length;
    } else {
      document.getElementById ('pitcherAtotalRingers').innerText =
        Number (origRingerCountA) + ringA.length;
    }

    let origRingerCountB = document.getElementById ('pitcherBtotalRingers')
      .innerText;
    if (origRingerCountB == 0) {
      document.getElementById ('pitcherBtotalRingers').innerText = ringB.length;
    } else {
      document.getElementById ('pitcherBtotalRingers').innerText =
        Number (origRingerCountB) + ringB.length;
    }
  }
  document.getElementById (
    `${pitchersAScoreClass}`
  ).innerText = pitcher_A_Score;
  document.getElementById (
    `${pitchersBScoreClass}`
  ).innerText = pitcher_B_Score;

  document.getElementById ('pitcherAtotalScore').innerText = pitcher_A_Score;
  document.getElementById ('pitcherBtotalScore').innerText = pitcher_B_Score;
};

const validateCount = function (count) {
  let ringerNumber = ringerCount ();

  switch (count) {
    case 1:
      if (ringerNumber > 2) {
        alert ('Your count does not match your ringers');
        //clear ringers
        document.querySelector ('input[name=ringer]:checked').checked = false;
      }
      break;
    case 2:
      if (ringerNumber > 0) {
        alert ('Your count does not match your ringers');
        //clear ringers and count
        document.querySelector ('input[name=ringer]:checked').checked = false;
      }
      break;
    case 3:
      if (ringerNumber == 2 || ringerNumber == 4) {
        alert ('Your count of 3 means you should have 1 or 3 ringers');
        //remove ringers
        document.querySelector ('input[name=ringer]:checked').checked = false;
      }
      break;
    case 4:
      if (ringerNumber != 1) {
        alert ('Your count of 3 means you should have 1 ringer');
        //check one ringer
        document.getElementById ('ringerOne').checked = true;
      }
      break;
    case 6:
      if (ringerNumber != 2) {
        alert ('Your count of 6 means you should have 2 ringers');
        //check one ringer
        document.getElementById ('ringerTwo').checked = true;
      }
      break;
  }
};

for (let A_count of Array.from (A_counts)) {
  A_count.addEventListener ('change', () => {
    //clear B_count
    if (document.querySelector ('input[name=B_count]:checked')) {
      document.querySelector ('input[name=B_count]:checked').checked = false;
    }
    let pitcher_A_count = Number (A_count.value);
    validateCount (pitcher_A_count);
  });
}

for (let B_count of Array.from (B_counts)) {
  B_count.addEventListener ('change', () => {
    //clear A_count
    if (document.querySelector ('input[name=A_count]:checked')) {
      document.querySelector ('input[name=A_count]:checked').checked = false;
    }
    let pitcher_B_count = Number (B_count.value);
    validateCount (pitcher_B_count);
  });
}

for (let ringerCounts of Array.from (ringers)) {
  ringerCounts.addEventListener ('change', () => {
    ringer = ringerCounts.value;
    if (ringer == 1) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        if (A_count != 3) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=A_count]:checked'
          ).checked = false;
        }
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        if (B_count != 3) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=B_count]:checked'
          ).checked = false;
        }
      }
    }

    if (ringer == 2) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        if (A_count == 2 || A_count == 3 || A_count == 4) {
          alert ('The count you chose for 2 ringers does not match');
          document.querySelector (
            'input[name=A_count]:checked'
          ).checked = false;
        }
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        if (B_count == 2 || B_count == 3 || B_count == 4) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=B_count]:checked'
          ).checked = false;
        }
      }
    }

    if (ringer == 3) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        if (A_count != 3) {
          alert ('The count you chose for 3 ringers does not match');
          document.querySelector (
            'input[name=A_count]:checked'
          ).checked = false;
        }
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        if (B_count != 3) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=B_count]:checked'
          ).checked = false;
        }
      }
    }

    if (ringer == 4) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        alert ('4 ringers would cancel all scores');
        document.querySelector ('input[name=A_count]:checked').checked = false;
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        alert ('4 ringers would cancel all scores');
        document.querySelector ('input[name=B_count]:checked').checked = false;
      }
    }
  });
}
