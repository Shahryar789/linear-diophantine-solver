import { useState } from 'react';
import ModeSelector, {type SolverMode} from './ModeSelector';
import SolverInputs from './SolverInputs';
import { solveLinearDiophantine, type DiophantineResult } from '../utils/solveLinearDiophantine';
import { solveLinearDiophantine3, type Diophantine3Result } from '../utils/solveLinearDiophantine3';
import { solveLinearCongruence, type CongruenceResult } from '../utils/solveLinearCongruence';
import { formatLinearExpression, formatVectorSolution3D} from '../utils/format';
import TwoVariableResult from './TwoVariableResult';

type InputName = 'a' | 'b' | 'c' | 'd' | 'm';

function InputForm(){
  //Current solver mode selected by user
  const [mode, setMode] = useState<SolverMode>('2');

  //Coefficients 
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [m, setM] = useState('');

  const inputSetters: Record<InputName, (value: string) => void> = {
    a: setA,
    b: setB,
    c: setC,
    d: setD,
    m: setM,
  };

  //Routes input update to corresponding state setter
  const handleInputChange = (name: InputName, value: string) => {
    inputSetters[name](value);
  };

  //Store solver result
  const [result2, setResult2] = useState<DiophantineResult | null>(null);
  const [result3, setResult3] = useState<Diophantine3Result | null>(null);
  const [resultCongruence, setResultCongruence] = useState<CongruenceResult | null>(null);

  //Clear results before setting current mode's result
  const clearResults = () => {
    setResult2(null);
    setResult3(null);
    setResultCongruence(null);
  }; 

  //Runs solver when "Solve" button is clicked
  const handleSolve = () => {
    clearResults();

    if (mode === '2') {
      if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
        return;
      }

      const numA = Number(a);
      const numB = Number(b);
      const numC = Number(c);

      setResult2(solveLinearDiophantine(numA, numB, numC));
      return;
    }
    if (mode === '3') {
      if (a.trim() === '' || b.trim() === '' || c.trim() === '' || d.trim() === '') {
        return;
      }

      const numA = Number(a);
      const numB = Number(b);
      const numC = Number(c);
      const numD = Number(d);

      setResult3(solveLinearDiophantine3(numA, numB, numC, numD));
      return;
    }
    if (mode === 'congruence') {
      if (a.trim() === '' || b.trim() === '' || m.trim() === '') {
        return;
      }

      const numA = Number(a);
      const numB = Number(b);
      const numM = Number(m);

      setResultCongruence(solveLinearCongruence(numA, numB, numM));
    } 
  };
  
  return (

  <div>
    <h2>Linear Diophantine Solver</h2>

    <ModeSelector mode = {mode} onModeChange = {setMode} />

    <SolverInputs
      mode={mode}
      values={{ a, b, c, d, m }}
      onChange={handleInputChange}
    />

    <button onClick = {handleSolve}>Solve</button>

    {result2 && <TwoVariableResult result={result2} />}
    
  {/* 3-variable result */}
  {result3 && (
    <div>
      <h3>3-variable Result</h3>
      <p>gcd: {result3.gcd}</p>
      <p>{result3.message}</p>

      {result3.particular && (
        <p>
          Particular solution: (x, y, z) = (
            {result3.particular.x}, {result3.particular.y}, {result3.particular.z})
        </p>
      )}
      
      {result3.step && result3.particular && (
        <>
          <p>General solution (component form):</p>
          <p>x = {formatLinearExpression(result3.particular.x, result3.step.dx, ["t", "s"])}</p>
          <p>y = {formatLinearExpression(result3.particular.y, result3.step.dy, ["t", "s"])}</p>
          <p>z = {formatLinearExpression(result3.particular.z, result3.step.dz, ["t", "s"])}</p>
          
          <p>General solution (vector form):</p>
          <p>
            {formatVectorSolution3D(
              result3.particular.x, 
              result3.particular.y, 
              result3.particular.z, 
              result3.step.dx, 
              result3.step.dy, 
              result3.step.dz)}
          </p>
        </>
      )}
    </div>
  )}

  {/* Congruence result */}
  {resultCongruence && (
    <div>
      <h3>Linear Congruence Result</h3>
      <p>gcd: {resultCongruence.gcd}</p>
      <p>{resultCongruence.message}</p>

      {resultCongruence.hasSolution && (
        <>
          {typeof resultCongruence.solution === "number" ? (
            <p>One solution: x = {resultCongruence.solution}</p>
          ) : ( 
            <p>One solution: x = any integer</p>
          )}

          {resultCongruence.generalSolution && (
            <p>General solution: {resultCongruence.generalSolution}</p>
          )}
        </>
      )}
    </div>
   )}
  </div>
 );
}

export default InputForm;