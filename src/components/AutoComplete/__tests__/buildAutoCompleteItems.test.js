import { buildItems, buildSelectedItem } from '../buildAutoCompleteItems';

describe('buildAutoCompleteItems', () => {
  describe('buildItems', () => {
    const items = [{ first: '1', last: '2', hidden: '3' }];
    const selectedItem = { first: '4', last: '5', hidden: '6' };
    const displayColumns = [
      { columnName: 'first' },
    ];

    const defaultInputs = {
      items, selectedItem, isEditing: true, displayColumns, allowClearSelection: false, clearSelectionText: 'None',
    };

    it('build items when editing', () => {
      const actual = buildItems(defaultInputs);

      expect(actual).toEqual([{ first: '1', last: '2', hidden: '3' }]);
    });

    it('build items when not editing', () => {
      const actual = buildItems({ ...defaultInputs, isEditing: false });

      expect(actual).toEqual([{ first: '4', last: '5', hidden: '6' }]);
    });

    it('build empty items when not editing and no selected item', () => {
      const actual = buildItems({ ...defaultInputs, isEditing: false, selectedItem: undefined });

      expect(actual).toEqual([]);
    });

    it('add clear item when required', () => {
      const actual = buildItems({ ...defaultInputs, allowClearSelection: true });

      expect(actual).toEqual([{ first: 'None' }, { first: '1', last: '2', hidden: '3' }]);
    });

    it('add space to 2nd and after display column fields for proper concatenate', () => {
      const actual = buildItems({
        ...defaultInputs,
        displayColumns: [...displayColumns, { columnName: 'last' }],
      });

      expect(actual).toEqual([{ first: '1', last: ' 2', hidden: '3' }]);
    });
  });

  describe('build selected item', () => {
    const items = [{ id: 1, other: 'info' }];

    it('build empty object when no selected item', () => {
      const actual = buildSelectedItem({
        items,
      });

      expect(actual).toEqual({});
    });

    it('select item from items when identifier matches', () => {
      const actual = buildSelectedItem({
        items, selectedItem: { id: 1 }, identifier: 'id',
      });

      expect(actual).toBe(items[0]);
    });
  });
});
