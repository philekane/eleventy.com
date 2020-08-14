const assert = require('assert')
const operations = require('./operations.js')
//const horseshoe_operations = require('../assets/js/horseshoe.js')

it('correctly calculates the differance of 1 and 3', () => {
  assert.equal(operations.differance(1, 3, "a"), 2)
})

it('correctly calculates the differance of 1 and 3 and multiplys by 3', () => {
   assert.equal(operations.differance(1, 3, "b"), 6)
})

it('correctly proofs that the sum of two smaller numbes equal the larger number ', () => {
  assert.equal( operations.proof (1, 3, 2), true)   
})

it('correctly gets the average of ringers pitched ', () => {
  assert.equal( operations.ringerAverage (16, 7), '43.75%')   
})

it('correctly gets the ringers for 1 ringer for pitcher A scoring for A ', () => {
  let count = 3;
  let ringers = 1;
  assert.equal( operations.getRingers(count, ringers, "a", "a"), '0') 
  
})
it('correctly gets the ringers for no ringer for pitcher B scoring for A', () => {
  let count = 4;
  let ringers = 1;
  assert.equal( operations.getRingers(count, ringers, "a", "b"), '')    
})

