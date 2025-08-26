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

//Returns gcd for 3 numbers recursively
function gcd3(a: number, b: number, c: number): number {
    const gcd2 = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd2(y, x % y));
    return gcd2(gcd2(a, b), c);
}