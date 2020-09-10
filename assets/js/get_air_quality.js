function getAirQuality(){
  
   // let url = 'http://localhost:8000/basicphp/public/request/get_air_report';
    let url = 'https://afamilysstand.com/request/get_air_report';
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
            console.log('air quality', data);
            data.forEach((aqi) => {
                console.log('aqi', aqi.AQI);               
               theAqi =  aqi.AQI;
               discussion =  aqi.Discussion;
            })
           //console.log('aqi', theAqi);
            console.log('discussion', discussion);
            document.getElementById('aqi_discussion').textContent = discussion;
               
              
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
    getAirQuality();
   