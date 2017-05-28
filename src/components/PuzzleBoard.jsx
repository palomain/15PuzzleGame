import React, {Component} from 'react';
import PuzzlePiece from './PuzzlePiece.jsx';
import {MOVES} from '../model/PuzzleState';



export default class PuzzleBoard extends Component{

    constructor(props){
        super(props);
        this.state = {
            game : props.game
        };
    }

    pieceClickHandler(piece){

        let moveKey = null;
        const state = this.state.game;
        const empty = state.empty;
        for( let key in MOVES ){
            if( empty[0] + MOVES[key][0] == piece.props.i && empty[1] + MOVES[key][1] == piece.props.j  ){
                moveKey =  key;
                break;
            }
        }

        this.executeMove(moveKey, piece, false);
    }

    executeMove(moveKey, piece, dontRender){
        const self = this;
        const newGame = self.state.game.makeMove(moveKey);
        piece.move(moveKey, function(){
            console.log("Rendering!");
            if(!dontRender) {
                self.setState({game: newGame});
            }
        });
    }

    getGameState(){
        return this.state.game;
    }

    setNewGame(game){
        this.setState({game : game});
    }

    runMoves(movesIds){
        const self = this;
        const simulation = function(i, board, game) {

            const state = game.state;
            const empty = game.empty;

            if(i == movesIds.length) {
                board.setState({game:game});
                return;
            }

            const moveId = movesIds[i];
            const move = MOVES[moveId];
            const pnum = state[empty[0] + move[0]][empty[1] + move[1]];

            const newGame = game.makeMove(moveId);
            board.refs["p"+pnum].move(moveId, ()=>{
                self.setState({
                    game : newGame
                }, ()=> simulation(i+1, board, newGame))

            });
        };

        simulation(0, this, this.state.game);
    }

    canMove(i, j){
        let validMoves = this.state.game.getValidMoves();
        let empty = this.state.game.empty;
        for(let moveId of validMoves){
            const move = MOVES[moveId];
            if(i == move[0] + empty[0] && j == move[1] + empty[1]){
                return true;
            }
        }

        return false;
    }

    render(){
        let state = this.state.game.state;
        let self = this;

        return (
            <div>
                {
                    state.map((row, i)=>{
                        return row.map((val, j)=>{
                            return val !== null ? <PuzzlePiece ref={"p"+val} j={j} i={i} num={val} canMove={self.canMove(i, j)} moveHandler={self.pieceClickHandler.bind(self)}/> : <div></div> ;
                        })
                    })
                }
            </div>
        )
    }
}