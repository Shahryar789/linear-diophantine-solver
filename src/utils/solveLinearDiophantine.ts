//Solves ax + by = c
//Incorporates the Extended Euclidean Algorithm

export type DiophantineResult = {
    hasSolution: boolean,
    gcd: number;
    particular?: {x: number; y: number};
    general?: {x: string; y: string};
    message: string;
};


//Returns the [gcd, x, y] such that ax + by = gcd
function extendedGCD(a: number, b: number): [number, number, number]{
    //Base case: gcd(a,0) = |a|, coefficents are (1, 0)
    if (b === 0){
        return [a, 1, 0];
    }
    //Recursion
    const [gcd, x1, y1] = extendedGCD(b, a % b);

    //Update x and y as per the result of the recursion
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;

    return [gcd, x, y];
}

//Main solver, finds particular and general solution
export function solveLinearDiophantine(a: number, b: number, c:number){
    //Account for special case
    if (a === 0 && b === 0) {
        if (c === 0) {
            return {
                hasSolution: true,
                gcd: 0,
                general: {x: "any integer (t)", y: "any integer (s)"},
                message: "Infinitely many solutions: x and y can be any integers.",
            }
        }
        return {
            hasSolution: false,
            gcd: 0,
            message: "No solution: 0x + 0y ≠ nonzero c"
        };
    }

    //Find gcd and set of coefficients for a and b
    const [g, x0, y0] = extendedGCD(Math.abs(a), Math.abs(b));  

    //Check if c is divisible by gcd, if not then no solutions exist
    if (c % g !== 0){
        return{
            hasSolution: false,
            message: 'No integer solutions exist.'
        };
    }

    //Scale particular solution in respect to c / g
    const scale = c / g;
    let x = x0 * scale;
    let y = y0 * scale;

    //Adjust if a or b were negative
    if (a < 0) x = -x;
    if (b < 0) y = -y;
    
    //General solution steps
    const stepX = `${x} + ${(b / g)} * t`;
    const stepY = `${y} - ${(a / g)} * t`;

    return{
        hasSolution: true,
        gcd: g,
        particular: {x, y},
        general: {x: `${x} + ${stepX} * t`, y: `${y} - ${stepY} * t`},
        message: `Solutions found, t can be any integer.`
    }
}