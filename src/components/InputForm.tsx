import { useState } from 'react';
import { solveLinearDiophantine } from '../utils/solveLinearDiophantine';

//Collect a, b, and c from the user
//TODO: Pass input into solver 

function InputForm(){
    //Coefficients as strings till parsed
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');

//Result state for solver
const [result, setResult] = useState<any>(null);

//Handles form submission
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    //Convert strings to integers
    const intA = parseInt(a, 10);
    const intB = parseInt(b, 10);
    const intC = parseInt(c, 10);

    //Call solver functtion
    const solution = solveLinearDiophantine(intA, intB, intC);
    setResult(solution);
};

return (
    <div>
    {/*Input form for a, b, and c*/}
    <form onSubmit={handleSubmit} className = "input-form">
        <input
        type = "number"
        placeholder = "a"
        value = {a}
        onChange = {(e) => setA(e.target.value)}
        required
        />
        <input
        type = "number"
        placeholder = "b"
        value = {b}
        onChange = {(e) => setB(e.target.value)}
        required
        />
        <input
        type = "number"
        placeholder = "c"
        value = {c}
        onChange = {(e) => setC(e.target.value)}
        required
        />
        <button type = "submit"> Solve </button>
    </form>

    {/*Display solver results*/}
    {result && (
      <div style={{marginTop: "20px"}}>
       {result.hasSolution ? (
        <>
          <p>
          <strong>gcd:</strong> {result.gcd}
          </p>
          {result.particular ? (
          <p>
            <strong>Particular solution:</strong> (x, y) = (
            {result.particular.x}, {result.particular.y})
          </p>
        ): (
          <p>
            <strong>Particular solution:</strong> Infinitely integer pairs.
          </p>
        )}
          <p>
            <strong>General solution:</strong>
          </p>
          <p>x = {result.general.x}</p>
          <p>y = {result.general.y}</p>
          <p>
          <em>{result.message}</em>
          </p>
        </>
            ) : (
            <p>{result.message}</p>
            )}
          </div>
        )}
      </div>
    );
}

export default InputForm;