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
var arrayOfGamers = [];
// 
//var arrayOfGamers = [{name: "Вася", amountOfPoints: 3}, 
//                    {name: "Костя", amountOfPoints: 4}];

// Setters
// start of game
function init(startWord) {
    word = startWord;
}
// 
function addGamers() { 
  for (var i = 2; i < process.argv.length; i++){
	arrayOfGamers.push({name: process.argv[i] , amountOfPoints: 0});
}
}
// called on symbol
function onSymbol(symbol) {
	var pos = word.indexOf(symbol);
	
	while (pos !== -1) {
		arrayForindex.push(pos);
		pos = word.indexOf(symbol, pos + 1);
		scoring(symbol);
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
		console.log(symbol, sum);
		printWord();
		console.log();
		if (wordUnravelled()) process.exit();	
	});
}

// Gamers
function gamer(name) {
	this.name = name;
	this.game = function () {
		console.log("Игрок: " + this.name);
	}
	return this.name;
}
// Random words
function random() {
	var words = ["синтез", "буква", "джаз", 
	"надпись", "сигара", "профилакторий"];
	var word = words[Math.floor(Math.random()*words.length)];
	switch (word) {
	case 'синтез': 
		console.log("Получение сложных химических соединений из более простых.");
		break;
	case 'буква': 
		console.log("Прямой и строгий смысл чего-нибудь.");
		break;
	case 'джаз': 
		console.log("Оригинальная импровизационная музыка с неровным ритмом и темпом.");
		break;
	case 'надпись': 
		console.log("короткий текст на поверхности чего-либо.");
		break;
	case 'сигара': 
		console.log("Предмет в форме удлинённой, сужающейся на концах трубы.");
		break;
	default: 
		console.log("Медицинское учреждение.");
	}
	return word;
	
}

run(random());
addGamers();
console.log(arrayOfGamers);