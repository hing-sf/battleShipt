loadGame = {
	init: function () {
		this.cacheDom();
		this.loadProduct();
	},
	// caching DOM improve performance
	cacheDom: function () {
		this.gridContainer = document.querySelector("#game-board");
		this.dashboard = this.gridContainer.querySelector(".player-dashboard");
		this.tabs = this.gridContainer.querySelector(".nav-tabs");
		this.playerOneShips = [];
		this.playerTwoShips = [];
		this.playerTurn = '';
	},
	bindEvent: function () {
		this.gridContainer.addEventListener("click", this.setShip.bind(this));
		this.tabs.addEventListener("click", this.setPlayer.bind(this));

		$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

	},
	createElement: (el, classLists) => {
		const element = document.createElement(el)
		for (let className in classLists) {
			element.classList.add(classLists[className]);
		}
		return element;
	},
	loadProduct: function () {
		const numberOfPosition = 120;
		const positionInColumn = 15;
		let positionCount = 0;
		let column = 0;
		let row = 0;
		let playerBoard = this.gridContainer.querySelector('.player1-pad');
		// let playerTwoBoard = this.gridContainer.querySelector('.player2-pad')

		for (let i = 0; i < numberOfPosition; i++) {
			positionCount / positionInColumn === row ? row++ : row;
			column === positionInColumn ? column = 1 : column++;
			positionCount++;

			let placementContainer = this.createElement('div', ['position']);
			placementContainer.setAttribute("data-coordinate", `${row}, ${column}`);
			playerBoard.appendChild(placementContainer);
		}
		this.bindEvent( )
	},
	setPlayer: function(e) {
		console.log(this);
		console.log(e);
	},
	matchCoordinate: (arr, value) => {
		return arr.some(function (item) {
			return value === item;
		});
	},
	getCoordinate: e => {
		const coordinate = e.target.getAttribute('data-coordinate');
		return coordinate;
	},
	setShip: (e) => {
		const maxShip = 8;
		let shipList = loadGame.playerOneShips;
		let coordinate = loadGame.getCoordinate(e);
		let setCoordinate = e.target;
		let shipsLen = shipList.length;
		let duplicate = loadGame.matchCoordinate(shipList, coordinate);

		if (shipsLen >= maxShip ) {
			return console.log('reach max ship = ' + maxShip)
		}
		if ( coordinate === null ) {
			return
		}
		if (shipsLen === 0 || !duplicate ) {
			// add ship icon to board
			let setShip = loadGame.createElement('img', ['ship']);
			setShip.setAttribute('src', './img/battleship.png');
			setShip.setAttribute('alt', 'battleship icon');
			shipList.push(coordinate)

			// add coordinate to list
			let shipCoord = loadGame.createElement('li', ['list-group-item']);
			shipCoord.innerText = `Ship ${shipsLen + 1} : row, column ${coordinate}`;

			// add elements to dom
			setCoordinate.appendChild(setShip);
			loadGame.dashboard.appendChild(shipCoord);

			// push ship coordinate to Player List

		} else {
			console.log('select another position');
		}
	},
	fireMissile: () => {

	},
	sinkShip: (coord) => {
		// const itemContainer = e.target.parentElement.parentElement;
		// const itemParent = itemContainer.parentElement;
		// itemContainer.style.transform = "scale(0)";

		// remove element after animation
		itemContainer.addEventListener("transitionend", (e) => {
			itemParent.removeChild(itemContainer);
		}, false);
	}
};

loadGame.init();