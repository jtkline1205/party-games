import React from 'react';
import style from './codenames.css'

function CodemastersGrid(props) {
	let tableRows = [];

	for (var i=0; i<props.rowList.length; i++) {
		let tableRow = []
		let list = props.rowList[i];
		for (var j=0; j<list.length; j++) {
			if (list[j].team == 'red') {
				tableRow.push(<td key={j}><div className={style.squareRed}><span></span></div></td>)
			} else if (list[j].team == 'blue') {
				tableRow.push(<td key={j}><div className={style.squareBlue}><span></span></div></td>)
			} else if (list[j].team == 'brown') {
				tableRow.push(<td key={j}><div className={style.squareBrown}><span></span></div></td>)
			} else if (list[j].team == 'black') {
				tableRow.push(<td key={j}><div className={style.squareBlack}><span></span></div></td>)
			}
			
		}
		tableRows.push(<tr key={i}>{tableRow}</tr>);
	}

	return tableRows;
}

function WordGrid(props) {
	let tableRows = [];
	for (var i=0; i<props.rowList.length; i++) {
		let tableRow = []
		let list = props.rowList[i];
		for (var j=0; j<list.length; j++) {
			tableRow.push(<td key={j}><div><button name={list[j].team} onClick={(e => props.revealButton(e))}>{list[j].word}</button></div></td>)
		}
		tableRows.push(<tr key={i}>{tableRow}</tr>);
	}

	return <div className={style.wordGridSection}>
		<table className={style.center}>
	<tbody>
		{tableRows}
	</tbody>
</table>
</div>
}

function NewRoundButton(props) {
	return <button className={style.newRoundButton} onClick={props.startNewRound}>
	<span className={style.redWins}>{props.redWins}</span>
	<span className={style.blueWins}>{props.blueWins}</span>
	<br/>
	New Round
</button>
}

function ShowCodemastersGridButton(props) {
	return <button onClick={props.toggleCodemastersTable} className={style.codemastersGridButton}>
	{!props.showCodemastersTable && 
	<span>Show Codemasters Grid</span>}
{props.showCodemastersTable && 
	<table className={style.center}>
		<tbody>
			<tr>
				{props.firstTeam=='red' && <td className={style.firstTeamIndicatorRed} colSpan={5}>	
				</td>}
				{props.firstTeam=='blue' && <td className={style.firstTeamIndicatorBlue} colSpan={5}>	
				</td>}
			</tr>
			<CodemastersGrid rowList={props.rowList}/>
		</tbody>
	</table>}
</button>
}

function GameStatus(props) {
	return <div className={style.gameStatus}>
			<table className={style.center}>
				<tbody>
					<tr>	
						<td>	
							<NewRoundButton 
								startNewRound={props.thing.startNewRound}
								redWins={props.thing.state.redWins}
								blueWins={props.thing.state.blueWins}/>
						</td>
						<td>
							<ShowCodemastersGridButton
								showCodemastersTable={props.thing.state.showCodemastersTable}
								toggleCodemastersTable={props.thing.toggleCodemastersTable}
								firstTeam={props.thing.state.firstTeam}
								rowList={props.thing.state.rowList}
							/>
						</td>							
					</tr>
				</tbody>
			</table>
			<br/>
			<table className={style.center}>
				<tbody>
				<tr>
					{props.thing.state.currentTeam == 'red' && <td className={style.teamIconRed}></td>}
					{props.thing.state.currentTeam == 'blue' && <td className={style.teamIconBlue}></td>}
				</tr>
				</tbody>
			</table>
			{
			!props.thing.state.clueSubmitted && 
			<form onSubmit={props.thing.submitClue}>
			<input name="offeredClueWord" type="text" onChange={props.thing.handleInputChange} value={props.thing.state.offeredClueWord} />
			<input name="offeredClueNumber" type="number" onChange={props.thing.handleInputChange} value={props.thing.state.offeredClueNumber} />
			<button type="submit" >Submit Clue</button>
			</form>
			}
			{props.thing.state.clueSubmitted && 
			<span>{props.thing.state.currentClueWord + "   |   " + props.thing.state.currentClueNumber}</span>
			}
			<br/>
			<span className={style.redWins}>{props.thing.state.redLeft}</span>
			<span className={style.blueWins}>{props.thing.state.blueLeft}</span>
			<br/>
			{props.thing.state.clueSubmitted && <span>Guesses remaining: {props.thing.state.guessesRemaining}</span>}
			<br/>
			{props.thing.state.message}
</div>

}

