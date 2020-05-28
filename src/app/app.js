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
            <Codenames/>
            <Battleship/>
            <Minesweeper/>
            <hr/>
        </div>
    }
}