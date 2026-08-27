//Handles n-variable result display

import { type DiophantineNResult } from '../utils/solveLinearDiophantineN';
import { formatNVariableSolution, formatNVariableVectorSolution } from '../utils/format';
import { verifyDiophantineSolution } from '../utils/verifySolution';
import MathExpression from './MathExpression';

type NVariableResultProps = {
    result: DiophantineNResult;
    coefficients: number[];
    rhs: number;
};

//Converts existing variable notation into LaTeX
function toLatex(expression: string): string {
  return expression
    .replace(/x(\d+)/g, 'x_{$1}')
    .replace(/t(\d+)/g, 't_{$1}');
}

//Renders the n-variable solver result separately from state and solve logic
function NVariableResult({ result, coefficients, rhs }: NVariableResultProps) {
  const coordinateSolutions = 
    result.particular && result.basis
      ? formatNVariableSolution(result.particular, result.basis)
      : [];
  
  const vectorSolution =
    result.particular && result.basis
      ? formatNVariableVectorSolution(result.particular, result.basis)
      : '';

  const particularIsValid = 
    result.particular
      ? verifyDiophantineSolution(
          coefficients,
          result.particular,
          rhs
        )
      : null;

    return (
      <div>
        <h3>n-Variable Result</h3>

        <p>Number of variables: {result.variableCount}</p>
        <p>gcd: {result.gcd}</p>    
        <p>{result.message}</p>

        {result.particular && (
          <>
            <p>Particular solution:</p>

            <MathExpression
              expression={`x = (${result.particular.join(', ')})`}
              display
            />

            {particularIsValid !== null && (
              <p>
                Particular solution verification:{' '}
                {particularIsValid ? '✓ Valid' : '✗ Invalid'}
              </p>
            )}
          </>
        )}

        {result.basis && result.basis.length > 0 && (
          <>
            <p>Basis vectors for the general solution:</p>
            
            {result.basis.map((basisVector, index) => (
              <MathExpression
                key = {index}
                expression={`v_{${index + 1}} = (${basisVector.join(', ')})`}
                display
              />
            ))}
          </>
        )}

        {coordinateSolutions.length > 0 && (
          <>
            <p>General solution:</p>

            {coordinateSolutions.map((solution, index) => (
              <MathExpression
                key={index}
                expression={toLatex(solution)}
                display
              />
            ))}
          </>
        )}

        {vectorSolution && (
          <>
            <p>General solution (vector form):</p>
            
            <MathExpression
              expression={toLatex(vectorSolution)}
              display
            />
          </>
        )}
      </div>
    );
}

export default NVariableResult;