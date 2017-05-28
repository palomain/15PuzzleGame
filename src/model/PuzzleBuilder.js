/**
 * Created by cpalomino on 5/25/2017.
 */

import PuzzleState, {manhattan} from './PuzzleState';

const GAME_PROTOTYPE =[
     [1, 2, 3, 4],
     [5, 6, 7, 8],
     [9, 10, 11, 12],
     [13, 14, 15, null]
];

export default class PuzzleBuilder{

    constructor(iterations = 100){
       this.iterations = iterations;
    }

    newGame(){
        const state = generateNewGame(this.iterations);
        let j = null;
        let i = state.findIndex( (row) => {
            j = row.findIndex(val=>val===null);
            return j != -1;
        });

        return new PuzzleState(state, [i, j]);
    }

}

function generateNewGame(iterations){
    let game = GAME_PROTOTYPE.map(row=>row.slice());

    let prev = null;
    let curr = [3, 3];

    const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for(let i=0; i < iterations; i++){
        let possiblePos = [];
        for(let move of moves){
            let pos = [curr[0]+move[0], curr[1]+move[1]];

            if(pos[0] >= 0 && pos[1] >= 0 && pos[0] < 4 && pos[1] < 4 && (prev == null || prev[0] != pos[0] || prev[1] != pos[1])) {
                possiblePos.push(pos);
            }
        }

        prev = curr;
        curr = possiblePos[~~(Math.random()*possiblePos.length)];

        [ game[prev[0]][prev[1]], game[curr[0]][curr[1]] ]  = [ game[curr[0]][curr[1]], game[prev[0]][prev[1]] ];

    }

    return game;

}