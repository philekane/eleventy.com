//let A_count = document.querySelector("[name=A_count]").value;
let B_count = document.querySelector("[name=B_count]").value;

//let ringers  = document.querySelectorAll("[name=ringer]");
let A_counts = document.querySelectorAll("[name=A_count]");
let B_counts = document.querySelectorAll("[name=B_count]");

const difa = function(a_total_score, b_total_score){
 let dif = Math.abs(a_total_score - b_total_score);
 return Number(dif);
};

const difb = function(a_total_score, b_total_score){
    let dif = Math.abs(a_total_score - b_total_score);
    return dif * 3;
   };

const proof = function(a, b, c){
    let max = Math.max(a, b, c);
    let array = [a,b,c];
    array.sort(function(a, b){return a - b});
    let min = array[0];
    let second = array[1];
    let sum = min + second;   
    
    if( max == sum){
        return true;
    }
    else{
        return false;
    }
};

const ringerAverage = function(pitches, ringers){
let average = Number(ringers) / Number(pitches) * 100 ;
return average.toFixed(2) + "%";
};

let button = document.querySelector("[name=Next]");
  button.addEventListener("click", () => {
    let pitchNumber = Number(localStorage.getItem("pitchNumber"));
    if(pitchNumber == 4){
        
        alert("done");
        localStorage.removeItem("pitchNumber");
        
        //diable button
        //console.log(pitchNumber);
        //set final scores and difs
        let pitchAClass = "pitcher-A-score-" + pitchNumber;
        let pitchBClass = "pitcher-B-score-" + pitchNumber;
        let pitcherAScore =  Number(document.getElementById(pitchAClass).innerText);        
        let pitcherBScore =  Number(document.getElementById(pitchBClass).innerText);
        let diferance_A = difa(pitcherAScore, pitcherBScore);
        document.getElementById("difa").innerText = diferance_A;

        let pitcherAringers = document.getElementById("pitcherAtotalRingers").innerText;        
        let pitcherBringers = document.getElementById("pitcherBtotalRingers").innerText; 
        let diferance_B = difb(pitcherAringers, pitcherBringers);
        document.getElementById("difb").innerText = diferance_B;
       
        let singleBCount = document.getElementById("pitcherBtotalSingles").innerText;        
        let singleACount = document.getElementById("pitcherAtotalSingles").innerText; 
        let diferance_C = difa(singleACount, singleBCount);       
        document.getElementById("difc").innerText = diferance_C;

        let proofed = proof(diferance_A, diferance_B , diferance_C);
        if(proofed == true){
            document.getElementById("proof").innerText = "OK";
        }else{
            document.getElementById("proof").innerText = "Nope";
        }

        document.getElementById("pitcherAringerAverage").innerText = ringerAverage(pitchNumber, pitcherAringers);
        document.getElementById("pitcherBringerAverage").innerText = ringerAverage(pitchNumber, pitcherBringers);
        

    }else{
        let pitch = Number(pitchNumber) + 2;
        localStorage.setItem("pitchNumber", pitch);
    }
    //console.log(pitch);  

  });

//get the count of pitches pitched
//const pitchCount = () => document.querySelectorAll(".pitch").length * 2;
const pitchCount = function() {
    let pitchNumber = localStorage.getItem("pitchNumber");
   // console.log(pitchNumber);
    if( pitchNumber == null)
    {
        localStorage.setItem("pitchNumber", 2);
        pitchNumber = 2
    }
  // console.log(pitchNumber);
    return pitchNumber;
};

//get the count of ringers pitched
const ringerCount = () => document.querySelector("[name=ringer]:checked").value;

//get the count of ringers pitched
const getRingers = function (pitcher, score){
    let ringersCount = ringerCount();
    let ringers = Array;
    let ring = Array;
    switch(Number(ringersCount)){
        case 1:
            if(score == 3 || score == 4) {         
                ringers[0] = "0";
                ringers[1] = "";
            }
            break;
        case 2: 
            if(score == 1) {         
                ringers[0] = "X";
                ringers[1] = "X";
            } else if(score == 6) {         
                ringers[0] = "00";
                ringers[1] = "";
              }                      
            break;
        case 3:
            if(score == 3) {         
                ringers[0] = "0X";
                ringers[1] = "X";
                /*
                if(pitcher == "A"){
                    ringers[0] = "0X";
                    ringers[1] = "X";
                }else if(pitcher == "B"){
                    ringers[0] = "X";
                    ringers[1] = "0X";
                }
                */                
            }
            else if(score == 0 || score == 1 || score == 2 || score == 4 || score == 6 ){
                alert('Check your count of ringers');
                return;              
            }
            break;
            case 4:
                if(score == 0) {         
                ringers[0] = "XX";
                ringers[1] = "XX";
            }
            break;
        default:
            ringers[0] = "";      
            ringers[1] = "";  
    }
   /* if(pitcher == "B"   ){
        ring[0] = ringers[1];
        ring[1] = ringers[0];           
    } else{
        ring[0] = ringers[0] ;
        ring[1] = ringers[1];
        }
       */
    return ringers;
};

//create class for <td> example pitcher-A-Score-2
const pitcherClass = function(pitcher, tdClass){
    let pitchClass = "pitcher-" + pitcher + "-" + tdClass + "-" + pitchCount();
    return pitchClass;
};

//get the existing score of pitcher
const existingPitcherScore = function (pitcher){    
    let pitch = pitchCount();   
    //console.log(pitch);
    if(pitch == 2){
         score = 0;
    }
    else 
    {       
        let pitchClass = "pitcher-" + pitcher + "-score-" + (pitch - 2);
        score =  Number(document.getElementById(pitchClass).innerText);
    }
    return score;   
};

