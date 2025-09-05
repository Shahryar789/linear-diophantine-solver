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
}