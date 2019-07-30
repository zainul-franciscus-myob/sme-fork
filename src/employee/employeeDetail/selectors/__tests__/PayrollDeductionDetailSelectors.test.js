import { getFilteredDeductionPayItemOptions } from '../PayrollDeductionDetailSelectors';

describe('PayrollDeductionDetailSelectors', () => {
  describe('getFilteredDeductionPayItemOptions', () => {
    it('should not contain deductions that has already been added to employee', () => {
      const payItemOptions = [{ id: '1' }, { id: '2' }];
      const payItems = [{ id: '1' }];

      const actual = getFilteredDeductionPayItemOptions
        .resultFunc(payItemOptions, payItems);

      expect(actual.find(item => item.id === '1')).toBeFalsy();
      expect(actual.find(item => item.id === '2')).toBeTruthy();
    });
  });
});
