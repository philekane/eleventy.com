/**
 * Gets air quality with fetch from api on afamilysstand.com who gets it from
 * airnow.
 * 
 * @returns {json} displays data to <iframe> html
 */
function getAirQuality(){
  
   // let url = 'http://localhost:8000/basicphp/public/request/get_air_report';
    let url = 'https://afamilysstand.com/request/get_air_report';
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
            data.forEach((aqi) => {
              discussion =  aqi.Discussion;
            })
            document.getElementById('aqi_discussion').textContent = discussion;
        }).catch (function (err) {
            console.log ('Something went wrong!', err);
          });
    }
    getAirQuality();
