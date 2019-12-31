import {
  LOAD_NEXT_PAGE,
} from '../../InvoiceIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import invoiceListReducer from '../invoiceListReducer';

describe('invoiceListReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    it('uses default settings', () => {
      const actual = invoiceListReducer({}, {
        intent: SET_INITIAL_STATE,
      });

      expect(actual.filterOptions).toEqual({
        dateFrom: expect.any(String),
        dateTo: expect.any(String),
        keywords: '',
        customerId: 'All',
        status: 'All',
      });
      expect(actual.sortOrder).toEqual('desc');
      expect(actual.orderBy).toEqual('DateDue');
    });

    it('uses settings when provided', () => {
      const actual = invoiceListReducer({}, {
        intent: SET_INITIAL_STATE,
        settings: {
          filterOptions: {
            dateFrom: '2020-01-01',
            dateTo: '2021-01-01',
            keywords: '🦒',
            customerId: '1',
            status: 'Open',
          },
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      });

      expect(actual.filterOptions).toEqual({
        dateFrom: '2020-01-01',
        dateTo: '2021-01-01',
        keywords: '🦒',
        customerId: '1',
        status: 'Open',
      });
      expect(actual.sortOrder).toEqual('asc');
      expect(actual.orderBy).toEqual('DisplayId');
    });

    it('uses default sortOrder when not expected', () => {
      const actual = invoiceListReducer({}, {
        intent: SET_INITIAL_STATE,
        settings: {
          sortOrder: '🤷‍♂️',
        },
      });

      expect(actual.sortOrder).toEqual('desc');
    });

    it('uses default orderBy when not expected', () => {
      const actual = invoiceListReducer({}, {
        intent: SET_INITIAL_STATE,
        settings: {
          orderBy: '🤷‍♂️',
        },
      });

      expect(actual.orderBy).toEqual('DateDue');
    });

    it('uses default status when not expected', () => {
      const actual = invoiceListReducer({}, {
        intent: SET_INITIAL_STATE,
        settings: {
          filterOptions: {
            status: '🤷‍♂️',
          },
        },
      });

      expect(actual.filterOptions.status).toEqual('All');
    });
  });

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
