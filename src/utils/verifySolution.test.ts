//Tests for solution verifier

import { describe, expect, it } from "vitest";
import { verifyDiophantineSolution } from "./verifySolution";

describe('verifyDiophantineSolution', () => {
    it('verifies a valid 2-variable solution', () => {
        expect(
            verifyDiophantineSolution([6, 9], [-10, 10], 30)
        ).toBe(true);
    });

    it('rejects an invalid 2-variable solution', () => {
        expect(
            verifyDiophantineSolution([6, 9], [-10, 9], 30)
        ).toBe(false);
    });

    it('verifies a valid 3-variable solution', () => {
        expect(
            verifyDiophantineSolution([6, 9, 3], [-10, 10, 0], 30)
        ).toBe(true);
    });

    it('verifies a valid n-variable solution', () => {
        expect(
            verifyDiophantineSolution(
                [6, 9, 3, 12],
                [-10, 10, 0, 0],
                30
            )
        ).toBe(true);
    });

    it('rejects mismatched lengths', () => {
        expect(
            verifyDiophantineSolution([6, 9], [-10], 30)
        ).toBe(false);
    });
});