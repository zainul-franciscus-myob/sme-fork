import { SET_INITIAL_STATE } from '../../../SystemIntents';
import reducer, { getDefaultState } from '../contactModalReducer';

describe('contactModalReducer', () => {
  describe('setInitialState', () => {
    it('should set required context', () => {
      const state = getDefaultState();
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 'businessId',
          region: 'region',
        },
      };

      const actual = reducer(state, action);

      expect(actual.businessId).toEqual('businessId');
      expect(actual.region).toEqual('region');
    });

    it('should show contact type if contact type is not provided', () => {
      const state = getDefaultState();
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 'businessId',
          region: 'region',
          contactType: undefined,
        },
      };

      const actual = reducer(state, action);

      expect(actual.showContactType).toBeTruthy();
      expect(actual.contact.contactType).toEqual(getDefaultState().contact.contactType);
    });

    it('should not show contact type if contact type is provided', () => {
      const state = getDefaultState();
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 'businessId',
          region: 'region',
          contactType: 'Customer',
        },
      };

      const actual = reducer(state, action);

      expect(actual.showContactType).toBeFalsy();
      expect(actual.contact.contactType).toEqual('Customer');
    });
  });
});
