import { useState } from 'react';

//Collect a, b, and c from the user
//TODO: Pass input into solver 

function InputForm(){
    //Coefficients as strings till parsed
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');

//Handles form submission
const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    //Convert strings to integers
    const intA = parseInt = (a, 10);
    const intB = parseInt = (b, 10);
    const intC = parseInt = (c, 10);

    //Placeholder result:
    console.log('Submitted:', intA, intB, intC)
};

return (
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
    );
}

export default InputForm;