import { Decimal } from 'decimal.js';

const stripCommas = value => String(value).replace(/,/g, '');
const getNumber = value => (Number.isNaN(Number(value)) ? 0 : Number(value));

// eslint-disable-next-line import/prefer-default-export
export const addNumbers = (inputOne, inputTwo) => {
  const input1 = stripCommas(inputOne);
  const input2 = stripCommas(inputTwo);
  return (new Decimal(getNumber(input1)).add(getNumber(input2))).valueOf();
};
