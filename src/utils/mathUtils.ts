// Shared number theory utilities between the Diophantine and congruence solvers

// Extended Euclidean Algorithm
// Returns [g, x, y] such that ax + by = g, where g = gcd(a, b)

export function extendedGCD(a: number, b: number): [number, number, number]{

    // Base case: gcd(a, 0) = |a|, coefficents are (1, 0)
    if (b === 0){
        return [a, 1, 0];
    }
    //Recursion
    const [g, x1, y1] = extendedGCD(b, a % b);

    //Update x and y as per the result of the recursion
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;

    return [g, x, y];
}