const assert = require('assert')
//const operations = require('./operations.js')
//const operations = require('../assets/js/horseshoe_scoring_functions.js')
const operations = require('../assets/js/horseshoe.js')

describe('Scoring Methods', function(){
  describe('Get differances', function(){
  
    it('correctly calculates the differance of 1 and 3', () => {
      assert.equal(operations.differance(1, 3, "a"), 2)
    });
    it('correctly calculates the differance of 1 and 3 and multiplys by 3', () => {
      assert.equal(operations.differance(1, 3, "b"), 6)
    });
  });
  describe('proof score', function(){
    it('correctly proofs that the sum of the two smaller numbers equal the larger number ', () => {
      assert.equal( operations.proof (1, 3, 2), true)   
    })
  });
  describe('get ringer average', function(){
    it('correctly gets the average of ringers pitched ', () => {
      assert.equal( operations.ringerAverage (16, 7), '43.75%')   
    });
  })
});
/*describe('Ringers', function(){
  describe('get ringers', function(){
    it('correctly gets the ringers for 1 ringer for pitcher A scoring for A ', () => {
      let count = 3;
      let ringers = 1;
      assert.equal( operations.getRingers(count, ringers, "a", "a"), '0') 
      
    });
    it('correctly gets the ringers for no ringer for pitcher B scoring for A', () => {
      let count = 4;
      let ringers = 1;
      assert.equal( operations.getRingers(count, ringers, "a", "b"), '')    
    });
  });
});
*/

