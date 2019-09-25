import { getTableEntries } from '../AccountListSelectors';

describe('AccountListSelectors', () => {
  describe('getTableEntries', () => {
    it('should return table entries for the view', () => {
      const entries = [
        { id: 'id-1', level: 1 },
        { id: 'id-2', level: 2 },
      ];

      const expected = [
        {
          id: 'id-1', level: 1, displayLevel: 'Level 1',
        },
        {
          id: 'id-2', level: 2, displayLevel: 'Level 2', indentLevel: 1,
        },
      ];

      const actual = getTableEntries.resultFunc(entries);

      expect(actual).toEqual(expected);
    });
  });
});
