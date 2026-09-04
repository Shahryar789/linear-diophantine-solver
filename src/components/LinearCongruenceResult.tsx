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
      <p>modulus: {result.modulus}</p>
      <p>{result.message}</p>

      {!result.hasSolution && (
        <p className="result-label">No solution exists</p>
      )}

      {result.hasSolution && result.generalSolution === "x ∈ Z" && (
        <>
          <p className="result-label">General solution</p>

          <div className="math-block">
            <MathExpression expression="x \in \mathbb{Z}" display />
          </div>
        </>
      )}

      {result.hasSolution &&
        result.solution !== undefined &&
        result.generalSolution !== "x ∈ Z" && (
          <>
            <p className="result-label">Particular solution</p>

            <div className="math-block">
              <MathExpression
                expression={`x=${result.solution}`}
                display
              />
            </div>

            <p className="result-label">General solution</p>

            <div className="math-block">
              <MathExpression
                expression={result.generalSolution ?? ""}
                display
              />
            </div>
          </>
        )}
    </div>
  );
}

export default LinearCongruenceResult;
