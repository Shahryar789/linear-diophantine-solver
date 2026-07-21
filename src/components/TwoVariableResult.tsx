//Handles two variable result display

import { type DiophantineResult } from '../utils/solveLinearDiophantine';
import { formatLinearExpression, formatVectorSolution2D } from '../utils/format';

type TwoVariableResultProps = {
    result: DiophantineResult;
};

//Renders the 2-variable solver result seperately from state and solve logic
function TwoVariableResult({ result }: TwoVariableResultProps) {
    return (
        <div>
            <h3>2-Variable Result</h3>
            <p>gcd: {result.gcd}</p>
            <p>{result.message}</p>

            {result.particular && (
              <p>
                Particular solution: (x, y) = ({result.particular.x}, {result.particular.y})
              </p>
            )}

            {result.step && result.particular && (
              <>
                <p>General solution (component form):</p>
                <p>x = {formatLinearExpression(result.particular.x, [result.step.dx])}</p>
                <p>y = {formatLinearExpression(result.particular.y, [result.step.dy])}</p>

                <p>General solution (vector form):</p>
                <p>
                  {formatVectorSolution2D(
                    result.particular.x, 
                    result.particular.y,
                    result.step.dx,
                    result.step.dy
                  )}   
                </p>       
              </>
            )}
        </div>
    );
}

export default TwoVariableResult;