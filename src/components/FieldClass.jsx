import React, { Component } from 'react'
import UiContainer from "./UiContainer"
import { create2dArray } from '../util/util';
import { Pathfinder } from '../path-finder/path-finder.js';
import Node from './Node';


export default class FieldClass extends Component {
    constructor(props) {
        super(props)

        this.fieldRef = React.createRef();

        this.field = create2dArray(this.props.col || 20, this.props.row || 20);
        this.finder = new Pathfinder();

        this.callAfterCss = this.callAfterCss.bind(this);
        this.nodeOnClick = this.nodeOnClick.bind(this);
        this.createWall = this.createWall.bind(this);
        this.setSize=this.setSize.bind(this);
        this.reset = this.reset.bind(this);
        this.waitForCss = null;

        this.state = {
            width: 0,
            height: 0,
            field: [],
            uiMode: "pending"
        }
    }

    reset() {
        this.setState({ uiMode: "set start" })
        this.finder.reset();
        this.finder.drawField();
    }

    componentDidMount() {
        this.finder.init(this.field, (data) => this.setState({ field: data }), (data) => this.setState({ uiMode: data }));
        window.addEventListener("resize", this.setSize)
        this.waitForCss = requestAnimationFrame(this.callAfterCss);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.setSize)
    }

    callAfterCss() {
        /* componentdidmount fires before dom actually painted anything so wait for first real paint to measure the container */
        if (this.fieldRef.current && this.field.length && this.waitForCss) {
            /* make the cells square */
            this.setSize();
            cancelAnimationFrame(this.callAfterCss);
        }
    }

    setSize(){
        if (this.fieldRef.current.clientWidth > 0) {
            const cellSize = this.fieldRef.current.clientWidth / this.field[0].length;
            this.setState({ width: cellSize, height: cellSize, uiMode: "set start" });
        } else if (this.fieldRef.current.clientHeight > 0) {
            const cellSize = this.fieldRef.current.clientHeight / this.field[0].length;
            this.setState({ width: cellSize, height: cellSize, uiMode: "set start" });
        }
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
                <UiContainer 
                    finder={this.finder} 
                    reset={this.reset}
                    uiMode={this.state.uiMode}
                />
                <div className="fieldContainer fancyShadow">
                    <div style={{height: `${this.state.height*this.props.row}px`}} ref={this.fieldRef} className="field">
                        {this.state.field.map((item) =>
                            <Node
                                key={"key" + item.x + "_" + item.y + "_" + item.draw}
                                width={this.state.width}
                                height={this.state.height}
                                item={item}
                                nodeOnClick={this.nodeOnClick}
                                createWall={this.createWall}
                            />
                        )}
                    </div>
                </div>

            </>
        )
    }
}
