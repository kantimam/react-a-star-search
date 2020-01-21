import React, {memo, useLayoutEffect, useEffect, useRef, useState} from 'react'
import Node from './Node';


const Field = ({field, row, col, createWall, nodeOnClick}) => {
    const fieldRef=useRef(null);
    const [width, setWidth]=useState(0);

    const resize=()=>{
        if (fieldRef.current.clientWidth > 0) {
            const cellSize = fieldRef.current.clientWidth / col;
            setWidth(cellSize);
        }
    }

    useLayoutEffect(() => {
        resize();
        
    }, [field, row, col, createWall, nodeOnClick])

    useEffect(() => {
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [])



    return (
        <div className="fieldContainer fancyShadow">
        <div style={{height: `${width*row}px`}} ref={fieldRef} className="field">
            {width && field.map((item) =>
                <Node
                    key={"key" + item.x + "_" + item.y + "_" + item.draw}
                    width={width}
                    height={width}
                    item={item}
                    nodeOnClick={nodeOnClick}
                    createWall={createWall}
                />
            )}
        </div>
    </div>
    )
}

export default memo(Field)
