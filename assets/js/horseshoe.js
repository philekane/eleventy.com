/**
 * Gets the difference between 2 numbers.
 * 
 * Using Math.abs() returns the absolute value of a number in this case
 * the difference between a_number and b_number. The stage determines if 
 * the difference need to be multiplied by 3 if this is for ringers.
 * 
 * @param {*} a_number 
 * @param {*} b_number 
 * @param {a  or b} stage 
 * 
 * @returns integer
 */
const difference = function (a_number, b_number, stage) {
  
  //get difference between a and b
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
/**
 * To proof whether the scoring is correct
 *
 * If the sum of the two smaller numbers equals the largest number then
 * it proofs okay. Sorting the 3 numbers smallest to largest then adding the
 * 2 smaller ones and comparing the sum to the largest number.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 *
 * @returns {boolean} proof
 */
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

/**
 * Averages the ringers thrown
 * 
 * Takes the number of pitches thrown and divides by ringers.
 * 
 * @param {number} pitches 
 * @param {number} ringers 
 * 
 * @returns {number} the average (ringers / pitches)
 */
const ringerAverage = function (pitches, ringers) {
  let average = Number (ringers) / Number (pitches) * 100;
  return average.toFixed (2) + '%';
};

/**
 * Gets the number of pitches pitched from local storage
 * 
 * Checks if there is a pitchcount in local storage, if not adds to storage
 * 2 because it is the first inning. If it's not the first inning add 2 to 
 * the pitchnumber.
 * 
 * @returns pitchnumber
 */
const getPitchCount = function () {
  let pitchNumber = localStorage.getItem ('pitchNumber');
  if (pitchNumber == null) {
    localStorage.setItem ('pitchNumber', 2);
    pitchNumber = 2;
  }
  return pitchNumber;
};


/**
 * Gets the value of ringers radio button selected in the form
 * 
 * @returns {number} the value of radio button checked
 */
const ringerCount = function () {
  if (document.querySelector ('[name=ringer]:checked') != null) {
    count = document.querySelector ('[name=ringer]:checked').value;
  } else {
    count = 0;
  }
  return count;
};

/**
 * Gets the ringers pitched and return what needs to be showed on the
 * scoresheet.
 * 
 * Using @ringersCount and @count to determine what should be showed on the
 * scoresheet for pitcher a and pitcher b based on who got the points @ab
 * 
 * @param {number} count 
 * @param {number} ringersCount 
 * @param {string} pitcher 
 * @param {string} ab 
 * 
 * @returns {string} example: empty, X, XX, X0, 0X
 */
const getRingers = function (count, ringersCount, pitcher, ab) {
  
  let ringers = Array;
  switch (Number (ringersCount)) {
    case 1:
      if (count == 3 || count == 4) {
        ringers[0] = '0';
        ringers[1] = '';
      }
      break;
    case 2:
      if (count == 1) {
        ringers[0] = 'X';
        ringers[1] = 'X';
      } else if (count == 6) {
        ringers[0] = '00';
        ringers[1] = '';
      }
      break;
    case 3:
      if (count == 3) {
        ringers[0] = '0X';
        ringers[1] = 'X';
      }
      break;
    case 4:
      ringers[0] = 'XX';
      ringers[1] = 'XX';
      break;
    case 0:
      ringers[0] = '';
      ringers[1] = '';
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

//defining modules to use in tests
if (typeof document == 'undefined')
{
  module.exports = {  difference, proof, ringerAverage, getPitchCount, getRingers }
}

//this code just runs for client side
if (typeof document != 'undefined')
{ 


let A_counts = document.querySelectorAll ('[name=A_count]');
let B_counts = document.querySelectorAll ('[name=B_count]');
let ringers = document.querySelectorAll ('[name=ringer]');

//let clearRingerButton = document.querySelector("[id=clearRingers]");
document.getElementById ('clearRingers').addEventListener ('click', function () {
    //  clearRingerButton.addEventListener("click", () => {
    document.querySelector ('input[name=ringer]:checked').checked = false;
  });



//let button = document.querySelector("[id=Next]");
// button.addEventListener("click", () => {
document.getElementById ('Next').addEventListener ('click', function () {
  
  let pitchNumber = getPitchCount ();  
  let pitchCount = document.getElementById ('totalShoesPitched').innerText;
  //console.log(pitchNumber);
  //console.log(pitchCount);
/*
  if(pitchNumber > pitchCount)
  {
   // localStorage.removeItem ('pitchNumber');
   //localStorage.clear();
   // localStorage.setItem ('pitchNumber', 2);
    let pitchNumber = getPitchCount (); 
    console.log(pitchNumber);
    localStorage.setItem ('pitchNumber', 2);     
  }
*/
  let A_count = 0;
  if (document.querySelector ('[name=A_count]:checked') != null) {
    A_count = document.querySelector ('[name=A_count]:checked').value;
  }

  let B_count = 0;
  if (document.querySelector ('[name=B_count]:checked') != null) {
    B_count = document.querySelector ('[name=B_count]:checked').value;
  }

  if (A_count != 0) {
    set_pitchers_score ('A', A_count);
  }
  if (B_count != 0) {
    set_pitchers_score ('B', B_count);
  }
  if (A_count == 0 && B_count == 0) {
    set_pitchers_score ('B', 0);
  }
  let pitch = Number (pitchNumber) + 2;
  localStorage.setItem ('pitchNumber', pitch);
  if (pitchNumber == pitchCount) {
    //set final scores and difs
    let pitchAClass = 'pitcher-A-score-' + pitchNumber;
    let pitchBClass = 'pitcher-B-score-' + pitchNumber;
    let pitcherAScore = Number (
      document.getElementById (pitchAClass).innerText
    );
    let pitcherBScore = Number (
      document.getElementById (pitchBClass).innerText
    );
    let difference_A = difference (pitcherAScore, pitcherBScore, 'a');
    document.getElementById ('difa').innerText = difference_A;

    if (pitcherAScore > pitcherBScore) {
      alert ('Pitcher A is the winner');
    } else if (pitcherAScore == pitcherBScore) {
      alert ('The match was a tie');
    } else {
      alert ('Pitcher B is the winner');
    }

    let pitcherAringers = document.getElementById ('pitcherAtotalRingers')
      .innerText;
    let pitcherBringers = document.getElementById ('pitcherBtotalRingers')
      .innerText;
    let difference_B = difference (pitcherAringers, pitcherBringers, 'b');
    document.getElementById ('difb').innerText = difference_B;

    let singleBCount = document.getElementById ('pitcherBtotalSingles')
      .innerText;
    let singleACount = document.getElementById ('pitcherAtotalSingles')
      .innerText;
    let difference_C = difference (singleACount, singleBCount, 'a');
    document.getElementById ('difc').innerText = difference_C;

    let proofed = proof (difference_A, difference_B, difference_C);
    if (proofed == true) {
      document.getElementById ('proof').innerText = 'OK';
    } else {
      document.getElementById ('proof').innerText = 'Nope';
    }

    document.getElementById (
      'pitcherAringerAverage'
    ).innerText = ringerAverage (pitchNumber, pitcherAringers);
    document.getElementById (
      'pitcherBringerAverage'
    ).innerText = ringerAverage (pitchNumber, pitcherBringers);

    localStorage.removeItem ('pitchNumber');
  }
 
});

//create class for <td> example pitcher-A-Score-2
const pitcherClass = function (pitcher, tdClass) {
  let pitchClass =
    'pitcher-' + pitcher + '-' + tdClass + '-' + getPitchCount ();
  return pitchClass;
};

//get the existing score of pitcher
const existingPitcherScore = function (pitcher) {
  let pitch = getPitchCount ();
  if (pitch == 2) {
    score = 0;
  } else {
    let pitchClass = 'pitcher-' + pitcher + '-score-' + (pitch - 2);
    score = Number (document.getElementById (pitchClass).innerText);
  }
  return score;
};

//get the score of pitcher
const pitcherScore = function (pitcher, newCount) {
  let oldScore = Number (existingPitcherScore (pitcher));
  let score = oldScore + Number (newCount);
  return score;
};
const set_pitchers_score = function (pitcher, count) {
  let ringersAClass = pitcherClass ('A', 'ringer');
  let ringersBClass = pitcherClass ('B', 'ringer');
  let pitchersACountClass = pitcherClass ('A', 'count');
  let pitchersBCountClass = pitcherClass ('B', 'count');
  let pitchersAScoreClass = pitcherClass ('A', 'score');
  let pitchersBScoreClass = pitcherClass ('B', 'score');

  //if  count value 1,2 or 4 it's a single count
  if (count == 1 || count == 4) {
    origTotalSingle = document.getElementById (
      'pitcher' + pitcher + 'totalSingles'
    ).innerText;
    document.getElementById ('pitcher' + pitcher + 'totalSingles').innerText =
      Number (origTotalSingle) + 1;
  } else if (count == 2) {
    origTotalSingle = document.getElementById (
      'pitcher' + pitcher + 'totalSingles'
    ).innerText;
    document.getElementById ('pitcher' + pitcher + 'totalSingles').innerText =
      Number (origTotalSingle) + 2;
  }
  let ringersCount = ringerCount ();
  if (pitcher == 'A') {
    pitcher_A_Score = pitcherScore ('A', count);
    pitcher_B_Score = pitcherScore ('B', 0);
    ringA = getRingers(count, ringersCount, "a", "a") ;
    ringB = getRingers(count, ringersCount, "a", "b") ;
    document.getElementById (`${ringersAClass}`).innerText = ringA;
    document.getElementById (`${ringersBClass}`).innerText = ringB;

    //pitcher A cancels pitcher B count
    document.getElementById (`${pitchersACountClass}`).innerText = count;
    document.getElementById (`${pitchersBCountClass}`).innerText = 0;

    let origRingerCountA = document.getElementById ('pitcherAtotalRingers')
      .innerText;
    if (origRingerCountA == 0) {
      document.getElementById ('pitcherAtotalRingers').innerText = ringA.length;
    } else {
      document.getElementById ('pitcherAtotalRingers').innerText =
        Number (origRingerCountA) + ringA.length;
    }

    let origRingerCountB = document.getElementById ('pitcherBtotalRingers')
      .innerText;
    if (origRingerCountB == 0) {
      document.getElementById ('pitcherBtotalRingers').innerText = ringB.length;
    } else {
      document.getElementById ('pitcherBtotalRingers').innerText =
        Number (origRingerCountB) + ringB.length;
    }
  } else if (pitcher == 'B') {
    pitcher_A_Score = pitcherScore ('A', 0);
    pitcher_B_Score = pitcherScore ('B', count);
    ringA = getRingers(count, ringersCount, "b", "a") ;
    ringB = getRingers(count, ringersCount, "b", "b") ;
    document.getElementById (`${ringersBClass}`).innerText = ringB;
    document.getElementById (`${ringersAClass}`).innerText = ringA;

    //pitcher B cancels pitcher A count
    document.getElementById (`${pitchersACountClass}`).innerText = 0;
    document.getElementById (`${pitchersBCountClass}`).innerText = count;

    let origRingerCountA = document.getElementById ('pitcherAtotalRingers')
      .innerText;
    if (origRingerCountA == 0) {
      document.getElementById ('pitcherAtotalRingers').innerText = ringA.length;
    } else {
      document.getElementById ('pitcherAtotalRingers').innerText =
        Number (origRingerCountA) + ringA.length;
    }

    let origRingerCountB = document.getElementById ('pitcherBtotalRingers')
      .innerText;
    if (origRingerCountB == 0) {
      document.getElementById ('pitcherBtotalRingers').innerText = ringB.length;
    } else {
      document.getElementById ('pitcherBtotalRingers').innerText =
        Number (origRingerCountB) + ringB.length;
    }
  }
  document.getElementById (`${pitchersAScoreClass}`).innerText = pitcher_A_Score;
  document.getElementById (`${pitchersBScoreClass}`).innerText = pitcher_B_Score;

  document.getElementById ('pitcherAtotalScore').innerText = pitcher_A_Score;
  document.getElementById ('pitcherBtotalScore').innerText = pitcher_B_Score;
};

const validateCount = function (count) {
  let ringerNumber = ringerCount ();

  switch (count) {
    case 1:
      if (ringerNumber > 2) {
        alert ('Your count does not match your ringers');
        //clear ringers
        document.querySelector ('input[name=ringer]:checked').checked = false;
      }
      break;
    case 2:
      if (ringerNumber > 0) {
        alert ('Your count does not match your ringers');
        //clear ringers and count
        document.querySelector ('input[name=ringer]:checked').checked = false;
      }
      break;
    case 3:
      if (ringerNumber == 2 || ringerNumber == 4) {
        alert ('Your count of 3 means you should have 1 or 3 ringers');
        //remove ringers
        document.querySelector ('input[name=ringer]:checked').checked = false;
      }
      break;
    case 4:
      if (ringerNumber != 1) {
        alert ('Your count of 3 means you should have 1 ringer');
        //check one ringer
        document.getElementById ('ringerOne').checked = true;
      }
      break;
    case 6:
      if (ringerNumber != 2) {
        alert ('Your count of 6 means you should have 2 ringers');
        //check one ringer
        document.getElementById ('ringerTwo').checked = true;
      }
      break;
  }
};

for (let A_count of Array.from (A_counts)) {
  A_count.addEventListener ('change', () => {
    //clear B_count
    if (document.querySelector ('input[name=B_count]:checked')) {
      document.querySelector ('input[name=B_count]:checked').checked = false;
    }
    let pitcher_A_count = Number (A_count.value);
    validateCount (pitcher_A_count);
  });
}

for (let B_count of Array.from (B_counts)) {
  B_count.addEventListener ('change', () => {
    //clear A_count
    if (document.querySelector ('input[name=A_count]:checked')) {
      document.querySelector ('input[name=A_count]:checked').checked = false;
    }
    let pitcher_B_count = Number (B_count.value);
    validateCount (pitcher_B_count);
  });
}

for (let ringerCounts of Array.from (ringers)) {
  ringerCounts.addEventListener ('change', () => {
    ringer = ringerCounts.value;
    if (ringer == 1) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        if (A_count != 3) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=A_count]:checked'
          ).checked = false;
        }
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        if (B_count != 3) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=B_count]:checked'
          ).checked = false;
        }
      }
    }

    if (ringer == 2) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        if (A_count == 2 || A_count == 3 || A_count == 4) {
          alert ('The count you chose for 2 ringers does not match');
          document.querySelector (
            'input[name=A_count]:checked'
          ).checked = false;
        }
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        if (B_count == 2 || B_count == 3 || B_count == 4) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=B_count]:checked'
          ).checked = false;
        }
      }
    }

    if (ringer == 3) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        if (A_count != 3) {
          alert ('The count you chose for 3 ringers does not match');
          document.querySelector (
            'input[name=A_count]:checked'
          ).checked = false;
        }
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        if (B_count != 3) {
          alert ('The count you chose for 1 ringer does not match');
          document.querySelector (
            'input[name=B_count]:checked'
          ).checked = false;
        }
      }
    }

    if (ringer == 4) {
      if (document.querySelector ('input[name=A_count]:checked')) {
        A_count = document.querySelector ('input[name=A_count]:checked').value;
        alert ('4 ringers would cancel all scores');
        document.querySelector ('input[name=A_count]:checked').checked = false;
      }
      if (document.querySelector ('input[name=B_count]:checked')) {
        B_count = document.querySelector ('input[name=B_count]:checked').value;
        alert ('4 ringers would cancel all scores');
        document.querySelector ('input[name=B_count]:checked').checked = false;
      }
    }
  });
}
}

