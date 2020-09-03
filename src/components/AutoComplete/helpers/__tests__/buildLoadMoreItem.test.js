import buildLoadMoreItem, {
  IS_LOAD_MORE_BUTTON,
  LOAD_MORE_BUTTON_ID,
} from '../buildLoadMoreItem';

describe('random', () => {
  describe('getLoadMoreButtonItem', () => {
    it('return load more item with selected item data', () => {
      const expected = {
        id: LOAD_MORE_BUTTON_ID,
        [IS_LOAD_MORE_BUTTON]: true,
        displayName: 'Maree Matin',
      };
      const metaData = [
        { columnName: 'displayId' },
        { columnName: 'displayName', showData: true },
      ];
      const items = [
        { id: '123', displayId: 'CUS0001', displayName: 'Maree Matin' },
      ];
      const selectedId = '123';

      const actual = buildLoadMoreItem({
        metaData,
        items,
        selectedId,
      });

      expect(actual).toEqual(expected);
    });

    it('return load more item with empty display data when there is no selected item', () => {
      const expected = {
        id: LOAD_MORE_BUTTON_ID,
        [IS_LOAD_MORE_BUTTON]: true,
      };
      const metaData = [
        { columnName: 'displayId' },
        { columnName: 'displayName', showData: true },
      ];

      const actual = buildLoadMoreItem(metaData);

      expect(actual).toEqual(expected);
    });

    it('return load more item with empty display data when there is no showData column (similar to Feelix behavior)', () => {
      const expected = {
        id: LOAD_MORE_BUTTON_ID,
        [IS_LOAD_MORE_BUTTON]: true,
      };
      const metaData = [
        { columnName: 'displayId' },
        { columnName: 'displayName' },
      ];
      const items = [
        { id: '123', displayId: 'CUS0001', displayName: 'Maree Matin' },
      ];
      const selectedId = '123';

      const actual = buildLoadMoreItem({
        metaData,
        items,
        selectedId,
      });

      expect(actual).toEqual(expected);
    });

    it('return load more item with concat display data when there is multiple showDataColumn', () => {
      const expected = {
        id: LOAD_MORE_BUTTON_ID,
        [IS_LOAD_MORE_BUTTON]: true,
        displayId: 'CUS0001',
        displayName: 'Maree Matin',
      };
      const metaData = [
        { columnName: 'displayId', showData: true },
        { columnName: 'displayName', showData: true },
      ];
      const items = [
        { id: '123', displayId: 'CUS0001', displayName: 'Maree Matin' },
      ];
      const selectedId = '123';

      const actual = buildLoadMoreItem({
        metaData,
        items,
        selectedId,
      });

      expect(actual).toEqual(expected);
    });
  });
});
