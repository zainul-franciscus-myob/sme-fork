import {
  addCommasInPlace,
  addDecimalPlaces,
  formatValue,
  removeCommas,
} from '../formatter';

describe('removeCommas', () => {
  [
    {
      input: '1,000.00',
      output: '1000.00',
    },
    {
      input: '1,000,000.00',
      output: '1000000.00',
    },
    {
      input: '1,000,000,000.00',
      output: '1000000000.00',
    },
    {
      input: '1.00',
      output: '1.00',
    },
    {
      input: '9,999.999*1,000+31*(3,111)',
      output: '9999.999*1000+31*(3111)',
    },
  ].forEach(({ input, output }) => {
    it(`${input}`, () => {
      expect(removeCommas(input)).toEqual(output);
    });
  });
});

describe('addDecimalPlaces', () => {
  it('should return the value given if its empty', () => {
    expect(addDecimalPlaces('', 0, 2)).toEqual('');
  });
});

describe('formatValue', () => {
  it('should return an empty string given an undefined value', () => {
    expect(formatValue(undefined, 0, 2)).toEqual('');
  });

  it('should return an empty string given an empty string', () => {
    expect(formatValue('', 0, 2)).toEqual('');
  });

  describe('should format the following input to the following output', () => {
    [
      {
        input: '999',
        output: '999.00',
      },
      {
        input: '999.',
        output: '999.00',
      },
      {
        input: 1000,
        output: '1,000.00',
      },
      {
        input: '1000.00',
        output: '1,000.00',
      },
      {
        input: 1000000,
        output: '1,000,000.00',
      },
      {
        input: 1000000000,
        output: '1,000,000,000.00',
      },
      {
        input: '9,990.00',
        output: '9,990.00',
      },
      {
        input: '-683,205.00',
        output: '-683,205.00',
      },
    ].forEach(({ input, output }) => {
      it(`should transform ${input} to ${output}`, () => {
        expect(formatValue(input, 2, 2)).toEqual(output);
      });
    });
  });
});

describe('addCommasInPlace', () => {
  it('should return an empty string given an undefined value', () => {
    expect(addCommasInPlace(undefined)).toEqual('');
  });

  it('should return an empty string given an empty string', () => {
    expect(formatValue('')).toEqual('');
  });

  describe('should format the following input to the following output', () => {
    [
      {
        input: '1111',
        output: '1,111',
      },
      {
        input: '1,111+6666*4444444',
        output: '1,111+6,666*4,444,444',
      },
      {
        input: '-100*(-5000 + 7.123)',
        output: '-100*(-5,000 + 7.123)',
      },
      {
        input: '-10444.756*(-5000.111 + 7.1)',
        output: '-10,444.756*(-5,000.111 + 7.1)',
      },
    ].forEach(({ input, output }) => {
      it(`should transform ${input} to ${output}`, () => {
        expect(addCommasInPlace(input)).toEqual(output);
      });
    });
  });
});
