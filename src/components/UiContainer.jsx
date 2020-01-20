import React from 'react'

const UiContainer = ({finder, reset, uiMode}) => {
    if(!finder) return (
        <div id="uiContainer" className="fancyShadow">
            <h1 className="fancyShadow infoHeader">LOADING</h1>
        </div>
        )
    return (
        <div id="uiContainer" className="fancyShadow">
            <h1 className="fancyShadow infoHeader">{uiMode}</h1>
            <button className={`fancyShadow`} onClick={() => finder.findRandomPath()}>random path</button>
            <button className="fancyShadow" onClick={() => finder.runStep()}>STEP</button>
            <button className="fancyShadow" onClick={() => finder.run()}>START</button>
            <button className="fancyShadow active" onClick={reset}>RESET</button>
        </div>
               
    )
}

export default UiContainer
