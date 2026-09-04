import InputForm from './components/InputForm';
import './App.css';

function App(){
  return(
    <main className="app">
      <header className="app-header">
        <h1>Linear Diophantine Equation Solver</h1>

        <p>
          Explore integer solutions to linear Diophantine equations and
          congruences using exact arithmetic and visual representations.
        </p>
      </header>

      <section className="solver-card">
        <InputForm />
      </section>
    </main>
  );
}

export default App;

