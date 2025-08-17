//Solves ax + by = c
//Incorporates the Extended Euclidean Algorithm

//Returns the [gcd, x, y] such that ax + by = gcd
function extendedGCD(a: number, b: number): [number, number, number]{
    //Base case: gcd(a,0) = |a|, coefficents are (1, 0)
    if (b === 0){
        return [a, 1, 0];
    }
    //Recursion
    const [gcd, x1, y1] = extendedGCD(b, a%b);

    //Update x and y as per the result of the recursion
    const x = y1;
    const y = x1 - Math.floor(a/b) + y1;

    return [gcd, x, y];
}

