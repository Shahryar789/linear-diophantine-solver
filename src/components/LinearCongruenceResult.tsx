//Handles linear congruence result display

import { type CongruenceResult as CongruenceSolverResult } from '../utils/solveLinearCongruence';

type LinearCongruenceResultProps = {
    result: CongruenceSolverResult;
};

//Renders the linear congruence solver result separately from state and solve logic
function LinearCongruenceResult({ result }: LinearCongruenceResultProps) {
    return (
      <div>
        <h3>Linear Congruence Result</h3>
        <p>gcd: {result.gcd}</p>
        <p>{result.message}</p>

        {result.hasSolution && (
          <>
            {typeof result.solution === "number" ? (
              <p>One solution: x = {result.solution}</p>
            ) : (
              <p>One solution: x = any integer</p>
            )}

            {result.generalSolution && (
              <p>General solution: {result.generalSolution}</p>
            )}
          </>
        )}
      </div>
    );
}

export default LinearCongruenceResult;