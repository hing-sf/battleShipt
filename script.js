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
		this.bindEvent();
		// self.buildBoardGame();
	},
	// caching DOM improve performance
	cacheDom: function () {
		self = this;
		self.gridContainer = document.querySelector("#game-board");
		self.gameOptions = document.querySelector(".select-player");
		self.startGameBtn = self.gameOptions.querySelector("#start-game");
		// self.dashboard = self.gridContainer.querySelector(".player-dashboard");
		self.tabs = self.gridContainer.querySelector(".nav-tabs");
		self.playerOneShips = [];
		self.playerTwoShips = [];
		self.numberOfPosition = 120;
		self.positionInColumn = 15;
		self.maxShip = 5;
		self.playerMove = 'player-1';
		self.numOfPlayer = '';
		self.gameStarted = false;
	},
	bindEvent: function () {
		self.gridContainer.addEventListener("click", self.setShip);
		self.tabs.addEventListener("click", self.setPlayer);
		self.gameOptions.addEventListener("click", self.selectGameOptions);
		self.startGameBtn.addEventListener("click", self.startGame);
	},
	createElement: (el, classLists) => {
		const element = document.createElement(el)
		for (let className in classLists) {
			element.classList.add(classLists[className]);
		}
		return element;
	},
	selectGameOptions: (e) => {
		self.numOfPlayer = e.target.children[0].id;
		console.log(self.numOfPlayer);
	},
	startGame: (e) => {
		e.stopPropagation();

		if ( !Boolean(self.numOfPlayer) ) {
			console.log('please select number of player first.')
		} else {
			self.gameStarted = true;
			console.log( 'start ready to game!! ' )
			self.buildBoardGame();
			self.gameOptions.style.display = 'none';
		}
	},
	buildBoardGame: function () {
		let positionCount = 0;
		let column = 0;
		let row = 0;
		let playerOneBoard = self.gridContainer.querySelector('.player1-board');
		let playerTwoBoard = self.gridContainer.querySelector('.player2-board');
		let players = [playerOneBoard, playerTwoBoard]

		players.forEach(( player ) => {
			for (let i = 0; i < self.numberOfPosition; i++) {
				positionCount / self.positionInColumn === row ? row++ : row;
				column === self.positionInColumn ? column = 1 : column++;
				positionCount++;

				let placementContainer = self.createElement('div', ['position']);
				placementContainer.setAttribute("data-coord-number", positionCount );
				placementContainer.setAttribute("data-coordinate", `${row}, ${column}`);
				player.appendChild(placementContainer);
			}
		})

	},
	setPlayer: function (e) {
		e.preventDefault()
		self.playerMove = e.target.getAttribute('data-player');
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
		let dashboard = e.target.parentElement.nextElementSibling;
		let shipList = self.playerMove === 'player-1' ? self.playerOneShips : self.playerTwoShips;
		let coordinate = self.getCoordinate(e);
		let setCoordinate = e.target;
		let shipsLen = shipList.length;
		let duplicate = self.matchCoordinate(shipList, coordinate);

		if (shipsLen >= self.maxShip) {
			return console.log('reach max ship = ' + self.maxShip)
		}
		if (coordinate === null) {
			return
		}
		// if (shipsLen === 0 || !duplicate) {
		if ( !duplicate ) {
			// add ship icon to board
			let setShip = self.createElement('img', ['ship']);
			setShip.setAttribute('src', './img/battleship.png');
			setShip.setAttribute('alt', 'battleship icon');

			// add coordinate to list
			let shipCoord = self.createElement('li', ['list-group-item']);
			shipCoord.innerText = `Ship ${shipsLen + 1} : row, column ${coordinate}`;

			// add elements to dom
			setCoordinate.appendChild(setShip);
			dashboard.appendChild(shipCoord);

			// push ship coordinate to Player List
			shipList.push(coordinate)
		} else {
			console.log('select another position');
		}
	},
	randomCoordinate: () => {
		return Math.floor(( Math.random() * self.numberOfPosition ) + 1);
	},
	fireMissile: () => {
		let currentPlaer = self.playerMove;

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