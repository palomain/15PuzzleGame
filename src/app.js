/**
 * Created by cpalomino on 5/25/2017.
 */
import PriorityQueue from './datastructures/PriorityQueue';
import Puzzle from './model/Puzzle';

let puzzle = new Puzzle(200);

let game = puzzle.newGame();

console.log("game is " );
game.forEach(row=>console.info(row.reduce((acc,val)=>acc + val +" ", "")));
console.log("empty location is at " + game.empty);

let validMoves = puzzle.getValidMoves();

game = puzzle.move(validMoves[0]);
console.log("game after move is " );
game.forEach(row=>console.info(row.reduce((acc,val)=>acc + val +" ", "")));

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
}*/