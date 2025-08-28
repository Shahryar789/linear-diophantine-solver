//Improves the formatting of displayed solutions

//Formats linear expressions of the form "constant + coefficient * parameter"
export function formatLinearExpression(constant: number, coefficients: number[], parameters: string[] = ["t", "s"]): string {
    const parts: string[] = [];

    //Constant term
    if (constant !== 0) {
        parts.push(constant.toString());
    }

    //Parameter terms
    coefficients.forEach((coefficient, i) => {
    if (coefficient !== 0) {
        let coefficientString = "";
        if (coefficient === 1) coefficientString = "";
        else if (coefficient === -1) coefficientString = "-";
        else coefficientString = coefficient.toString();

        parts.push(coefficientString + parameters[i]);
    }
  });
    if (parts.length === 0) return "0";

    //Join the expression together with appropriate signs
    return parts.join(" + ").replace(/\+\s-/, "- ");
}
//Format a 2D general solution in vector form
export function formatVectorSolution2D(x0: number, y0: number, dx: number, dy: number): string {
    return `(x, y) = (${x0}, ${y0}) + t(${dx}, ${dy})`;
}

//Format a 3D general solution in vector form
export function formatVectorSolution3D(x0: number, y0: number, z0: number, dx: [number, number], dy: [number, number], dz: [number, number]): string {
    return `(x, y, z) = (${x0}, ${y0}, ${z0}) + t(${dx[0]}, ${dy[0]}, ${dz[0]}) + s(${dx[1]}, ${dy[1]}, ${dz[1]})`;
}