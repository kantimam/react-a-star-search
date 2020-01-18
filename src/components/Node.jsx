import React, {memo, useState} from 'react'

const colors=["white", "red", "green", "blue", "yellow", "black"]


const Node = ({width, height, item, nodeOnClick, createWall}) => {
    const [color, setColor]=useState(colors[item.draw])
    const setNode=()=>{
        /* set start and end node */
        nodeOnClick(item);
        setColor(colors[item.draw]);
    }
    const blockPath=(event)=>{
        /* make your click dragable so you can paint walls easier */
        if(event.buttons===1){
            createWall(item);
            setColor(colors[item.draw]);
        }
        
    }
    return (
        <div
            onClick={setNode}
            onMouseMove={blockPath}
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
