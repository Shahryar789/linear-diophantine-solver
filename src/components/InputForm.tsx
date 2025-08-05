import { useState } from 'react';

type Props = {
    onSolve: (a: number, b: number, c: number) => void;
};

export default function InputForm({onSolve}:Props){

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

);


