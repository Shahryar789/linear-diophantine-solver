//Handles linear congruence result display

import {
  type CongruenceResult as CongruenceSolverResult,
} from '../utils/solveLinearCongruence';
import MathExpression from './MathExpression';

type LinearCongruenceResultProps = {
  result: CongruenceSolverResult;
};

//Renders the linear congruence solver result separately from state and solve logic
function LinearCongruenceResult({
  result,
}: LinearCongruenceResultProps) {
  return (
    <div>
      <h3>Linear Congruence Result</h3>

      <p>gcd: {result.gcd}</p>
      <p>{result.message}</p>

      {result.hasSolution && typeof result.solution === 'number' && (
        <>
          <p className="result-label">One solution</p>

          <div className="math-block">
            <MathExpression
              expression={`x=${result.solution}`}
              display
            />
          </div>

          <p className="result-label">General solution</p>

          <div className="math-block">
            <MathExpression
              expression={(result.generalSolution ?? '')}
              display
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LinearCongruenceResult;