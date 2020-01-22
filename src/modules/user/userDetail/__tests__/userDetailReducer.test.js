import { UPDATE_USER_ROLES } from '../../UserIntents';
import userDetailReducer from '../userDetailReducer';

describe('userDetailReducer', () => {
  const reducer = userDetailReducer;

  describe('UPDATE_USER_ROLES', () => {
    const state = {
      user: {
        isReadOnly: true,
        roles: [
          { id: '1', type: 'Administrator', selected: false },
          { id: '2', type: 'Custom', selected: false },
        ],
      },
    };

    it('should update isReadOnly to false if Administrator is selected', () => {
      const action = { intent: UPDATE_USER_ROLES, key: '1', value: true };

      const actual = reducer(state, action);

      expect(actual.user.isReadOnly).toBeFalsy();
    });

    it('should not update isReadOnly if other role is selected', () => {
      const action = { intent: UPDATE_USER_ROLES, key: '2', value: true };

      const actual = reducer(state, action);

      expect(actual.user.isReadOnly).toBeTruthy();
    });
  });
});
