import React from 'react';
import style from './battleship.css'

// function Book(props) {
//     return <div className={style.book}>
//         <img src={props.img} className={style.bookCover}/>
//         {/*<br/>*/}
//         {props.description}
//     </div>
// }

export default class Battleship extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return <div>
            <h5>Battleship</h5>
            {/*<h6>Here's what I'm reading:</h6>*/}
            {/*<div className={style.bookshelf}>*/}
                {/*{*/}
                    {/*books.map(function(book, index) {*/}
                        {/*return <Book*/}
                            {/*key={index}*/}
                            {/*img={"images/"+book.imageTitle+".jpeg"}*/}
                            {/*description={book.description}*/}
                        {/*/>;*/}
                    {/*})*/}
                {/*}*/}
            {/*</div>*/}
        </div>
    }
}