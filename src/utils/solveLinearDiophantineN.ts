//Solves a1x1 + a2x2 + ... + anxn = d
//Incorporates the Extended Euclidean Algorithm

import { extendedGCD } from "./solveLinearDiophantine";

export interface DiophantineNResult {
    hasSolution: boolean,
    gcd: number;
    message: string;
    variableCount: number,
    particular: number[] | null;
    basis: number[][] | null;
}

//Builds an nxn identity matrix
function identityMatrix(n: number): number[][] {
    return Array.from({length: n}), (_, i) =>
        Array.from({length: n}, (_, j) => (i === j ? 1 : 0))
    );
}   

//Main solver, finds particular and general solution
export function solveLinearDiophantineN(
    coefficients: number[],
    rhs: number
): DiophantineNResult {
    const n = coefficients.length;

    if (n === 0) {
        return {
            hasSolution: false,
            gcd: 0,
            message: "At least one coefficient is required.",
            variableCount: 0,
            particular: null,
            basis: null,
        };
    }
    if (!coefficients.every(Number.isInteger) || !Number.isInteger(rhs)) {
        return {
            hasSolution: false,
            gcd: 0,
            message: "All coefficients and the right-hand side must be integers.",
            variableCount: n,
            particular: null,
            basis: null,
        };
    }
    //Special case: All coefficients are zero
    const allZero = coefficients.every((a) => a === 0);

    if (allZero) {
        if (rhs === 0) {
            return {
                hasSolution: true,
                gcd: 0,
                message: "Infinitely many solutions: All variables can be any integer.",
                variableCount: n,
                particular: Array(n).fill(0);
                basis: identityMatrix(n),
            };
        }
        return {
            hasSolution: false,
            gcd: 0,
            message: "No integer solutions exist.",
            variableCount: n,
            particular: null,
            basis: null,
        };
    }
    //Construct a unimodular matrix B such that:
    // [a1 a2 ... an] * B = [g 0 0 ... 0]
    // => That solving ax = rhs:
    // [g 0 0 ... 0] y = rhs
    // => x = By
}