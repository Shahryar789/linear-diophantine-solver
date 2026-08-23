//Verifies that an integer solution satisfies:
// a1*x1 + ... + anxn = rhs

export function verifyDiophantineSolution(
    coefficients: number[],
    solution: number[],
    rhs: number
): boolean {
    if (coefficients.length !== solution.length) {
        return false;
    }

    const value = coefficients.reduce(
        (sum, coefficient, index) =>
            sum + coefficient * solution[index],
        0
    );

    return value === rhs;
}