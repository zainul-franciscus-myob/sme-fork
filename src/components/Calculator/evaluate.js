import { Parser } from 'expr-eval';

const parser = new Parser({
  operators: {
    // Standard operators that we support
    add: true,
    divide: true,
    subtract: true,
    multiply: true,

    // Operators that won't be supported
    concatenate: false,
    conditional: false,
    factorial: false,
    power: false,
    remainder: false,
    logical: false,
    comparison: false,
  },
});

const evaluate = (value) => {
  try {
    const parsedValue = parser.evaluate(value);
    return parsedValue;
  } catch (error) {
    return '';
  }
};

export default evaluate;
