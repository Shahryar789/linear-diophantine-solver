//Handles n-variable result display

import { type DiophantineNResult } from '../utils/solveLinearDiophantineN';
import { formatNVariableSolution, formatNVariableVectorSolution } from '../utils/format';

type NVariableResultProps = {
    result: DiophantineNResult;
};

//Renders the n-variable solver result separately from state and solve logic
function NVariableResult({ result }: NVariableResultProps) {
  const coordinateSolutions = 
    result.particular && result.basis
      ? formatNVariableSolution(result.particular, result.basis)
      : [];
  
  const vectorSolution =
    result.particular && result.basis
      ? formatNVariableVectorSolution(result.particular, result.basis)
      : '';
  
    return (
      <div>
        <h3>n-Variable Result</h3>

        <p>Number of variables: {result.variableCount}</p>
        <p>gcd: {result.gcd}</p>    
        <p>{result.message}</p>

        {result.particular && (
          <>
            <p>Particular solution:</p>
            <p>
              x = ({result.particular.join(', ')})
            </p>
          </>
        )}

        {result.basis && result.basis.length > 0 && (
          <>
            <p>Basis vectors for the general solution:</p>
            
            {result.basis.map((basisVector, index) => (
              <p key={index}>
                v{index + 1} = ({basisVector.join(', ')})
              </p>
            ))}
          </>
        )}

        {coordinateSolutions.length > 0 && (
          <>
            <p>General solution:</p>

            {coordinateSolutions.map((solution, index) => (
              <p key={index}>{solution}</p>
            ))}
          </>
        )}

        {vectorSolution && (
          <>
            <p>General solution (vector form):</p>
            <p>{vectorSolution}</p>
          </>
        )}
      </div>
    );
}

export default NVariableResult;