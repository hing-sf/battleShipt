// TODO
// choose 1 or 2 player
// start game
// winner logic
// shoot missle, sink ship
// player turns
// cpu random placement
// cpu ramdom fire

battleShipt = {
	init: function () {
		this.cacheDom();
		this.buildBoardGame();
	},
	// caching DOM improve performance
	cacheDom: function () {
		this.gridContainer = document.querySelector("#game-board");
		this.dashboard = this.gridContainer.querySelector(".player-dashboard");
		this.tabs = this.gridContainer.querySelector(".nav-tabs");
		this.gameOptions = this.gridContainer.querySelector(".select-player");
		this.startGameBtn = this.gridContainer.querySelector("#start-game");
		this.playerOneShips = [];
		this.playerTwoShips = [];
		this.playerTurn = '';
		this.numOfPlayer = '';
		this.gameStarted = false;
	},
	bindEvent: function () {
		this.gridContainer.addEventListener("click", this.setShip.bind(this));
		this.tabs.addEventListener("click", this.setPlayer.bind(this));
		this.gameOptions.addEventListener("click", this.selectGameOptions.bind(this));
		this.startGameBtn.addEventListener("click", this.startGame.bind(this));
	},
	createElement: (el, classLists) => {
		const element = document.createElement(el)
		for (let className in classLists) {
			element.classList.add(classLists[className]);
		}
		return element;
	},
	selectGameOptions: (e) => {
		this.numOfPlayer = e.target.children[0].id;
		console.log(this.numOfPlayer);
	},
	startGame: (e) => {
		e.stopPropagation();
		console.log(Boolean(this.numOfPlayer))
		if ( !Boolean(this.numOfPlayer)) {
			console.log('please select number of player first. ')
		} else {
			console.log( 'start game now!! ' )
			// this.buildBoardGame();
		}
	},
	buildBoardGame: function () {
		const numberOfPosition = 120;
		const positionInColumn = 15;
		let positionCount = 0;
		let column = 0;
		let row = 0;
		let playerBoard = this.gridContainer.querySelector('.player1-board');
		// let playerTwoBoard = this.gridContainer.querySelector('.player2-board')

		for (let i = 0; i < numberOfPosition; i++) {
			positionCount / positionInColumn === row ? row++ : row;
			column === positionInColumn ? column = 1 : column++;
			positionCount++;

			let placementContainer = this.createElement('div', ['position']);
			placementContainer.setAttribute("data-coord-number", positionCount );
			placementContainer.setAttribute("data-coordinate", `${row}, ${column}`);
			playerBoard.appendChild(placementContainer);
		}
		this.bindEvent()
	},
	setPlayer: function (e) {
		e.preventDefault()
		battleShipt.playerTurn = e.target.parentElement.innerText;
		console.log(this.playerTurn)
	},
	matchCoordinate: (arr, value) => {
		return arr.some(function (item) {
			return value === item;
		});
	},
	getCoordinate: (e) => {
		const coordinate = e.target.getAttribute('data-coordinate');
		return coordinate;
	},
	setShip: (e) => {
		const maxShip = 8;
		let shipList = battleShipt.playerOneShips;
		let coordinate = battleShipt.getCoordinate(e);
		let setCoordinate = e.target;
		let shipsLen = shipList.length;
		let duplicate = battleShipt.matchCoordinate(shipList, coordinate);

		if (shipsLen >= maxShip) {
			return console.log('reach max ship = ' + maxShip)
		}
		if (coordinate === null) {
			return
		}
		if (shipsLen === 0 || !duplicate) {
			// add ship icon to board
			let setShip = battleShipt.createElement('img', ['ship']);
			setShip.setAttribute('src', './img/battleship.png');
			setShip.setAttribute('alt', 'battleship icon');

			// add coordinate to list
			let shipCoord = battleShipt.createElement('li', ['list-group-item']);
			shipCoord.innerText = `Ship ${shipsLen + 1} : row, column ${coordinate}`;

			// add elements to dom
			setCoordinate.appendChild(setShip);
			battleShipt.dashboard.appendChild(shipCoord);

			// push ship coordinate to Player List
			shipList.push(coordinate)
		} else {
			console.log('select another position');
		}
	},
	randomCoordinate: () => {

	},
	fireMissile: () => {
		let currentPlaer = this.playerTurn;

	},
	sinkShip: (coord) => {
		// const itemContainer = e.target.parentElement.parentElement;
		// const itemParent = itemContainer.parentElement;
		// itemContainer.style.transform = "scale(0)";

		// remove element after animation
		itemContainer.addEventListener("transitionend", (e) => {
			itemParent.removeChild(itemContainer);
		}, false);
	},
	winner: () => {

	}
};

battleShipt.init();