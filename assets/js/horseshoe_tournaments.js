const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = '/assets/img/logo.png'
logo.alt = 'logo'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()

//request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.open('GET', 'http://localhost:8080/horseshoeData.json', true)
//request.open('GET', 'http://www.horseshoepitching.com/nstats/WA.TXT', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  
  if (request.status >= 200 && request.status < 400) {
    data.forEach((pitcher) => {
     
      
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
      card.appendChild(h1)
      card.appendChild(p)

    })
  } else {
    console.log('error')
  }
}

request.send()