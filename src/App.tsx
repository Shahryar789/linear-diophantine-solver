import React from 'react';
import InputForm from './components/InputForm';

//Main application
//Renders input form and displays results

function App(){
  return(
    <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Linear Diophantine Equation Solver</h1>
      {/* Future component for entering coefficients (a, b, c)*/}
      <InputForm />
    </div>
  );
}

export default App;

