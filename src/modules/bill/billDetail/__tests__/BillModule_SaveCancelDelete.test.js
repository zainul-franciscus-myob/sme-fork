import {
  CLOSE_MODAL,
  CREATE_BILL,
  DELETE_BILL,
  LINK_IN_TRAY_DOCUMENT,
  OPEN_ALERT,
  SET_UPGRADE_MODAL_SHOWING,
  START_BLOCKING,
  STOP_BLOCKING,
  UPDATE_BILL,
  UPDATE_BILL_ID,
} from '../BillIntents';
import { SUCCESSFULLY_DELETED_BILL, SUCCESSFULLY_SAVED_BILL, SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK } from '../types/BillMessageTypes';
import {
  mockCreateObjectUrl, setUpNewBillWithPrefilled, setUpWithExisting, setUpWithNew,
} from './BillModule.test';

describe('BillModule_Save', () => {
  mockCreateObjectUrl();

  describe('saveBill', () => {
    it('successfully creates a new bill', () => {
      const { module, store, integration } = setUpWithNew();
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();
      module.finalRedirect = jest.fn();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL,
        }),
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.finalRedirect).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
    });

    it('fails to create a new bill', () => {
      const { module, store, integration } = setUpWithNew();
      integration.mapFailure(CREATE_BILL);

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: OPEN_ALERT, message: 'fails', type: 'danger' },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL,
        }),
      ]);
    });

    it('successfully updates an existing bill', () => {
      const { module, store, integration } = setUpWithExisting();
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();
      module.finalRedirect = jest.fn();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BILL,
        }),
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.finalRedirect).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
    });

    it('fails to update an existing bill', () => {
      const { module, store, integration } = setUpWithExisting();
      integration.mapFailure(UPDATE_BILL);

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: OPEN_ALERT, message: 'fails', type: 'danger' },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BILL,
        }),
      ]);
    });

    it('show upgrade subscription modal and NOT save bill if save response contains monthlyLimit', () => {
      const { module, store, integration } = setUpWithExisting();
      integration.mapSuccess(UPDATE_BILL, { monthlyLimit: 100 });

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        {
          intent: SET_UPGRADE_MODAL_SHOWING,
          isUpgradeModalShowing: true,
          monthlyLimit: 100,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BILL,
        }),
      ]);
    });

    it('successfully creates a new bill and link bill to document', () => {
      const { module, store, integration } = setUpNewBillWithPrefilled();
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();
      module.finalRedirect = jest.fn();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BILL }),
        expect.objectContaining({ intent: LINK_IN_TRAY_DOCUMENT }),
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.finalRedirect).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        {
          type: SUCCESSFULLY_SAVED_BILL,
          content: 'Bill successfully created from document',
        },
      );
    });

    it('successfully creates a new bill but fails to link bill to document', () => {
      const { module, store, integration } = setUpNewBillWithPrefilled();
      integration.mapFailure(LINK_IN_TRAY_DOCUMENT);
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();
      module.finalRedirect = jest.fn();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BILL }),
        expect.objectContaining({ intent: LINK_IN_TRAY_DOCUMENT }),
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.finalRedirect).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        {
          type: SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
          content: 'Bill created, but the document failed to link. Open the bill to link the document again',
        },
      );
    });
  });

  describe('saveAndCreateNewBill', () => {
    it('successfully saves bill and redirect to the create new bill page', () => {
      const { module, store, integration } = setUpWithNew();
      module.globalCallbacks.inTrayBillSaved = jest.fn();
      module.pushMessage = jest.fn();

      module.saveAndCreateNewBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL,
        }),
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill/new'));
    });

    it('fails to save bill', () => {
      const { module, store, integration } = setUpWithNew();
      integration.mapFailure(CREATE_BILL);

      module.saveAndCreateNewBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: OPEN_ALERT, message: 'fails', type: 'danger' },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL,
        }),
      ]);
    });
  });

  describe('saveAndDuplicateBill', () => {
    it('successfully creates a new bill and redirect to the create bill page with prefilled information from the newly created bill', () => {
      const { module, store, integration } = setUpWithNew();
      integration.mapSuccess(CREATE_BILL, { id: 'id' });
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();

      module.saveAndDuplicateBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: UPDATE_BILL_ID, id: 'id' },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill/new?duplicatedBillId=id'));
    });

    it('successfully updates an existing bill and redirect to the create bill page with prefilled information from the updated bill', () => {
      const { module, store, integration } = setUpWithExisting();
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();

      module.saveAndDuplicateBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BILL,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill/new?duplicatedBillId=billId'));
    });

    it('fails to save bill', () => {
      const { module, store, integration } = setUpWithNew();
      integration.mapFailure(CREATE_BILL);

      module.saveAndDuplicateBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: OPEN_ALERT, message: 'fails', type: 'danger' },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BILL,
        }),
      ]);
    });
  });

  describe('cancelBill', () => {
    it('redirects on user confirming cancel', () => {
      const { module } = setUpWithExisting();
      module.addBillLine({ id: '2', description: 'hello' });

      module.openCancelModal();
      module.cancelBill();

      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill'));
    });
  });

  describe('deleteBill', () => {
    it('successfully deletes bill', () => {
      const { module, store, integration } = setUpWithExisting();
      module.pushMessage = jest.fn();

      module.deleteBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: DELETE_BILL }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_DELETED_BILL }),
      );
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill'));
    });
  });
});
