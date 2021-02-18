import {
  CREATE_RECURRING_BILL,
  DELETE_RECURRING_BILL,
  SET_ALERT,
  SET_MODAL,
  SET_SUBMITTING_STATE,
  UPDATE_RECURRING_BILL,
} from '../RecurringBillIntents';
import {
  SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
} from '../../../../common/types/MessageTypes';
import { mockCreateObjectUrl, setUpWithRun } from './RecurringBillModule.test';

describe('RecurringBillModule_SaveCancelDelete', () => {
  mockCreateObjectUrl();

  describe('saveRecurringBill', () => {
    it('successfully creates a new recurring bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      module.pushMessage = jest.fn();
      module.redirectToRecurringTransactionList = jest.fn();

      module.saveRecurringBill();

      expect(store.getActions()).toEqual([
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_RECURRING_BILL }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
        content: expect.any(String),
      });
      expect(module.redirectToRecurringTransactionList).toHaveBeenCalled();
    });

    it('fails to create a new recurring bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      integration.mapFailure(CREATE_RECURRING_BILL);

      module.saveRecurringBill();

      expect(store.getActions()).toEqual([
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        { intent: SET_ALERT, alert: { message: 'fails', type: 'danger' } },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_RECURRING_BILL,
        }),
      ]);
    });

    it('successfully updates an existing recurring bill', () => {
      const { module, store, integration } = setUpWithRun();
      module.pushMessage = jest.fn();
      module.redirectToRecurringTransactionList = jest.fn();

      module.saveRecurringBill();

      expect(store.getActions()).toEqual([
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UPDATE_RECURRING_BILL }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
        content: expect.any(String),
      });
      expect(module.redirectToRecurringTransactionList).toHaveBeenCalled();
    });

    it('fails to update an existing recurring bill', () => {
      const { module, store, integration } = setUpWithRun();
      integration.mapFailure(UPDATE_RECURRING_BILL);

      module.saveRecurringBill();

      expect(store.getActions()).toEqual([
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        { intent: SET_ALERT, alert: { message: 'fails', type: 'danger' } },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_RECURRING_BILL,
        }),
      ]);
    });
  });

  describe('cancelRecurringBill', () => {
    it('redirects to recurring transaction list on new recurring bill', () => {
      const { module } = setUpWithRun({ isCreating: true });
      module.navigateTo = jest.fn();
      module.addBillLine({ id: '2', description: 'hello' });

      module.cancelRecurringBill();

      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/bizId/recurringTransaction'
      );
    });

    it('redirects to recurring transaction list on existing recurring bill', () => {
      const { module } = setUpWithRun();
      module.navigateTo = jest.fn();
      module.addBillLine({ id: '2', description: 'hello' });

      module.cancelRecurringBill();

      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/bizId/recurringTransaction'
      );
    });
  });

  describe('deleteRecurringBill', () => {
    it('successfully deletes recurring bill', () => {
      const { module, store, integration } = setUpWithRun();
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

      module.deleteRecurringBill();

      expect(store.getActions()).toEqual([
        { intent: SET_MODAL, modalType: undefined },
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: DELETE_RECURRING_BILL }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
        })
      );
      expect(module.navigateTo).toHaveBeenCalledWith(
        '/#/au/bizId/recurringTransaction'
      );
    });
  });
});
