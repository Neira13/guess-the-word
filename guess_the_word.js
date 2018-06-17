// word - state of game
var word = null;
// array of integer
var arrayForindex = [];

// start of game
function init (startWord) {
    word = startWord;

 // called on symbol
function onSymbol (symbol) {
	var pos = word.indexOf(symbol);
	
	while (pos !== -1) {
		arrayForindex.push(pos);
		pos = word.indexOf(symbol, pos + 1);
	}
	return arrayForindex;
}
