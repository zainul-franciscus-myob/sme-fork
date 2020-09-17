import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_JOB_AFTER_CREATE,
  SET_ALERT,
  SET_JOB_LOADING_STATE,
  SET_SUBMITTING_STATE,
} from '../../SpendMoneyIntents';
import { setupWithNew } from './SpendMoneyDetailModule.test';

describe('SpendMoneyDetailModule_QuickAddModals', () => {
  describe('loadAccountAfterCreate', () => {
    it('should load the created account from the modal and trigger the given onChange', () => {
      const { module, store, integration } = setupWithNew();

      const onChange = jest.fn();
      module.loadAccountAfterCreate(
        {
          message: 'well done',
          id: '123',
        },
        onChange
      );

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: 'well done',
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: LOAD_ACCOUNT_AFTER_CREATE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_ACCOUNT_AFTER_CREATE,
          urlParams: { businessId: 'bizId', accountId: '123' },
        },
      ]);

      expect(onChange).toHaveBeenCalled();
    });

    it('should not be submitting if we cannot load the created account', () => {
      const { module, store, integration } = setupWithNew();

      const onChange = jest.fn();
      integration.mapFailure(LOAD_ACCOUNT_AFTER_CREATE);
      module.loadAccountAfterCreate(
        {
          message: 'well done',
          id: '123',
        },
        onChange
      );

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: 'well done',
          },
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_ACCOUNT_AFTER_CREATE,
          urlParams: { businessId: 'bizId', accountId: '123' },
        },
      ]);
    });
  });

  describe('loadJobAfterCreate', () => {
    it('should load the created job from the modal and trigger the given onChange', () => {
      const { module, store, integration } = setupWithNew();

      const onChange = jest.fn();
      module.loadJobAfterCreate(
        {
          message: 'well done',
          id: '123',
        },
        onChange
      );

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: 'well done',
          },
        },
        {
          intent: SET_JOB_LOADING_STATE,
          isJobLoading: true,
        },
        {
          intent: SET_JOB_LOADING_STATE,
          isJobLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_JOB_AFTER_CREATE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_JOB_AFTER_CREATE,
          urlParams: { businessId: 'bizId', jobId: '123' },
        },
      ]);

      expect(onChange).toHaveBeenCalled();
    });

    it('should not be submitting if we cannot load the created job', () => {
      const { module, store, integration } = setupWithNew();

      const onChange = jest.fn();
      integration.mapFailure(LOAD_JOB_AFTER_CREATE);
      module.loadJobAfterCreate(
        {
          message: 'well done',
          id: '123',
        },
        onChange
      );

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: 'well done',
          },
        },
        {
          intent: SET_JOB_LOADING_STATE,
          isJobLoading: true,
        },
        {
          intent: SET_JOB_LOADING_STATE,
          isJobLoading: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_JOB_AFTER_CREATE,
          urlParams: { businessId: 'bizId', jobId: '123' },
        },
      ]);
    });
  });
});
