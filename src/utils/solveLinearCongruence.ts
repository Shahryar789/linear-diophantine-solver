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
//Main solver, finds particular and general solution
export function solveLinearCongruence(a: number, b: number, m: number): CongruenceResult {
    //Check if all arguments are integers
    if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(m)) {
        return {
            hasSolution: false,
            gcd: 0,
            modulus: 0,
            message: "Inputs must be integers"
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
    //Calculate gcd(a, m)
    const [g, xCoefficient, yCoefficient] = extendedGCD(a, m);

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
    const  a1 = a / g;
    const b1 = b / g;
    const m1 = m / g;

    //Find inverse of a1 mod m1
    const [_, invA1, _y] = extendedGCD(a1, m1);

    //Build particular solution
    let x0 = (b1 * invA1) % m1;
    if (x0 < 0) x0 += m1; 

    //Format solution for display
    return {
        hasSolution: true,
        gcd: g,
        modulus: m1,
        solution: x0,
        generalSolution: `x = ${x0} (mod ${m1})`,
        message: 'Solutions exist'
    }
}