import {
  getIsDefaultFilters,
  getIsTableEmpty,
  getOrder,
  getTableEntries,
  getTypeFilterOptions,
} from '../contactListSelector';

describe('contactListSelector', () => {
  describe('getIsDefaultFilters', () => {
    it('should retrun false when default filters arent applied', () => {
      const state = {
        defaultFilterOptions: { keywords: 'not', type: 'abc' },
        appliedFilterOptions: { keywords: 'the same', type: 'abc' },
      };
      const expected = false;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
    it('should retrun true when default filters are applied', () => {
      const state = {
        defaultFilterOptions: { keywords: 'the same', type: 'abc' },
        appliedFilterOptions: { keywords: 'the same', type: 'abc' },
      };
      const expected = true;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getOrder', () => {
    it('when descending is true', () => {
      const state = {
        orderBy: 'column',
        sortOrder: 'desc',
      };

      const expected = { column: 'column', descending: true };
      const actual = getOrder(state);

      expect(actual).toEqual(expected);
    });
    it('when descending is false', () => {
      const state = {
        orderBy: 'column',
        sortOrder: 'asc',
      };

      const expected = { column: 'column', descending: false };
      const actual = getOrder(state);

      expect(actual).toEqual(expected);
    });
  });
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
  describe('getTypeFilterOptions', () => {
    it('should parse filter types', () => {
      const state = {
        typeFilters: [
          { name: 'abc', value: 'def' },
          { name: '123', value: '456' },
        ],
      };

      const expected = [
        { label: 'abc', value: 'def' },
        { label: '123', value: '456' },
      ];
      const actual = getTypeFilterOptions(state);

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
        { id: 'abc', value: 'def', link: '/#/au/999/contact/abc' },
        { id: '123', value: '456', link: '/#/au/999/contact/123' },
      ];
      const actual = getTableEntries(state);

      expect(actual).toEqual(expected);
    });
  });
});
