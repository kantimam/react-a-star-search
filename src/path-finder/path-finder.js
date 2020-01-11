import {randomInt} from '../util/util'
import { getQueriesForElement } from '@testing-library/react';

export class Pathfinder{
    fieldFlat;
    openSet=new Set();
    closedSet=new Set();
    
    start;
    end;
    current;

    loop;

    path=[]

    constructor(field, drawFunction){
        this.field=field;
        this.drawFunction=drawFunction;
        this.fieldWidth=this.field[0].length;
        this.fieldHeight=this.field.length;
    }

    setup(){
        this.fillField();
        this.randomStart();
        this.randomEnd();
        this.findNeighbors();
        this.fieldFlat=this.field.flat(1);
        this.drawFunction([...this.fieldFlat]);
    }

    run(){
        this.loop=setInterval(()=>{
            if(this.openSet.size){
                this.findLowestFScore();
                this.updateSets();
                this.checkNeigbors();
                //this.drawFunction(this.field.map(row=>[...row]));
                this.drawFunction([...this.fieldFlat]);
            }else{ 
                clearInterval(this.loop);
                console.log("could not be solved! :(")
            }
        } ,200)
    }



    findLowestFScore(){
        this.min=this.openSet.values().next().value;
        console.log(this.openSet.size)
        for(let node of this.openSet){
            if(node.f<this.min.f) this.min=node;
        }
        this.current=this.min;
    }
    
    updateSets(){
        if(this.current===this.end){
            // stop looping when done
            clearTimeout(this.loop); 
            this.current.draw=3
            return console.log("solved! :3")
        };
        this.openSet.delete(this.current);
        this.closedSet.add(this.current);
        //console.log(this.openSet)

        this.current.draw=2;
    }

    findNeighbors(){
        for(let y=0; y<this.fieldHeight; y++){
            for(let x=0; x<this.fieldWidth; x++){
                y>0 && this.field[y][x].neighbors.push(this.field[y-1][x]);
                x<this.fieldWidth-1 && this.field[y][x].neighbors.push(this.field[y][x+1]);
                y<this.fieldHeight-1 && this.field[y][x].neighbors.push(this.field[y+1][x]);
                x>0 && this.field[y][x].neighbors.push(this.field[y][x-1]);
            }
        }
    }

    checkNeigbors(){

        for(let i=0; i<this.current.neighbors.length; i++){

            if(!this.closedSet.has(this.current.neighbors[i])){ 
                //this.current.neighbors[i].g=this.current.g+1;
                let tempG=this.current.g+1;
                if(this.openSet.has(this.current.neighbors[i])){
                    if(tempG<this.current.neighbors[i]) this.current.neighbors[i].g=tempG;
                }else{ 
                    this.current.neighbors[i].g=tempG;
                    this.openSet.add(this.current.neighbors[i]);
                    this.current.neighbors[i].draw=1;
                }

                this.current.neighbors[i].h=this.setHeuristic(this.current.neighbors[i]);
                this.current.neighbors[i].f=this.current.neighbors[i].h+this.current.neighbors[i].g;
            }
        }
    }

    /* just the distance for now */
    setHeuristic=(node)=> Math.hypot(this.end.x-node.x, this.end.y-node.y);

    randomStart(){
        //this.start=this.field[randomInt(0, this.fieldHeight-1)][randomInt(0, this.fieldWidth-1)];
        this.start=this.field[0][0];
        this.openSet.add(this.start);
    }

    randomEnd(){
        this.end=this.field[randomInt(0, this.fieldHeight-1)][randomInt(0, this.fieldWidth-1)];
    }

    fillField(size){
        for(let y=0; y<this.fieldHeight; y++){
            for(let x=0; x<this.fieldWidth; x++){
                this.field[y][x]=new Node(x,y,size);
            }
        }
    }
}

class Node{
     /* top, right, bottom, left  for now*/
    neighbors=[];
    cameFrom;
    f=0;
    g=0;
    h=0;

    draw=0;
    constructor(x, y, size){
        this.x=x;
        this.y=y;
        this.size=size;
    }


}



export default Pathfinder;