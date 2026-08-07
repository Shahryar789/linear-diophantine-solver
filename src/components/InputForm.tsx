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

const MIN_VARIABLE_COUNT = 2;
const MAX_VARIABLE_COUNT = 10;

function InputForm(){
  //Current solver mode selected by user
  const [mode, setMode] = useState<SolverMode>('2');
  
  //Shared input states for all solver modes 
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [m, setM] = useState('');

  //Dynamic input states for n-variable solver mode
  const [nVariableCount, setNVariableCount] = useState(3);
  const [nCoefficients, setNCoefficients] = useState<string[]>(['', '', '']);
  const [nRhs, setNRhs] = useState('');

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

  //Updates variable count while preserving existing cofficients
  const handleNVariableCountChange = (count: number) => {
    if (Number.isNaN(count)) {
      return;
    }

    const clampedCount = Math.min(
      MAX_VARIABLE_COUNT,
      Math.max(MIN_VARIABLE_COUNT, Math.trunc(count))
    );

    setNVariableCount(clampedCount);

    setNCoefficients((previousCoefficients) =>
      Array.from(
        { length: clampedCount },
        (_, index) => previousCoefficients[index] ?? ''
      )
    );
  };

  //Updates one coefficient in the dynamic n-variable input array
  const handleNCoefficientChange = (index: number, value: string) => {
    setNCoefficients((previousCoefficients) =>
      previousCoefficients.map((coefficient, currentIndex) =>
        currentIndex === index ? value : coefficient
      )
    );
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
      nVariableCount={nVariableCount}
      nCoefficients={nCoefficients}
      nRhs={nRhs}
      onNVariableCountChange={handleNVariableCountChange}
      onNCoefficientChange={handleNCoefficientChange}
      onNRhsChange={setNRhs}
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