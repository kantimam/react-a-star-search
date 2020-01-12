import React, {memo, useRef, useLayoutEffect, useState} from 'react'
import {create2dArray} from '../util/util';
import {Pathfinder} from '../path-finder/path-finder.js';
import Node from './Node';

const finder=new Pathfinder();;

const Field = () => {
    const fieldRef=useRef(null);
    const [width, setWidth]=useState(0);
    const [height, setHeight]=useState(0);
    const [field, setField]=useState([])

    useLayoutEffect(() => {
        const field=create2dArray(22, 22);
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
            finder.init(field, setField);
            

        }
    }, [])


    return (
        <>
            {finder && <button onClick={()=>finder.find()}>START</button>}
            <div ref={fieldRef}  className="field">
            {field.map((item)=>
                <Node
                    key={"key"+item.x+"_"+item.y+"_"+item.draw}
                    width={width}
                    height={height}
                    /* x={item.x}
                    y={item.y}
                    color={colors[item.draw]} */
                    item={item}
                />
            )}
            </div>
        </>        
        
    )
}

export default memo(Field)
