  let key = 'testclient';
  let secret = 'testpass';

  let headers = {'Content-Type': 'application/x-www-form-urlencoded'
  }
    let init = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret 
  };
 
  let tokenUrl =  'https://afamilysstand.com/request/oauth_token';
  
  fetch (tokenUrl, init).then (function (response) {
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
     //return data;
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
 }).catch (function (err) {
     console.log ('Something went wrong! 3', err);
   });

