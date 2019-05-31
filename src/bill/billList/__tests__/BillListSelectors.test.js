import { getNewBillUrlParam } from '../billListSelectors';

describe('BillListSelectors', () => {
  describe('getNewBillUrlParam', () => {
    it('should return the right url param for creating a new bill service', () => {
      const state = {
        layout: 'service',
      };
      const expected = 'newService';
      const actual = getNewBillUrlParam(state);

      expect(actual).toEqual(expected);
    });

    it('should return the right url param for creating a new bill item', () => {
      const state = {
        layout: 'item',
      };
      const expected = 'newItem';
      const actual = getNewBillUrlParam(state);

      expect(actual).toEqual(expected);
    });
  });
});
