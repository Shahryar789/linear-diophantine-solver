//Improves the formatting of displayed solutions

export function formatExpression(base: number, coefficient: number): string {
    //Return base constant if no coefficient
    if (coefficient === 0)
        return `${base}`;

    //Case handling for 1 and -1 coefficients
    const coefficientString = coefficient === 1 ? "t" : coefficient === -1 ? "-t" : `${coefficient}t`;

    //Return coefficient if base is 0
    if (base === 0)
        return coefficientString;

    //In all other scenarios join base and coefficients with their respectives signs
    return coefficient > 0 ? `${base} + ${coefficientString}` : `${base} - ${Math.abs(coefficient)}t`;
}