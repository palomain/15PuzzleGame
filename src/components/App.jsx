import React, {Component} from 'react';
import PuzzleBoard from './PuzzleBoard.jsx';
import PuzzleBuilder from '../model/PuzzleBuilder';
import PuzzleSolver from '../model/PuzzleSolver';

const builder = new PuzzleBuilder(100);
const solver = new PuzzleSolver();

export default class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            game : builder.newGame()
        };
    }

    solve(){
        let game = this.refs.board.getGameState();

        const states = solver.solvePuzzleAStar(game);

        states.shift();

        this.refs.board.runMoves( states.map(state => state.moveId) );

    }

    startNewGame(){
        this.refs.board.setNewGame(builder.newGame());
    }

    render(){
        const self = this;
        return (
            <div>
                <PuzzleBoard ref="board" game={self.state.game}/>
                <br/>
                <div style={{textAlign:"center"}}>
                    <button onClick={self.solve.bind(self)}>Solve</button>
                    <button onClick={self.startNewGame.bind(self)}>Start new Game</button>
                </div>
            </div>
        )
    }

}