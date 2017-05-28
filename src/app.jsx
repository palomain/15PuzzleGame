/**
 * Created by cpalomino on 5/25/2017.
 */
import App from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';


window.onload = function() {
    ReactDOM.render(<App />, document.getElementById("main"));
}

/*console.log("Creating")

let game = puzzle.newGame();

console.log("\n\n\n\n\n\n");
console.log("Solving...");

let moves = game.getValidMoves();

let solver = new PuzzleSolver();

let init = new Date().getTime();
let solution = solver.solvePuzzleAStar(game);

for(let board of solution){
    console.log("State is:");
    board.state.forEach(row=>console.info(row.reduce((acc,val)=>acc + val +" ", "")));
    console.log("after move " + board.move);

    console.log("");

}

console.log("A total of " + solution.length  + " moves");*/

/*
let pq = new PriorityQueue();

for(let i = 0; i < 10; i++){
    const obj  = {
        val : ~~(Math.random()*1000),
        compareTo(b){
            return this.val - b.val;
        }
    };

    pq.add(obj);
}



console.log("PQ is " + pq.heap.map(obj=>obj.val));


while(pq.heap.length){
    let min = pq.remove().val;
    console.log("Min is " + min + " and heap is " + pq.heap.map(obj=>obj.val) );
}

 console.log("game is " );
 game.state.forEach(row=>console.info(row.reduce((acc,val)=>acc + val +" ", "")));
 console.log("empty location is at " + game.empty);

 let validMoves = game.getValidMoves();

 game = game.makeMove(validMoves[0]);
 console.log("game after move is " );
 game.state.forEach(row=>console.info(row.reduce((acc,val)=>acc + val +" ", "")));

*/