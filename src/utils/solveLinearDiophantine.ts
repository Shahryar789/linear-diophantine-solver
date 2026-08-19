//Solves ax + by = c
//Wrapper around n-variable solver, with formatting for 2D case

import { solveLinearDiophantineN } from "./solveLinearDiophantineN";
import { formatLinearExpression, formatVectorSolution2D } from "./format";

export type DiophantineResult = {
    hasSolution: boolean,
    gcd: number;
    particular?: {x: number; y: number} | null;
    step?: {dx: number; dy: number} | null;
    general?: {x: string; y: string; vector: string} | null;
    message: string;
};

//Main solver, finds particular and general solution
export function solveLinearDiophantine(a: number, b: number, c: number): DiophantineResult {
    //Account for special case
    if (a === 0 && b === 0) {
        if (c === 0) {
            return {
                hasSolution: true,
                gcd: 0,
                general: {x: "any integer", y: "any integer", vector: "(x, y) = (t, s)"},
                message: "Infinitely many solutions: x and y can be any integers.",
            }
        }
        return {
            hasSolution: false,
            gcd: 0,
            particular: null,
            step: null,
            general: null,
            message: "No solution: 0x + 0y ≠ nonzero c"
        };
    }

    //Send core math to the n-variable solver, treating this as a 2-variable case
    const result = solveLinearDiophantineN([a, b], c);

    //Check if c is divisible by gcd, if not then no solutions exist
    if (!result.hasSolution) {
        return{
            hasSolution: false,
            gcd: result.gcd,
            particular: null,
            step: null,
            general: null,
            message: result.message,
        };
    }

    //Check if result is valid
    if (!result.particular || !result.basis || result.basis.length < 1) {
        return {
            hasSolution: false,
            gcd: result.gcd,
            particular: null,
            step: null,
            general: null,
            message: "Unexpected solver state.",
        };
    }

    //Extract particular solution and basis vector for general solution
    const [x0, y0] = result.particular;
    const [dx, dy] = result.basis[0];

    //Build general solution
    const generalX = formatLinearExpression(x0, [dx], ["t"]);
    const generalY = formatLinearExpression(y0, [dy], ["t"]);
    const vectorForm = formatVectorSolution2D(x0, y0, dx, dy);

    return {
        hasSolution: true,
        gcd: result.gcd,
        particular: {x: x0, y: y0},
        step: {dx, dy},
        general: {x: generalX, y: generalY, vector: vectorForm},
        message: "General solution parameterized by integer t",
    };
}