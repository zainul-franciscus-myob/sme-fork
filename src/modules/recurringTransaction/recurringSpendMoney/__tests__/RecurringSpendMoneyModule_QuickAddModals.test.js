import {
  LOAD_ACCOUNT_AFTER_CREATE,
  SET_ALERT,
  SET_SUBMITTING_STATE,
} from '../RecurringSpendMoneyIntents';
import { setupWithNew } from './RecurringSpendMoneyModule.test';

describe('RecurringSpendMoneyModule_QuickAddModals', () => {
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
});
