import type { SolverMode } from './ModeSelector';

type InputName = 'a' | 'b' | 'c' | 'd' | 'm';

type SolverInputsProps = {
    mode: SolverMode;
    values: Record<InputName, string>;
    onChange: (name: InputName, value: string) => void;

    nVariableCount: number;
    nCoefficients: string[];
    nRhs: string;
    onNVariableCountChange: (count: number) => void;
    onNCoefficientChange: (index: number, value: string) => void;
    onNRhsChange: (value: string) => void;
};

const MIN_VARIABLE_COUNT = 2;
const MAX_VARIABLE_COUNT = 10;

//Maps each solver mode to the required input fields
const fieldsByMode: Record<SolverMode, InputName[]> = {
    '2': ['a', 'b', 'c'],
    '3': ['a', 'b', 'c', 'd'],
    n: [],
    congruence: ['a', 'b', 'm']
};

//Renders input fields required by selected solver
function SolverInputs({
  mode,
  values,
  onChange,
  nVariableCount,
  nCoefficients,
  nRhs,
  onNVariableCountChange,
  onNCoefficientChange,
  onNRhsChange,
}: SolverInputsProps) {
  if (mode === 'n') {
    return (
      <div>
        <label>
          Number of variables:{' '}
          <input
            type="number"
            min={MIN_VARIABLE_COUNT}
            max={MAX_VARIABLE_COUNT}
            step="1"
            value={nVariableCount}
            onChange={(event) => onNVariableCountChange(Number(event.target.value))}
          />
        </label>

        <br />

        {Array.from({ length: nVariableCount }, (_, index) => (
          <label key={index}>
            a{index + 1}:{' '}
            <input
              type="number"
              step="1"
              value={nCoefficients[index] ?? ''}
              onChange={(event) => onNCoefficientChange(index, event.target.value)}
              placeholder={`Enter a${index + 1}`}
            />
            <br />
          </label>
        ))}

        <label>
          d:{' '}
          <input
            type="number"
            step="1"
            value={nRhs}
            onChange={(event) => onNRhsChange(event.target.value)}
            placeholder="Enter d"
          />
        </label>

        <p>
          Solves equations of the form a₁x₁ + a₂x₂ + ... + aₙxₙ = d.
        </p>
      </div>
    );
  }

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