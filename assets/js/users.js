 //save data

 const formElem = document.querySelector('form');
 formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();
 
  // construct a FormData object, which fires the formdata event
  new FormData(formElem);
});
formElem.addEventListener('formdata',  (e) => {
  
  // Get the form data from the event object
  let data = e.formData;
  console.log(data.values());
  const totalValue = [];
  for (var value of data.values()) {
  //  console.log(value);
    totalValue.push( value);
  }
  //add jwt token
  totalValue.push('kkhhhh');

  console.log('data',totalValue);
 // let url = 'http://localhost:8000/basicphp/public/users/users_login';
  let url = 'https://afamilysstand.com/users/users_login';
  
   fetch (url, { 
  method: 'post',
  body:  JSON.stringify(totalValue),
    headers: {
      'Accept': 'application/json',
    } 
  }) 
    .then (function (response) {
      //console.log('response',response);
      return response.json();
    }).then (function (data) {
      //console.log('data', data);
      let jwt = data.jwt;
      //console.log('jwt', jwt);
      //send jwt
      //let url2 = 'https://afamilysstand.com/request/oauth_token';
      let url2 = 'https://afamilysstand.com/request/testJwt';
      let init2 = {
        method: 'POST',
        body: 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        } 
      };
       fetch (url2, init2)
       .then (function (response2) {
         return response2.json ();
       }).then (function (data2) {
         console.log('data2', data2)
      }).catch (function (err2) {
        console.log ('Something went wrong2!', err2);
      });

    }).catch (function (err) {
      console.log ('Something went wrong!', err);
    });

});
