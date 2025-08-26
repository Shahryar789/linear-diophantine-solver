//Solves ax + by + cz = d
//Incorporates the Extended Euclidean Algorithm

import{extendedGCD} from './solveLinearDiophantine';

//Structures result 
export interface Diophantine3Result {
    gcd: number,
    message: string,
    particular: {x: number, y: number, z: number} | null;
    step: {dx: [number, number]; dy: [number, number]; dz: [number, number] } | null;
}

//Compute gcd of two numbers recursively 
function gcd2(x: number, y: number): number {
    return y === 0 ? Math.abs(x) : gcd2(y, x % y);
}

//Returns gcd for 3 numbers by reducing to 2
function gcd3(a: number, b: number, c: number): number {
    return gcd2(gcd2(a, b), c);
}

//Main solver, finds particular and general solution
export function solveLinearDiophantine3(
    a: number,
    b: number,
    c: number,
    d: number
): Diophantine3Result {
    const g = gcd3(a, b, c);

    //Check solvability 
    if (d % g !== 0) {
        return{
            gcd: g,
            message: `No integer solutions exist`,
            particular: null,
            step: null,
        };
    }
    
    //Scale equations by gcd
    const a1 = a / g;
    const b1 = b / g;
    const c1 = c / g;
    const d1 = d / g;

    //Solve equations where solutions do exist
    const [g2, xPart, yPart] = extendedGCD(a1, b1);

    //Scale x0 and y0
    const x0 = xPart * (d1 / g2);
    const y0 = yPart * (d1 / g2);

    //Set z0 as zero initially for the particular solution
    const z0 = 0;

    //Build general solution
    const dx: [number, number] = [b1 / g2, -(c1 / g2)]
    const dy: [number, number] = [-a1 / g2, -(c1 / g2)]
    const dz: [number, number] = [0, 1]

    //Format solution for display
    return {
        gcd: g,
        message: `General solution parameterized by integers t and s`,
        particular: {x: x0, y: y0, z: z0},
        step: {dx, dy, dz},
    };
}