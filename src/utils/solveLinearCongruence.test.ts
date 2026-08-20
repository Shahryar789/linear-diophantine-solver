//Tests for linear congruence solver

import { describe, expect, it } from "vitest";
import { solveLinearCongruence } from "./solveLinearCongruence";

describe('solveLinearCongruence', () => {
    it('solves a congruence with gcd = 1', () => {
        const result = solveLinearCongruence(7, 5, 13);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(1);
        expect(result.solution).toBeDefined();
    });

    it('solves a congruence with gcd > 1', () => {
        const result = solveLinearCongruence(6, 8, 14);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(2);
        expect(result.solution).toBeDefined();
    });

    it('detects when no solution exists', () => {
        const result = solveLinearCongruence(6, 5, 9);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(3);
        expect(result.solution).toBeUndefined();
    });

    it('handles a = 0 and b = 0', () => {
        const result = solveLinearCongruence(0, 0, 5);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(5);
        expect(result.modulus).toBe(5);
        expect(result.solution).toBeUndefined();
        expect(result.generalSolution).toBe("x ∈ Z");
    });

    it('handles a = 0 with nonzero b', () => {
        const result = solveLinearCongruence(0, 3, 5);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(5);
        expect(result.solution).toBeUndefined();
    });

    it('handles negative coefficients', () => {
        const result = solveLinearCongruence(-7, 1, 13);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(1);
        expect(result.solution).toBeDefined();
    });

    it('returns a solution that satisfies the congruence', () => {
        const a = 6;
        const b = 8;
        const m = 14;

        const result = solveLinearCongruence(a, b, m);

        expect(result.hasSolution).toBe(true);
        expect(result.solution).toBeDefined();

        const x = result.solution!;

        expect((a * x - b) % m).toBe(0);
    });

    it('rejects a non-integer input', () => {
        const result = solveLinearCongruence(6.5, 4, 9);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(0);
        expect(result.modulus).toBe(0);
        expect(result.solution).toBeUndefined();
    });

    it('rejects a non-positive modulus', () => {
        const result = solveLinearCongruence(6, 4, 0);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(0);
        expect(result.modulus).toBe(0);
        expect(result.solution).toBeUndefined();
    });
});