
import {
  LOAD_CONTACT_LIST_NEXT_PAGE,
} from '../../ContactIntents';
import contactListReducer from '../contactListReducer';

describe('contactListReducer', () => {
  describe('LOAD_CONTACT_LIST_NEXT_PAGE', () => {
    it('does not add a contact entry to list if entry already exists in state', () => {
      const action = {
        intent: LOAD_CONTACT_LIST_NEXT_PAGE,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '2',
            name: 'Tony',
          },
          {
            id: '4',
            name: 'Matias',
          },
        ],
        pagination: {},
      };

      const state = {
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '2',
            name: 'Tony',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
      };
      const expectedEntries = [
        {
          id: '1',
          name: 'Alex',
        },
        {
          id: '2',
          name: 'Tony',
        },
        {
          id: '3',
          name: 'Justin',
        },
        {
          id: '4',
          name: 'Matias',
        },
      ];

      const actual = contactListReducer(state, action);

      expect(actual.entries).toEqual(expectedEntries);
    });
  });
});
