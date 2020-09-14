const assert = require('assert')
const newoperations = require('./operations.js')
//const operations = require('../assets/js/horseshoe_scoring_functions.js')
const operations = require('../assets/js/horseshoe.js')
const weatherFunctions = require('../assets/js/weather.js')

describe('Convert wind direction', function(){
  it('correctly converts to wind degrees to human readable 260 Degrees = W', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('260'), "W")
  });
  it('correctly converts to wind degrees to human readable 270 Degrees = W', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('270'), "W")
  });  
  it('correctly converts to wind degrees to human readable 350 Degrees == N', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('350'), "N")
  });
  it('correctly converts to wind degrees to human readable 360 Degrees == N', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('360'), "N")
  });
  it('correctly converts to wind degrees to human readable 010 Degrees == N', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('010'), "N")
  });
  it('correctly converts to wind degrees to human readable 330 Degrees == NNW', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('330'), "NNW")
  });
  it('correctly converts to wind degrees to human readable 340 Degrees == NNW', () => {
    assert.equal(weatherFunctions.convert_wind_degrees('340'), "NNW")
  });
  
});

describe('Test kelvin convertion', function(){
  it('correctly converts to farenheit', () => {
    assert.equal(weatherFunctions.convert_kelvin('287', "f"), '56.9')
  });
  it('correctly converts to celcius', () => {
    assert.equal(weatherFunctions.convert_kelvin('287', "c"), '13.9')
  });
});

describe('Scoring Methods', function(){
  describe('Get differences', function(){
  
    it('correctly calculates the difference of 1 and 3', () => {
      assert.equal(operations.difference(3, 1, "a"), 2)
    });
    it('correctly calculates the difference of 1 and 3 and multiplys by 3', () => {
      assert.equal(operations.difference(1, 3, "b"), 6)
    });
  });
  describe('Proof score', function(){
    it('correctly proofs that the sum of the two smaller numbers equal the larger number ', () => {
      assert.equal( operations.proof (1, 3, 2), true)   
    })
  });
  describe('Get ringer average', function(){
    it('correctly gets the average of ringers pitched ', () => {
      assert.equal( operations.ringerAverage (16, 7), '43.75%')   
    });
  })
});
describe('Ringers', function(){
  describe('Get ringers for inning 1 (2 ringers , 1 point for pitcher A )', function(){
    it('correctly gets the ringers for 2 ringers for pitcher A while scoring goes to A (X)', () => {
      let count = 1;
      let ringers = 2;
      assert.equal( operations.getRingers(count, ringers, "a", "a"), "X")
    });
    it('correctly gets the ringers for 2 ringers for pitcher B scoring goes to A (X)', () => {
      let count = 1;
      let ringers = 2;
      assert.equal( operations.getRingers(count, ringers, "a", "b"), "X")
    });
  });
  describe('Get ringers for inning 2 (1 ringer, 4 points for pitcher B )', function(){
    it('correctly gets the ringers for 1 ringer for pitcher A while scoring goes to B ()', () => {
      let count = 4;
      let ringers = 1;
      assert.equal( operations.getRingers(count, ringers, "b", "a"), "")
    });
    it('correctly gets the ringers for no ringer for pitcher B scoring goes to B (0)', () => {
      let count = 4;
      let ringers = 1;
      assert.equal( operations.getRingers(count, ringers, "b", "b"), "0")
    });
  });
  describe('Get ringers for inning 3 (no ringers, 2 points for pitcher A )', function(){
    it('correctly gets no ringers for  pitcher A while scoring goes to A ()', () => {
      let count = 2;
      let ringers = 0;
      assert.equal( operations.getRingers(count, ringers, "a", "a"), "")
    });
    it('correctly gets no ringers for pitcher B scoring goes to A ()', () => {
      let count = 2;
      let ringers = 0;
      assert.equal( operations.getRingers(count, ringers, "a", "b"), "")
    });
  });
  describe('Get ringers for inning 4 (2 ringers, 6 points for pitcher A )', function(){
    it('correctly gets the ringers for 2 ringers for pitcher A while scoring goes to A (00)', () => {
      let count = 6;
      let ringers = 2;
      assert.equal( operations.getRingers(count, ringers, "a", "a"), "00")
    });
    it('correctly gets the ringers for 2 ringers for pitcher B scoring goes to A ()', () => {
      let count = 6;
      let ringers = 2;
      assert.equal( operations.getRingers(count, ringers, "a", "b"), "")
    });
  });
  describe('Get ringers for inning 5 (3 ringers, 3 points for pitcher B )', function(){
    it('correctly gets the ringers for 3 ringers for pitcher A while scoring goes to B (X)', () => {
      let count = 3;
      let ringers = 3;
      assert.equal( operations.getRingers(count, ringers, "b", "a"), "X")
    });
    it('correctly gets the ringers for 3 ringers for pitcher B scoring goes to B (0X)', () => {
      let count = 3;
      let ringers = 3;
      assert.equal( operations.getRingers(count, ringers, "b", "b"), "0X")
    });
  });
  describe('Get ringers for inning 6 (4 dead ringers)', function(){
    it('correctly gets the ringers for 4 dead ringers(XX)', () => {
      let count = 0;
      let ringers = 4;
      assert.equal( operations.getRingers(count, ringers, "b", "a"), "XX")
    });
    it('correctly gets the ringers for 4 dead ringers(XX)', () => {
      let count = 0;
      let ringers = 4;
      assert.equal( operations.getRingers(count, ringers, "b", "b"), "XX")
    });
  });
  describe('Get ringers for inning 7 (1 ringer, 3 points for pitcher B )', function(){
    it('correctly gets the ringers for 1 ringers for pitcher A while scoring goes to B ()', () => {
      let count = 3;
      let ringers = 1;
      assert.equal( operations.getRingers(count, ringers, "b", "a"), "")
    });
    it('correctly gets the ringers for 1 ringers for pitcher B while scoring goes to B (0)', () => {
      let count = 3;
      let ringers = 1;
      assert.equal( operations.getRingers(count, ringers, "b", "b"), "0")
    });
  });
  describe('Get ringers for inning 8 (2 dead ringers, 1 point for pitcher B )', function(){
    it('correctly gets the ringers for 2 dead ringers for pitcher A while scoring goes to B (X)', () => {
      let count = 1;
      let ringers = 2;
      assert.equal( operations.getRingers(count, ringers, "b", "a"), "X")
    });
    it('correctly gets the ringers for 2 dead ringers for pitcher B while scoring goes to B (X)', () => {
      let count = 1;
      let ringers = 2;
      assert.equal( operations.getRingers(count, ringers, "b", "b"), "X")
    });
  });

});


