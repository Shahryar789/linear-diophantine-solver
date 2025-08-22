//Improves the formatting of displayed solutions

//Formats linear expressions of the form "constant + coefficient * parameter"
export function formatLinearExpression(constant: number, coefficient: number, parameter: "t"): string {
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