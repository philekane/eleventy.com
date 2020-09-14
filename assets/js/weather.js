/**
 * Converts kelvin temperature unit to farenheit or celcius degrees
 * 
 * @param {number} kelvin 
 * @param {string} temp_type 
 * 
 * @returns {number} either farenheit (56.9) or celcius (13.9)
 */
function convert_kelvin(kelvin, temp_type){
  let k =   Number(kelvin);
  if (temp_type == 'f')//farenheit
  {
      let degrees = (((k - 273.15) * 1.8) + 32).toFixed(1);
      return degrees;
  }
  else if(temp_type == 'c')//celcius
  {
      let degrees = (k - 273.15).toFixed(1);
      return degrees ; 
  }
}

/**
 * Converts wind degrees to human readable direction
 * 
 * Divides compass direction 360 by 22.5 gets 16 add one more because north
 * on a compass could be described as 0 degrees or 360 degrees. In array,
 * directions[0] and directions[17]. Get the remainder from wind degrees
 * modulus 360, divide by 22.5 ((deg % 360) / 22.5) to get key value of
 * directions.
 *
 * @param {number} wind direction in degrees
 * 
 * @returns {string} compass direction
 */
function convert_wind_degrees(deg){
let compassDirVal = Math.round((deg % 360) / 22.5, 0);    
let directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
return directions[compassDirVal];    
}

//defining modules to use in tests
if (typeof document == 'undefined')
{
  module.exports = {  convert_kelvin, convert_wind_degrees }
}


//this code just runs for client side
if (typeof document != 'undefined')
{ 

/**
 * Using fetch this gets the weather from an api at familysstand.com that
 * uses the Open Weather api
 * 
 * @returns {json} displays data to html
 */
function getWeather(){
  
  let url = 'https://afamilysstand.com/request/get_weather';
  let headers = {'Content-Type': 'application/x-www-form-urlencoded'
    }
  let init = {
      method: 'GET',
      headers: headers,
    };

    fetch (url, init)
      .then (function (response) {
          return response.json ();
      }).then (function (data) {
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
            card.querySelector('.current .wind .direction').textContent = convert_wind_degrees(wind_direction);
            card.querySelector('.current .temperature .value').textContent = temp;
            card.querySelector('.current .feelslike .value').textContent = feels_like;
            card.querySelector('.current .sunrise').textContent = sunrise;
            card.querySelector('.current .sunset').textContent = sunset;
            card.querySelector('.date').textContent = date;

            let iconSrc = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            let img = document.createElement('img');
            img.src =  iconSrc;
            img.alt =  description;
            document.getElementById('icon').appendChild(img);
    }).catch (function (err) {
        console.log ('Something went wrong!', err);
      });
}
    getWeather();
}
