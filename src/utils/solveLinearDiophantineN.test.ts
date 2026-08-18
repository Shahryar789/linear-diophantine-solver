//Tests for n-variable solver

import { describe, expect, it } from 'vitest';
import { solveLinearDiophantineN } from './solveLinearDiophantineN';

describe('solveLinearDiophantineN', () => {
    it('solves a 2-variable equation', () => {
        const result = solveLinearDiophantineN([6, 9], 30);
        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(3);
        expect(result.particular).not.toBeNull();
        expect(result.basis).not.toBeNull();
    }); 

    it('solves a 3-variable equation', () => {
        const result = solveLinearDiophantineN([6, 9, 3], 30);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(3);
        expect(result.particular).not.toBeNull();
        expect(result.basis).not.toBeNull();
        expect(result.basis).toHaveLength(2);
    });

    it('detects when no integer solution exists', () => {
        const result = solveLinearDiophantineN([6, 9, 15], 7);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(3);
        expect(result.particular).toBeNull();
        expect(result.basis).toBeNull();
    });

    it('handles all-zero coefficients with zero RHS', () => {
        const result = solveLinearDiophantineN([0, 0, 0], 0);

        expect(result.hasSolution).toBe(true);
        expect(result.gcd).toBe(0);
        expect(result.particular).toEqual([0, 0, 0]);
        expect(result.basis).toHaveLength(3);
    });

    it('handles all-zero coefficients with nonzero RHS', () => {
        const result = solveLinearDiophantineN([0, 0, 0], 5);

        expect(result.hasSolution).toBe(false);
        expect(result.gcd).toBe(0);
        expect(result.particular).toBeNull();
        expect(result.basis).toBeNull();
    });

    it('rejects an empty coefficient list', () => {
        const result = solveLinearDiophantineN([], 5);

        expect(result.hasSolution).toBe(false);
        expect(result.variableCount).toBe(0);
    });

    it('rejects non-integer inputs', () => {
        const result = solveLinearDiophantineN([2, 3.5], 7);

        expect(result.hasSolution).toBe(false);
        expect(result.particular).toBeNull();
        expect(result.basis).toBeNull();
    });
});