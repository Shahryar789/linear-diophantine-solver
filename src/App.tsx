import { useState } from 'react'
import InputForm from './components/InputForm'
import SolutionDisplay from './components/SolutionDisplay'
import './App.css'

export default function App(){

  const [a, SetA] = useState<number | null>(null);
  const [b, SetB] = useState<number | null>(null);
  const [c, SetC] = useState<number | null>(null);

  const handleSolve = (newA: number, newB: number, newC: number) => {
    setA(newA);
    SetB(newB);
    SetC(newC);

    //Solver to be implemented here in future commit
  };

  return{
    <div className = "container">
    <h1>Linear Diophantine Solver</h1>
    <InputForm onSolve = {handleSolve} />
    <SolutionDisplay solution={solution} />
    </div>
  };
}
