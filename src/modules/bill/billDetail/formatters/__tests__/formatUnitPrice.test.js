import formatUnitPrice from '../formatUnitPrice';

describe('formatUnitPrice', () => {
  it.each([
    ['many decimal places', '25.000006', '25.000006'],
    ['trailing zeros', '25.000500', '25.0005'],
    ['1 decimal place', '25.500000', '25.50'],
    ['whole number', '25.000000', '25.00'],
  ])('formats line unitPrice when %s', (_, input, expected) => {
    const actual = formatUnitPrice(input);
    expect(actual).toEqual(expected);
  });
});
