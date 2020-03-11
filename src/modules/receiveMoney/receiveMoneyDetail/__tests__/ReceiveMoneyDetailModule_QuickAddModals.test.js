import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_SUBMITTING_STATE,
} from '../../ReceiveMoneyIntents';
import { setupWithNew } from './ReceiveMoneyDetailModule.test';

describe('ReceiveMoneyDetailModule_QuickAddModals', () => {
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
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: 'well done',
          },
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
      module.loadAccountAfterCreate({
        message: 'well done',
        id: '123',
      }, onChange);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_ALERT,
          alert: {
            type: 'success',
            message: 'well done',
          },
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
          intent: SET_CONTACT_LOADING_STATE,
          isContactLoading: true,
        },
        {
          intent: SET_CONTACT_LOADING_STATE,
          isContactLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_CONTACT_AFTER_CREATE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_CONTACT_AFTER_CREATE,
          urlParams: { businessId: 'bizId', contactId: '123' },
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
          intent: SET_CONTACT_LOADING_STATE,
          isContactLoading: true,
        },
        {
          intent: SET_CONTACT_LOADING_STATE,
          isContactLoading: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_CONTACT_AFTER_CREATE,
          urlParams: { businessId: 'bizId', contactId: '123' },
        },
      ]);
    });
  });
});
