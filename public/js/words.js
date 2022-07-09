const { geoSearch } = require('../../models/request');
const wordsData = require('../json/words_dictionary.json');

var wordArray = (Object.keys(wordsData));

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


function getFiveWords() {
let words = [];
for (let index = 0; index < 12; index++) {
    let w ="";
    while (w.length>7 || w.length<4) {
        w = wordArray[randomInteger(2000,30000)];
    }
words.unshift(w)
    
}
console.log(words)
}


getFiveWords()

  