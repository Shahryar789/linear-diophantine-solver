//Handles n-variable result display

import { type DiophantineNResult } from '../utils/solveLinearDiophantineN';

type NVariableResultProps = {
    result: DiophantineNResult;
};

//Renders the n-variable solver result separately from state and solve logic
function NVariableResult({ result }: NVariableResultProps) {
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

        {result.particular && result.basis && result.basis.length > 0 && (
          <>
            <p>General solution:</p>
            <p>
              x = ({result.particular.join(', ')})
              {result.basis.map((_, index) => (
                <span key={index}> 
                {' '}+ t{index + 1}v{index + 1}</span>
              ))}
            </p>
          </>
        )}
      </div>
    );
}

export default NVariableResult;