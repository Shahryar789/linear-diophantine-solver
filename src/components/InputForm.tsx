import { useState } from 'react';

type Props = {
    onSolve: (a: number, b: number, c: number) => void;
};

export default function InputForm({onSolve}: Props){

    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');


const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const parsedA = parseInt = (a, 10);
    const parsedB = parseInt = (b, 10);
    const parsedC = parseInt = (c, 10);

    if (!isNaN(parsedA) && !isNaN(parsedB) && !isNaN(parsedC)){
        onSolve(parsedA, parsedB, parsedC);
    }
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