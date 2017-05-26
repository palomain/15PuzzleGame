/**
 * Created by cpalomino on 5/25/2017.
 */

const GAME_PROTOTYPE =[
     [1, 2, 3, 4],
     [5, 6, 7, 8],
     [9, 10, 11, 12],
     [13, 14, 15, null]
];

export const MOVES = {
    UP : [-1, 0],
    DOWN : [1, 0],
    LEFT : [0, -1],
    RIGHT : [0, 1]
};

export default class Puzzle{

    constructor(iterations = 100){
       this.iterations = iterations;
    }

    getValidMoves(){
        if(this.game == null){
            throw "Game has not been initialized";
        }

        const moves = [];
        const empty = this.empty;
        for(let move of Object.values(MOVES)){
            const i = empty[0] + move[0];
            const j = empty[1] + move[1];

            if(i >= 0 && i < 4 && j >= 0 && j < 4){
                moves.push(move);
            }

        }

        return moves;
    }

    move(dir){
        if(this.game == null){
            throw "Game has not been initialized";
        }
        const game = this.game;
        const empty = this.empty;
        const pos = [empty[0] + dir[0], empty[1] + dir[1] ];
        [game[empty[0]][empty[1]] , game[pos[0]][pos[1]]] = [game[pos[0]][pos[1]] , game[empty[0]][empty[1]]];

        this.empty = pos;

        return game;
    }

    newGame(){
        this.game = generateNewGame(this.iterations);
        let j = null;
        let i = this.game.findIndex( (row) => {
            j = row.findIndex(val=>val===null);
            return j != -1;
        });

        this.empty = [i, j];
        return this.game;
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