import React, {memo, useState} from 'react'

const colors=["white", "red", "green", "blue", "yellow", "black"]


const Node = ({width, height, item}) => {
    const [color, setColor]=useState(colors[item.draw])
    console.log(item);
    const blockPath=()=>{
        item.draw=5;
        item.blocked=true;
        setColor(colors[item.draw]);
    }
    return (
        <div
            onClick={blockPath}
            className="cell"
            style={{
                width: `${width}px`, 
                height: `${height}px`, 
                left: `${item.x*width}px`, 
                top: `${item.y*height}px`,
                backgroundColor: color 
            }}
        >
        </div>
    )
}

export default memo(Node)


import React, {memo, useRef, useLayoutEffect, useState} from 'react'
import {create2dArray} from '../util/util';
import {Pathfinder} from '../path-finder/path-finder.js';
import Node from './Node';

let finder;

const Field = () => {
    const fieldRef=useRef(null);
    const [width, setWidth]=useState(0);
    const [height, setHeight]=useState(0);
    const [field, setField]=useState([])

    useLayoutEffect(() => {
        const field=create2dArray(12, 10);
        if(fieldRef.current && field.length){
            /* make the cells square */
            if(fieldRef.current.clientWidth>0){
                const cellSize=fieldRef.current.clientWidth / field[0].length;
                setWidth(cellSize);
                setHeight(cellSize); 
            }else if(fieldRef.current.clientHeight>0){
                const cellSize=fieldRef.current.clientHeight / field[0].length;
                setWidth(cellSize);
                setHeight(cellSize);
            }
            finder=new Pathfinder(field, setField);
            finder.init();
            

        }
    }, [])

    

    return (
        <>
            {finder && <button onClick={()=>finder.find()}>START</button>}
            <div ref={fieldRef}  className="field">
            {field.map((item)=>
                <Node
                    key={"key"+item.x+"_"+item.y}
                    width={width}
                    height={height}
                    item={item}
                    
                />
            )}
            </div>
        </>        
        
    )
}

export default memo(Field)
