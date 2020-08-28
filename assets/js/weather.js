function getWeather(){
/*fetch("https://accuweatherstefan-skliarovv1.p.rapidapi.com/get24HoursConditionsByLocationKey", {
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "AccuWeatherstefan-skliarovV1.p.rapidapi.com",
		"x-rapidapi-key": "129516b812msh9cca0c8323f497fp16fa04jsn83237f08b701",
		"content-type": "application/x-www-form-urlencoded"
	},
	"body": {}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
*/
let headers = {
    "Content-Type": "application/x-www-form-urlencoded", 
    'Access-Control-Allow-Origin': '*'   
}
let params1 = {
    "lat": 47.7905419,
    "lon": -122.256447,
    "appid": "1b37bd54b36727b619a4e7bed5b49b25"
}
let params = {
    lat: 47.7905419,
    lon: -122.256447,
    appid: "1b37bd54b36727b619a4e7bed5b49b25"
}
let init = {
    mode: 'no-cors',
    method: 'GET',
    headers: headers
   };
  
let url = 'https://api.openweathermap.org/data/2.5/weather' + '?lat=47.7905419&lon=-122.256447&appid=1b37bd54b36727b619a4e7bed5b49b25';
    return  fetch (url)
      .then (function (response) {
        return response.json ();
      }).then (function (data) {
        //console.log('weather', data.name);
       
        //console.log('Location', data.name);
        data.weather.forEach((weather) => {
            main = weather.main;
            description = weather.description;
            icon = weather.icon;
        })
                
           let temp = convert_kelvin(data.main.temp, 'f');
           let feels_like = convert_kelvin(data.main.feels_like, 'f');
           let low_temp = convert_kelvin(data.main.temp_min, 'f');
           let high_temp = convert_kelvin(data.main.temp_max, 'f');
           let humidity = data.main.humidity;
           let wind_speed = data.wind.speed;
           let wind_direction = data.wind.deg;
           
           let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
           let date = new Date(data.dt * 1000).toLocaleTimeString("en-US", options);
           
           let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US");
           let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US");

            const card = document.getElementById('weather_card');
            card.querySelector('.location').textContent = data.name;
            card.querySelector('.description').textContent = main;
            card.querySelector('.humidity').textContent = Math.round(humidity) + '%';
            card.querySelector('.current .wind .value').textContent =  Math.round(wind_speed);
            card.querySelector('.current .wind .direction').textContent = wind_direction;
            card.querySelector('.current .temperature .value').textContent = Math.round(temp);
            card.querySelector('.current .feelslike .value').textContent = Math.round(feels_like);
            card.querySelector('.current .sunrise').textContent = sunrise;
            card.querySelector('.current .sunset').textContent = sunset;
            card.querySelector('.date').textContent = date;
          
            let iconSrc = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            let img = document.createElement('img');
            img.src =  iconSrc;
            img.alt =  description;
            document.getElementById('icon').appendChild(img);
           
       // return data;     
    }).catch (function (err) {
        console.log ('Something went wrong!', err);
      });     

      //convert kelvin to farenheit or celcius
      function convert_kelvin(kelvin, temp_type){
        let k =   Number(kelvin);
        if (temp_type == 'f')//farenheit
        {
            let degrees = (((k - 273.15) * 1.8) + 32).toFixed(2);
            return degrees //+ '°f';
        }
        else if(temp_type == 'c')//celcius
        {
            let degrees = (k - 273.15).toFixed(2);
            return degrees //+ '°c'; 
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
   // alert("Ready!");
   getWeather();
 }, false);
/*
{"coord":{"lon":-122.26,"lat":47.79},
"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
"base":"stations","main":{"temp":292.12,"feels_like":291.56,"temp_min":289.82,"temp_max":294.26,
"pressure":1018,"humidity":68},"visibility":10000,"wind":{"speed":2.1,"deg":320},
"clouds":{"all":1},"dt":1598549674,"sys":{"type":1,"id":5301,"country":"US",
"sunrise":1598534498,"sunset":1598583573},"timezone":-25200,"id":5788125,
"name":"Brier","cod":200}
/*
47.7905419
-122.274889
api.openweathermap.org/data/2.5/weather?lat=47.7905419&lon=-122.256447&appid=1b37bd54b36727b619a4e7bed5b49b25
1b37bd54b36727b619a4e7bed5b49b25
2af1487df6ffdc6f71c55f6b14cf18ad
*/