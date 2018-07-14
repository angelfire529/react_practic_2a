
import React from 'react';
import 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles/game.scss';


const Stars = (props) => {
    return (
        <div className="col-xs-6">
            {_.range(props.numberOfStars).map((number, i) => <i key={i} className="fa fa-star"></i>)}
        </div>
    );
}


const Button = (props) => {
    let button;
    switch (props.isAnswerCorrect) {
        case true:
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i>
                <div className="tooltip">Please click button again!</div>
            </button>
            break;
        case false:
            button = <button className="btn btn-danger" >
                <i className="fa fa-times"></i>
            </button>
            break
        default:
            button = <button disabled={props.selectedNumbers.length === 0} className="btn" onClick={() => props.checkAnswer()}>=</button>
            break;
    }
    const noMoreRedraws = (redraws) => {
        return redraws === 0;
    }
    return (
        <div className="col-xs-1 buttons">
        
        {button}
            <br /><br />
            <button className="btn btn-sm btn-warning text-center"
            onClick={props.refresh} 
            disabled={noMoreRedraws(props.redraws)}>
                <i className="fa fa-refresh"  > {props.redraws}</i>
            </button>
            
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className="col-xs-5">
            {props.selectedNumbers.map((number, i) => <span key={i} onClick={() => props.deselectNumber(number)}>{number}</span>)}
        </div>
    );
}

const Numbers = (props) => {
    const arrayOfNumbers = _.range(1, 10);
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    }
    return (
        <div className="col-xs-12 text-center card">
            <div>
                {arrayOfNumbers.map((number, i) => <span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)} >{number}</span>)}
            </div>
        </div>
    )
}

const DoneFrame = (props) => {
    return (
        <div className="col-xs-12 text-center done">
        <h2>{props.isFinished}</h2>
        </div>
    );
}

class Game extends React.Component {
    static redraw = () => {
        return 1 + Math.floor(Math.random() * 9);
    }
    state = {
        selectedNumbers: [],
        usedNumbers: [],
        stars: Game.redraw(),
        isAnswerCorrect: null,
        redraws: 5,
        finished: null
    }

    selectNumber = (clickedNumber) => {
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.indexOf(clickedNumber) === -1 && prevState.usedNumbers.indexOf(clickedNumber) === -1 ? prevState.selectedNumbers.concat(clickedNumber) : prevState.selectedNumbers,
            isAnswerCorrect: null
        }));
    }
    deselectNumber = (clickedNumber) => {
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers
                .filter((number) => number !== clickedNumber),
            isAnswerCorrect: null
        }));
    }
    checkAnswer = () => {
        this.setState((prevState) => ({
            isAnswerCorrect: prevState.stars === prevState.selectedNumbers.reduce((s, n) => { s + n })
        }));
    }
    acceptAnswer = () => {
        this.setState((prevState) => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            isAnswerCorrect: null,
            stars: Game.redraw()
        }));
    }
    refresh = () => {
        if(this.state.redraws === 0) {
            return;
        }
        this.setState((prevState) => ({
            stars: Game.redraw(),
            selectedNumbers: [],
            isAnswerCorrect: null,
            redraws: prevState.redraws - 1
        }));
    }
    render() {
        return (
            <div className="container">
                <h3 className="text-center">Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.stars} />
                    <Button selectedNumbers={this.state.selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        isAnswerCorrect={this.state.isAnswerCorrect}
                        redraws={this.state.redraws}
                        refresh={this.refresh} />
                    <Answer selectedNumbers={this.state.selectedNumbers} deselectNumber={this.deselectNumber} />
                    {this.state.finished ? 
                    <DoneFrame isFinished={this.state.finished} /> :
                    <Numbers selectNumber={this.selectNumber}
                        selectedNumbers={this.state.selectedNumbers} usedNumbers={this.state.usedNumbers} />
                    
                }
                        
                </div>
            </div>
        );
    }
}


export default Game;