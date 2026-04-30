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
    return Array.from({length: n}, (_, i) =>
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
            message: "All coefficients and the right hand side must be integers.",
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
                particular: Array(n).fill(0),
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

    const transformed = [...coefficients];
    const B = identityMatrix(n);

    for (let i = 1; i < n; i++) {
        const c1 = transformed[0];
        const ci = transformed[i];

        if (ci === 0) continue;

        let [g, p, q] = extendedGCD(c1, ci);
        
        //Normalize GCD to be positive
        if (g < 0) {
            g = -g;
            p = -p;
            q = -q;
        }
        //Perform column transformations on columns 1 and i such that:
        // T = [p ... ci/g]
        //   = [q ... -c1/g]
        // => [c1 ci] T = [g 0]

        const t11 = p;
        const t21 = q;
        const t12 = ci / g;
        const t22 = -c1 / g;

        //Update transformed row
        transformed[0] = c1 * t11 + ci * t21;
        transformed[i] = c1 * t12 + ci * t22;

        //Update B by applying the same column transformation
        for (let row = 0; row < n; row++) {
            const oldCol0 = B[row][0];
            const oldColI = B[row][i];

            B[row][0] = oldCol0 * t11 + oldColI * t21;
            B[row][i] = oldCol0 * t12 + oldColI * t22;
        }
    }
    const g = Math.abs(transformed[0]);

    if (rhs % g !== 0) {
        return {
            hasSolution: false,
            gcd: g,
            message: "No integer solutions exist.",
            variableCount: n,
            particular: null,
            basis: null,
        };
    }
    
    const scale = rhs / g;
    
    // y = [rhs/g, 0, ..., 0]
    // x = B*y = (rhs/g) * first column of B
    const particular = B.map((row) => row[0] * scale);

    //Remaining columns of B form a basis for the homogenous solution space
    const basis: number[][] = [];
    for (let j = 1; j < n; j++) {
        basis.push(B.map((row) => row[j]));
    }

    return {
        hasSolution: true,
        gcd: g,
        message: `General solution has ${basis.length} free parameter${basis.length === 1 ? "" : "s"}.`,
        variableCount: n,
        particular,
        basis,
    };
}