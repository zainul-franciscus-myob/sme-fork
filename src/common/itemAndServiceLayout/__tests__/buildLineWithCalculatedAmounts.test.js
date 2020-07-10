import buildLineWithCalculatedAmounts from '../buildLineWithCalculatedAmounts';

describe('buildLineWithCalculatedAmounts', () => {
  describe('calculate amount', () => {
    const line = {
      units: '2',
      unitPrice: '50',
      displayUnitPrice: '50.00',
      discount: '',
      displayDiscount: '',
      amount: '0',
      displayAmount: '0.00',
    };

    ['units', 'unitPrice', 'discount'].forEach((key) => {
      it(`should calculate amount when update ${key}`, () => {
        const expected = { ...line, amount: '100', displayAmount: '100.00' };

        const actual = buildLineWithCalculatedAmounts(line, key);

        expect(actual).toEqual(expected);
      });
    });

    it('should not calculate amount when update other field', () => {
      const actual = buildLineWithCalculatedAmounts(line, 'blah');

      expect(actual).toEqual(line);
    });

    ['units', 'unitPrice'].forEach((key) => {
      it(`should not calculate amount when ${key} is empty`, () => {
        const customLine = { ...line, [key]: '' };

        const actual = buildLineWithCalculatedAmounts(customLine, key);

        expect(actual).toEqual(customLine);
      });
    });
  });

  describe('calculate discount', () => {
    const line = {
      units: '2',
      unitPrice: '50',
      displayUnitPrice: '50.00',
      discount: '',
      displayDiscount: '',
      amount: '90',
      displayAmount: '90.00',
    };

    it('should calculate discount when update amount', () => {
      const expected = { ...line, discount: '10', displayDiscount: '10.00' };

      const actual = buildLineWithCalculatedAmounts(line, 'amount');

      expect(actual).toEqual(expected);
    });

    it('should not calculate discount when key is not amount', () => {
      const actual = buildLineWithCalculatedAmounts(line, 'blah');

      expect(actual).toEqual(line);
    });

    [
      { key: 'units', value: '' },
      { key: 'units', value: '0' },
      { key: 'amount', value: '' },
    ].forEach(({ key, value }) => {
      it(`should not calculate discount when ${key} is ${
        value || 'empty'
      }`, () => {
        const customLine = { ...line, [key]: value };

        const actual = buildLineWithCalculatedAmounts(customLine, 'amount');

        expect(actual).toEqual(customLine);
      });
    });
  });

  describe('calculate unitPrice', () => {
    const line = {
      units: '2',
      unitPrice: '',
      displayUnitPrice: '',
      discount: '10',
      displayDiscount: '10.00',
      amount: '90',
      displayAmount: '90.00',
    };

    it('should calculate unitPrice when update amount', () => {
      const expected = { ...line, unitPrice: '50', displayUnitPrice: '50.00' };

      const actual = buildLineWithCalculatedAmounts(line, 'amount');

      expect(actual).toEqual(expected);
    });

    it('should not calculate unitPrice when key is not amount', () => {
      const actual = buildLineWithCalculatedAmounts(line, 'blah');

      expect(actual).toEqual(line);
    });

    [
      { key: 'units', value: '' },
      { key: 'units', value: '0' },
      { key: 'discount', value: '100' },
      { key: 'amount', value: '' },
    ].forEach(({ key, value }) => {
      it(`should not calculate unitPrice when ${key} is ${
        value || 'empty'
      }`, () => {
        const customLine = { ...line, [key]: value };

        const actual = buildLineWithCalculatedAmounts(customLine, 'amount');

        expect(actual).toEqual(customLine);
      });
    });
  });
});
