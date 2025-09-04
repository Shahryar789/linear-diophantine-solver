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