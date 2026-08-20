//Tests for 3-variable solver

import { describe, expect, it } from "vitest";
import { solveLinearDiophantine3 } from "./solveLinearDiophantine3";

describe('solveLinearDiophantine3', () => {
    it('solves an equation with integer solutions', () => {
        const result = solveLinearDiophantine3(6, 9, 3, 30);
        
        expect(result.gcd).toBe(3);
        expect(result.particular).not.toBeNull();
        expect(result.step).not.toBeNull();
    });

    it('detects when no integer solution exists', () => {
        const result = solveLinearDiophantine3(6, 9, 0, 7);

        expect(result.gcd).toBe(3);
        expect(result.particular).toBeNull();
        expect(result.step).toBeNull();
    });

    it('handles a zero coefficient', () => {
        const result = solveLinearDiophantine3(6, 9, 0, 30);

        expect(result.gcd).toBe(3);
        expect(result.particular).not.toBeNull();
        expect(result.step).not.toBeNull();
    });

    it('handles all coefficients being zero with zero RHS', () => {
        const result = solveLinearDiophantine3(0, 0, 0, 0);

        expect(result.gcd).toBe(0);
        expect(result.particular).toBeNull();
        expect(result.step).toBeNull();
        expect(result.message).toContain("Infinitely many solutions");
    });

    it('handles all coefficients being zero with nonzero RHS', () => {
        const result = solveLinearDiophantine3(0, 0, 0, 5);

        expect(result.gcd).toBe(0);
        expect(result.particular).toBeNull();
        expect(result.step).toBeNull();
        expect(result.message).toContain("No integer solutions");
    });

    it('returns a particular solution that satisfies the equation', () => {
        const a = 6; 
        const b = 9;
        const c = 3;
        const d = 30;

        const result = solveLinearDiophantine3(a, b, c, d);

        expect(result.particular).not.toBeNull();

        const { x, y, z } = result.particular!;

        expect(a * x + b * y + c * z).toBe(d);
    });

    it('returns basis vectors that satisfy the homogeneous equation', () => {
        const a = 6; 
        const b = 9;
        const c = 3;
        const d = 30;

        const result = solveLinearDiophantine3(a, b, c, d);

        expect(result.step).not.toBeNull();

        const { dx, dy, dz } = result.step!;

        const basisVector1 = [dx[0], dy[0], dz[0]];
        const basisVector2 = [dx[1], dy[1], dz[1]];

        expect(
            a * basisVector1[0] +
            b * basisVector1[1] +
            c * basisVector1[2]
        ).toBe(0);

        expect(
            a * basisVector2[0] +
            b * basisVector2[1] +
            c * basisVector2[2]
        ).toBe(0);
    });
});