import { LOAD_USER_LIST, SORT_USER_LIST } from '../../UserIntents';
import userListReducer from '../userListReducer';

describe('userDetailReducer', () => {
  const reducer = userListReducer;

  describe('LOAD_USER_LIST', () => {
    const state = {
      entries: [],
      sortOrder: 'asc',
      orderBy: 'UserName',
    };

    const entries = [
      {
        id: '1',
        name: 'Zoey',
        email: 'atom@myobtest.com',
        status: 'Active since 24 Jan 2020',
        type: 'Owner',
      },
      {
        id: '2',
        name: 'Tina',
        email: 'zero@myobtest.com',
        status: 'Declined invitation',
        type: 'Online admin',
      },
      {
        id: '3',
        name: 'Karen',
        email: 'karen@myobtest.com',
        status: 'Invited on 15 Nov 2020',
        type: 'File user',
      },
      {
        id: '4',
        name: 'Martin',
        email: 'martin@myobtest.com',
        status: 'Inactive',
        type: 'Advisor',
      },
    ];

    it('should sort list by default state settings on load of user list', () => {
      const action = {
        intent: LOAD_USER_LIST,
        entries: [...entries],
      };

      const actual = reducer(state, action);

      expect(actual.entries.map((e) => e.id)).toEqual(['3', '4', '2', '1']);
    });

    [
      {
        sortOrder: 'asc',
        orderBy: 'UserName',
        expectedOrder: ['3', '4', '2', '1'],
      },
      {
        sortOrder: 'desc',
        orderBy: 'UserName',
        expectedOrder: ['1', '2', '4', '3'],
      },
      {
        sortOrder: 'asc',
        orderBy: 'Email',
        expectedOrder: ['1', '3', '4', '2'],
      },
      {
        sortOrder: 'desc',
        orderBy: 'Email',
        expectedOrder: ['2', '4', '3', '1'],
      },
      {
        sortOrder: 'asc',
        orderBy: 'Status',
        expectedOrder: ['1', '2', '4', '3'],
      },
      {
        sortOrder: 'desc',
        orderBy: 'Status',
        expectedOrder: ['3', '4', '2', '1'],
      },
      {
        sortOrder: 'asc',
        orderBy: 'Type',
        expectedOrder: ['4', '3', '2', '1'],
      },
      {
        sortOrder: 'desc',
        orderBy: 'Type',
        expectedOrder: ['1', '2', '3', '4'],
      },
    ].forEach((testData) => {
      it('should sort list based on selected sort settings', () => {
        const action = {
          intent: SORT_USER_LIST,
          entries: [...entries],
          sortOrder: testData.sortOrder,
          orderBy: testData.orderBy,
        };

        const actual = reducer(state, action);

        expect(actual.entries.map((e) => e.id)).toEqual(testData.expectedOrder);
      });
    });

    it('should sort list when there are undefined values for the sortBy properties', () => {
      const action = {
        intent: SORT_USER_LIST,
        entries: [
          ...entries,
          {
            id: '5',
            name: undefined,
            email: 'tony@myobtest.com',
            status: 'Inactive',
            type: 'Advisor',
          },
        ],
        sortOrder: 'asc',
        orderBy: 'UserName',
      };

      const actual = reducer(state, action);

      expect(actual.entries.map((e) => e.id)).toEqual([
        '5',
        '3',
        '4',
        '2',
        '1',
      ]);
    });
  });
});
