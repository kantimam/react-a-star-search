import React, {useState} from 'react'
import Gear from './icons/gear'

const UiContainer = ({finder, reset, uiMode, updateDim}) => {
    const [settings, toggleSettings]=useState(false);
    const [fps, setFps]=useState(finder.frameRate);
    const [col, setCol]=useState(finder.fieldWidth)
    const [row, setRow]=useState(finder.fieldHeight)
    const done=(event)=>{
        event.preventDefault();
        if(col!=finder.fieldWidth || row!=finder.fieldHeight){
            finder.setSize(col, row);
            updateDim(col, row);
        }
        finder.frameRate=fps;
        toggleSettings(false);
    }


    if(!finder) return (
        <div id="uiContainer" className="fancyShadow">
            <h1 className="fancyShadow infoHeader">LOADING</h1>
        </div>
        )
    return (
        <div id="uiContainer" className="fancyShadow">
            {settings?
                <>
                    <div className="inputWrapper">
                        <div className="fancyShadow">
                            <p>FPS {fps}</p>
                            <input onChange={(event)=>setFps(event.target.value)} type="range" min="1" max="60" value={fps}/>
                        </div>
                        <div className="fancyShadow">
                            <p>COL {col}</p>
                            <input onChange={(event)=>setCol(event.target.value)} type="range" min="2" max="100" value={col}/>
                        </div>
                        <div className="fancyShadow">
                            <p>ROW {row}</p>
                            <input onChange={(event)=>setRow(event.target.value)} type="range" min="2" max="100"value={row}/>
                        </div>
                    </div>
                    <button onClick={done} id="settingsButton" className="fancyShadow">UPDATE</button>
                </>:
                <>
                    <div onClick={()=>toggleSettings(true)} className="toggleSettings fancyShadow">
                        <Gear/>
                    </div>
                    <h1 className="fancyShadow infoHeader">{uiMode}</h1>
                    <button className={`fancyShadow`} onClick={() => finder.findRandomPath()}>random path</button>
                    <button className="fancyShadow" onClick={() => finder.runStep()}>STEP</button>
                    <button className="fancyShadow" onClick={() => finder.run()}>START</button>
                    <button className="fancyShadow" onClick={reset}>RESET</button>
                </>
            }
        </div>
               
    )
}

export default UiContainer
