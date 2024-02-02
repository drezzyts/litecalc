# litecalc

The litecalc library is a lightweight and user-friendly mathematical expressions evaluator, tailored for simple mathematical operations.

## Installation

To install litecalc, use npm:

```bash
npm install litecalc
```

## Usage

Litecalc is straightforward to use. After installation, import it and start evaluating expressions.

```typescript
import { litecalc } from 'litecalc';

// Addition and Subtraction:
litecalc('1 + 1'); // Output: 2
litecalc('3 - 1'); // Output: 2

// Multiplication and Division:
litecalc('2 * 5'); // Output: 10
litecalc('100 / 10'); // Output: 10

// Exponentiation:
litecalc('pow(10, 2)'); // Output: 100

// Constants:
litecalc('pi * 2'); // Output: 6.28...
```

## Functions

Litecalc supports the following mathematical functions:

- **``pow(base, exponent)``**: Raises a base to the power of an exponent.
- **``sqrt(value)``**: Calculates the square root of a given value.
- **``hypot(...values)``**: Computes the square root of the sum of the squares of its arguments.
- **``sin(angle)``**: Returns the sine of an angle in radians.
- **``cos(angle)``**: Returns the cosine of an angle in radians.
- **``tan(angle)``**: Returns the tangent of an angle in radians.

## Constants
Litecalc includes the following mathematical constants:

- **``pi``**: The mathematical constant representing the ratio of a circle's circumference to its diameter.
- **``e``**: The mathematical constant representing the base of natural logarithms.
- **``tau``**: The double of the mathematical constant pi, representing one full revolution in radians.