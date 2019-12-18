import { getTitle, getUserForCreate } from '../userDetailSelectors';

describe('User Detail Selectors', () => {
  describe('getUserForCreate', () => {
    it('Constructs the expected BFF payload', () => {
      const state = {
        user: {
          userName: 'rivneg',
          email: 'riveng@myob.com',
          isAdvisor: false,
          isAdmin: false,
          roles: [
            {
              id: '1',
              name: 'Accountant/BookKeeper',
              selected: true,
            },
            {
              id: '2',
              name: 'Administrator',
              selected: false,
            },
            {
              id: '3',
              name: 'Banking',
              selected: true,
            },
          ],
        },
      };
      const expected = {
        userName: 'rivneg',
        email: 'riveng@myob.com',
        isAdvisor: false,
        isAdmin: false,
        roleIds: [
          1,
          3,
        ],
      };
      const actual = getUserForCreate(state);

      expect(expected).toEqual(actual);
    });

    it('Constructs an empty roleIds array where no roles are specified', () => {
      const state = {
        user: {
          userName: 'rivneg',
          email: 'riveng@myob.com',
          isAdvisor: false,
          isAdmin: false,
          roles: [
            {
              id: '1',
              name: 'Accountant/BookKeeper',
              selected: false,
            },
            {
              id: '2',
              name: 'Administrator',
              selected: false,
            },
            {
              id: '3',
              name: 'Banking',
              selected: false,
            },
          ],
        },
      };
      const expected = {
        userName: 'rivneg',
        email: 'riveng@myob.com',
        isAdvisor: false,
        isAdmin: false,
        roleIds: [],
      };
      const actual = getUserForCreate(state);

      expect(expected).toEqual(actual);
    });
  });

  describe('getTitle', () => {
    it('shows create user when creating a user', () => {
      const state = {
        userId: 'new',
        user: {
          userName: 'rivneg',
          isAdvisor: false,
        },
      };

      const actual = getTitle(state);

      expect(actual).toEqual('Create user');
    });

    it('shows create advisor when creating a advisor', () => {
      const state = {
        userId: 'new-advisor',
        user: {
          userName: 'rivneg',
          isAdvisor: true,
        },
      };

      const actual = getTitle(state);

      expect(actual).toEqual('Create advisor');
    });

    it('shows name when updating', () => {
      const state = {
        userId: '1',
        user: {
          userName: 'rivneg',
        },
      };

      const actual = getTitle(state);

      expect(actual).toEqual('rivneg');
    });
  });
});