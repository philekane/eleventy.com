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

module.exports = { add, difference, proof, ringerAverage, getRingers }