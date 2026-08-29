//Handles linear congruence result display

import { type CongruenceResult as CongruenceSolverResult } from '../utils/solveLinearCongruence';
import MathExpression from './MathExpression';

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
              <>
                <p>One solution:</p>

                <MathExpression
                  expression={`x = ${result.solution}`}
                  display
              />
              </>
            ) : (
              <>
                <p>One solution:</p>

                <MathExpression
                  expression="x \\in \\mathbb{Z}"
                  display
                />
              </>
            )}

            {result.generalSolution && (
              <>
                <p>General solution:</p>

                <MathExpression
                  expression={result.generalSolution.replace(
                    /=\s*(-?\d+)\s*\(mod\s+(-?\d+)\)/,
                    '\\equiv $1 \\pmod{$2}'
                  )}
                  display
                />
              </>
            )}
          </>
        )}
      </div>
    );
}

export default LinearCongruenceResult;