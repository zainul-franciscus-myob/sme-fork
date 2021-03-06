import {
  CLOSE_MODAL,
  CREATE_BILL,
  CREATE_PRE_CONVERSION_BILL_DETAIL,
  DELETE_BILL,
  DELETE_PRE_CONVERSION_BILL_DETAIL,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_BILL,
  OPEN_ALERT,
  OPEN_MODAL,
  RELOAD_BILL,
  SET_ABN_LOADING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  START_BLOCKING,
  STOP_BLOCKING,
  UPDATE_BILL,
  UPDATE_BILL_ID,
  UPDATE_PRE_CONVERSION_BILL_DETAIL,
} from '../BillIntents';
import {
  DUPLICATE_BILL,
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
} from '../../../../common/types/MessageTypes';
import {
  mockCreateObjectUrl,
  setUp,
  setUpNewBillWithPrefilled,
  setUpWithPreConversion,
  setUpWithRun,
} from './BillModule.test';
import ModalType from '../types/ModalType';
import loadItemAndServiceBill from '../mappings/data/loadItemAndServiceBill.json';

describe('BillModule_SaveCancelDelete', () => {
  mockCreateObjectUrl();

  describe('handleSaveBill', () => {
    const setUpWithClosedBillEdited = () => {
      const { module, store, integration } = setUp();
      integration.overrideMapping(LOAD_BILL, ({ onSuccess }) => {
        onSuccess({
          ...loadItemAndServiceBill,
          bill: {
            ...loadItemAndServiceBill.bill,
            status: 'Closed',
          },
        });
      });

      module.run({ billId: 'billId', businessId: 'bizId', region: 'au' });
      module.updateBillOption({ key: 'option', value: 'A' });

      store.resetActions();
      integration.resetRequests();

      return { module, store, integration };
    };

    it('should open save amount due warning modal', () => {
      const { module, store } = setUpWithClosedBillEdited();

      module.handleSaveBill();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: ModalType.SaveAmountDueWarning,
        },
      ]);
    });
  });

  describe('saveBill', () => {
    it('successfully creates a new bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: UPDATE_BILL_ID, id: '1' },
        { intent: START_BLOCKING },
        expect.objectContaining({ intent: RELOAD_BILL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        {
          intent: OPEN_ALERT,
          type: 'success',
          message: "Success! You've successfully created a new bill.",
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BILL }),
        { intent: LOAD_BILL, urlParams: { businessId: 'bizId', billId: '1' } },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
    });

    it('fails to create a new bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
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
      const { module, store, integration } = setUpWithRun();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: START_BLOCKING },
        expect.objectContaining({ intent: RELOAD_BILL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        {
          intent: OPEN_ALERT,
          type: 'success',
          message: "Great Work! You've done it well!",
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UPDATE_BILL }),
        {
          intent: LOAD_BILL,
          urlParams: { businessId: 'bizId', billId: 'billId' },
        },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
    });

    it('fails to update an existing bill', () => {
      const { module, store, integration } = setUpWithRun();
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
      const { module, store, integration } = setUpWithRun();
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
      module.navigateTo = jest.fn();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BILL }),
        expect.objectContaining({ intent: LINK_IN_TRAY_DOCUMENT }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_BILL,
        content: 'Bill successfully created from document',
      });
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/inTray');
    });

    it('successfully creates a new bill but fails to link bill to document', () => {
      const { module, store, integration } = setUpNewBillWithPrefilled();
      integration.mapFailure(LINK_IN_TRAY_DOCUMENT);
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BILL }),
        expect.objectContaining({ intent: LINK_IN_TRAY_DOCUMENT }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
        content:
          'Bill created, but the document failed to link. Open the bill to link the document again',
      });
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/inTray');
    });

    it('successfully creates a new preconversion bill', () => {
      const { module, store, integration } = setUpWithPreConversion({
        isCreating: true,
      });

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: UPDATE_BILL_ID, id: 'preconversion-id' },
        { intent: START_BLOCKING },
        expect.objectContaining({ intent: RELOAD_BILL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        {
          intent: OPEN_ALERT,
          type: 'success',
          message: "Success! You've successfully created a new bill.",
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_PRE_CONVERSION_BILL_DETAIL }),
        {
          intent: LOAD_BILL,
          urlParams: { businessId: 'bizId', billId: 'preconversion-id' },
        },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
    });

    it('successfully updates an existing preconversion bill', () => {
      const { module, store, integration } = setUpWithPreConversion({
        isCreating: false,
      });

      module.saveBill();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: START_BLOCKING },
        expect.objectContaining({ intent: RELOAD_BILL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        {
          intent: OPEN_ALERT,
          type: 'success',
          message: "Great Work! You've done it well!",
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UPDATE_PRE_CONVERSION_BILL_DETAIL }),
        {
          intent: LOAD_BILL,
          urlParams: { businessId: 'bizId', billId: 'billId' },
        },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
    });
  });

  describe('saveAndCreateNewBill', () => {
    it('successfully saves bill and reloads the module to create another new bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

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

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL })
      );
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill/new');
    });

    it('successfully saves bill and redirects to create a new bill if the user was originally on a create duplicated bill', () => {
      const { module, store, integration } = setUp();
      module.run({
        billId: 'new',
        businessId: 'bizId',
        region: 'au',
      });
      module.popMessages = () => [
        {
          type: DUPLICATE_BILL,
          duplicateId: '????',
        },
      ];
      store.resetActions();
      integration.resetRequests();

      module.navigateTo = jest.fn();
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

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL })
      );
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill/new');
    });

    it('fails to save bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
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
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      integration.mapSuccess(CREATE_BILL, { message: '????', id: '????' });
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

      module.saveAndDuplicateBill();

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

      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_BILL,
        content: '????',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_BILL,
        duplicateId: '????',
      });
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill/new');
    });

    it('successfully updates an existing bill and redirect to the create bill page with prefilled information from the updated bill', () => {
      const { module, store, integration } = setUpWithRun();
      integration.mapSuccess(UPDATE_BILL, { message: '????' });
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

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

      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_BILL,
        content: '????',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_BILL,
        duplicateId: 'billId',
      });
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill/new');
    });

    it('fails to save bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
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
    it('redirects to bill list on new bill', () => {
      const { module } = setUpWithRun({ isCreating: true });
      module.navigateTo = jest.fn();
      module.addBillLine({ id: '2', description: 'hello' });

      module.cancelBill();

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill');
    });

    it('redirects to bill list on existing bill', () => {
      const { module } = setUpWithRun();
      module.navigateTo = jest.fn();
      module.addBillLine({ id: '2', description: 'hello' });

      module.cancelBill();

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill');
    });

    it('redirects to in tray on prefilled bill', () => {
      const { module } = setUpNewBillWithPrefilled();
      module.navigateTo = jest.fn();
      module.addBillLine({ id: '2', description: 'hello' });

      module.cancelBill();

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/inTray');
    });
  });

  describe('deleteBill', () => {
    it('successfully deletes bill', () => {
      const { module, store, integration } = setUpWithRun();
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

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
        expect.objectContaining({ type: SUCCESSFULLY_DELETED_BILL })
      );
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill');
    });

    it('successfully deletes pre conversion bill', () => {
      const { module, store, integration } = setUpWithPreConversion({
        isCreating: false,
      });
      module.pushMessage = jest.fn();
      module.navigateTo = jest.fn();

      module.deleteBill();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: DELETE_PRE_CONVERSION_BILL_DETAIL }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_DELETED_BILL })
      );
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill');
    });
  });
});
