var app = angular.module("codenamesApp", []);
app.controller("CodenamesCtrl", CodenamesCtrl);

function CodenamesCtrl() {	
	initializeController(this);
	
	function initializeController(ctrl) {
		ctrl.redWins = 0;
		ctrl.blueWins = 0;
		ctrl.redLeft = 0;
		ctrl.blueLeft = 0;
		ctrl.showCodemastersTable = false;
		resetClues(ctrl);
		ctrl.firstTeam = "";
		ctrl.currentTeam = "";
		ctrl.guessesRemaining = 0;
		ctrl.message = "Welcome to Codenames";
	}
	
	function resetClues(ctrl) {
		ctrl.clueSubmitted = false;
		ctrl.offeredClueWord = "";
		ctrl.offeredClueNumber = 0;
		ctrl.currentClueWord = "";
		ctrl.currentClueNumber = 0;
	}
	
	this.toggleCodemastersTable = function() {
		this.showCodemastersTable = !this.showCodemastersTable;
	}
	
	this.submitClue = function() {
		this.currentClueWord = this.offeredClueWord;
		this.currentClueNumber = this.offeredClueNumber;
		this.clueSubmitted = true;
		this.guessesRemaining = this.currentClueNumber + 1;
	}
	
	this.revealButton = function($scope, word) {
		if (this.clueSubmitted && !$scope.clicked) {
			$scope.clicked = true;
			resolveGuess(word, this);
		}
	}
	
	function switchTeams(ctrl) {
		if (ctrl.currentTeam == 'red') {
			ctrl.currentTeam = 'blue';
		} else {
			ctrl.currentTeam = 'red';
		}
		resetClues(ctrl);
	}
	
	function resolveGuess(word, ctrl) {
		if (word.team == 'red') {
			ctrl.redLeft--;
			if (ctrl.currentTeam == 'red') {
				ctrl.guessesRemaining--;
			} else {
				switchTeams(ctrl);
			}
		} else if (word.team == 'blue') {
			ctrl.blueLeft--;
			if (ctrl.currentTeam =='blue') {
				ctrl.guessesRemaining--;
			} else {
				switchTeams(ctrl);
			}
		} else if (word.team == 'brown') {
			switchTeams(ctrl);
		} else if (word.team == 'black') {
			if (ctrl.currentTeam == 'red') {
				ctrl.blueWins++;
				ctrl.message = "Blue wins since red guessed the black card!";
			} else if (ctrl.currentTeam == 'blue') {
				ctrl.redWins++;
				ctrl.message = "Red wins since blue guessed the black card!";
			}
			ctrl.startNewGame();
		}
		if (ctrl.redLeft == 0) {
			ctrl.redWins++;
			ctrl.startNewGame();
			ctrl.message = "Red wins by guessing all words!";
		} else if (ctrl.blueLeft == 0) {
			ctrl.blueWins++;
			ctrl.startNewGame();
			ctrl.message = "Blue wins by guessing all words!";
		} else if (ctrl.guessesRemaining == 0) {
			switchTeams(ctrl);
		}
	}
	
	this.startNewGame = function() {
		resetClues(this);
		let wordBank = getWordBank();
		let wordSet = new Set();
		while (wordSet.size < 25) {
			wordSet.add(wordBank[Math.floor(Math.random()*wordBank.length)]);
		}
		this.rowList = generateRowListFromWordSet(this, wordSet);
	}
	
	this.startNewGame();

	
	function generateRowListFromWordSet(ctrl, wordSet) {
		let counter = 0;
		let index = 0;
		let colorFreqs = [8, 8, 7, 1];
		let colorNames = ["red", "blue", "brown", "black"];
		let firstTeamIndex = Math.floor(Math.random()*2);
		colorFreqs[firstTeamIndex]++;
		ctrl.redLeft = colorFreqs[0];
		ctrl.blueLeft = colorFreqs[1];
		ctrl.firstTeam = colorNames[firstTeamIndex];
		ctrl.currentTeam = colorNames[firstTeamIndex];
		let rowList = [];
		rowList.push([]);
		wordSet.forEach(function(word) {
			if (counter < 5) {
				let randomColor = Math.floor(Math.random()*4);
				while (colorFreqs[randomColor] == 0) {
					randomColor = Math.floor(Math.random()*4);
				}
				colorFreqs[randomColor]--;
				let team=colorNames[randomColor];
				rowList[index].push({
						"word" : word,
						"team" : team
				});
				counter = (counter+1)%5;
			} 
			if (counter==0) {
				index++;
				rowList.push([]);
			}
		}, this);
		return rowList;
	}

}



