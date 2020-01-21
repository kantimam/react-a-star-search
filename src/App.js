import React from 'react';
import './App.css';
import AStar from './components/AStar';
//import Field from './components/aStar/FieldWithCanvasRenderer';



function App() {
  
  
  return (
    <div className="App">
      <AStar col={22} row={18} frameRate={20}/>
    </div>
  );
}

export default App;
