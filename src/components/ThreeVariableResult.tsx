//Handles three variable result display

import { type Diophantine3Result } from '../utils/solveLinearDiophantine3';
import { formatLinearExpression, formatVectorSolution3D } from '../utils/format';

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
              <p>
                Particular solution: (x, y, z) = ({result.particular.x}, {result.particular.y}, {result.particular.z})
              </p>
            )}

            {result.step && result.particular && (
              <>
                <p>General solution (component form):</p>
                <p>
                  x ={' '}
                  {formatLinearExpression(result.particular.x, result.step.dx, [
                    't',
                    's',
                  ])}
                </p>
                <p>
                  y ={' '}
                  {formatLinearExpression(result.particular.y, result.step.dy, [
                    't',
                    's',
                  ])}
                </p>
                <p>
                  z ={' '}
                  {formatLinearExpression(result.particular.z, result.step.dz, [
                    't',
                    's',
                  ])}
                </p>

                <p>General solution (vector form):</p>
                <p>
                  {formatVectorSolution3D(
                    result.particular.x,
                    result.particular.y,
                    result.particular.z,
                    result.step.dx,
                    result.step.dy,
                    result.step.dz
                  )}
                </p>
              </>
            )}
        </div>
    );
}

export default ThreeVariableResult;