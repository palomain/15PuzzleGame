/**
 * Created by cpalomino on 5/25/2017.
 */

export default class PriorityQueue{
    constructor(){
        this.heap = [];
    }

    add(val){
        this.heap.push(val);
        this.swim();
    }

    remove(){
        let val = this.heap[0];
        let newVal = this.heap.pop();

        if(this.heap.length) {
            this.heap[0] = newVal;
        }

        this.sink();

        return val;
    }

    sink(){
        let h = this.heap;
        let val = h[0];
        let index = 2;
        let prevIndex = 1;
        while(index <= h.length){

            let newIndex = index*2;
            if(index < h.length && h[index-1].compareTo(h[index]) > 0 ){
                newIndex = ++index*2;
            }

            if(val.compareTo(h[index-1]) > 0){
                [h[prevIndex-1] , h[index-1]] = [h[index-1], h[prevIndex-1]];
            } else {
                break;
            }

            prevIndex = index;
            index = newIndex;

        }

    }

    swim(){
        let h = this.heap;
        let val = h[h.length-1];
        let prevIndex = h.length;
        let index = ~~(h.length/2);
        while(index >= 1 && val.compareTo(h[index-1]) < 0){
            [h[index-1], h[prevIndex-1]] = [h[prevIndex-1], h[index-1]];
            prevIndex = index;
            index = ~~(index/2);
        }
    }

    clear(){
        this.heap = []
    }

    isEmpty(){
        return this.heap.length == 0;
    }

}