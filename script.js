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
		self.cpuRandomFire = document.querySelector(".random-fire");
		self.playersShipsObject = {
			'player-1': {},
			'player-2': {}
		};
		self.numOfPlayerPositions = 120;
		self.positionInColumn = 15;
		self.maxShip = 2;
		self.hitToSink = 2;
		self.current = 'player-1';
		self.opponent = self.current === 'player-1' ? 'player-2' : 'player-1';
		self.numOfPlayer = '1player';
		self.gameStarted = false;
	},
	bindEvent: function () {
		self.playerBoard.addEventListener("click", self.setShip);
		self.togglePlayer.addEventListener("click", self.setPlayer);
		self.gameOptions.addEventListener("click", self.selectGameOptions);
		self.startGameBtn.addEventListener("click", self.startGame);
		self.cpuRandomFire.addEventListener("click", self.randomFire);
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

		for (let i = 0; i < self.numOfPlayerPositions * 2; i++) {
			positionCount / self.positionInColumn === row ? row++ : row;
			column === self.positionInColumn ? column = 1 : column++;
			positionCount++;

			let placementContainer = self.createElement('div', ['position']);
			placementContainer.setAttribute("data-coord-number", positionCount);
			placementContainer.setAttribute("data-coordinate", `${row}, ${column}`);
			self.player1Board.appendChild(placementContainer);
		}
		// reset positions
		positionCount = 0, column = 0, row = 0;

		// if 1 player selecteted, set CPU ships
		if (self.numOfPlayer === '1player') {
			while (self.playerObjLen('player-2') < self.maxShip) {
				self.current = 'player-2';
				let position = self.player1Board.querySelectorAll(`[data-coord-number="${ self.randomNumber() }"]`)[0];
				let getRandomCoord = position.getAttribute('data-coordinate');
				self.setShip(null, position, getRandomCoord)
			}
			self.cpuRandomFire.style.display = 'block';
			self.current = 'player-1';

			// hide player 2 ships
			self.setPlayer(null);
		}
	},
	setPlayer: function (e) {
		// show and hide ships
		self.current = e === null ? 'player-1' : e.target.children[0].getAttribute('data-player');
		let hidePlayer = self.current === 'player-1' ? 'player-2' : 'player-1'
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
	setShip: (e, cpuTarget, cpuCoord) => {

		// set Player ships
		let cpu = e === null;
		// let playerZone = self.current === 'player-1' ? self.numOfPlayerPositions : self.numOfPlayerPositions * 2;
		let playerOne = self.current === 'player-1';
		let dashboard = playerOne ? self.player1Board.nextElementSibling : self.player2Board.nextElementSibling;
		let coordinate = cpuCoord || self.getCoordinate(e);
		let coordinateContainer = cpuTarget || e.target;
		let coordNumber = coordinateContainer.getAttribute('data-coord-number');
		let shipsLen = self.playerObjLen(self.current);
		let playerObject = self.playersShipsObject[self.current];
		let duplicate = self.matchCoordinateObj(coordinate, playerObject);

		// if game started, click event will trigger fireMissle()
		if (self.gameStarted === true) { return self.fireMissile(e) }

		if( playerOne && coordNumber <= self.numOfPlayerPositions ) {
			return console.log(`select coordinate withing 1 - ${self.numOfPlayerPositions}`)
		}
		// check if position selection is already taken
		if( !cpu && e.target.tagName === 'IMG'  ){ return console.log('Ship already at this location, select another location'); }
		// reach max number of ships = self.maxShip
		if (shipsLen >= self.maxShip) { return console.log('reach max ship = ' + self.maxShip) }

		// set ship if not duplicate
		if (!duplicate) {
			// add ship icon to game board
			let setShip = self.createElement('img', ['icon', 'ship', self.current]);
			setShip.setAttribute('src', './img/battleship.png');
			setShip.setAttribute('alt', 'battleship icon');

			// add coordinate to list
			let shipCoord = self.createElement('li', ['list-group-item', `ship_${shipsLen + 1}`]);
			shipCoord.innerText = `Ship ${shipsLen + 1} | Coordinate Number ${coordNumber} | row, column ${coordinate}`;

			// add elements to dom
			coordinateContainer.appendChild(setShip);
			dashboard.appendChild(shipCoord);

			// add ship details to player object
			if (!self.playersShipsObject[self.current][`Ship_${shipsLen + 1}`]) {
				self.playersShipsObject[self.current][`Ship_${shipsLen + 1}`] = {
					'coordinate_Number': coordNumber,
					'coordinate': coordinate,
					'hits': 0,
					'sunk': false
				};
			}

			// update game status to start if both player set all ships
			if ( self.playerObjLen('player-1') + self.playerObjLen('player-2') === self.maxShip * 2) {
				self.gameStarted = true;
				console.log('Game Start');
			}

		} else {
			console.log('select another position');
		}
	},
	playerObjLen: function( el ){
		// return player Ship Length
		return Object.keys(self.playersShipsObject[ el ]).length;
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
		return e.target.getAttribute('data-coordinate');
	},
	randomNumber: () => {
		// return random number
		return Math.floor((Math.random() * self.numOfPlayerPositions) + 1);
	},
	randomFire: () => {
		if( !self.gameStarted ){ return console.log('cpu random fire after game start') }
		// get random number from 1 to numberOfPostions
		let random = self.randomNumber() + self.numOfPlayerPositions;
		// check if random number match player 2 CPU ships Coordinate
		let friendlyFire = self.matchCoordinateObj(random, self.playersShipsObject['player-2'])
		// if not friendFire, trigger fireMissle
		friendlyFire ? self.randomNumber() : self.fireMissile(null, self.playerBoard.querySelector(`[data-coord-number="${random}"]`).getAttribute(['data-coordinate']))
	},
	fireMissile: (e, coord) => {
		let opponent = self.current === 'player-1' ? 'player-2' : 'player-1';
		let opponentObject = self.playersShipsObject[opponent];
		let coordinate = coord || self.getCoordinate(e);
		let hitTarget = self.matchCoordinateObj(coordinate, opponentObject);
		let targetCoord = self.playerBoard.querySelector(`[data-coord-number="${coord}"]`) || self.playerBoard.querySelector(`[data-coordinate="${coordinate}"]`);

		// Target Hit!!
		if (hitTarget) {
			opponentObject[hitTarget].hits >= self.hitToSink - 1 ? self.sinkShip(targetCoord, self.current, opponentObject, hitTarget) : opponentObject[hitTarget].hits++;
			console.log(`Hit ${opponentObject[hitTarget].hits} of ${self.hitToSink}`);
		} else if (e !== null && e.target.tagName === 'IMG') {
			console.log('ALREADY TAKEN')
		} else {
			// Missed target, add boom icon to board
			let missedTarget = self.createElement('img', ['icon', 'missed', `${self.current}_icon`]);
			missedTarget.setAttribute('src', './img/boom.png');
			missedTarget.setAttribute('alt', 'boom icon');
			targetCoord.append(missedTarget)
			console.log('MISSED');
		}
		document.querySelector('.player-action').innerText = `${opponent} Move, toggle to ${opponent}`;
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