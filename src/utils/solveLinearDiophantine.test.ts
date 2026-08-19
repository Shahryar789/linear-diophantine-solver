//Tests for 2-variable solver

import { describe, expect, it } from "vitest";
import { solveLinearDiophantine } from "./solveLinearDiophantine";

describe('solveLinearDiophantine', () => {
    it('solves an equation with integer solutions', () => {
        const result = solveLinearDiophantine(6, 9, 30);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(3);
        expect(result.particular).not.toBeNull();
    });

    it('detects when no integer solution exists', () => {
        const result = solveLinearDiophantine(6, 9, 7);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(3);
        expect(result.particular).toBeNull();
    });

    it('handles a zero coefficient', () => {
        const result = solveLinearDiophantine(0, 7, 21);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(7);
        expect(result.particular).not.toBeNull();
    });

    it('handles both coefficients being zero with zero RHS', () => {
        const result = solveLinearDiophantine(0, 0, 0);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(0);
    });

    it('handles both coefficients being zero with nonzero RHS', () => {
        const result = solveLinearDiophantine(0, 0, 5);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(0);
        expect(result.particular).toBeNull();
    });

    it('returns a particular solution that satisfies the equation', () => {
        const a = 6;
        const b = 9;
        const c = 30;
        
        const result = solveLinearDiophantine(a, b, c);
        
        expect(result.particular).not.toBeNull();

        const { x, y } = result.particular!;

        expect(a * x + b * y).toBe(c);
    });
});