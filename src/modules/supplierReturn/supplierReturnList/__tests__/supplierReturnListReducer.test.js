import { LOAD_SUPPLIER_RETURN_LIST } from '../../SupplierReturnIntents';
import supplierReturnListReducer from '../supplierReturnListReducer';

describe('supplierReturnListReducer', () => {
  describe('loadSupplierReturnList', () => {
    it('should transform the supplierFilters to be consumable by the ui', () => {
      const state = {
        filterOptions: {},
        appliedFilterOptions: {},
      };

      const action = {
        intent: LOAD_SUPPLIER_RETURN_LIST,
        supplierFilters: [
          {
            name: 'All suppliers',
            value: 'All',
          },
          {
            name: 'Phoenix',
            value: 'phx',
          },
        ],
      };

      const expected = {
        filterOptions: {},
        appliedFilterOptions: {},
        supplierFilterOptions: [
          {
            displayName: 'All suppliers',
            id: 'All',
          },
          {
            displayName: 'Phoenix',
            id: 'phx',
          },
        ],
      };

      const actual = supplierReturnListReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
