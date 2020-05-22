import {
  LOAD_JOB_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_JOB_DETAILS,
} from '../../JobIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import jobModalReducer from '../jobModalReducer';

describe('accountDetailReducer', () => {
  const reducer = jobModalReducer;

  describe('UPDATE_JOB_DETAILS', () => {
    it('update a property in job modal state', () => {
      const state = { detail: {} };
      const action = {
        intent: UPDATE_JOB_DETAILS,
        key: 'jobName',
        value: 'newName',
      };

      const actual = reducer(state, action);

      expect(actual.detail.jobName).toEqual('newName');
    });
  });

  describe('LOAD_JOB_MODAL', () => {
    it('initialize job modal state', () => {
      const state = { detail: {} };
      const action = {
        intent: LOAD_JOB_MODAL,
        detail: { jobName: 'name' },
      };

      const actual = reducer(state, action);

      expect(actual.detail.jobName).toEqual('name');
    });

    it('sets initial state', () => {
      const state = { detail: {} };
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          region: 'AU',
          businessId: 'businessId',
        },
      };

      const actual = reducer(state, action);

      expect(actual.isOpen).toEqual(true);
      expect(actual.region).toEqual('AU');
      expect(actual.businessId).toEqual('businessId');
    });

    it('sets loading state', () => {
      const state = { detail: {} };
      const action = {
        intent: SET_LOADING_STATE,
        isLoading: true,
      };

      const actual = reducer(state, action);

      expect(actual.isLoading).toEqual(true);
    });

    it('sets submitting state', () => {
      const state = { detail: {} };
      const action = {
        intent: SET_SUBMITTING_STATE,
        isSubmitting: true,
      };

      const actual = reducer(state, action);

      expect(actual.isSubmitting).toEqual(true);
    });

    it('sets alert message', () => {
      const state = { detail: {} };
      const action = {
        intent: SET_ALERT,
        alertMessage: 'alertMessage',
      };

      const actual = reducer(state, action);

      expect(actual.alertMessage).toEqual('alertMessage');
    });
  });
});
