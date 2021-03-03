import {
  getShouldEnableUserType,
  getShouldShowManageMydotUserLink,
  getShowAdvisorRoleAlert,
  getTitle,
  getUserDetails,
  getUserForCreate,
  getUserTypeOptions,
} from '../userDetailSelectors';
import RoleTypes from '../../../../common/types/RoleTypes';

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
        roleIds: [1, 3],
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

  describe('getUserDetails', () => {
    it.each([
      [true, false],
      [false, true],
    ])('showReadOnly', (selected, expected) => {
      const user = {
        isReadOnly: true,
        roles: [{ selected, type: RoleTypes.ADMINISTRATOR }],
      };

      const actual = getUserDetails.resultFunc(user, true, true);

      expect(actual.showReadOnly).toEqual(expected);
    });
    it('filters out unsupported roles', () => {
      const user = {
        roles: [
          { type: RoleTypes.TIME_BILLING },
          { type: RoleTypes.INVENTORY_MANAGEMENT },
          { type: RoleTypes.ADMINISTRATOR },
        ],
      };
      const actual = getUserDetails.resultFunc(user, true, true);

      expect(actual.roles).toEqual([
        {
          type: RoleTypes.ADMINISTRATOR,
        },
      ]);
    });
  });

  describe('getShowAdvisorRoleAlert', () => {
    const defaultState = {
      userId: '1',
      user: {
        isAdvisor: true,
        roles: [
          { type: RoleTypes.INVENTORY_MANAGEMENT, selected: false },
          { type: RoleTypes.ADMINISTRATOR, selected: true },
        ],
      },
    };
    it('returns false on creating user', () => {
      const state = {
        ...defaultState,
        userId: 'new',
      };
      const actual = getShowAdvisorRoleAlert(state);
      expect(actual).toEqual(false);
    });

    it('returns false on editing non-advisor user', () => {
      const state = {
        ...defaultState,
        user: {
          ...defaultState.user,
          isAdvisor: false,
        },
      };
      const actual = getShowAdvisorRoleAlert(state);
      expect(actual).toEqual(false);
    });

    it('returns false on editing advisor user with admin role selected', () => {
      const actual = getShowAdvisorRoleAlert(defaultState);
      expect(actual).toEqual(false);
    });

    it('returns true on editing advisor user with admin role deselected', () => {
      const roles = [
        { type: RoleTypes.INVENTORY_MANAGEMENT, selected: true },
        { type: RoleTypes.ADMINISTRATOR, selected: false },
      ];
      const state = {
        ...defaultState,
        user: {
          ...defaultState.user,
          roles,
        },
      };
      const actual = getShowAdvisorRoleAlert(state);
      expect(actual).toEqual(true);
    });
  });

  describe('getShouldShowManageMydotUserLink', () => {
    const defaultState = {
      userId: '1',
      user: {
        roles: [
          { type: RoleTypes.INVENTORY_MANAGEMENT, selected: false },
          { type: RoleTypes.ADMINISTRATOR, selected: true },
        ],
      },
    };

    it('returns false on File user', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'FileUser',
        },
      };

      const actual = getShouldShowManageMydotUserLink(state);
      expect(actual).toEqual(false);
    });

    it('returns false on mydot fail', () => {
      const state = {
        ...defaultState,
        currentUser: null,
      };

      const actual = getShouldShowManageMydotUserLink(state);
      expect(actual).toEqual(false);
    });

    it('returns true on Admin User', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'AdminUser',
        },
      };

      const actual = getShouldShowManageMydotUserLink(state);
      expect(actual).toEqual(true);
    });

    it('returns true on Owner', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'Owner',
        },
      };

      const actual = getShouldShowManageMydotUserLink(state);
      expect(actual).toEqual(true);
    });
  });

  describe('getShouldEnableUserType', () => {
    const defaultState = {
      userId: '1',
      user: {
        roles: [
          { type: RoleTypes.INVENTORY_MANAGEMENT, selected: false },
          { type: RoleTypes.ADMINISTRATOR, selected: true },
        ],
      },
    };

    it('returns false if mydot fail(currentUser.onlineUserId is null)', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'FileUser',
        },
      };

      const actual = getShouldEnableUserType(state);
      expect(actual).toEqual(false);
    });

    it('returns false if userType is Owner', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'Owner',
          onlineUserId: 'fake id',
        },
      };

      const actual = getShouldEnableUserType(state);
      expect(actual).toEqual(false);
    });

    it('returns false if current userType is Unknown', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'Unknown',
          onlineUserId: 'fake id',
        },
      };

      const actual = getShouldEnableUserType(state);
      expect(actual).toEqual(false);
    });

    it('returns false if user userType is Unknown', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'Owner',
          onlineUserId: 'fake id',
        },
        user: {
          userType: 'Unknown',
        },
      };

      const actual = getShouldEnableUserType(state);
      expect(actual).toEqual(false);
    });

    it('returns true if current userType is Owner & user userType is FileUser', () => {
      const state = {
        ...defaultState,
        currentUser: {
          userType: 'Owner',
          onlineUserId: 'fake id',
        },
        user: {
          userType: 'FileUser',
        },
      };

      const actual = getShouldEnableUserType(state);
      expect(actual).toEqual(true);
    });

    it('returns true on creating', () => {
      const state = {
        ...defaultState,
        userId: 'new',
        currentUser: {
          userType: 'Owner',
        },
      };

      const actual = getShouldEnableUserType(state);
      expect(actual).toEqual(true);
    });
  });

  describe('getUserTypeOptions', () => {
    const defaultState = {
      userId: '1',
      user: {
        roles: [
          { type: RoleTypes.INVENTORY_MANAGEMENT, selected: false },
          { type: RoleTypes.ADMINISTRATOR, selected: true },
        ],
      },
    };

    const userTypeOptionsForSelect = [
      { name: 'File User', value: 'FileUser' },
      { name: 'Online Admin', value: 'AdminUser' },
    ];

    const userTypeOptionsForDisabled = [
      { value: null, name: '' },
      { name: 'Owner', value: 'Owner' },
    ];

    it('returns userTypeOptionsForSelect when creating user', () => {
      const state = {
        ...defaultState,
        userId: 'new',
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForSelect);
    });

    it('returns userTypeOptionsForSelect when creating advisor', () => {
      const state = {
        ...defaultState,
        userId: 'new-advisor',
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForSelect);
    });

    it('returns userTypeOptionsForSelect when user userType is FileUser', () => {
      const state = {
        ...defaultState,
        currentUser: {
          onlineUserId: 'fake Id',
        },
        user: {
          userType: 'FileUser',
        },
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForSelect);
    });

    it('returns userTypeOptionsForSelect when user userType is AdminUser', () => {
      const state = {
        ...defaultState,
        currentUser: {
          onlineUserId: 'fake Id',
        },
        user: {
          userType: 'AdminUser',
        },
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForSelect);
    });

    it('returns userTypeOptionsForDisabled when user userType is Unknown', () => {
      const state = {
        ...defaultState,
        currentUser: {
          onlineUserId: 'fake Id',
        },
        user: {
          userType: 'Unknown',
        },
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForDisabled);
    });

    it('returns userTypeOptionsForDisabled when user userType is Owner', () => {
      const state = {
        ...defaultState,
        currentUser: {
          onlineUserId: 'fake Id',
        },
        user: {
          userType: 'Owner',
        },
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForDisabled);
    });

    it('returns userTypeOptionsForDisabled when mydot fail', () => {
      const state = {
        ...defaultState,
        currentUser: {},
        user: {
          userType: 'FileUser',
        },
      };

      const actual = getUserTypeOptions(state);
      expect(actual).toEqual(userTypeOptionsForDisabled);
    });
  });
});
