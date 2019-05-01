import React from 'react';
import style from './minesweeper.css'

export default class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Minesweeper"
        }
    }

    render() {
        return <div className={style.center}>
            <h5>Minesweeper</h5>
            {this.state.message}
            <br/>
        </div>
    }
}
