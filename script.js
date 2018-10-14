// TODO
// winner logic
// shoot missle, sink ship
// player turns
// cpu ramdom fire

battleShipt = {
	init: function () {
		this.cacheDom();
		this.bindEvent();
	},
	// caching DOM improve performance
	cacheDom: function () {
		self = this;
		self.gridContainer = document.querySelector("#game-board");
		self.gameOptions = document.querySelector(".select-player");
		self.startGameBtn = self.gameOptions.querySelector("#start-game");
		self.player1Board = self.gridContainer.querySelector('.player1-board');
		self.player2Board = self.gridContainer.querySelector('.player2-board');
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

		if (!Boolean(self.numOfPlayer)) {
			console.log('please select number of player first.')
		} else {
			console.log('get ready to battle!!')
			self.buildBoardGame();
			self.gameOptions.style.display = 'none';
		}
	},
	buildBoardGame: function () {
		let positionCount = 0;
		let column = 0;
		let row = 0;

		[self.player1Board, self.player2Board].forEach((player) => {
			for (let i = 0; i < self.numberOfPosition * 2; i++) {
				positionCount / self.positionInColumn === row ? row++ : row;
				column === self.positionInColumn ? column = 1 : column++;
				let playerClass = positionCount <= self.numberOfPosition ? ['position', 'player-2'] : ['position', 'player-1'];
				positionCount++;

				let placementContainer = self.createElement('div', playerClass);
				placementContainer.setAttribute("data-coord-number", positionCount);
				placementContainer.setAttribute("data-coordinate", `${row}, ${column}`);
				player.appendChild(placementContainer);
			}
			positionCount = 0;
			column = 0;
			row = 0;
		})

		// set CPU ships
		if (self.numOfPlayer === '1player') {
			while (self.playerTwoShips.length < self.maxShip) {
				self.playerMove = 'player-2';
				let position = self.player2Board.querySelectorAll(`[data-coord-number="${ self.randomCoordinate() }"]`)[0];
				let getRandomCoord = position.getAttribute('data-coordinate');
				self.setShip(null, position, getRandomCoord)
			}
			self.playerMove = 'player-1'
		}

	},
	setPlayer: function (e) {
		e.preventDefault()
		self.playerMove = e.target.getAttribute('data-player');
	},
	matchCoordinate: (arr, value) => {
		return arr.some(function (item) {
				return value === item
		});
	},
	getCoordinate: (e) => {
		const coordinate = e.target.getAttribute('data-coordinate');
		return coordinate;
	},
	setShip: (e, cpuPosition, cpuCoord) => {
		if( self.gameStarted === true ) { self.fireMissile(e); return }
		let dashboard = cpuCoord ? self.player2Board.nextElementSibling : e.target.parentElement.nextElementSibling;
		let shipList = self.playerMove === 'player-1' ? self.playerOneShips : self.playerTwoShips;
		let coordinate = cpuCoord || self.getCoordinate(e);
		let coordinateContainer = cpuPosition || e.target;
		let shipsLen = shipList.length;
		let duplicate = self.matchCoordinate(shipList, coordinate);
		let coordNumber = coordinateContainer.getAttribute('data-coord-number');

		if (self.playerMove === 'player-1' && coordNumber <= self.numberOfPosition) {
			return console.log('your setting ship in enemy territory');
		}

		if (shipsLen >= self.maxShip) {
			return console.log('reach max ship = ' + self.maxShip)
		}

		// clicked on empty space
		if (coordinate === null) {
			return
		}

		// set ship if not duplicate
		if (!duplicate) {
			// add ship icon to board
			let setShip = self.createElement('img', ['ship']);
			setShip.setAttribute('src', './img/battleship.png');
			setShip.setAttribute('alt', 'battleship icon');

			// add coordinate to list
			let shipCoord = self.createElement('li', ['list-group-item']);
			shipCoord.innerText = `Ship ${shipsLen + 1} | Coordinate Number ${coordNumber} | row, column ${coordinate}`;

			// add elements to dom
			coordinateContainer.appendChild(setShip);
			dashboard.appendChild(shipCoord);

			// push ship coordinate to Player List
			shipList.push(coordinate)

			// update game status to start if both player are set
			if( self.playerOneShips.length + self.playerTwoShips.length === self.maxShip * 2 ) {
				self.gameStarted = true;
				console.log(self.gameStarted);
			}

		} else {
			console.log('select another position');
		}
	},
	randomCoordinate: () => {
		return Math.floor((Math.random() * self.numberOfPosition) + 1);
	},
	fireMissile: (e) => {
		let currentPlayer = self.playerMove;
		let coordinate = self.getCoordinate(e);
		let enemyShipsList = currentPlayer === 'player-1' ? self.playerTwoShips : self.playerOneShips;
		let targetHit = self.matchCoordinate( enemyShipsList, coordinate );

		if ( targetHit ) {
			self.sinkShip( targetHit, coordinate, enemyShipsList )
		} else {
			let target = self.gridContainer.querySelector(`[data-coordinate="${ coordinate }"]`);

			// add ship icon to board
			let missedTarget = self.createElement('img', ['missed',currentPlayer+"_icon"]);
			missedTarget.setAttribute('src', './img/boom.png');
			missedTarget.setAttribute('alt', 'boom icon');

			target.append(missedTarget)
			console.log(target);
			console.log(missedTarget);
			// Array.from(targets).forEach(target => {
			// 	console.log(target.parentElement);
			// });
			// console.log( self.gridContainer.querySelectorAll(`[data-coordinate="${ coordinate }"]`)[0].parentElement )
			console.log('MISSED TARGET')
		}
	},
	sinkShip: ( coord, shipList ) => {

		console.log('sinking ship', coord, shipList)


		// const itemContainer = e.target.parentElement.parentElement;
		// const itemParent = itemContainer.parentElement;
		// itemContainer.style.transform = "scale(0)";

		// remove element after animation
		// itemContainer.addEventListener("transitionend", (e) => {
		// 	itemParent.removeChild(itemContainer);
		// }, false);
	},
	winner: () => {

	}
};

battleShipt.init();