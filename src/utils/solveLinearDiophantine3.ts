import{extendedGCD} from './solveLinearDiophantine';

export interface Diophantine3Result {
    gcd: number,
    message: string,
    particular: {x: number, y: number, z: number} | null;
    step: {dx: [number, number]; dy: [number, number]; dz: [number, number] } | null;
}
