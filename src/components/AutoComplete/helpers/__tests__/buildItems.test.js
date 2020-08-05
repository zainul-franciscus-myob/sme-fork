import { buildItems, buildSelectedItem } from '../buildItems';

describe('buildItems', () => {
  describe('buildItems', () => {
    const loadMoreButtonItem = {
      id: 'id',
      hello: 'hi',
    };

    describe('isSearching', () => {
      it('should return search items if isSearching and search request is not in flight', () => {
        const searchItems = [{ a: 'b' }];
        const actual = buildItems({
          isSearching: true,
          isSearchLoading: false,
          searchItems,
          loadMoreButtonItem,
        });

        expect(actual).toEqual(searchItems);
      });

      it('should return Load more Spinner if is searching and search request is in flight', () => {
        const searchItems = [{ a: 'b' }];
        const actual = buildItems({
          isSearching: true,
          isSearchLoading: true,
          searchItems,
          loadMoreButtonItem,
        });

        expect(actual).toEqual([{ id: 'id', hello: 'hi' }]);
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
    it('should return object with matching id', () => {
      const items = [
        { id: '1', a: 'b' },
        { id: '2', c: 'd' },
      ];

      const actual = buildSelectedItem({
        selectedId: '1',
        items,
      });

      expect(actual).toEqual({ id: '1', a: 'b' });
    });
  });
});