//get the score of pitcher
const pitcherScore = function (pitcher, newCount){
    let oldScore =  Number(existingPitcherScore(pitcher));
    //console.log(oldScore);
    let score = oldScore + Number(newCount);
    return score ;    
};
/*
    for (let ringer of Array.from(ringers)) {
        ringer.addEventListener("change", () => { 
            let ringerCount = ringer.value;          
              console.log(ringerCount);
        });
    }
*/
    for (let A_count of Array.from(A_counts)) {
        A_count.addEventListener("change", () => {
            
            let ringerNumber = ringerCount()           
            
            let ringersAClass       =  pitcherClass("A", "ringer");
            let ringersBClass       =  pitcherClass("B", "ringer");           
            let pitchersACountClass =  pitcherClass("A", "count");
            let pitchersBCountClass =  pitcherClass("B", "count");
            let pitchersAScoreClass =  pitcherClass("A", "score");            
            let pitchersBScoreClass =  pitcherClass("B", "score");
        
            let pitcher_A_count = A_count.value;
            //if A_count.value 1,2 or 4 it's a single count
            if(pitcher_A_count == 1 || pitcher_A_count == 4)
            {
                origTotalSingle = document.getElementById("pitcherAtotalSingles").innerText;
                document.getElementById("pitcherAtotalSingles").innerText = Number(origTotalSingle) + 1;
            }else if(pitcher_A_count == 2 ){
                origTotalSingle = document.getElementById("pitcherAtotalSingles").innerText;
                document.getElementById("pitcherAtotalSingles").innerText = Number(origTotalSingle) + 2;
            }
                        
            let pitcher_A_Score =  pitcherScore("A", A_count.value);
            let pitcher_B_Score =  pitcherScore("B", 0);
           
            rings = getRingers("A", pitcher_A_count)
            document.getElementById(`${ringersAClass}`).innerText = rings[0];
            document.getElementById(`${ringersBClass}`).innerText = rings[1];

            let ringA = rings[0];
            let ringB = rings[1];            
            let origRingerCountA = document.getElementById("pitcherAtotalRingers").innerText;
            let origRingerCountB = document.getElementById("pitcherBtotalRingers").innerText;          
            document.getElementById("pitcherAtotalRingers").innerText = Number(origRingerCountA) + ringA.length;
            document.getElementById("pitcherBtotalRingers").innerText = Number(origRingerCountB) + ringB.length;
            

            document.getElementById(`${pitchersACountClass}`).innerText = pitcher_A_count;
            document.getElementById(`${pitchersAScoreClass}`).innerText = pitcher_A_Score;
            document.getElementById(`${pitchersBScoreClass}`).innerText = pitcher_B_Score;
            //pitcher A cancels pitcher B count
            document.getElementById(`${pitchersBCountClass}`).innerText = 0;

            document.getElementById("pitcherAtotalScore").innerText = pitcher_A_Score;
            document.getElementById("pitcherBtotalScore").innerText = pitcher_B_Score;
           
           
           // console.log(getRingers(pitcher_A_count));
        });
    }

    for (let B_count of Array.from(B_counts)) {
        B_count.addEventListener("change", () => {
            let ringersAClass       =  pitcherClass("A", "ringer");
            let ringersBClass       =  pitcherClass("B", "ringer");           
            let pitchersACountClass =  pitcherClass("A", "count");
            let pitchersBCountClass =  pitcherClass("B", "count");
            let pitchersAScoreClass =  pitcherClass("A", "score");            
            let pitchersBScoreClass =  pitcherClass("B", "score");
        
            let pitcher_B_count = B_count.value;
            //add single counts
            if(pitcher_B_count == 1 || pitcher_B_count == 4)
            {
                origTotalSingle = document.getElementById("pitcherBtotalSingles").innerText;
                document.getElementById("pitcherBtotalSingles").innerText = Number(origTotalSingle) + 1;
            }else if( pitcher_B_count == 2 ){
                origTotalSingle = document.getElementById("pitcherBtotalSingles").innerText;
                document.getElementById("pitcherBtotalSingles").innerText = Number(origTotalSingle) + 2;
            }
                        
            let pitcher_B_Score =  pitcherScore("B", B_count.value);
            let pitcher_A_Score =  pitcherScore("A", 0);
           
            rings = getRingers("B", pitcher_B_count)
            document.getElementById(`${ringersBClass}`).innerText = rings[0];
            document.getElementById(`${ringersAClass}`).innerText = rings[1];

            let ringB = rings[0];
            let ringA = rings[1];            
            let origRingerCountA = document.getElementById("pitcherAtotalRingers").innerText;
            let origRingerCountB = document.getElementById("pitcherBtotalRingers").innerText;          
            document.getElementById("pitcherAtotalRingers").innerText = Number(origRingerCountA) + ringA.length;
            document.getElementById("pitcherBtotalRingers").innerText = Number(origRingerCountB) + ringB.length;
          

            document.getElementById(`${pitchersBCountClass}`).innerText = pitcher_B_count;
            document.getElementById(`${pitchersAScoreClass}`).innerText = pitcher_A_Score;
            document.getElementById(`${pitchersBScoreClass}`).innerText = pitcher_B_Score;
            //pitcher A cancels pitcher B count
            document.getElementById(`${pitchersACountClass}`).innerText = 0;
            // console.log(count);

            //add totals 
            document.getElementById("pitcherAtotalScore").innerText = pitcher_A_Score;
            document.getElementById("pitcherBtotalScore").innerText = pitcher_B_Score;
           
        });
    }