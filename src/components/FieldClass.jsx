import React, { Component } from 'react'
import {create2dArray} from '../util/util';
import {Pathfinder} from '../path-finder/path-finder.js';
import Node from './Node';


export default class FieldClass extends Component {
    constructor(props) {
        super(props)
        
        this.fieldRef=React.createRef();

        this.field=create2dArray(22, 22);
        this.finder=new Pathfinder();

        this.callAfterCss=this.callAfterCss.bind(this);
        this.nodeOnClick=this.nodeOnClick.bind(this);
        this.waitForCss=null;

        this.state = {
             width: 0,
             height: 0,
             field: [],
             uiMode: "pending"
        }
    }

    componentDidMount(){
        this.waitForCss=requestAnimationFrame(this.callAfterCss);
    }

    callAfterCss(){
        /* componentdidmount fires before dom actually painted anything so wait for first real paint to measure the container */
        if(this.fieldRef.current && this.field.length && this.waitForCss){
            console.log(this.fieldRef.current.clientWidth)
            /* make the cells square */
            if(this.fieldRef.current.clientWidth>0){
                const cellSize=this.fieldRef.current.clientWidth / this.field[0].length;
                this.setState({width: cellSize, height: cellSize, uiMode: "set start"});
            }else if(this.fieldRef.current.clientHeight>0){
                const cellSize=this.fieldRef.current.clientHeight / this.field[0].length;
                this.setState({width: cellSize, height: cellSize, uiMode: "set start"});
            }
            this.finder.init(this.field, (data)=>this.setState({field: data}));

            cancelAnimationFrame(this.callAfterCss);
        }
    }

    nodeOnClick(node){
        if(this.state.uiMode==="set start"){
            this.finder.setStartNode(node);
            return this.setState({uiMode: "set end"});
        }
        if(this.state.uiMode==="set end"){
            this.finder.setEndNode(node);
            return this.setState({uiMode: "set blocked"})
        }
        if(this.state.uiMode==="set blocked"){
            if(node===this.finder.start || node===this.finder.end) return
            node.draw=5;
            node.blocked=true;
        }
    }

    
    render() {
        return (
            <>
            {this.finder && 
                <>  <p>{this.state.uiMode}</p>
                    <button onClick={()=>this.finder.findRandomPath()}>random path</button>
                    <button onClick={()=>this.finder.find()}>START</button>
                    <button onClick={()=>this.finder.find()}>START</button>
                </>
            }
            <div ref={this.fieldRef}  className="field">
            {this.state.field.map((item)=>
                <Node
                    key={"key"+item.x+"_"+item.y+"_"+item.draw}
                    width={this.state.width}
                    height={this.state.height}
                    /* x={item.x}
                    y={item.y}
                    color={colors[item.draw]} */
                    item={item}
                    nodeOnClick={this.nodeOnClick}
                />
            )}
            </div>
        </>   
        )
    }
}
