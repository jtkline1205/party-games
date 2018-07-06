var app = angular.module("battleshipApp", []);
app.controller("BattleshipCtrl", BattleshipCtrl);

function BattleshipCtrl() {
    initializeController(this);

    function initializeController(ctrl) {
        ctrl.player1Wins = 0;
        ctrl.player2Wins = 0;
        ctrl.showShipGrids = false;
        ctrl.currentTeam = 1;
        ctrl.message = "Welcome to Battleship";
        initializeNavies(ctrl);
    }

    function initializeNavies(ctrl) {
        ctrl.player1Navy = {
            ships: [
                {
                    name:"Aircraft Carrier",
                    originalLength:5,
                    length:5,
                    status:"active"
                },
                {
                    name:"Battleship",
                    originalLength:4,
                    length:4,
                    status:"active"
                },
                {
                    name:"Submarine",
                    originalLength:3,
                    length:3,
                    status:"active"
                },
                {
                    name:"Destroyer",
                    originalLength:3,
                    length:3,
                    status:"active"
                },
                {
                    name:"Patrol Boat",
                    originalLength:2,
                    length:2,
                    status:"active"
                }
            ]
        }
        ctrl.player2Navy = {
            ships: [
                {
                    name:"Aircraft Carrier",
                    originalLength:5,
                    length:5,
                    status:"active"
                },
                {
                    name:"Battleship",
                    originalLength:4,
                    length:4,
                    status:"active"
                },
                {
                    name:"Submarine",
                    originalLength:3,
                    length:3,
                    status:"active"
                },
                {
                    name:"Destroyer",
                    originalLength:3,
                    length:3,
                    status:"active"
                },
                {
                    name:"Patrol Boat",
                    originalLength:2,
                    length:2,
                    status:"active"
                }
            ]
        }
    }

    this.toggleShipGrids = function() {
        this.showShipGrids = !this.showShipGrids;
    }

    function switchTeams(ctrl) {
        if (ctrl.currentTeam == 1) {
            ctrl.currentTeam = 2;
        } else {
            ctrl.currentTeam = 1;
        }
    }

    this.startNewRound = function() {
        initializeNavies(this);
        this.player1RowList = generateRowList(this, 10, this.player1Navy, 1);
        this.player2RowList = generateRowList(this, 10, this.player2Navy, 2);
    }

    function generateRowList(ctrl, gridSize, navy, team) {
        let playerGrid = generateShipGrid(gridSize, navy);
        let playerRowList = [];
        let colors = ["blue", "red", "orange", "yellow", "green", "purple"];

        let row = 0;
        while (row < gridSize) {
            playerRowList.push([]);
            let col = 0;
            while (col < gridSize) {
                playerRowList[row].push({
                    "team":team,
                    "shipNumber":playerGrid[row][col],
                    "status":"notFiredOn",
                    "color":colors[playerGrid[row][col]]
                })
                col++;
            }
            row++;
        }

        return playerRowList;
    }

    function generateShipGrid(gridSize, navy) {
        let grid = [];
        for (let i=0; i<gridSize; i++) {
            let newRow = [];
            for (let i = 0; i < gridSize; i++) {
                newRow.push(0);
            }
            grid.push(newRow);
        }
        placeNavy(grid, navy);
        return grid;
    }

    function placeNavy(grid, navy) {
        for (let shipNumber=1; shipNumber<=navy.ships.length; shipNumber++) {
            let direction = Math.floor(Math.random() * 2);
            let shipSize = navy.ships[shipNumber-1].length;
            let bound = grid.length - shipSize + 1;
            if (direction == 0) {
                //horizontal
                let shipStartRow = Math.floor(Math.random() * grid.length);
                let shipStartCol = Math.floor(Math.random() * bound);
                let crossedShip = true;
                while (crossedShip) {
                    crossedShip = false;
                    for (let i = 0; i < shipSize; i++) {
                        if (grid[shipStartRow][shipStartCol + i] != 0) {
                            crossedShip = true;
                            i = shipSize;
                            shipStartRow = Math.floor(Math.random() * grid.length);
                            shipStartCol = Math.floor(Math.random() * bound);
                        }
                    }
                }
                for (let i = 0; i < shipSize; i++) {
                    grid[shipStartRow][shipStartCol + i] = shipNumber;
                }
            } else if (direction == 1) {
                //vertical
                let shipStartRow = Math.floor(Math.random() * bound);
                let shipStartCol = Math.floor(Math.random() * grid.length);
                let crossedShip = true;
                while (crossedShip) {
                    crossedShip = false;
                    for (let i = 0; i < shipSize; i++) {
                        if (grid[shipStartRow + i][shipStartCol] != 0) {
                            crossedShip = true;
                            i = shipSize;
                            shipStartRow = Math.floor(Math.random() * bound);
                            shipStartCol = Math.floor(Math.random() * grid.length);
                        }
                    }
                }
                for (let i = 0; i < shipSize; i++) {
                    grid[shipStartRow + i][shipStartCol] = shipNumber;
                }
            }
        }
        return grid;
    }

    this.fireOn = function(square) {
        if (square.status=="notFiredOn" && square.team!=this.currentTeam) {
            if (square.shipNumber != 0) {
                this.message = "The shot connected!";
                if (square.team == 1) {
                    square.status = "hitPlayer1Ship";
                    let ship = this.player1Navy.ships[square.shipNumber-1];
                    ship.length--;
                    if (ship.length==0) {
                        ship.status = "sunk";
                        checkNavyStatus(this, 1);
                    }
                } else {
                    square.status = "hitPlayer2Ship";
                    let ship = this.player2Navy.ships[square.shipNumber-1];
                    ship.length--;
                    if (ship.length==0) {
                        ship.status = "sunk";
                        checkNavyStatus(this, 2);
                    }
                }
            } else {
                square.status = "missedShip";
                this.message = "The shot missed.";
            }
            switchTeams(this);
        }
    }

    function checkNavyStatus(ctrl, team) {
        let foundAnActiveShip = false;
        if (team==1) {
            for (let i=0; i<ctrl.player1Navy.ships.length; i++) {
                let ship = ctrl.player1Navy.ships[i];
                if (ship.status=="active") {
                    i=ctrl.player1Navy.ships.length;
                    foundAnActiveShip = true;
                    ctrl.message = "A ship was sunk, but the game continues.";
                }
            }
            if (!foundAnActiveShip) {
                ctrl.message = "Player 2 Wins!";
            }
        }
        else if (team==2) {
            for (let i=0; i<ctrl.player2Navy.ships.length; i++) {
                let ship = ctrl.player2Navy.ships[i];
                if (ship.status=="active") {
                    i=ctrl.player2Navy.ships.length;
                    foundAnActiveShip = true;
                    ctrl.message = "A ship was sunk, but the game continues.";
                }
            }
            if (!foundAnActiveShip) {
                ctrl.message = "Player 1 Wins!";
            }
        }
    }

    this.startNewRound();


}