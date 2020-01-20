import {randomInt} from '../util/util'


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



export class PathfinderCanvas{
    /* version that renders path inside canvas for performance not working on that yet tho */

    field; // actual 2d grid
    fieldWidth;
    fieldHeight;
    drawFunction;  // context of canvas to draw in
    fieldFlat; // 1dim version of the grid for easier looping and drawing
    openSet=new Set();
    closedSet=new Set();
    
    start;
    end;
    current;

    loop=null;
    steps=0;
    finished=false;
    running=false;

    path=[]

    
    // move here from constructor
    init(field, canvasContext){
        this.field=field;
        this.canvasContext=canvasContext;
        this.fieldWidth=this.field[0].length;
        this.fieldHeight=this.field.length;
        this.reset();

    }

    reset(){
        this.finished=false;
        this.running=false;
        this.steps=0;
        if(this.loop) clearTimeout(this.loop);
        this.openSet.clear();
        this.closedSet.clear();
        this.fillField();
        this.fieldFlat=this.field.flat(1);
        this.drawField();
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
        this.run();
    }

    findFromTo(startNode, endNode){
        this.start=startNode;
        this.end=endNode;
        this.run();
    }


    run(){
        /* dont allow to restart while still running */
        if(this.finished || this.running) return console.log("reset before starting a new finder");

        if(!this.field.length || !this.canvasContext) return console.log("seems like init failed");
        if(!this.start) return console.log("please set a start node. setStart(x,y)");
        if(!this.end) return console.log("please set a end node. setEnd(x,y)");
        
        this.drawField();
        this.findValidPaths();

        this.running=true;

        this.loop=setInterval(()=>{
            this.step();
        }, 30)
        
    }

    runStep(){
        if(this.finished || this.running) return console.log("reset before starting a new finder");

        // if its the first step prepare nodes
        if(!this.steps){
            if(!this.field.length || !this.canvasContext) return console.log("seems like init failed");
            if(!this.start) return console.log("please set a start node. setStart(x,y)");
            if(!this.end) return console.log("please set a end node. setEnd(x,y)");
            
            this.drawField();
            this.findValidPaths();
        }
        this.step();
        
    }

    step(){
        if(this.openSet.size){
            this.findLowestFScore();
            this.updateSets();
            this.checkNeigbors();
            this.drawField();
            this.steps++;
        }else{ 
            clearInterval(this.loop);
            this.finished=true;
            this.running=false;
            console.log("could not be solved! :(")
        }
    }

    drawField(){
        //this.drawFunction([...this.fieldFlat]);
    }

    drawPath(){
        this.loop=setInterval(()=>{
            if(!this.current.cameFrom){
                this.running=false;
                return clearTimeout(this.loop);
            } 
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
            this.finished=true;
            return this.drawPath();
        };
        this.openSet.delete(this.current);
        this.closedSet.add(this.current);

        this.current.draw=2;
    }

    

    checkNeigbors(){

        for(let i=0; i<this.current.neighbors.length; i++){

            if(!this.closedSet.has(this.current.neighbors[i])){ 
                //this.current.neighbors[i].g=this.current.g+1;
                let tempG=this.current.g+this.setHeuristic(this.current, this.current.neighbors[i]);
                if(this.openSet.has(this.current.neighbors[i])){
                    if(tempG<this.current.neighbors[i].g){
                        this.current.neighbors[i].g=tempG;
                    } 
                }else{ 
                    this.current.neighbors[i].g=tempG;
                    this.openSet.add(this.current.neighbors[i]);
                    this.current.neighbors[i].draw=1;
                }

                this.current.neighbors[i].cameFrom=this.current;


                this.current.neighbors[i].h=this.setHeuristic(this.current.neighbors[i], this.end);
                this.current.neighbors[i].f=this.current.neighbors[i].h+this.current.neighbors[i].g;
            }
        }
    }

    /* just the distance from node to node*/
    setHeuristic=(from, to)=> Math.hypot(to.x-from.x, to.y-from.y);

    findValidPaths(){
        for(let y=0; y<this.fieldHeight; y++){
            for(let x=0; x<this.fieldWidth; x++){
                
                if(y>0 && !this.field[y-1][x].blocked){
                    this.field[y][x].neighbors.push(this.field[y-1][x]); // top
                }

                if(y>0 && x<this.fieldWidth-1 && !this.field[y-1][x+1].blocked){
                    this.field[y][x].neighbors.push(this.field[y-1][x+1]); // top right
                }
                
                if(x<this.fieldWidth-1 && !this.field[y][x+1].blocked){
                    this.field[y][x].neighbors.push(this.field[y][x+1]); // right
                } 
                
                if(y<this.fieldHeight-1 && x<this.fieldWidth-1 && !this.field[y+1][x+1].blocked){
                    this.field[y][x].neighbors.push(this.field[y+1][x+1]); // bottom right
                }

                if(y<this.fieldHeight-1 && !this.field[y+1][x].blocked){
                    this.field[y][x].neighbors.push(this.field[y+1][x]); // bottom
                } 

                if(y<this.fieldHeight-1 && x>0 && !this.field[y+1][x-1].blocked){
                    this.field[y][x].neighbors.push(this.field[y+1][x-1]); // bottom left
                }
                
                if(x>0 && !this.field[y][x-1].blocked){
                    this.field[y][x].neighbors.push(this.field[y][x-1]); // left
                } 

                if(y>0 && x>0 && !this.field[y-1][x-1].blocked){
                    this.field[y][x].neighbors.push(this.field[y-1][x-1]); // top left
                } 

            }
        }
    }

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