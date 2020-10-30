import {
  LOAD_ACCOUNT_AFTER_CREATE,
  SET_ALERT,
  SET_CREATED_ACCOUNT_LOADING_STATE,
} from '../../GeneralJournalIntents';
import { setupWithNew } from './GeneralJournalDetailModule.test';

describe('GeneralJournalDetailModule_QuickAddModal', () => {
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
          intent: SET_CREATED_ACCOUNT_LOADING_STATE,
          isCreatedAccountLoading: true,
        },
        {
          intent: SET_CREATED_ACCOUNT_LOADING_STATE,
          isCreatedAccountLoading: false,
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

    it('should stop loading if integration request fails', () => {
      const { module, store } = setupWithNew();

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
          intent: SET_CREATED_ACCOUNT_LOADING_STATE,
          isCreatedAccountLoading: true,
        },
        {
          intent: SET_CREATED_ACCOUNT_LOADING_STATE,
          isCreatedAccountLoading: false,
        },
        expect.objectContaining({
          intent: LOAD_ACCOUNT_AFTER_CREATE,
        }),
      ]);
    });
  });
});
