// Setup
var stdin = process.stdin;
stdin.resume();
stdin.setEncoding( 'utf8' );


// State
// word - state of game
var word = null;
// array of integer
var arrayForindex = [];

// Setters
// start of game
function init(startWord) {
    word = startWord;
}
// called on symbol
function onSymbol(symbol) {
	var pos = word.indexOf(symbol);
	
	while (pos !== -1) {
		arrayForindex.push(pos);
		pos = word.indexOf(symbol, pos + 1);
	}
	return arrayForindex;
}
// 
function printWord() {
	for (i=0; i < word.length; i++) {
		if (arrayForindex.includes(i)) {
			process.stdout.write(word[i]);
		} else {
			process.stdout.write("*");
		}
	}
	
}

// Getters
function wordUnravelled() {
	return word.length <= arrayForindex.length
}

// Main(State, Setters, Getters)
function run(startWord) {
	init(startWord);
	process.stdin.setRawMode(true);
	process.stdin.on('data', function(symbol) {
		onSymbol(symbol);
		console.log(symbol);
		printWord();
		console.log();
		if (wordUnravelled()) process.exit();	
	});
}
// Random words
function random() {
	var words = ["транспорт", "акустика", "футбол", 
	"программист", "рейс", "континент"];
	var word = words[Math.floor(Math.random()*words.length)];
	return word;
	
}
run(random());