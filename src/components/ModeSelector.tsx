export type SolverMode = '2' | '3' | 'n' | 'congruence';

type ModeSelectorProps = {  
    mode: SolverMode;
    onModeChange: (mode: SolverMode) => void;
};

//Renders the solver mode selector
//Keeps mode-selection UI separate from solver and result rendering logic
function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
    return (
        <div>
            <label> 
                <input
                    type="radio"
                    value="2"
                    checked={mode === '2'}
                    onChange={() => onModeChange('2')}
                />{' '}
                2-variable (ax + by = c)
            </label>

            <label style={{ marginLeft: '1em' }}>
                <input
                    type="radio"
                    value="3"
                    checked={mode === '3'}
                    onChange={() => onModeChange('3')}
                />{' '}
                3-variable (ax + by + cz = d)   
            </label>

            <label style={{ marginLeft: '1em' }}>
                <input
                    type="radio"
                    value="n"
                    checked={mode === 'n'}
                    onChange={() => onModeChange('n')}
                />{' '}
                n-variable (a₁x₁ + ... + aₙxₙ = d)

            </label>

            <label style={{ marginLeft: '1em' }}>
                <input
                    type="radio"
                    value="congruence"
                    checked={mode === 'congruence'}
                    onChange={() => onModeChange('congruence')}
                />{' '}
                Linear Congruence (ax ≡ b mod m)
            </label>
        </div>
    );
}

export default ModeSelector;

