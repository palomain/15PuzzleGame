import PriorityQueue from '../datastructures/PriorityQueue';
import {MOVES} from '../model/PuzzleState';

const MAX_DEPTH = 80;

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
        game.childStates = null;
        game.parent = null;
        let limit = game.manhattan;

        let path = null;

        while(path === null && limit <= MAX_DEPTH){
            let rec = idaStar(game, limit, 0, {});
            limit = Math.max(rec.limit, limit+1);
            path = rec.path;
        }

        path.unshift(game);

        return path;
    }

}

function idaStar(state, limit, currDepth, covered){
    let movesIds = state.getValidMoves();
    const stateStr = state.toString();

    if(covered[stateStr]){
        return;
    }

    //console.log("State is " + stateStr + " and manhattan is " + state.manhattan + " and depth is " + currDepth + " and limit is " + limit );

    covered[stateStr] = true;

    if(state.manhattan == 0){
        return {
            path : [],
            limit : 0,
            depthReached : false
        };
    }

    if(state.manhattan > limit || currDepth == MAX_DEPTH){
        return {
            path : null,
            limit : state.manhattan,
            depthReached : currDepth == MAX_DEPTH
        };
    }

    const childStates = [];

    if(!state.childStates) {

        for (let moveId of movesIds) {
            let childState = state.makeMove(moveId);
            childStates.push(childState);
        }

        childStates.sort((a,b)=>a.manhattan-b.manhattan);

        state.childStates = childStates;
    }

    let path = null;
    let newLimit = null;
    for(let childState of state.childStates){
        let rec = idaStar(childState, limit, currDepth+1, covered);

        if(!rec){
            continue;
        }

        if(rec.path){
            rec.path.unshift(childState);
            return rec;
        } else {
            if(rec.limit > limit ){
                newLimit = !newLimit ? rec.limit : Math.min(newLimit, rec.limit);
            }
        }

    }

    return {
        path : null,
        limit : newLimit,
        depthReached : false
    };

}
