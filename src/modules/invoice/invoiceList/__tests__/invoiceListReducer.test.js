import {
  LOAD_NEXT_PAGE,
} from '../../InvoiceIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import invoiceListReducer from '../invoiceListReducer';

describe('invoiceListReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    [
      {
        name: 'undefined',
        settings: undefined,
      },
      {
        name: 'different settingsVersion',
        settings: {
          settingsVersion: 'a different version 😭',
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
      },
    ].forEach((test) => {
      it(`uses default settings when settings is ${test.name}`, () => {
        const actual = invoiceListReducer({}, {
          intent: SET_INITIAL_STATE,
          settings: test.settings,
        });

        expect(actual.filterOptions).toEqual({
          dateFrom: expect.any(String),
          dateTo: expect.any(String),
          keywords: '',
          customerId: undefined,
          status: 'All',
        });
        expect(actual.sortOrder).toEqual('desc');
        expect(actual.orderBy).toEqual('DateDue');
      });
    });

    it('uses given settings when settingsVersion are the same', () => {
      const actual = invoiceListReducer({}, {
        intent: SET_INITIAL_STATE,
        settings: {
          settingsVersion: '24264afc-07b6-4993-8aa6-693dd1378d57',
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
      expect(actual.filterOptions).toEqual(actual.appliedFilterOptions);
      expect(actual.sortOrder).toEqual('asc');
      expect(actual.orderBy).toEqual('DisplayId');
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
