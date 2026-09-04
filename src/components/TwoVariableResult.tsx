//Handles two variable result display

import { useState } from 'react';
import { type DiophantineResult } from '../utils/solveLinearDiophantine';
import MathExpression from './MathExpression';
import LatticeVisualization from './LatticeVisualization';

type TwoVariableResultProps = {
  result: DiophantineResult;
  a: number;
  b: number;
  c: number;
};

//Renders the 2-variable solver result separately from state and solve logic
function TwoVariableResult({
  result,
  a,
  b,
  c,
}: TwoVariableResultProps) {
  const [selectedT, setSelectedT] = useState(0);

  const isAllZeroCase = a === 0 && b === 0 && c === 0;

  return (
    <div>
      <h3>2-Variable Result</h3>

      <p>gcd: {result.gcd}</p>
      <p>{result.message}</p>

      {isAllZeroCase ? (
        <>
          <p className="result-label">General solution</p>

          <p>Every integer pair (x, y) is a solution.</p>

          <p className="result-label">Component form</p>

          <MathExpression expression="x=t" display />
          <MathExpression expression="y=s" display />

          <p className="result-label">Vector form</p>

          <MathExpression expression="(x,y)=(t,s)" display />
        </>
      ) : (
        <>
          {result.particular && (
            <>
              <p className="result-label">Particular solution</p>

              <MathExpression
                expression={`(x,y)=(${result.particular.x},${result.particular.y})`}
                display
              />
            </>
          )}

          {result.general && (
            <>
              <p className="result-label">General solution</p>

              <p>Component form</p>

              <MathExpression
                expression={`x=${toLatex(result.general.x)}`}
                display
              />

              <MathExpression
                expression={`y=${toLatex(result.general.y)}`}
                display
              />

              <p>Vector form</p>

              <MathExpression
                expression={toLatex(result.general.vector)}
                display
              />
            </>
          )}

          {result.particular && result.step && (
            <LatticeVisualization
              a={a}
              b={b}
              c={c}
              particular={result.particular}
              step={result.step}
              selectedT={selectedT}
              onTChange={setSelectedT}
            />
          )}
        </>
      )}
    </div>
  );
}

//Converts ordinary variable notation into LaTeX
function toLatex(expression: string): string {
  return expression
    .replace(/x(\d+)/g, 'x_{$1}')
    .replace(/t(\d+)/g, 't_{$1}');
}

export default TwoVariableResult;
