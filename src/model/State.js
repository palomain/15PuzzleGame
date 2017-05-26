/**
 * Created by cpalomino on 5/25/2017.
 */
import _ from 'lodash';

const POSITIONS = _.range(16).map(val=>[val/4, val%4]);

export default class PuzzleState{
    constructor(puzzle, parent, move){
        this.hamming = hamming(puzzle.game);
        this.empty = game.empty.slice();
        this.move = move;
        this.parent = parent;
    }

    compareTo(otherState){
        return this.hamming - otherState.hamming;
    }
}

function hamming(state){
    let count = 0;
    state.forEach((row, i)=>{
        row.forEach((val, j)=> {
            if(val !== null){
                const pos = POSITIONS[val];
                count += Math.abs(i-pos[0]) +  Math.abs(j-pos[1]);
            }
        } );
    });

    return count;
}