function getWordBank() {
	return [
		"Copper", "Jack", "Strike", "Kangaroo", "Shakespeare", "Engine", "Bolt", "China", "Shop", "Needle", 
		"Mercury", "Roulette", "Lap", "Life", "Fly", "Pit", "Root", "Penguin", "Robin", "Bridge", 
		"Band", "Fire", "Whip", "Octopus", "Well", "Hollywood", "Gas", "Cast", "Pin", "Washington", 
		"Glass", "Bear", "Pole", "Apple", "Cold", "Cricket", "Snow", "Trunk", "Pipe", "Novel", 
		"Fence", "Capital", "Court", "Spring", "Scorpion", "Canada", "Mine", "Turkey", "Train", "Field", 
		"Carrot", "Flute", "Lawyer", "Satellite", "Cover", "Cell", "Lead", "Watch", "Poison", "Tower", 
		"Compound", "Slug", "Bar", "File", "Orange", "Temple", "Pupil", "Plot", "Pie", "Knight", 
		"Slip", "Tablet", "Green", "Pass", "Berlin", "Face", "Oil", "Superhero", "Point", "Tube", 
		"Tick", "Gold", "Fighter", "Wake", "Organ", "Jam", "Straw", "Switch", "Ninja", "Olympus", 
		"Check", "Queen", "March", "Contract", "Park", "Figure", "Missile", "Paste", "Fall", "Scale", 
		"Sock", "Nut", "Moscow", "Palm", "Track", "Force", "Net", "Moon", "Bow", "Degree", 
		"Nail", "Giant", "Button", "Film", "Mug", "Concert", "Card", "Horn", "Plastic", "Dwarf", 
		"Pound", "Sub", "Australia", "Limousine", "Diamond", "Whale", "Night", "String", "Pan", "Bond", 
		"Game", "Washer", "Teacher", "Pumpkin", "New York", "Foot", "Princess", "Time", "Tie", "Table", 
		"Tag", "Ice", "France", "Block", "Match", "Iron", "Air", "Calf", "Lemon", "Bell", 
		"Wind", "Kid", "Nurse", "Leprechaun", "Czech", "Back", "Ground", "Note", "Bottle", "Forest", 
		"Cycle", "Telescope", "Drill", "Date", "Aztec", "Maple", "Death", "Stock", "Skyscraper", "Laser", 
		"Tap", "Mouth", "Spell", "Grass", "Cliff", "Lab", "Europe", "Soul", "Square", "Greece", 
		"Server", "School", "Microscope", "Jet", "Pants", "Wall", "Plane", "Rome", "Hand", "Swing", 
		"Disease", "Port", "Spy", "Unicorn", "Soldier", "Berry", "Fair", "Screen", "King", "Pitch", 
		"Staff", "Marble", "Tooth", "Play", "Revolution", "Cook", "Code", "Kiwi", "Robot", "Embassy", 
		"Row", "Pistol", "Spike", "Scientist", "Van", "Vet", "Shark", "Jupiter", "Bed", "Circle", 
		"Space", "Hook", "Smuggler", "England", "Trip", "Crane", "Ghost", "Boot", "Mouse", "War", 
		"Stadium", "Dragon", "Chocolate", "Suit", "Shot", "Cat", "Ketchup", "Witch", "America", "Ivory", 
		"Heart", "Hood", "Buffalo", "Deck", "Atlantis", "Vacuum", "Seal", "Cross", "Star", "Pool", 
		"Horse", "Pirate", "Key", "Alien", "Dice", "Ship", "Cap", "Triangle", "Thumb", "Antarctica", 
		"Scuba Diver", "Africa", "Box", "Mount", "Hole", "Beat", "Head", "Litter", "Post", "Ray", 
		"Cloak", "Board", "Bermuda", "Arm", "Log", "Loch Ness", "Rock", "London", "Pilot", "Casino", 
		"Centaur", "Shadow", "Duck", "Ring", "Parachute", "Hotel", "Snowman", "Helicopter", "Horseshoe", "Honey", 
		"Club", "Sink", "Rose", "Change", "Lion", "Police", "Wave", "Car", "Light", "Belt", 
		"Chest", "Yard", "Glove", "Stream", "Platypus", "Stick", "Chair", "Water", "Hawk", "Battery", 
		"Spot", "Piano", "Dog", "Conductor", "Model", "Tokyo", "Theater", "Egypt", "Mail", "Undertaker", 
		"Sound", "Paper", "Amazon", "Luck", "Part", "Bugle", "Germany", "Fork", "Round", "India", 
		"Shoe", "Mole", "Cotton", "Fish", "Ball", "Doctor", "Day", "Millionaire", "Himalayas", "Crown", 
		"Opera", "Pyramid", "Charge", "Beach", "Plate", "Line", "Buck", "Agent", "Thief", "Bark", 
		"Ruler", "Bomb", "Dinosaur", "Bill", "Center", "Chick", "Eagle", "Genius", "Beijing", "Racket", 
		"Torch", "State", "Fan", "Web", "Drop", "Phoenix", "Church", "Knife", "Hospital", "Saturn", 
		"Dress", "Ambulance", "Bug", "Mint", "Bat", "Mass", "Dance", "Link", "Crash", "Tail", 
		"Olive", "Grace", "Angel", "Spider", "Ham", "Draft", "Rabbit", "Ice Cream", "Boom", "Bank", 
		"Worm", "Alps", "Brush", "Lock", "Mexico", "Eye", "Spine", "Press", "Comic", "Mammoth"
	];
}

