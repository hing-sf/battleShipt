battleShipt = {
	init: function () {
		this.cacheDom();
		this.bindEvent();
	},
	// caching DOM improve performance
	cacheDom: function () {
		self = this;
		self.playerBoard = document.querySelector(".players-board");
		self.gameOptions = document.querySelector(".select-player");
		self.startGameBtn = self.gameOptions.querySelector("#start-game");
		self.player1Board = self.playerBoard.querySelector('.player-1-board');
		self.player2Board = self.playerBoard.querySelector('.player-2-board');
		self.togglePlayer = document.querySelector(".toggle-player-container");
		self.randomCoord = document.querySelector(".random-fire");
		self.playersShipsObject = {
			'player-1': {},
			'player-2': {}
		};
		self.numberOfPositions = 120;
		self.positionInColumn = 15;
		self.maxShip = 1;
		self.hitToSink = 2;
		self.playerMove = 'player-1';
		self.opponent = self.playerMove === 'player-1' ? 'player-2' : 'player-1';
		self.numOfPlayer = '1player';
		self.gameStarted = false;
	},
	bindEvent: function () {
		self.playerBoard.addEventListener("click", self.setShip);
		self.togglePlayer.addEventListener("click", self.setPlayer);
		self.gameOptions.addEventListener("click", self.selectGameOptions);
		self.startGameBtn.addEventListener("click", self.startGame);
		self.randomCoord.addEventListener("click", self.randomFire);
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
	},
	startGame: (e) => {
		e.stopPropagation();
		// start game and hide options panel
		console.log('get ready to battle!! Set your ships')
		self.buildBoardGame();
		self.gameOptions.classList.add('hidden')
		document.querySelector('.player-select').classList.remove('hidden')
	},
	buildBoardGame: function () {
		let positionCount = 0;
		let column = 0;
		let row = 0;

		for (let i = 0; i < self.numberOfPositions * 2; i++) {
			positionCount / self.positionInColumn === row ? row++ : row;
			column === self.positionInColumn ? column = 1 : column++;
			positionCount++;

			let placementContainer = self.createElement('div', ['position']);
			placementContainer.setAttribute("data-coord-number", positionCount);
			placementContainer.setAttribute("data-coordinate", `${row}, ${column}`);
			self.player1Board.appendChild(placementContainer);
		}
		positionCount = 0;
		column = 0;
		row = 0;

		// if 1 player selecteted, set CPU ships
		if (self.numOfPlayer === '1player') {
			while (Object.keys(self.playersShipsObject['player-2']).length < self.maxShip) {
				self.playerMove = 'player-2';
				let position = self.player1Board.querySelectorAll(`[data-coord-number="${ self.randomCoordinate() }"]`)[0];
				let getRandomCoord = position.getAttribute('data-coordinate');
				self.setShip(null, position, getRandomCoord)
			}
			self.playerMove = 'player-1';

			// hide player 2 ships
			self.setPlayer(null);
		}
	},
	setPlayer: function (e) {
		console.log('setPlayer ', );
		self.playerMove = e === null ? 'player-1' : e.target.children[0].getAttribute('data-player');

		let hidePlayer = self.playerMove === 'player-1' ? 'player-2' : 'player-1'
		let player1 = document.querySelectorAll('.player-1');
		let player2 = document.querySelectorAll('.player-2');

		// get list of all players ships
		[player1, player2].forEach(list => {
			nodeToArray(list)
		})

		// iterate over all player ships to show/hide
		function nodeToArray(arr) {
			Array.from(arr).forEach(item => {
				item.classList.contains(hidePlayer) ? item.style.display = 'none' : item.style.display = 'block';
			});
		}
	},
	matchCoordinateObj: (value, obj) => {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key].coordinate === value) {
					return key;
				}
			}
		}
		return false;
	},
	getCoordinate: (e) => {
		const coordinate = e.target.getAttribute('data-coordinate');
		return coordinate;
	},
	setShip: (e, cpuPosition, cpuCoord) => {
		let dashboard = cpuCoord ? self.player2Board.nextElementSibling : e.target.parentElement.nextElementSibling;
		let coordinate = cpuCoord || self.getCoordinate(e);
		let coordinateContainer = cpuPosition || e.target;
		let coordNumber = coordinateContainer.getAttribute('data-coord-number');
		let shipsLen = Object.keys(self.playersShipsObject[self.playerMove]).length;
		let opponentObject = self.playersShipsObject['player-2'];
		let duplicate = self.matchCoordinateObj(coordinate, opponentObject);

		// if game started, click will trigger fireMissle()
		if (self.gameStarted === true) {
			self.fireMissile(e);
			return
		}

		if (shipsLen >= self.maxShip) {
			return console.log('reach max ship = ' + self.maxShip)
		}

		// set ship if not duplicate
		if (!duplicate) {
			// add ship icon to board
			let setShip = self.createElement('img', ['icon', 'ship', self.playerMove]);
			setShip.setAttribute('src', './img/battleship.png');
			setShip.setAttribute('alt', 'battleship icon');

			// add coordinate to list
			let shipCoord = self.createElement('li', ['list-group-item', `ship_${shipsLen + 1}`]);
			shipCoord.innerText = `Ship ${shipsLen + 1} | Coordinate Number ${coordNumber} | row, column ${coordinate}`;

			// add elements to dom
			coordinateContainer.appendChild(setShip);
			dashboard.appendChild(shipCoord);

			// add to object
			if (!self.playersShipsObject[self.playerMove][`Ship_${shipsLen + 1}`]) {
				self.playersShipsObject[self.playerMove][`Ship_${shipsLen + 1}`] = {
					'coordinate_Number': coordNumber,
					'coordinate': coordinate,
					'hits': 0,
					'sunk': false
				};
			}

			// update game status to start if both player are set
			if (Object.keys(self.playersShipsObject['player-1']).length + Object.keys(self.playersShipsObject['player-2']).length === self.maxShip * 2) {
				self.gameStarted = true;
				console.log('Game Start');
			}

		} else {
			console.log('select another position');
		}
	},
	randomCoordinate: () => {
		return Math.floor((Math.random() * self.numberOfPositions) + 1);
	},
	randomFire: () => {
		// get random number from 1 to numberOfPostions
		let random = self.randomCoordinate();
		// check if random number match player 2 CPU ships Coordinate
		let friendlyFire = self.matchCoordinateObj(random, self.playersShipsObject['player-2'])
		// if not friendFire, trigger fireMissle
		friendlyFire ? self.randomCoordinate() : self.fireMissile(null, random)
	},
	fireMissile: (e, coord) => {

		let currentPlayer = self.playerMove;
		let opponent = self.playerMove === 'player-1' ? 'player-2' : 'player-1';
		let opponentObject = self.playersShipsObject[opponent];
		let coordinate = coord || self.getCoordinate(e);
		let hitTarget = self.matchCoordinateObj(coordinate, opponentObject);
		let targetCoord = self.playerBoard.querySelector(`[data-coord-number="${coord}"]`) || self.playerBoard.querySelector(`[data-coordinate="${coordinate}"]`);

		// Target Hit!!
		if (hitTarget) {
			opponentObject[hitTarget].hits >= self.hitToSink - 1 ? self.sinkShip(targetCoord, currentPlayer, opponentObject, hitTarget) : opponentObject[hitTarget].hits++;
			document.querySelector('.player-action').innerText = `${opponent} Move`;
			console.log(`Hit ${opponentObject[hitTarget].hits} of ${self.hitToSink}`);
		} else if (e !== null && e.target.tagName === 'IMG') {
			console.log('ALREADY TAKEN')
		} else {
			// Missed target, add boom icon to board
			let missedTarget = self.createElement('img', ['icon', 'missed', `${currentPlayer}_icon`]);
			missedTarget.setAttribute('src', './img/boom.png');
			missedTarget.setAttribute('alt', 'boom icon');
			targetCoord.append(missedTarget)
			console.log('MISSED');
		}
	},
	sinkShip: (targetCoord, currentPlayer, opponentObject, hit) => {

		// target Hit, add sink ship icon and
		let addSinkIcon = self.createElement('img', ['icon', 'target-hit', `${currentPlayer}_icon`]);
		addSinkIcon.setAttribute('src', './img/sinkingship.png');
		addSinkIcon.setAttribute('alt', 'Sinking ship icon');
		targetCoord.append(addSinkIcon)

		// remove ship from board
		targetCoord.querySelector('.ship').remove()
		console.log('SHIP SHIK')

		// update data
		opponentObject[hit].hits++;
		opponentObject[hit].sunk = true;
		self.checkIfWinner( opponentObject, currentPlayer )
	},
	checkIfWinner: (opponentObject, currentPlayer) => {
		let count = 0;
		// check if player Win
		for (let sunk in opponentObject) {
			if (opponentObject.hasOwnProperty(sunk)) {
				if (opponentObject[sunk].sunk === true) {
					count++
				}
			}
		}
		if (count === self.maxShip) {
			let winner = document.querySelector('.winner');
			winner.innerText = `${currentPlayer} WIN!!`;
			winner.style.display = 'block';
			return
		}
	}
};

battleShipt.init();