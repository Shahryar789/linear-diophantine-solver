import { useState } from 'react';
import ModeSelector, {type SolverMode} from './ModeSelector';
import SolverInputs from './SolverInputs';
import { solveLinearDiophantine, type DiophantineResult } from '../utils/solveLinearDiophantine';
import { solveLinearDiophantine3, type Diophantine3Result } from '../utils/solveLinearDiophantine3';
import { solveLinearCongruence, type CongruenceResult } from '../utils/solveLinearCongruence';
import TwoVariableResult from './TwoVariableResult';
import ThreeVariableResult from './ThreeVariableResult';
import LinearCongruenceResult from './LinearCongruenceResult';

type InputName = 'a' | 'b' | 'c' | 'd' | 'm';

function InputForm(){
  //Current solver mode selected by user
  const [mode, setMode] = useState<SolverMode>('2');

  //Shared input states for all solver modes 
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

  //Store solver results
  const [result2, setResult2] = useState<DiophantineResult | null>(null);
  const [result3, setResult3] = useState<Diophantine3Result | null>(null);
  const [resultCongruence, setResultCongruence] = useState<CongruenceResult | null>(null);

  //Clears results before setting current mode's result
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
    if (mode === 'n') {
      // Placeholder for n-variable solver
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
    
    {result3 && <ThreeVariableResult result={result3} />}

    {resultCongruence && (
      <LinearCongruenceResult result={resultCongruence} />
   )}
  </div>
 );
}

export default InputForm;