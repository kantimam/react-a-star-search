import React, {memo, useRef, useLayoutEffect, useState} from 'react'
import {create2dArray} from '../util/util';
import {Pathfinder} from '../path-finder/path-finder.js';

const colors=["white", "red", "green", "blue", "black"]

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
            const finder=new Pathfinder(field, setField);
            finder.setup();
            finder.run();

        }
        return () => {
            
        };
    }, [])

    return (        
        <div ref={fieldRef}  className="field">
            {field.map((item)=>
                <div 
                    onClick={()=>console.log(item)}
                    key={"key"+Date.now()+Math.random()}
                    className="cell"
                    style={{
                        width: `${width}px`, 
                        height: `${height}px`, 
                        left: `${item.x*width}px`, 
                        top: `${item.y*height}px`,
                        backgroundColor: colors[item.draw] 
                    }}
                >
                    X
                </div>
            )}
        </div>
    )
}

export default memo(Field)
