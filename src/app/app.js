import React from 'react';
import Battleship from '../battleship'
import Minesweeper from '../minesweeper'
import Codenames from '../codenames'
import style from './app.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return <div className={style.container}>
            <div className={style.gameContainer}>
                <Codenames/>
            </div>
            <div className={style.gameContainer}>
                <Battleship/>
            </div>
            <div className={style.gameContainer}>
                <Minesweeper/>
            </div>
        </div>
    }
}