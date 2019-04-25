import React from 'react';
import style from './battleship.css'

function ShipStatus(props) {
    return <td className={props.className}>
        <span>{props.ship.name} {props.ship.originalLength}</span>
    </td>
}

function ShipStatusTable(props) {
    return <table>
        <tbody>
        {
            props.ships.map(function(ship, index) {
                return <tr key={index}>
                {ship.status=="active" && <ShipStatus ship={ship} className={style.active}/>}
                {ship.status=="sunk" && <ShipStatus ship={ship} className={style.sunk}/>}
                </tr>
            })
        }
        </tbody>
    </table>
}

function PlayerFlag(props) {
    return <div><span className={props.className}>Player {props.playerNumber} Navy</span></div>
}

function ShipGridSquare(props) {
    return <td>
        <div className={
            (props.square.status=="notFiredOn" ?
                    style.notFiredOn
                    :
                    (props.square.status=="hitPlayer1Ship" ?
                            style.hitPlayer1Ship
                            :
                            (props.square.status=="hitPlayer2Ship" ?
                                    style.hitPlayer2Ship
                                    :
                                    style.missedShip
                            )
                    )
            )
        }
             onClick={
                 () => {
                     if (props.square.status == "notFiredOn" && props.square.team != props.battleship.state.currentTeam) {
                         if (props.square.shipNumber != 0) {
                             //this.message = "The shot connected!";
                             console.log("The shot connected!");
                             if (props.square.team == 1) {
                                 console.log("updating square status to hitPlayer1Ship");
                                 props.square.status = "hitPlayer1Ship";
                                 let ship = props.battleship.state.player1Navy.ships[props.square.shipNumber - 1];
                                 ship.length--;
                                 if (ship.length == 0) {
                                     ship.status = "sunk";
                                     // checkNavyStatus(this.player1Navy.ships, 1);
                                 }
                             } else {
                                 console.log("updating square status to hitPlayer2Ship");
                                 props.square.status = "hitPlayer2Ship";
                                 let ship = props.battleship.state.player2Navy.ships[props.square.shipNumber - 1];
                                 ship.length--;
                                 if (ship.length == 0) {
                                     ship.status = "sunk";
                                     // checkNavyStatus(this.player2Navy.ships, 2);
                                 }
                             }
                         } else {
                             props.square.status = "missedShip";
                             // this.message = "The shot missed.";
                             console.log("The shot missed.");
                         }
                         if (props.battleship.state.currentTeam == 1) {
                             props.battleship.setState({
                                 currentTeam: 2
                             });
                             console.log("team switched to 2");
                         } else {
                             props.battleship.setState({
                                 currentTeam: 1
                             });
                             console.log("team switched to 1");
                         }
                     }
                 }
             }
        >
            <span></span>
        </div>
    </td>
}

