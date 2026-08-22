//Tests for solution formatting 

import { describe, expect, it } from "vitest";
import{
    formatLinearExpression,
    formatVectorSolution2D,
    formatVectorSolution3D,
    formatNVariableSolution,
    formatNVariableVectorSolution
} from "./format";

describe('formatLinearExpression', () => {
    it('formats a constant and positive parameter', () => {
        expect(formatLinearExpression(5, [3], ["t"])).toBe("5 + 3t");
    });

    it('formats a negative parameter coefficient', () => {
        expect(formatLinearExpression(5, [-3], ["t"])).toBe("5 - 3t");
    });

    it('omits coefficient 1', () => {
        expect(formatLinearExpression(5, [1], ["t"])).toBe("5 + t");
    });

    it('omits coefficient -1 correctly', () => {
        expect(formatLinearExpression(5, [-1], ["t"])).toBe("5 - t");
    });

    it('returns zero when all terms are zero', () => {
        expect(formatLinearExpression(0, [0], ["t"])).toBe("0");
    });

    it('formats multiple parameters', () => {
        expect
        (formatLinearExpression(2, [3, -4], ["t", "s"])
    ).toBe("2 + 3t - 4s");
    });
});

describe('formatVectorSolution2D', () => {
    it('formats a 2D vector solution', () => {
        expect(
            formatVectorSolution2D(-10, 10, 3, -2)
        ).toBe('(x, y) = (-10, 10) + t(3, -2)');
    });
});    

describe('formatVectorSolution3D', () => {
    it('formats a 3D vector solution', () => {
        expect(
            formatVectorSolution3D(
                -10,
                10,
                0,
                [3, 0],
                [-2, 0],
                [0, 1]
            )
        ).toBe(
            '(x, y, z) = (-10, 10, 0) + t(3, -2, 0) + s(0, 0, 1)'
        );
    });
});

describe('formatNVariableSolution', () => {
    it('formats coordinate-wise n-variable solutions', () => {
        const particular = [-10, 10, 0];
        const basis = [
            [3, -2, 0],
            [0, 0, 1],
        ];

        expect(
            formatNVariableSolution(particular, basis)
        ).toEqual([
            'x1 = -10 + 3t1',
            'x2 = 10 - 2t1',
            'x3 = t2',
        ]);
    });
});

describe('formatNVariableVectorSolution', () => {
    it('formats an n-variable vector solution', () => {
        const particular = [-10, 10, 0];
        const basis = [
            [3, -2, 0],
            [0, 0, 1],
        ];
        
        expect(
            formatNVariableVectorSolution(particular, basis)
        ).toBe(
            'x = (-10, 10, 0) + t1(3, -2, 0) + t2(0, 0, 1)'
        );
    });

    it('formats a solution with no basis vectors', () => {
        expect(
            formatNVariableVectorSolution([5, 7], [])
        ).toBe('x = (5, 7)');
    });
});

