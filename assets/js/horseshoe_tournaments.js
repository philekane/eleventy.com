//var axios = require('axios')
const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = '/assets/img/logo.png'
logo.alt = 'logo'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

let url = 'http://localhost:8080/horseshoeData2.json';
let reqHeader = new Headers();
reqHeader.append('Content-Type', 'text/json');

let initObject = {
    method: 'Get',
    headers: reqHeader
};
const userRequest = new Request(url, initObject);

const fetch_pitchers = function(){ 
  let url = 'http://localhost:8080/horseshoeData.json';
  let reqHeader = new Headers();
  reqHeader.append('Content-Type', 'text/json');
  
  let initObject = {
      method: 'Get',
      headers: reqHeader
  };
    const userRequest = new Request(url, initObject);
    fetch(userRequest).then(function (response) {
    return response.json();            
  }).then(function (data) {
    return data;
  }).catch(function (err) {
    console.log("Something went wrong!", err);
  });
}



/*
fetch(userRequest)
    .then(function (response) {
      return response.json();            
    }).then(function (data) {
      //work with Json data here
      data.pitchers.forEach((pitcher) => {
      
      // Create a div with a card class
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1')
      h1.textContent = pitcher.nhpaNumber

      // Create a p and set the text content to the film's description
      const p = document.createElement('p')
      pitcherName = pitcher.firstName + " " + pitcher.lastName
      p.textContent = pitcherName 
      
      var details = ['State: ' + pitcher.state, 'Division: ' +pitcher.division]     
      const list = document.createElement('ul')
      
       details.forEach(function (detail) {
        var li = document.createElement('li');
	      li.textContent = detail;
        list.appendChild(li);
      })
      p.appendChild(list);
     
     
     // Append the cards to the container element
      container.appendChild(card)

      // Each card will contain an h1 and a p
      card.appendChild(h1);
      card.appendChild(p);
      })
    
    }).catch(function (err) {
        console.log("Something went wrong!", err);
    });
*/

module.exports = { fetch_pitchers, pitchers2 }