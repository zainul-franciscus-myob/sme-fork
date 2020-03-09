import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  SET_ALERT,
  SET_SUBMITTING_STATE,
} from '../../SpendMoneyIntents';
import { setupWithNew } from './SpendMoneyDetailModule.test';

describe('SpendMoneyDetailModule_QuickAddModals', () => {
  describe('loadAccountAfterCreate', () => {
    it('should load the created account from the modal and trigger the given onChange', () => {
      const { module, store, integration } = setupWithNew();

      const onChange = jest.fn();
      module.loadAccountAfterCreate({
        message: 'well done',
        id: '123',
      }, onChange);

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
        },
      ]);

      expect(onChange).toHaveBeenCalled();
    });

    it('should not be submitting if we cannot load the created account', () => {
      const { module, store, integration } = setupWithNew();

      const onChange = jest.fn();
      integration.mapFailure(LOAD_ACCOUNT_AFTER_CREATE);
      module.loadAccountAfterCreate({
        message: 'well done',
        id: '123',
      }, onChange);

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
        },
      ]);
    });
  });

  describe('loadContactAfterCreate', () => {
    it('should load the created contact from the modal', () => {
      const { module, store, integration } = setupWithNew();

      module.loadContactAfterCreate({
        message: 'well done',
        id: '123',
      });

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
          intent: LOAD_CONTACT_AFTER_CREATE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_CONTACT_AFTER_CREATE,
        },
      ]);
    });

    it('should not be submitting if we cannot load the created contact', () => {
      const { module, store, integration } = setupWithNew();

      integration.mapFailure(LOAD_CONTACT_AFTER_CREATE);
      module.loadContactAfterCreate({
        message: 'well done',
        id: '123',
      });

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
          intent: LOAD_CONTACT_AFTER_CREATE,
        },
      ]);
    });
  });
});
