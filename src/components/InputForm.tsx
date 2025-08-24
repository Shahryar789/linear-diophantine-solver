import { useState } from 'react';
import { solveLinearDiophantine, type DiophantineResult } from '../utils/solveLinearDiophantine';
import { formatLinearExpression } from '../utils/format';
//Collect a, b, and c from the user
//TODO: Pass input into solver 

function InputForm(){
    //Coefficients as strings till parsed
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');

//Store solver result
const [result, setResult] = useState<DiophantineResult | null>(null);

//Runs solver when "Solve" button is clicked
const handleSolve = () => {
  if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
    setResult(null);
    return;
  }

  //Convert to numbers
  const numA = Number(a);
  const numB = Number(b);
  const numC = Number(c);

  //Run solver
  const res = solveLinearDiophantine(numA, numB, numC);
  setResult(res);
};

return (
  <div>
    <h2>Linear Diophantine Solver</h2>

    {/*Input form for a, b, and c*/}
    <label>
     a: {''}
     <input
      type = "number"
      value = {a} 
      onChange = {(e) => setA(e.target.value)}
      placeholder = "Enter a"
      />
    </label>
    <br />
    <label>
      b: {''}
     <input
      type = "number"
      value = {b} 
      onChange = {(e) => setB(e.target.value)}
      placeholder = "Enter b"
      />
    </label>
    <br />
    <label>
       c: {''}
     <input
      type = "number"
      value = {c} 
      onChange = {(e) => setC(e.target.value)}
      placeholder = "Enter c"
      />
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
          <p>x = {formatLinearExpression(result.particular.x, result.step.dx)}</p>
          <p>y = {formatLinearExpression(result.particular.y, result.step.dy)}</p>
          </>
        )}
      </div>
     )}
   </div>
  );
}

export default InputForm;