export default class Codenames extends React.Component {
	constructor(props) {
		super(props);
		let wordBank = this.getWordBank();
		let wordSet = new Set();
		while (wordSet.size < 25) {
			wordSet.add(wordBank[Math.floor(Math.random() * wordBank.length)]);
		}
		let colorFreqs = [8, 8, 7, 1];
		let colorNames = ["red", "blue", "brown", "black"];
		let firstTeamIndex = Math.floor(Math.random() * 2);
		colorFreqs[firstTeamIndex]++;
		this.state = {
			message: "Welcome to Codenames",
			redWins: 0,
			blueWins: 0,
			redLeft: colorFreqs[0],
			blueLeft: colorFreqs[1],
			showCodemastersTable: false,
			guessesRemaining: 0,
			rowList: this.generateRowListFromWordSet(wordSet, colorFreqs, colorNames),
			firstTeam: colorNames[firstTeamIndex],
			currentTeam: colorNames[firstTeamIndex],
			offeredClueNumber: 0,
			offeredClueWord: "",
			wordsClickedSet: new Set()
		}
		this.startNewRound = this.startNewRound.bind(this);
		this.toggleCodemastersTable = this.toggleCodemastersTable.bind(this);
		this.submitClue = this.submitClue.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.revealButton = this.revealButton.bind(this);
	}

	resetClues() {
		console.log("Resetting clues");
		this.setState((state) => ({
			clueSubmitted: false,
			offeredClueWord: "",
			offeredClueNumber: 0,
			currentClueWord: "",
			currentClueNumber: 0,
			wordsClickedSet: new Set()
		}));
	}

	toggleCodemastersTable() {
		console.log("Toggling codemasters table");
		this.setState((state) => ({
			showCodemastersTable: !this.state.showCodemastersTable
		}));
	}

	submitClue(event) {
		console.log("Submitting clue");
		event.preventDefault();
		this.setState((state) => ({
			currentClueWord: this.state.offeredClueWord,
			currentClueNumber: this.state.offeredClueNumber,
			clueSubmitted: true,
			guessesRemaining: parseInt(this.state.offeredClueNumber) + 1
		}));
	}

