import PriorityQueue from '../datastructures/PriorityQueue';
import {MOVES} from '../model/PuzzleState';

export default class PuzzleSolver {

    constructor(){
        this.pq =  new PriorityQueue();
    }

    solvePuzzleAStar(game){
        const pq = this.pq;
        pq.clear();
        let visited = {};
        game.parent = null;
        game.moveId = null;
        pq.add(game);

        while(!pq.isEmpty()){
           game = pq.remove();

            if(game.manhattan == 0){
                break;
            }

            visited[game.toString()] = true;
            const movesIds = game.getValidMoves();

            for(let moveId of Object.values(movesIds)){

                let childState = game.makeMove(moveId);
                if(!visited[childState.toString()] ) {
                    pq.add(childState);
                }
            }

        }

        const stateList = [];

        while(game){
            stateList.unshift(game);

            game = game.parent;
        }

        return stateList;

    }

    solvePuzzleIDAStar(game){


    }

}