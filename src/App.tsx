import React from 'react';
import InputForm from './components/InputForm';
import { solveLinearDiophantineN } from "./utils/solveLinearDiophantineN";

//Main application
//Renders input form and displays results

function App(){
  console.log(solveLinearDiophantineN([6, 9], 30));
  console.log(solveLinearDiophantineN([6, 9, 15], 30));
  console.log(solveLinearDiophantineN([4, 6, 8], 7));
  return(
    <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Linear Diophantine Equation Solver</h1>
      {/* Future component for entering coefficients (a, b, c)*/}
      <InputForm />
    </div>
  );
}

export default App;

