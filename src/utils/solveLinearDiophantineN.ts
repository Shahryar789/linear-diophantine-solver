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