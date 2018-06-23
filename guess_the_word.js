// Setup
var stdin = process.stdin;
stdin.resume();
stdin.setEncoding( 'utf8' );


// State
// word - state of game
var word = null;
// array of integer
var arrayForindex = [];
var sum = 0;

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
// 
function scoring(symbol) {
	var letters = {"а": 1,"б": 3,"в": 1,"г": 3,"д": 2,
                   "е": 1,"ж": 5,"з": 5,"и": 1,"й": 4,
				   "к": 2,"л": 2,"м": 2,"н": 1,"о": 1,
				   "п": 2,"р": 1,"с": 1,"т": 1,"у": 2,
				   "ф": 10,"х": 5,"ц": 5,"ч": 5,"ш": 8,
				   "щ": 10,"ъ": 10,"ы": 4,"ь": 3,"э": 8,
				   "ю": 8,"я": 3
			   }
	    if (word.indexOf(symbol) !== -1) {
			sum = letters[symbol] + sum;
		}
		return sum;
		
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
		console.log(symbol, scoring(symbol));
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