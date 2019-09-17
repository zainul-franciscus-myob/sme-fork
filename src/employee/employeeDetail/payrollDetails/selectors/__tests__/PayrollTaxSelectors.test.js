import { getFilteredTaxPayItemOptions, getSelectedTaxPayItems } from '../PayrollTaxSelectors';

describe('PayrollTaxSelectors', () => {
  describe('getFilteredTaxPayItemOptions', () => {
    it('should not contain pay item that has already been added to pay item list', () => {
      const payItemOptions = [{ id: '1' }, { id: '2' }];
      const payItems = [{ id: '1' }];

      const actual = getFilteredTaxPayItemOptions
        .resultFunc(payItemOptions, payItems);

      expect(actual.find(item => item.id === '1')).toBeFalsy();
      expect(actual.find(item => item.id === '2')).toBeTruthy();
    });
  });

  describe('getSelectedTaxPayItems', () => {
    it('get selected tax pay items', () => {
      const payItemOptions = [
        { id: '1', name: 'name1', type: 'TaxPayrollCategory' },
        { id: '2', name: 'name2', type: 'TaxPayrollCategory' },
      ];
      const payItems = [{ id: '1', type: 'TaxPayrollCategory' }];

      const expected = [{ id: '1', name: 'name1', type: 'TaxPayrollCategory' }];

      const actual = getSelectedTaxPayItems
        .resultFunc(payItemOptions, payItems);

      expect(actual).toEqual(expected);
    });
  });
});