	handleInputChange(event) {
		console.log("Handling input change");
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value
		});
	}

	revealButton(event) {
		console.log("Revealing button");
		console.log(event.target);
		console.log(event.target.innerHTML);
		console.log(event.target.name);
		let word = event.target.innerHTML;
		let team = event.target.name;
		// let newRowList = [...this.state.rowList];
		// for (let i=0; i<newRowList.length; i++) {
		// 	for (let j=0; j<newRowList[0].length; j++) {
		// 		console.log(i + " " + j);
		// 		console.log(newRowList[i][j].word);
		// 		if (newRowList[i][j].word == word) {
		// 			newRowList[i][j].clicked = true;
		// 		}
		// 	}	
		// }
		// this.setState((state) => ({
		// 	rowList: newRowList
		// }));
		if (this.state.clueSubmitted && !this.state.wordsClickedSet.has(word)) {
			console.log("Adding word to clicked set: " + word);
			this.setState((state) => ({
				wordsClickedSet: this.state.wordsClickedSet.add(word)
			}));
			this.resolveGuess(word, team);

		}
	}

	switchTeams() {
		console.log("Switching teams");
		if (this.state.currentTeam == 'red') {
			this.setState((state) => ({
				currentTeam: "blue"
			}));
		} else {
			this.setState((state) => ({
				currentTeam: "red"
			}));
		}
	}

	resolveGuess(word, team) {
		console.log("Resolving guess");
		if (team == 'red') {
			console.log("team was red");
			if (this.state.redLeft == 1) {
				this.setState((state) => ({
					redWins: this.state.redWins+1,
					message: "Red wins by guessing all words!"
				}));
				this.startNewRound();
			} else {
				this.setState((state) => ({
					redLeft: this.state.redLeft-1
				}));
				if (this.state.currentTeam == 'red') {
					if (this.state.guessesRemaining == 1) {
						this.switchTeams();
						this.resetClues();
					} else {
						this.setState((state) => ({
							guessesRemaining: this.state.guessesRemaining-1
						}));
					}
				} else {
					this.switchTeams();
					this.resetClues();
				}
			}
		} else if (team == 'blue') {
			console.log("team was blue");
			if (this.state.blueLeft == 1) {
				this.setState((state) => ({
					blueWins: this.state.blueWins+1,
					message: "Blue wins by guessing all words!"
				}));
				this.startNewRound();
			} else {
				this.setState((state) => ({
					blueLeft: this.state.blueLeft-1
				}));
				if (this.state.currentTeam == 'blue') {
					if (this.state.guessesRemaining == 1) {
						this.switchTeams();
						this.resetClues();
					} else {
						this.setState((state) => ({
							guessesRemaining: this.state.guessesRemaining-1
						}));
					}
				} else {
					this.switchTeams();
					this.resetClues();
				}
			}
		} else if (team == 'brown') {
			console.log("team was brown");
			this.switchTeams();
			this.resetClues();
		} else if (team == 'black') {
			console.log("team was black");
			if (this.state.currentTeam == 'red') {
				this.setState((state) => ({
					blueWins: this.state.blueWins+1,
					message: "Blue wins since red guessed the black card!"
				}));
			} else if (this.state.currentTeam == 'blue') {
				this.setState((state) => ({
					redWins: this.state.redWins+1,
					message: "Red wins since blue guessed the black card!"
				}));
			}
			this.startNewRound();
		}
	}

	startNewRound() {
		console.log("Starting new round");
		this.resetClues();
		let wordBank = this.getWordBank();
		let wordSet = new Set();
		let colorFreqs = [8, 8, 7, 1];
		let colorNames = ["red", "blue", "brown", "black"];
		let firstTeamIndex = Math.floor(Math.random() * 2);
		colorFreqs[firstTeamIndex]++;
		while (wordSet.size < 25) {
			wordSet.add(wordBank[Math.floor(Math.random() * wordBank.length)]);
		}
		this.setState((state) => ({
			redLeft: colorFreqs[0],
			blueLeft: colorFreqs[1],
			rowList: this.generateRowListFromWordSet(wordSet, colorFreqs, colorNames),
			firstTeam: colorNames[firstTeamIndex],
			currentTeam: colorNames[firstTeamIndex]
		}));
	}

	generateRowListFromWordSet(wordSet, colorFreqs, colorNames) {
		console.log("Generating row list");
		let counter = 0;
		let index = 0;
		wordSet = Array.from(wordSet);
		let rowList = [];
		rowList.push([]);
		for (let i=0; i<wordSet.length; i++) {
			if (counter < 5) {
				let randomColor = Math.floor(Math.random() * 4);
				while (colorFreqs[randomColor] == 0) {
					randomColor = Math.floor(Math.random() * 4);
				}
				colorFreqs[randomColor]--;
				let team = colorNames[randomColor];
				let wordObject = {"word": wordSet[i],
				"team": team, 
				"clicked": false};
				rowList[index].push(wordObject);
				counter = (counter + 1) % 5;
			}
			if (counter == 0) {
				index++;
				// if (i!=wordSet.length -1) {
					rowList.push([]);
				// }
			}
		}
		
		return rowList;
	}

	getWordBank() {
		console.log("Getting word bank");
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

	componentDidMount() {
		// this.startNewRound();
		this.resetClues();
	}

	render() {
		return <div className={style.center}>
			<h5>Codenames</h5>
			{this.state.message}
			<GameStatus thing={this}/>
			<WordGrid  rowList={this.state.rowList} revealButton={this.revealButton}/>
		</div>
	}

}
