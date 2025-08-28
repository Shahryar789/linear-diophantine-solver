import { useState } from 'react';
import { solveLinearDiophantine, type DiophantineResult } from '../utils/solveLinearDiophantine';
import { solveLinearDiophantine3, type Diophantine3Result } from '../utils/solveLinearDiophantine3';
import { formatLinearExpression, formatVectorSolution2D } from '../utils/format';

function InputForm(){
  //Mode: 2 or 3 variable
  const [mode, setMode] = useState<'2' | '3'>('2'); 

  //Coefficients 
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');

//Store solver result
const [result2, setResult2] = useState<DiophantineResult | null>(null);
const [result3, setResult3] = useState<Diophantine3Result | null>(null);

//Runs solver when "Solve" button is clicked
const handleSolve = () => {
  if(mode === '2') {
    if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
      setResult2(null);
      return;
    }
    const numA = Number(a), numB = Number(b), numC = Number(c);
    setResult2(solveLinearDiophantine(numA, numB, numC));
    setResult3(null);
  } else {
    if (a.trim() === '' || b.trim() === '' || c.trim() === '' || d.trim() === '') {
      setResult3(null);
      return;
    }
    const numA = Number(a), numB = Number(b), numC = Number(c), numD = Number(d);
    setResult3(solveLinearDiophantine3(numA, numB, numC, numD));
    setResult2(null);
  }
};

return (

  <div>
    <h2>Linear Diophantine Solver</h2>

    {/*Mode toggle*/}
    <div>
      <label>
        <input
          type = "radio"
          value = "2"
          checked = {mode === '2'}
          onChange = {() => setMode('2')}
        />{' '}
        2-variable (ax + by = c)
      </label>
      <label style = {{marginLeft: '1em'}}>
        <input
          type = "radio"
          value = "3"
          checked = {mode === '3'}
          onChange = {() => setMode('3')}
        />{' '}
        3-variable (ax + by + cz = d)
      </label>
    </div>

    {/* Input fields */}
    <label>
     a: {' '}
     <input
      type = "number"
      value = {a} 
      onChange = {(e) => setA(e.target.value)}
      placeholder = "Enter a"
      />
    </label>
    <br />
    <label>
      b: {' '}
     <input
      type = "number"
      value = {b} 
      onChange = {(e) => setB(e.target.value)}
      placeholder = "Enter b"
      />
    </label>
    <br />
    <label>
       c: {' '}
     <input
      type = "number"
      value = {c} 
      onChange = {(e) => setC(e.target.value)}
      placeholder = "Enter c"
      />
    </label>
    <br />
    {mode === '3' && (
      <>
        <label>
          d: {' '}
          <input 
          type = "number"
          value = {d}
          onChange = {(e) => setD(e.target.value)}
          placeholder= "Enter d"
          />
        </label>
        <br />
      </>
    )}

    {/*Solve button*/}
    <button onClick = {handleSolve}>Solve</button>

    {/* Render solver results */}
    {result2 && (
      <div>
        <h3>2-variable Result</h3>
        <p>gcd: {result2.gcd}</p>
        <p>{result2.message}</p>

        {/*Particular solution (x₀, y₀) */}
        {result2.particular && (
          <p>
            Particular solution: (x, y) = ({result2.particular.x}, {result2.particular.y})
          </p>
        )}

        {/* General solution using parameter t */}
        {result2.step && result2.particular && (
          <>
          <p>General solution (component form):</p>
          <p>x = {formatLinearExpression(result2.particular.x, result2.step.dx)}</p>
          <p>y = {formatLinearExpression(result2.particular.y, result2.step.dy)}</p>

          <p>General solution (vector form):</p>
          <p>
            {formatVectorSolution2D(
              result2.particular.x,
              result2.particular.y,
              result2.step.dx,
              result2.step.dy
            )}
          </p>
         </>
        )}
      </div>
     )}

     {result3 && (
      <div>
        <h3>3-variable solver</h3>
        <p>gcd: {result3.gcd}</p>
        <p>{result3.message}</p>
        {result3.particular && (
          <p>Particular solution: (x y, z) = ({result3.particular.x}, {result3.particular.y}, {result3.particular.z})</p>
        )}
        {result3.step && result3.particular && (
          <>
            <p>General solution (component form):</p>
            <p>x = {formatLinearExpression(result3.particular.x, result3.step.dx)}</p>
            <p>y = {formatLinearExpression(result3.particular.y, result3.step.dy)}</p>
            <p>z = {formatLinearExpression(result3.particular.z, result3.step.dz)}</p>
            <p>General solution (vector form):</p>
            <p>
              (x, y, z) = ({result3.particular.x}, {result3.particular.y}, {result3.particular.z}) + t({result3.step.dx}, {result3.step.dy}, {result3.step.dz}})
            </p>
          </>
        )}
      </div>
     )}
   </div>
  );
}

export default InputForm;