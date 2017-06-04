/**
 * Created by cpalomino on 5/25/2017.
 */
import _ from 'lodash';

export const MOVES = {
    UP : [-1, 0],
    DOWN : [1, 0],
    LEFT : [0, -1],
    RIGHT : [0, 1]
};

export const POSITIONS = _.range(1, 16).map(val=>[~~((val-1)/4), (val-1)%4]);

export default class PuzzleState{

    constructor(state, empty, parent, moveId, heuristicF = MANHATTAN_LINEAR){
        this.cost = heuristicF(state, empty);
        this.empty = empty;
        this.state = state;
        this.moveId = moveId;
        this.parent = parent;
    }


    makeMove(moveId, heuristicF = MANHATTAN_LINEAR){
        const move = MOVES[moveId];
        const state = this.state.map(row=>row.slice());
        const empty = this.empty;
        const pos = [empty[0] + move[0], empty[1] + move[1] ];
        [state[empty[0]][empty[1]] , state[pos[0]][pos[1]]] = [state[pos[0]][pos[1]] , state[empty[0]][empty[1]]];

        return new PuzzleState(state, pos, this, moveId, heuristicF);
    }

    getValidMoves(){

        const moves = [];
        const empty = this.empty;
        for(let moveId of Object.keys(MOVES)){
            const move = MOVES[moveId];
            const i = empty[0] + move[0];
            const j = empty[1] + move[1];

            if(i >= 0 && i < 4 && j >= 0 && j < 4){
                moves.push(moveId);
            }
        }

        return moves;
    }

    compareTo(otherState){
        return this.cost - otherState.cost;
    }

    isFinalState(){
        return this.cost == 0;
    }

    /*stateIterator(){
        return iterator(state);
    }*/

    toString(){
        let str = "";
        this.state.forEach(row=>{
           row.forEach(val=>str+=val+" ");
        });

        return str;
    }
}

/*function *iterator(state){
    while(state){
        yield state;
        state = state.parent;
    }
}*/

export const MANHATTAN_LINEAR = function(state, empty){
    let count = 0;
    state.forEach((row, i)=>{
        row.forEach((val, j)=> {
            if(val){
                const pos = POSITIONS[val-1];

                const posVal = state[pos[0]][pos[1]];

                let offset = Math.abs(i-pos[0]) +  Math.abs(j-pos[1]) ;

                if(posVal && offset) {
                    const pos2 = POSITIONS[posVal - 1];

                    if((pos[0] == i && pos2[0] == j && pos2[1] == j) ||
                        (pos[1] == j && pos2[1] == j && pos2[0] == i )){

                        count++;
                    }
                }
                count += offset;
            }
        } );
    });

    return count;
};

export const MANHATTAN_LINEAR_RANGE = function(state, range){
    let count = 0;
    let found = false;

    state.forEach((row, i)=>{
        row.forEach((val, j)=> {
            if(val && range.indexOf(val) != -1){
                const pos = POSITIONS[val-1];

                const posVal = state[pos[0]][pos[1]];

                let offset = Math.abs(i-pos[0]) +  Math.abs(j-pos[1]) ;

                if(posVal && offset) {
                    const pos2 = POSITIONS[posVal - 1];

                    if((pos[0] == i && pos2[0] == j && pos2[1] == j) ||
                        (pos[1] == j && pos2[1] == j && pos2[0] == i )){

                        count++;
                    }
                }


                count += offset;
            }
        } );
    });

    return count;

};



