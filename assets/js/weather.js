function getWeather(){
  
//let url = 'http://localhost:8000/basicphp/public/request/get_weather';
let url = 'https://afamilysstand.com/request/get_weather';
let headers = {'Content-Type': 'application/x-www-form-urlencoded'
  }
  //console.log('head', 'headers');
  let init = {
    method: 'GET',
    headers: headers,
  };
  
    fetch (url, init)
      .then (function (response) {
       // console.log('response', response);
       return response.json ();
      }).then (function (data) {
       // console.log('weatherr', data);
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
            card.querySelector('.low_high').textContent = Math.round(low_temp) + '/' + Math.round(high_temp);
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
    getWeather();
 
/*
{"coord":{"lon":,"lat":},
"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
"base":"stations","main":{"temp":292.12,"feels_like":291.56,"temp_min":289.82,"temp_max":294.26,
"pressure":1018,"humidity":68},"visibility":10000,"wind":{"speed":2.1,"deg":320},
"clouds":{"all":1},"dt":1598549674,"sys":{"type":1,"id":5301,"country":"US",
"sunrise":1598534498,"sunset":1598583573},"timezone":-25200,"id":5788125,
"name":"Brier","cod":200}
*/