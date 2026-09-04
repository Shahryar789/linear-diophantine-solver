//Handles three-variable result display

import { type Diophantine3Result } from '../utils/solveLinearDiophantine3';
import {
  formatLinearExpression,
  formatVectorSolution3D,
} from '../utils/format';
import MathExpression from './MathExpression';

type ThreeVariableResultProps = {
  result: Diophantine3Result;
};

//Renders the 3-variable solver result separately from state and solve logic
function ThreeVariableResult({ result }: ThreeVariableResultProps) {
  return (
    <div>
      <h3>3-Variable Result</h3>

      <p>gcd: {result.gcd}</p>
      <p>{result.message}</p>

      {result.particular && (
        <>
          <p>Particular solution:</p>

          <MathExpression
            expression={`(x,y,z)=(${result.particular.x},${result.particular.y},${result.particular.z})`}
            display
          />
        </>
      )}

      {result.step && result.particular && (
        <>
          <p>General solution</p>

          <p>Component form</p>

          <MathExpression
            expression={`x=${formatLinearExpression(
              result.particular.x,
              result.step.dx,
              ['t', 's']
            )}`}
            display
          />

          <MathExpression
            expression={`y=${formatLinearExpression(
              result.particular.y,
              result.step.dy,
              ['t', 's']
            )}`}
            display
          />

          <MathExpression
            expression={`z=${formatLinearExpression(
              result.particular.z,
              result.step.dz,
              ['t', 's']
            )}`}
            display
          />

          <p>Vector form</p>

          <MathExpression
            expression={formatVectorSolution3D(
              result.particular.x,
              result.particular.y,
              result.particular.z,
              result.step.dx,
              result.step.dy,
              result.step.dz
            )}
            display
          />
        </>
      )}
    </div>
  );
}

export default ThreeVariableResult;