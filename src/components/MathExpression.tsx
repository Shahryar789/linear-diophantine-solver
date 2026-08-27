//KaTeX formatting for solver results

import katex from 'katex';
import 'katex/dist/katex.min.css';

type MathExpressionProps = {
    expression: string;
    display?: boolean;
};

function MathExpression({
    expression,
    display = false,
}: MathExpressionProps) {
    const html = katex.renderToString(expression, {
        throwOnError: false,
        displayMode: display,
    }); 
    
    return(
        <span
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export default MathExpression;