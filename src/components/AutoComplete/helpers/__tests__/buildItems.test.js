import { buildItems, buildSelectedItem } from '../buildItems';

describe('buildItems', () => {
  describe('buildItems', () => {
    const loadMoreButtonItem = {
      id: 'id',
      hello: 'hi',
    };

    describe('isSearching', () => {
      describe('search request is in flight', () => {
        it('should return empty array if is searching and search request is in flight', () => {
          const searchItems = [{ a: 'b' }];
          const actual = buildItems({
            isSearching: true,
            isSearchLoading: true,
            searchItems,
            loadMoreButtonItem,
          });

          expect(actual).toEqual([]);
        });
      });

      describe('search request is not in flight', () => {
        it('should return the result search list if there is no previously selected item', () => {
          const searchItems = [{ a: 'b' }];
          const actual = buildItems({
            isSearching: true,
            isSearchLoading: false,
            searchItems,
            loadMoreButtonItem,
          });

          expect(actual).toEqual(searchItems);
        });

        it('should return the previously selected item in the result search list if there is a previously selected item', () => {
          const searchItems = [{ id: '1', a: 'b' }];
          const actual = buildItems({
            isSearching: true,
            isSearchLoading: false,
            prevSelectedItem: {
              id: '2',
              c: 'd',
            },
            searchItems,
            loadMoreButtonItem,
          });

          const expected = [
            { id: '1', a: 'b' },
            { id: '2', c: 'd' },
          ];

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('is not searching', () => {
      it('should return item list with load more button', () => {
        const items = [{ c: 'd' }];
        const actual = buildItems({
          items,
          shouldShowLoadMoreButton: true,
          loadMoreButtonItem,
        });

        expect(actual).toEqual([{ c: 'd' }, { id: 'id', hello: 'hi' }]);
      });

      it('should return item list without load more button', () => {
        const items = [{ c: 'd' }];
        const actual = buildItems({
          items,
          shouldShowLoadMoreButton: false,
          loadMoreButtonItem,
        });

        expect(actual).toEqual([{ c: 'd' }]);
      });
    });
  });

  describe('buildSelectedItem', () => {
    it('should return the previously selected item if user is searching and there is a previously selected item', () => {
      const prevSelectedItem = {
        id: '11',
        a: 'bb',
      };
      const actual = buildSelectedItem({
        isSearching: true,
        prevSelectedItem,
      });

      expect(actual).toEqual(prevSelectedItem);
    });

    it('should return object with matching id if user is not searching', () => {
      const items = [
        { id: '1', a: 'b' },
        { id: '2', c: 'd' },
      ];

      const actual = buildSelectedItem({
        isSearching: false,
        selectedId: '1',
        items,
      });

      expect(actual).toEqual({ id: '1', a: 'b' });
    });
  });
});
