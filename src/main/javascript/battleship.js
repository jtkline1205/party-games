var app = angular.module("battleshipApp", []);
app.controller("BattleshipCtrl", BattleshipCtrl);

function BattleshipCtrl() {
    initializeController(this);

    function initializeController(ctrl) {
        ctrl.redWins = 0;
        ctrl.blueWins = 0;
        ctrl.showShipGrids = false;
        ctrl.currentTeam = "red";
        ctrl.message = "Welcome to Battleship";
    }

    this.toggleShipGrids = function() {
        this.showShipGrids = !this.showShipGrids;
    }

    function switchTeams(ctrl) {
        if (ctrl.currentTeam == 'red') {
            ctrl.currentTeam = 'blue';
        } else {
            ctrl.currentTeam = 'red';
        }
    }

    this.startNewRound = function() {
        this.player1RowList = generateRowList(this, 10, "red");
        this.player2RowList = generateRowList(this, 10, "blue");
    }

    function generateRowList(ctrl, gridSize, team) {
        let playerGrid = generateShipGrid(gridSize);
        let playerRowList = [];
        let colors = ["blue", "red", "orange", "yellow", "green", "purple"];

        let row = 0;
        while (row < gridSize) {
            playerRowList.push([]);
            let col = 0;
            while (col < gridSize) {
                playerRowList[row].push({
                    "team":team,
                    "type":colors[playerGrid[row][col]],
                    "status":"notFiredOn"
                })
                col++;
            }
            row++;
        }

        return playerRowList;
    }

    this.fireOn = function($scope, square) {
        if (square.status=="notFiredOn" && square.team!=this.currentTeam) {
            if (square.type != "blue") {
                square.status = "hitShip";
            } else {
                square.status = "missedShip";
            }
            switchTeams(this);
        }
    }

    this.startNewRound();

    function generateShipGrid(gridSize) {
        let grid = [];
        for (let i=0; i<gridSize; i++) {
            let newRow = [];
            for (let i = 0; i < gridSize; i++) {
                newRow.push(0);
            }
            grid.push(newRow);
        }
        placeShip(grid, 5, 1);
        placeShip(grid, 4, 2);
        placeShip(grid, 3, 3);
        placeShip(grid, 3, 4);
        placeShip(grid, 2, 5);
        return grid;
    }

    function placeShip(grid, shipSize, shipColor) {
        let direction = Math.floor(Math.random()*2);
        let bound = grid.length-shipSize+1;
        if (direction==0) {
            //horizontal
            let shipStartRow = Math.floor(Math.random()*grid.length);
            let shipStartCol = Math.floor(Math.random()*bound);
            let crossedShip = true;
            while (crossedShip) {
                crossedShip = false;
                for(let i=0; i<shipSize; i++) {
                    if (grid[shipStartRow][shipStartCol+i]!=0) {
                        crossedShip = true;
                        i=shipSize;
                        shipStartRow = Math.floor(Math.random()*grid.length);
                        shipStartCol = Math.floor(Math.random()*bound);
                    }
                }
            }
            for (let i=0; i<shipSize; i++) {
                grid[shipStartRow][shipStartCol+i]=shipColor;
            }
        } else if (direction==1) {
            //vertical
            let shipStartRow = Math.floor(Math.random()*bound);
            let shipStartCol = Math.floor(Math.random()*grid.length);
            let crossedShip = true;
            while (crossedShip) {
                crossedShip = false;
                for(let i=0; i<shipSize; i++) {
                    if (grid[shipStartRow+i][shipStartCol]!=0) {
                        crossedShip = true;
                        i=shipSize;
                        shipStartRow = Math.floor(Math.random()*bound);
                        shipStartCol = Math.floor(Math.random()*grid.length);
                    }
                }
            }
            for (let i=0; i<shipSize; i++) {
                grid[shipStartRow+i][shipStartCol]=shipColor;
            }
        }
        return grid;
    }
}