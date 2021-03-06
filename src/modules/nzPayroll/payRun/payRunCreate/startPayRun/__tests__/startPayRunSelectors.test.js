import {
  getCreateDraftPayRunRequestContent,
  getRegularPayCycleOptions,
  getStartPayRun,
} from '../StartPayRunSelectors';

describe('StartPayRunSelectors', () => {
  describe('getStartPayRun', () => {
    it('should get startPayRun', () => {
      const startPayRun = { key: 'value' };
      const state = { startPayRun };

      const actual = getStartPayRun(state);

      expect(actual).toEqual(startPayRun);
    });
  });

  describe('getRegularPayCycleOptions', () => {
    it('should get regularPayCycleOptions if they exist', () => {
      const value = 'value';
      const state = { startPayRun: { regularPayCycleOptions: value } };

      const actual = getRegularPayCycleOptions(state);

      expect(actual).toEqual(value);
    });

    it('should get regularPayCycleOptions if they exist', () => {
      const state = { startPayRun: {} };

      const actual = getRegularPayCycleOptions(state);

      expect(actual).toEqual([]);
    });
  });

  describe('getLoadEmployeePaysRequestContent', () => {
    it('should return current editing payrun', () => {
      const expected = { payRun: 'test' };
      const state = { startPayRun: { currentEditingPayRun: expected } };

      const actual = getCreateDraftPayRunRequestContent(state);

      expect(actual).toEqual(expected);
    });
  });
});
