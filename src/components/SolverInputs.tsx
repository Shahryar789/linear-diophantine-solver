import type { SolverMode } from './ModeSelector';

type InputName = 'a' | 'b' | 'c' | 'd' | 'm';

type SolverInputsProps = {
    mode: SolverMode;
    values: Record<InputName, string>;
    onChange: (name: InputName, value: string) => void;
};

//Shared coefficients for the input fields
const fieldsByMode: Record<SolverMode, InputName[]> = {
    '2': ['a', 'b', 'c'],
    '3': ['a', 'b', 'c', 'd'],
    congruence: ['a', 'b', 'm']
};

//Renders input fields required by selected solver
function SolverInputs({ mode, values, onChange }: SolverInputsProps) {
    return (
        <>
          {fieldsByMode[mode].map((field) => (
           <label key={field}>
             {field}:{' '}
             <input
               type="number"
               step="1"
               value={values[field]}
               onChange={(event) => onChange(field, event.target.value)}
               placeholder={`Enter ${field}`}
             />
             <br />
           </label>
         ))}
      </>
    );  
} 

export default SolverInputs;