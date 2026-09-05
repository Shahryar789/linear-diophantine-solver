import { useState } from 'react';
import ModeSelector, {type SolverMode} from './ModeSelector';
import SolverInputs from './SolverInputs';
import { solveLinearDiophantine, type DiophantineResult } from '../utils/solveLinearDiophantine';
import { solveLinearDiophantine3, type Diophantine3Result } from '../utils/solveLinearDiophantine3';
import { solveLinearCongruence, type CongruenceResult } from '../utils/solveLinearCongruence';
import TwoVariableResult from './TwoVariableResult';
import ThreeVariableResult from './ThreeVariableResult';
import LinearCongruenceResult from './LinearCongruenceResult';
import { solveLinearDiophantineN, type DiophantineNResult } from '../utils/solveLinearDiophantineN';
import NVariableResult from './NVariableResult';

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

  //Updates variable count while preserving existing coefficients
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
  const [result2, setResult2] = useState<{
    result: DiophantineResult;
    a: number;
    b: number;
    c: number;
  } | null>(null);

  const [result3, setResult3] = useState<Diophantine3Result | null>(null);
  const [resultCongruence, setResultCongruence] = useState<CongruenceResult | null>(null);
  
  const [resultN, setResultN] = useState<{
    result: DiophantineNResult;
    coefficients: number[];
    rhs: number;
  } | null>(null);

  //Clears results before setting current mode's result
  const clearResults = () => {
    setResult2(null);
    setResult3(null);
    setResultCongruence(null);
    setResultN(null);
  }; 

  //Clears inputs when switching modes
  const clearModeInputs = (currentMode: SolverMode) => {
    if (currentMode === '2'){
      setA('');
      setB('');
      setC('');
    }

    if(currentMode === '3') {
      setA('');
      setB('');
      setC('');
      setD('');
    }

    if(currentMode === 'congruence') {
      setA('');
      setB('');
      setM('');
    }

    if(currentMode === 'n') {
      setNCoefficients(Array(nVariableCount).fill(''));
      setNRhs('');
    }
  };

  //Clears the previous result when switching solver modes
  const handleModeChance = (newMode: SolverMode) => {
    clearResults();
    clearModeInputs(mode);
    setMode(newMode);
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

      setResult2({
        result: solveLinearDiophantine(numA, numB, numC),
        a: numA,
        b: numB,
        c: numC,
      });
      
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
      if (
        nCoefficients.some(
          (coefficient) => coefficient.trim() === ''
        ) ||
        nRhs.trim() === ''
      ) {
        return;
      }
      
      const numericCoefficients = nCoefficients.map(
        (coefficient) => Number(coefficient)
      );
    
      const numericRhs = Number(nRhs);
    
      setResultN({
        result: solveLinearDiophantineN(
          numericCoefficients,
          numericRhs
        ),
        coefficients: numericCoefficients,
        rhs: numericRhs,
      });

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
    <div className="solver-heading">
      <h2>Solver</h2>
    </div>

    <div className="mode-section">
      <p className="mode-section-title">Choose a problem type</p>

      <ModeSelector
        mode={mode}
        onModeChange={handleModeChance}
      />

      <div className="mode-description">
        {mode === '2' && (
          <>
            Solve <strong>ax + by = c</strong> for integer values of x and y.
            The solver also provides the complete parameterized solution and
            an integer-lattice visualization.
          </>
        )}

        {mode === '3' && (
          <>
            Solve <strong>ax + by + cz = d</strong> for integer values of
            x, y, and z. The result includes a particular solution and the
            general solution.
          </>
        )}

        {mode === 'n' && (
          <>
            Solve a linear Diophantine equation with between 2 and 10
            variables using a generalized Extended Euclidean Algorithm.
          </>
        )}

        {mode === 'congruence' && (
          <>
            Solve <strong>ax ≡ b (mod m)</strong> and determine all
            solutions modulo m.
          </>
        )}
      </div>
    </div>

    <div className="solver-inputs">
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
    </div>

    <button
      className="solve-button"
      onClick={handleSolve}
    >
      Solve
    </button>

    {result2 && (
      <div className="results-section">
        <TwoVariableResult
          result={result2.result}
          a={result2.a}
          b={result2.b}
          c={result2.c}
        />
      </div>
    )}

    {result3 && (
      <div className="results-section">
        <ThreeVariableResult result={result3} />
      </div>
    )}

    {resultN && (
      <div className="results-section">
        <NVariableResult
          result={resultN.result}
          coefficients={resultN.coefficients}
          rhs={resultN.rhs}
        />
      </div>
    )}

    {resultCongruence && (
      <div className="results-section">
        <LinearCongruenceResult result={resultCongruence} />
      </div>
    )}
  </div>
  );
}

export default InputForm;