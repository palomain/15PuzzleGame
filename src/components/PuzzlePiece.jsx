import React, {Component} from 'react';
import '../../public/stylesheets/puzzle-styles.css';
import {MOVES} from '../model/PuzzleState';

const OFFSET = 2;

const $ = require('jquery');

const PIECE_SIZE = 50;
const TRANSITION_EVENT = whichTransitionEvent();

const MOVE_CLASSES = {
    UP    : "move-up",
    DOWN  : "move-down",
    LEFT  : "move-left",
    RIGHT : "move-right"
};

const OPPOSITES = {
    UP : MOVES.DOWN,
    DOWN : MOVES.UP,
    LEFT : MOVES.RIGHT,
    RIGHT : MOVES.LEFT
};

export default class PuzzlePiece extends  Component {

    constructor(props){
        super(props);

        this.state = {
            i : this.props.i,
            j : this.props.j
        };

    }

    move(moveId, cb){
        const el = this.refs["p"+this.props.num];
        const eljq = $(el);
        const self = this;
        const dirClass = MOVE_CLASSES[moveId];
        const move = OPPOSITES[moveId];
        eljq.addClass(dirClass);

        const handler = function() {
            eljq.removeClass(dirClass);
            el.removeEventListener(TRANSITION_EVENT, handler);
            self.setState({
                i : self.state.i + move[0],
                j : self.state.j + move[1],
            }, ()=>{
                if(cb){
                    cb();
                }
            });

        };

        el.addEventListener(TRANSITION_EVENT, handler);


    }

    render(){
        let canMove = this.props.canMove;
        let x = this.state.j*PIECE_SIZE;
        let y = this.state.i*PIECE_SIZE;
        let num = this.props.num;
        let self = this;
        return (
            <div ref={"p"+num} id={"p"+num} onClick={canMove ? self.props.moveHandler.bind(undefined, self) : null}
                 className={"piece " + (canMove ? "movable" : "")}
                 style={{

                     top : (OFFSET + y) + "px",
                     left : (OFFSET + x) + "px"
                 }}>
                <span style={{fontSize:"30px"}}>{num !== null ? num : ""}</span>
            </div>
        );
    }

}

/* From Modernizr */
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}