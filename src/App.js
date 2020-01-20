import React from 'react';
import './App.css';
import Field from './components/FieldClass';
//import Field from './components/aStar/FieldWithCanvasRenderer';



function App() {
  
  
  return (
    <div className="App">
      <Field  row={24} col={24}/>
    </div>
  );
}

export default App;
