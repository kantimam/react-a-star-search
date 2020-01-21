import React, { Component } from 'react'
import UiContainer from "./UiContainer"
import { Pathfinder } from '../path-finder/path-finder.js';
import Field from './Field';


export default class AStar extends Component {
    constructor(props) {
        super(props)

        this.fieldRef = React.createRef();

        this.finder = new Pathfinder();
        if(this.props.frameRate) this.finder.frameRate=this.props.frameRate;

        this.nodeOnClick = this.nodeOnClick.bind(this);
        this.createWall = this.createWall.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {
            field: [],
            uiMode: "set start",
            col: this.props.col,
            row: this.props.row
        }
    }

    reset() {
        this.setState({ uiMode: "set start" })
        this.finder.reset();
        this.finder.drawField();
    }

    componentDidMount() {
        this.finder.init(this.state.col, this.state.row, (data) => this.setState({ field: data }), (data) => this.setState({ uiMode: data }));
    }

    nodeOnClick(node) {
        /* set start and end node */
        if (this.finder && this.finder.finished) return console.log("already finished. reset and start again")
        if (this.finder && this.finder.running) return console.log("currently running. reset and start again")

        if (this.state.uiMode === "SET START") {
            return this.finder.setStartNode(node);
        }
        if (this.state.uiMode === "SET END") {
            return this.finder.setEndNode(node);
        }

    }

    createWall(node) {
        /* create walls */
        if (this.finder && this.finder.finished) return console.log("already finished. reset and start again")
        if (this.finder && this.finder.running) return console.log("currently running. reset and start again")

        if (this.state.uiMode === "SET BLOCKED") {
            if (node === this.finder.start || node === this.finder.end) return
            node.draw = 5;
            node.blocked = true;
        }
    }


    render() {
        return (
            <>  
                {this.finder.fieldWidth&&
                    <UiContainer 
                        finder={this.finder} 
                        reset={this.reset}
                        uiMode={this.state.uiMode}
                        updateDim={(col, row)=>this.setState({col: col, row: row})}
                    />}
                <Field 
                    nodeOnClick={this.nodeOnClick} 
                    createWall={this.createWall} 
                    field={this.state.field} 
                    row={this.state.row} 
                    col={this.state.col}
                />

            </>
        )
    }
}
