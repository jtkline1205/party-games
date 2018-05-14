var app = angular.module("battleshipApp", []);
app.controller("BattleshipCtrl", BattleshipCtrl);

function BattleshipCtrl() {
    initializeController(this);

    function initializeController(ctrl) {
        ctrl.redWins = 0;
        ctrl.blueWins = 0;
        ctrl.showShipGrids = false;
        ctrl.firstTeam = "";
        ctrl.currentTeam = "";
        ctrl.message = "Welcome to Battleship";
    }

    this.toggleShipGrids = function() {
        this.showShipGrids = !this.showShipGrids;
    }

    this.revealButton = function($scope, square) {
        $scope.clicked = true;
    }

    function switchTeams(ctrl) {
        if (ctrl.currentTeam == 'red') {
            ctrl.currentTeam = 'blue';
        } else {
            ctrl.currentTeam = 'red';
        }
    }

    // function resolveGuess(word, ctrl) {
    //     if (word.team == 'red') {
    //         ctrl.redLeft--;
    //         if (ctrl.currentTeam == 'red') {
    //             ctrl.guessesRemaining--;
    //         } else {
    //             switchTeams(ctrl);
    //         }
    //     } else if (word.team == 'blue') {
    //         ctrl.blueLeft--;
    //         if (ctrl.currentTeam =='blue') {
    //             ctrl.guessesRemaining--;
    //         } else {
    //             switchTeams(ctrl);
    //         }
    //     } else if (word.team == 'brown') {
    //         switchTeams(ctrl);
    //     } else if (word.team == 'black') {
    //         if (ctrl.currentTeam == 'red') {
    //             ctrl.blueWins++;
    //             ctrl.message = "Blue wins since red guessed the black card!";
    //         } else if (ctrl.currentTeam == 'blue') {
    //             ctrl.redWins++;
    //             ctrl.message = "Red wins since blue guessed the black card!";
    //         }
    //         ctrl.startNewRound();
    //     }
    //     if (ctrl.redLeft == 0) {
    //         ctrl.redWins++;
    //         ctrl.startNewRound();
    //         ctrl.message = "Red wins by guessing all words!";
    //     } else if (ctrl.blueLeft == 0) {
    //         ctrl.blueWins++;
    //         ctrl.startNewRound();
    //         ctrl.message = "Blue wins by guessing all words!";
    //     } else if (ctrl.guessesRemaining == 0) {
    //         switchTeams(ctrl);
    //     }
    // }

    this.startNewRound = function() {
        this.player1RowList = generateRowList(this, 10);
        this.player2RowList = generateRowList(this, 10);
    }

    function generateRowList(ctrl, gridSize) {
        // let firstTeamIndex = Math.floor(Math.random()*2);
        // colorFreqs[firstTeamIndex]++;
        // ctrl.firstTeam = colorNames[firstTeamIndex];
        // ctrl.currentTeam = colorNames[firstTeamIndex];
        let playerGrid = generateShipGrid(gridSize);
        let playerRowList = [];
        let colors = ["blue", "red", "orange", "yellow", "green", "purple"];

        let row = 0;
        while (row < gridSize) {
            playerRowList.push([]);
            let col = 0;
            while (col < gridSize) {
                playerRowList[row].push({
                    "squareType":colors[playerGrid[row][col]]
                })
                col++;
            }
            row++;
        }

        return playerRowList;
    }

    this.startNewRound();

    function generateShipGrid(gridSize) {
        let grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        placeShip(grid, gridSize, 5, 1);
        placeShip(grid, gridSize, 4, 2);
        placeShip(grid, gridSize, 3, 3);
        placeShip(grid, gridSize, 3, 4);
        placeShip(grid, gridSize, 2, 5);
        return grid;
    }

    function placeShip(grid, gridSize, shipSize, shipColor) {
        let direction = Math.floor(Math.random()*2);
        let bound = gridSize-shipSize+1;
        if (direction==0) {
            //horizontal
            let shipStartRow = Math.floor(Math.random()*gridSize);
            let shipStartCol = Math.floor(Math.random()*bound);
            let crossedShip = true;
            while (crossedShip) {
                crossedShip = false;
                for(let i=0; i<shipSize; i++) {
                    if (grid[shipStartRow][shipStartCol+i]!=0) {
                        crossedShip = true;
                        i=shipSize;
                        shipStartRow = Math.floor(Math.random()*gridSize);
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
            let shipStartCol = Math.floor(Math.random()*gridSize);
            let crossedShip = true;
            while (crossedShip) {
                crossedShip = false;
                for(let i=0; i<shipSize; i++) {
                    if (grid[shipStartRow+i][shipStartCol]!=0) {
                        crossedShip = true;
                        i=shipSize;
                        shipStartRow = Math.floor(Math.random()*bound);
                        shipStartCol = Math.floor(Math.random()*gridSize);
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

