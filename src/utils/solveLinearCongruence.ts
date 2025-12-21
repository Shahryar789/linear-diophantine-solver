//Solves ax = b (mod m)
//Incorporates the Extended Euclidean Algorithm

import { extendedGCD } from "./solveLinearDiophantine";

export interface CongruenceResult {
    hasSolution: boolean;
    gcd: number;
    modulus: number;
    solution?: number;
    generalSolution?: string;
    message: string;
}
//Normalization helper
function modNormalize (x: number, mod: number): number {
    const r = x % mod;
    return r < 0 ? r + mod : r;
}

//Main solver, finds particular and general solution
export function solveLinearCongruence(a: number, b: number, m: number): CongruenceResult {
    //Check if all arguments are integers
    if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(m)) {
        return {
            hasSolution: false,
            gcd: 0,
            modulus: 0,
            message: "Inputs must be integers",
        };
    }

    //Check to see if modulus is positive
    if (m <= 0){
        return {
            hasSolution: false,
            gcd: 0,
            modulus: 0,
            message: "Modulus must be positive",
        };
    }
    
    //Handle special cases
    if(a === 0 && b == 0) {
        return {
            hasSolution: true,
            gcd: m,
            modulus: m,
            message: "Infinitely many solutions",
            generalSolution: "x ∈ Z",
        };
    }

    if (a === 0 && b !== 0) {
        return {
            hasSolution: false,
            gcd: m,
            modulus: m,
            message: `No solutions`,
        };
    }

    let [g, _x, _y] = extendedGCD(a, m);

    if (g < 0) g = -g;

    //Check divisibility 
    if (b % g !== 0) {
        return {
            hasSolution: false,
            gcd: g,
            modulus: m,
            message: 'No solutions exists',
        };
    }

    //Scale down equation
    const a1 = a / g;
    const b1 = b / g;
    const m1 = m / g;

    //Find inverse of a1 mod m1
    let [g1, invA1, __y] = extendedGCD(a1, m1);

    //Normalize gcd to remain positive, adjust inv as needed
    if (g1 < 0) {
        g1 = -g1;
        invA1 = -invA1;
    }

    //Build particular solution
    const x0 = modNormalize(b1 * invA1, m1);

    //Format solution for display
    return {
        hasSolution: true,
        gcd: g,
        modulus: m1,
        solution: x0,
        generalSolution: `x = ${x0} (mod ${m1})`,
        message: "Solutions exist",
    };
}