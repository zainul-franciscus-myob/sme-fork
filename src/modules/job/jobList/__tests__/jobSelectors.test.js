import { getIsTableEmpty, getTableEntries } from '../jobListSelector';

describe('jobListSelector', () => {
  describe('getIsTableEmpty', () => {
    it('should be false  when no entries', () => {
      const state = { entries: [] };
      const expected = true;
      const actual = getIsTableEmpty(state);

      expect(actual).toEqual(expected);
    });
    it('should be true when entries', () => {
      const state = { entries: [{ id: 1 }] };
      const expected = false;
      const actual = getIsTableEmpty(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getTableEntries', () => {
    it('should add link for each entry', () => {
      const state = {
        entries: [
          { id: 'abc', value: 'def' },
          { id: '123', value: '456' },
        ],
        businessId: '999',
        region: 'au',
      };

      const expected = [
        { id: 'abc', value: 'def', link: '/#/au/999/job/abc' },
        { id: '123', value: '456', link: '/#/au/999/job/123' },
      ];
      const actual = getTableEntries(state);

      expect(actual).toEqual(expected);
    });
  });
});
