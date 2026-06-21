//Solves ax + by + cz = d
//Wrapper around the n-variable solver, with formatting for 3D case

import { solveLinearDiophantineN } from "./solveLinearDiophantineN"; 

//Structures result 
export interface Diophantine3Result {
    gcd: number,
    message: string,
    particular: {x: number, y: number, z: number} | null;
    step: {dx: [number, number]; dy: [number, number]; dz: [number, number] } | null;
}

//Main solver, finds particular and general solution
export function solveLinearDiophantine3(
    a: number,
    b: number,
    c: number,
    d: number
): Diophantine3Result {
    //Special case: 0x + 0y + 0z = d
    if (a === 0 && b === 0 && c === 0) {
        if (d === 0) {
            return {
                gcd: 0,
                message: "Infintely many solutons: x, y, z can be any integers",
                particular: null,
                step: null,  
            };  
        }
    //Check solvability 
        return {
            gcd: 0,
            message: "No integer solutions exist",
            particular: null,
            step: null,
        };
    }
    
    //Send core math to the n-variable solver, treating this as a 3-variable case   
    const result = solveLinearDiophantineN([a, b, c], d);

    //No integer solution
    if (!result.hasSolution) {  
        return {
            gcd: result.gcd,    
            message: result.message,
            particular: null,
            step: null,
        };
    }

    //Check if result is valid
    if (!result.particular || !result.basis || result.basis.length < 2) {   
        return {
            gcd: result.gcd,
            message: "Unexpected solver state.",
            particular: null,
            step: null,
        };
    }

    //Extract particular solution
    const [x0, y0, z0] = result.particular;

    //Extract two basis vectors for general solution
    const [v1, v2] = result.basis;

    return {
        gcd: result.gcd,
        message: "General solution parameterized by integers t and s",
        particular: {x: x0, y: y0, z: z0},
        step: {
            dx: [v1[0], v2[0]],
            dy: [v1[1], v2[1]],
            dz: [v1[2], v2[2]],
        },
    };
}