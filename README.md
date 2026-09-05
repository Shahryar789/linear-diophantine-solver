# Linear Diophantine Solver

An interactive web application for solving and exploring **Linear Diophantine Equations** and **Linear Congruences**.
It combines number theory with a modern **React + TypeScript** interface, it computes integer solutions, parameterizations, vector forms, and visualizes two-variable solutions on an interactive integer lattice.

## Live Demo

[Linear Diophantine Solver](https://shahryar789.github.io/linear-diophantine-solver/)

___

## Features

### Linear Diophantine Equations

Solve equations of the form

\[
a_1x_1 + a_2x_2 + \cdots + a_nx_n = d
\]

Supports:

- 2‑variable equations  
- 3‑variable equations  
- General equations (2–10 variables)  
- Particular integer solutions  
- Complete parameterized solutions  
- Vector‑form solutions  
- Homogeneous basis vectors  
- Solution verification  
- Detection of no integer solutions  
- Detection of infinitely many solutions

The solver uses the **Extended Euclidean Algorithm** as its foundation.

### Linear Congruences

Solve congruences of the form:

\[
ax \equiv b \pmod m
\]

The solver determines existence conditions and displays the full modular solution set.

### Integer Lattice Visualization

For two‑variable equations, the app provides an interactive D3 visualization showing:

- Integer solution points  
- The equation line  
- Parameter values for each solution  
- Selected solution highlight  
- Interactive parameter slider  

### Mathematical Notation

All mathematical expressions are rendered using **KaTeX** for clean, readable notation.

---

## Mathematical Methods

### Extended Euclidean Algorithm

Computes integers \(x\) and \(y\) such that:

\[
ax + by = \gcd(a,b)
\]

### General Solution Structure

When solutions exist, the solver provides:

- A particular solution  
- A basis for the homogeneous solution space  

This yields the complete integer solution set using integer parameters.

---

## Technology

- React  
- TypeScript  
- Vite  
- D3.js  
- KaTeX  
- Vitest  
- GitHub Actions  
- GitHub Pages  

---

## Project Structure

```text
src/
├── components/
│   ├── InputForm.tsx
│   ├── ModeSelector.tsx
│   ├── SolverInputs.tsx
│   ├── MathExpression.tsx
│   ├── TwoVariableResult.tsx
│   ├── ThreeVariableResult.tsx
│   ├── NVariableResult.tsx
│   ├── LinearCongruenceResult.tsx
│   └── LatticeVisualization.tsx
│
├── utils/
│   ├── mathUtils.ts
│   ├── format.ts
│   ├── solveLinearDiophantine.ts
│   ├── solveLinearDiophantine3.ts
│   ├── solveLinearDiophantineN.ts
│   ├── solveLinearCongruence.ts
│   └── verifySolution.ts
│
├── App.tsx
├── App.css
└── index.css
