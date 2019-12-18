import { getFilteredSuperPayItemOptions } from '../PayrollSuperSelectors';

describe('PayrollDetailsSuperannuationSelectors', () => {
  describe('getFilteredSuperPayItemOptions', () => {
    it('should not contain super pay items that have already been added to employee', () => {
      const payItemOptions = [{ id: '1' }, { id: '2' }];
      const payItems = [{ id: '1' }];

      const actual = getFilteredSuperPayItemOptions.resultFunc(
        payItemOptions,
        payItems,
      );

      expect(actual.find(item => item.id === '1')).toBeFalsy();
      expect(actual.find(item => item.id === '2')).toBeTruthy();
    });
  });
});
