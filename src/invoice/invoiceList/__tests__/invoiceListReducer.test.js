import {
  LOAD_NEXT_PAGE,
} from '../../InvoiceIntents';
import invoiceListReducer from '../invoiceListReducer';

describe('invoiceListReducer', () => {
  describe('LOAD_NEXT_PAGE', () => {
    it('does not add a contact entry to list if entry already exists in state', () => {
      const action = {
        intent: LOAD_NEXT_PAGE,
        entries: [
          {
            id: '1',
          },
          {
            id: '2',
          },
          {
            id: '4',
          },
        ],
        pagination: {},
      };

      const state = {
        entries: [
          {
            id: '1',
          },
          {
            id: '2',
          },
          {
            id: '3',
          },
        ],
      };
      const expectedEntries = [
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '3',
        },
        {
          id: '4',
        },
      ];

      const actual = invoiceListReducer(state, action);

      expect(actual.entries).toEqual(expectedEntries);
    });
  });
});
