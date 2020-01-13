import {randomInt} from '../util/util'

export class Pathfinder{
    field; // actual 2d grid
    fieldWidth;
    fieldHeight;
    drawFunction;  // function to draw the field setState in this case
    fieldFlat; // 1dim version of the grid for easier looping and drawing
    openSet=new Set();
    closedSet=new Set();
    
    start;
    end;
    current;

    loop;

    path=[]

    
    // move here from constructor
    init(field, drawFunction){
        this.field=field;
        this.drawFunction=drawFunction;
        this.fieldWidth=this.field[0].length;
        this.fieldHeight=this.field.length;
        this.fillField();

        this.fieldFlat=this.field.flat(1);
        this.drawField();
    }

    reset(){
        this.openSet.clear();
        this.closedSet.clear();
        this.fillField();

    }


    setStart(x,y){
        this.start=this.field[y][x];
        this.start.draw=1;
        this.openSet.add(this.start);

    }

    setEnd(x,y){
        this.end=this.field[y][x];
        this.end.draw=4;
    }

    setStartNode(node){
        this.start=node;
        this.start.draw=1;
        this.openSet.add(this.start);

    }

    setEndNode(node){
        this.end=node;
        this.end.draw=4;
    }


    findRandomPath(){
        this.randomStart();
        this.randomEnd();
        this.find();
    }

    findFromTo(startNode, endNode){
        this.start=startNode;
        this.end=endNode;
        this.find();
    }

    find(){
        if(!this.field.length || !this.drawFunction) return console.log("seems like init failed");
        this.drawField();
        this.findValidPaths();
        this.run();
    }

    run(){
        if(!this.start) return console.log("please set a start node. setStart(x,y)");
        if(!this.end) return console.log("please set a end node. setEnd(x,y)");
        this.loop=setInterval(()=>{
            if(this.openSet.size){
                this.findLowestFScore();
                this.updateSets();
                this.checkNeigbors();
                this.drawField();
            }else{ 
                clearInterval(this.loop);
                console.log("could not be solved! :(")
            }
        } ,30)
    }

    drawField(){
        //console.log("draw")
        // looks like drawing with this many divs takes ages :( maybe move to webgl canvas 
        this.drawFunction([...this.fieldFlat]);
    }

    drawPath(){
        this.loop=setInterval(()=>{
            if(!this.current.cameFrom) return clearTimeout(this.loop);
            this.path.unshift(this.current);
            this.current=this.current.cameFrom;
            this.current.draw=4;
            this.drawField();
        }, 100);
    }



    findLowestFScore(){
        this.min=this.openSet.values().next().value;
        //console.log(this.openSet.size)
        for(let node of this.openSet){
            if(node.f<this.min.f) this.min=node;
        }
        this.current=this.min;
    }
    
    updateSets(){
        if(this.current===this.end){
            console.log(this.current, this.end, this.field)
            // stop looping when done
            clearTimeout(this.loop); 
            this.current.draw=3
            console.log("solved! :3")
            return this.drawPath();
        };
        this.openSet.delete(this.current);
        this.closedSet.add(this.current);

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

    findValidPaths(){
        for(let y=0; y<this.fieldHeight; y++){
            for(let x=0; x<this.fieldWidth; x++){
                if(y>0 && !this.field[y-1][x].blocked) this.field[y][x].neighbors.push(this.field[y-1][x]);
                if(x<this.fieldWidth-1 && !this.field[y][x+1].blocked) this.field[y][x].neighbors.push(this.field[y][x+1]);
                if(y<this.fieldHeight-1 && !this.field[y+1][x].blocked) this.field[y][x].neighbors.push(this.field[y+1][x]);
                if(x>0 && !this.field[y][x-1].blocked) this.field[y][x].neighbors.push(this.field[y][x-1]);
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

                this.current.neighbors[i].cameFrom=this.current;


                this.current.neighbors[i].h=this.setHeuristic(this.current.neighbors[i]);
                this.current.neighbors[i].f=this.current.neighbors[i].h+this.current.neighbors[i].g;
            }
        }
    }

    /* just the distance for now */
    setHeuristic=(node)=> Math.hypot(this.end.x-node.x, this.end.y-node.y);

    randomStart(){
        this.setStart(randomInt(0, this.fieldWidth-1), randomInt(0, this.fieldHeight-1));
    }

    randomEnd(){
        this.setEnd(randomInt(0, this.fieldWidth-1), randomInt(0, this.fieldHeight-1));
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
    neighbors=[];
    cameFrom;
    f=0;
    g=0;
    h=0;

    draw=0;
    blocked=false;
    constructor(x, y, size){
        this.x=x;
        this.y=y;
        this.size=size;
    }


}



export default Pathfinder;