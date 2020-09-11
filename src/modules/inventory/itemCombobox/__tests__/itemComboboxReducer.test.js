import {
  LOAD_ITEM_COMBOBOX_OPTIONS,
  LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
  UPDATE_ITEM_COMBOBOX_OPTIONS,
} from '../../InventoryIntents';
import itemComboboxReducer from '../itemComboboxReducer';

describe('itemComboboxReducer', () => {
  describe('loadItemComboboxOptions', () => {
    it('adds new options to the bottom of the list and removes duplicates', () => {
      const state = {
        itemOptions: [{ id: '3' }, { id: '4' }],
      };

      const action = {
        intent: LOAD_ITEM_COMBOBOX_OPTIONS,
        itemOptions: [{ id: '3' }, { id: '5' }],
      };

      const actual = itemComboboxReducer(state, action);
      expect(actual.itemOptions).toEqual([
        { id: '3' },
        { id: '4' },
        { id: '5' },
      ]);
    });
  });

  describe('loadItemComboboxOptionsByIds', () => {
    it('adds new options to the top of the list and removes duplicates', () => {
      const state = {
        itemOptions: [
          { id: '1', description: 'apple' },
          { id: '2', description: 'pear' },
        ],
      };

      const action = {
        intent: LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
        items: [
          { id: '2', description: 'pear' },
          { id: '3', description: 'banana' },
        ],
      };

      const actual = itemComboboxReducer(state, action);
      expect(actual.itemOptions).toEqual([
        { id: '2', description: 'pear' },
        { id: '3', description: 'banana' },
        { id: '1', description: 'apple' },
      ]);
    });
  });

  describe('loadItemComboboxOptionById', () => {
    it('adds the new option to top of the list', () => {
      const state = { itemOptions: [{ id: '1' }] };
      const action = {
        intent: LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
        item: { id: '2' },
      };

      const actual = itemComboboxReducer(state, action);
      expect(actual.itemOptions).toEqual([{ id: '2' }, { id: '1' }]);
    });
    it('updates the existing option with the new details the new option has the same id', () => {
      const state = {
        itemOptions: [
          { id: '1', name: 'apple' },
          { id: '2', name: 'banana' },
        ],
      };
      const action = {
        intent: LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
        item: { id: '2', name: 'pear' },
      };

      const actual = itemComboboxReducer(state, action);
      expect(actual.itemOptions).toEqual([
        { id: '1', name: 'apple' },
        { id: '2', name: 'pear' },
      ]);
    });
  });

  describe('updateItemComboboxOptions', () => {
    it('adds the new option to the top of the list', () => {
      const state = { itemOptions: [{ id: '1' }] };
      const action = {
        intent: UPDATE_ITEM_COMBOBOX_OPTIONS,
        item: { id: '2' },
      };

      const actual = itemComboboxReducer(state, action);
      expect(actual.itemOptions).toEqual([{ id: '2' }, { id: '1' }]);
    });
    it('merges new options to the list and removes duplicates', () => {
      const state = {
        itemOptions: [
          { id: '1', name: 'apple' },
          { id: '2', name: 'banana' },
        ],
      };
      const action = {
        intent: UPDATE_ITEM_COMBOBOX_OPTIONS,
        item: { id: '2', name: 'pear' },
      };

      const actual = itemComboboxReducer(state, action);
      expect(actual.itemOptions).toEqual([
        { id: '1', name: 'apple' },
        { id: '2', name: 'pear' },
      ]);
    });
  });
});
