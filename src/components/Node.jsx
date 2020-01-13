import React, {memo, useState} from 'react'

const colors=["white", "red", "green", "blue", "yellow", "black"]


const Node = ({width, height, item, nodeOnClick}) => {
    const [color, setColor]=useState(colors[item.draw])
    const blockPath=()=>{
        nodeOnClick(item);
        setColor(colors[item.draw]);
    }
    return (
        <div
            onClick={blockPath}
            className="cell"
            style={{
                width: `${width}px`, 
                height: `${height}px`, 
                /* left: `${x*width}px`, 
                top: `${y*height}px`, */

                left: `${item.x*width}px`, 
                top: `${item.y*height}px`,
                backgroundColor: color 
            }}
        >
        </div>
    )
}

export default memo(Node/* , (current, next)=>{
    return current.item.draw===next.item.draw
} */)
