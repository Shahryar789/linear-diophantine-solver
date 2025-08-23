//Improves the formatting of displayed solutions

//Formats linear expressions of the form "constant + coefficient * parameter"
export function formatLinearExpression(constant: number, coefficient: number, parameter: string = "t"): string {
    const parts: string[] = [];

    //Constant term
    if (constant !== 0) {
        parts.push(constant.toString());
    }

    //Coefficient term
    if (coefficient !== 0) {
        let coefficientString = "";
        if (coefficient === 1) coefficientString = "";
        else if (coefficient === -1) coefficientString = "-";
        else coefficientString = coefficient.toString();

        parts.push(coefficientString + parameter);
    }

    if (parts.length === 0) return "0";

    //Join the expression together with appropriate signs
    return parts.join(" + ").replace(/\+\s-/, "- ");
}
//Format a 2D general solution in vector form
export function formatVectorSolution2D(x0: number, y0: number, dx: number, dy: number): string {
    return `(x, y) = (${x0}, ${y0}) + t(${dx}, ${dy})`;
}