import { useState } from 'react';
import { solveLinearDiophantine, type DiophantineResult } from '../utils/solveLinearDiophantine';
import { formatExpression } from '../utils/format';
//Collect a, b, and c from the user
//TODO: Pass input into solver 

function InputForm(){
    //Coefficients as strings till parsed
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);

//Store solver result
const [result, setResult] = useState<DiophantineResult | null>(null);

//Runs solver when "Solve" button is clicked
const handleSolve = () => setResult(solveLinearDiophantine(a, b, c));

return (
  <div>
    <h2>Linear Diophantine Solver</h2>

    {/*Input form for a, b, and c*/}
    <label>
     a: <input type = "number" value = {a} onChange = {e => setA(Number(e.target.value))} /> 
    </label>
    <br />
    <label>
      b: <input type = "number" value = {b} onChange = {e => setB(Number(e.target.value))} /> 
    </label>
    <br />
    <label>
      c: <input type = "number" value = {c} onChange = {e => setC(Number(e.target.value))} /> 
    </label>
    <br />

    {/*Solve button*/}
    <button onClick = {handleSolve}>Solve</button>

    {/* Render solver results */}
    {result && (
      <div>
        <h3>Result</h3>
        <p>gcd: {result.gcd}</p>
        <p>{result.message}</p>

        {/*Particular solution (x₀, y₀) */}
        {result.particular && (
          <p>
            Particular solution: (x, y) = ({result.particular.x}, {result.particular.y})
          </p>
        )}

        {/* General solution using parameter t */}
        {result.step && result.particular && (
          <>
          <p>General solution:</p>
          <p>x = {formatExpression(result.particular.x, result.step.dx)}</p>
          <p>y = {formatExpression(result.particular.y, result.step.dy)}</p>
          </>
        )}
      </div>
     )}
   </div>
  );
}

export default InputForm;