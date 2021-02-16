const add = (x, y) => +x + +y

const difference = function (a_number, b_number, stage) {
    //check if numbers
    if(Number.isInteger(stage))return undefined;
    if(!Number.isInteger(a_number))return "undefined_a";
    if(!Number.isInteger(b_number))return "undefined_b";
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

//get the count of ringers pitched
const getRingers = function (count, ringersCount, pitcher, ab) {
   // let ringersCount = ringerCount ();
    let ringers = Array;
    switch (Number (ringersCount)) {
      case 1:
        if (count == 3 || count == 4) {
          ringers[0] = '0';
          ringers[1] = '';
        }
        break;
    }
    if(pitcher == 'a')
    {
        if(ab == 'a')
        {
            return ringers[0];
        }
        else if(ab == 'b')
        {
            return ringers[1];
        }
    }
    else if(pitcher == 'b')
    {
        if(ab == 'a')
        {
            return ringers[1];
        }
        else if(ab == 'b')
        {
            return ringers[0];
        }
    }

  };
  //convert kelvin to farenheit or celcius
  function convert_kelvin(kelvin, temp_type){
    let k =   Number(kelvin);
    if (temp_type == 'f')//farenheit
    {
        let degrees = (((k - 273.15) * 1.8) + 32).toFixed(2);
        return degrees + '°f';;
    }
    else if(temp_type == 'c')//celcius
    {
        let degrees = (k - 273.15).toFixed(2);
        return degrees + '°c'; 
    }
  }
  //convert wind degrees to human readable direction
  function convert_wind_degrees(deg){
    let compassDirVal = Math.round((deg % 360) / 22.5, 0);    
    let directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
    return directions[compassDirVal];    
  }

  function checkIfIntIsInIntArray(int){

    let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      if(possibleNumbers.includes(int))
      {
       return true;
      }
      else {
        return false;
      }
  }
  const newIntArray = [];
  function addIntToNewIntArray(int){
    console.log(newIntArray);
    if(newIntArray.includes(int)){
   

    } 
    else { 
      newIntArray.push(int);
      console.log(newIntArray);
      return true;
    }
  }

module.exports = { addIntToNewIntArray, checkIfIntIsInIntArray, add, difference, proof, ringerAverage, getRingers, convert_kelvin, convert_wind_degrees }