function ShipGridTable(props) {
    return <div>
            <PlayerFlag playerNumber={props.playerNumber} className={props.flagClass}/>
            <table>
                <tbody>
                    {
                        props.playerRowList.map(function(row, rowIndex) {
                            return <tr key={rowIndex}>
                                    {
                                        row.map(function(square, squareIndex) {
                                            return <ShipGridSquare
                                                key={squareIndex}
                                                square={square}
                                                battleship={props.battleship}
                                                />;
                                        })
                                    }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
}

function ColoredSquare(props) {
    return <div>
            <div className={props.className}><span></span></div>
        </div>
}

function ShipGridRevealed(props) {
    return <table>
            <tbody>
            {
                props.playerRowList.map(function(row, rowIndex) {
                    return <tr key={rowIndex}>
                            {
                                row.map(function(square, squareIndex) {
                                    return <td key={squareIndex}>
                                        {square.color=="blue" && <ColoredSquare className={style.blue}/>}
                                        {square.color=="red" && <ColoredSquare className={style.red}/>}
                                        {square.color=="orange" && <ColoredSquare className={style.orange}/>}
                                        {square.color=="yellow" && <ColoredSquare className={style.yellow}/>}
                                        {square.color=="green" && <ColoredSquare className={style.green}/>}
                                        {square.color=="purple" && <ColoredSquare className={style.purple}/>}
                                    </td>
                                })
                            }
                    </tr>
                })
            }
            </tbody>
        </table>
}

function ShipGridRevealedTable(props) {
    return <table className={style.center}>
        <tbody>
        <tr>
            <td><ShipGridRevealed playerRowList={props.player1RowList}/></td>
            <td><ShipGridRevealed playerRowList={props.player2RowList}/></td>
        </tr>
        </tbody>
    </table>
}

export default class Battleship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Battleship",
            player1Wins: 0,
            player2Wins: 0,
            currentTeam: 1,
            showShipGrids: false,
            player1Navy: {
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
            },
            player2Navy: {
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
            },
            player1RowList:[],
            player2RowList:[]
        };
        this.startNewRound = this.startNewRound.bind(this);
        this.generateRowList = this.generateRowList.bind(this);
        this.generateShipGrid = this.generateShipGrid.bind(this);
        this.placeNavy = this.placeNavy.bind(this);
        this.toggleShipGrids = this.toggleShipGrids.bind(this);
    }

    toggleShipGrids() {
        this.setState((state) => ({
            showShipGrids: !state.showShipGrids
        }));
    }

    startNewRound() {
        this.setState((state) => ({
            player1RowList: this.generateRowList(10, state.player1Navy, 1),
            player2RowList: this.generateRowList(10, state.player2Navy, 2)
        }));
    }

    generateRowList(gridSize, navy, team) {
        let playerGrid = this.generateShipGrid(gridSize, navy);
        this.placeNavy(navy, playerGrid);
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

    generateShipGrid(gridSize) {
        let grid = [];
        for (let i=0; i<gridSize; i++) {
            let newRow = [];
            for (let j = 0; j < gridSize; j++) {
                newRow.push(0);
            }
            grid.push(newRow);
        }
        return grid;
    }

    placeShip(grid, bound, shipSize, shipNumber, direction) {
        let shipStartRow = (direction == 'horizontal' ? Math.floor(Math.random() * grid.length): Math.floor(Math.random() * bound));
        let shipStartCol = (direction == 'horizontal' ? Math.floor(Math.random() * bound) : Math.floor(Math.random() * grid.length));
        let crossedShip = true;
        while (crossedShip) {
            crossedShip = false;
            for (let i = 0; i < shipSize; i++) {
                let row = (direction == 'horizontal' ? shipStartRow : shipStartRow + i);
                let col = (direction == 'horizontal' ? shipStartCol + i : shipStartCol);
                if (grid[row][col] != 0) {
                    crossedShip = true;
                    i = shipSize;
                    shipStartRow = (direction == 'horizontal' ? Math.floor(Math.random() * grid.length) : Math.floor(Math.random() * bound));
                    shipStartCol = (direction == 'horizontal' ? Math.floor(Math.random() * grid.length) : Math.floor(Math.random() * bound));
                }
            }
        }
        for (let i = 0; i < shipSize; i++) {
            let row = (direction == 'horizontal' ? shipStartRow : shipStartRow + i);
            let col = (direction == 'horizontal' ? shipStartCol + i: shipStartCol)
            grid[row][col] = shipNumber;
        }
    }

    placeNavy(navy, grid) {
        let possibleDirections = ["horizontal", "vertical"];
        for (let shipNumber=1; shipNumber<=navy.ships.length; shipNumber++) {
            let direction = possibleDirections[Math.floor(Math.random() * 2)];
            let shipSize = navy.ships[shipNumber-1].length;
            let bound = grid.length - shipSize + 1;
            this.placeShip(grid, bound, shipSize, shipNumber, direction);
        }
    }

    checkNavyStatus(ships, playerNumber) {
        for (let i=0; i<ships.length; i++) {
            let ship = ships[i];
            if (ship.status=="active") {
                i=ships.length;
                return "A ship was sunk, but the game continues.";
            }
        }
        return "Player " + playerNumber + " Wins!";
    }

    componentDidMount() {
        this.startNewRound();
    }

    render() {
        return <div className={style.center}>
            <h5>Battleship</h5>
            {this.state.message}
            <br/>
            <button className={style.newRoundButton} onClick={this.startNewRound}>
                <span className={style.player1Wins}>{this.state.player1Wins}</span>
                <span className={style.player2Wins}>{this.state.player2Wins}</span>
                <br/>
                <br/>
                New Round
            </button>
            <br/>
            <br/>
            <span className={this.state.currentTeam==1 ? style.redFlag: style.blueFlag}>Current Turn: Player {this.state.currentTeam}</span>
            <div className={style.shipGridSection}>
                <table className={style.center}>
                    <tbody>
                        <tr>
                            <td>
                                <ShipStatusTable ships={this.state.player1Navy.ships}/>
                            </td>
                            <td>
                                <ShipGridTable battleship={this}
                                               playerRowList={this.state.player1RowList}
                                               playerNumber={1}
                                               flagClass={style.redFlag}/>
                            </td>
                            <td>
                                <ShipGridTable battleship={this}
                                               playerRowList={this.state.player2RowList}
                                               playerNumber={2}
                                               flagClass={style.blueFlag}/>
                            </td>
                            <td>
                                <ShipStatusTable ships={this.state.player2Navy.ships}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.gameStatus}>
                <table className={style.center}>
                    <tbody>
                    <tr>
                        <td>
                            {
                                this.state.showShipGrids && <button
                                    onClick={this.toggleShipGrids}
                                    className={style.shipGridsButton}
                                >
                                    <ShipGridRevealedTable
                                        player1RowList={this.state.player1RowList}
                                        player2RowList={this.state.player2RowList}
                                    />
                                </button>
                            }
                            {
                                !this.state.showShipGrids && <button
                                    onClick={this.toggleShipGrids}
                                    className={style.shipGridsButton}
                                >
                                    Show Ship Grids
                                </button>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}
