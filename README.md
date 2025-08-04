# Linear Diophantine Solver

A web based tool to solve Diophantine Equations of the form:

```
ax + by = c
```

It uses the **Extended Euclidean Algorithm** to find integer solutions if they exist and then provides a general parametric form solution.

___

## Features

- Solving Diophantine Equations of the form ax + by = c
- Find if possible solutions exist
- Return one specific base case solutions alongside a set of general solutions
- Fully client side
- Built using **Vite**, **React**, and **TypeScript**

___

## Mathematics

This application employs the Extended Euclidean Algorithms to:

- Verify if the **gcd(a,b)** divides **c** (to determine if a solution exists)
- Find a specific solution
- Generate a expression for all integer solutions with respect a parameter **t**

___

## License

MIT License.
