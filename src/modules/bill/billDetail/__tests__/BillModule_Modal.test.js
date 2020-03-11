import {
  CLOSE_MODAL,
  CREATE_BILL,
  GET_TAX_CALCULATIONS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_AFTER_CREATE,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  SET_ATTACHMENT_ID,
  SET_DOCUMENT_LOADING_STATE,
  SET_IN_TRAY_DOCUMENT_ID,
  START_BLOCKING,
  START_SUPPLIER_BLOCKING,
  STOP_BLOCKING,
  STOP_SUPPLIER_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL,
  UPDATE_BILL_ID,
} from '../BillIntents';
import { CREATE_ACCOUNT_MODAL, LOAD_NEW_ACCOUNT_MODAL } from '../../../account/AccountIntents';
import { CREATE_CONTACT_MODAL, LOAD_CONTACT_MODAL } from '../../../contact/ContactIntents';
import { LOAD_IN_TRAY_MODAL } from '../../../inTray/InTrayIntents';
import { LOAD_NEW_ITEM, SAVE_ITEM } from '../../../inventory/inventoryModal/InventoryModalIntents';
import { SUCCESSFULLY_SAVED_BILL } from '../types/BillMessageTypes';
import { setUpNewBillWithPrefilled, setUpWithExisting, setUpWithNew } from './BillModule.test';
import ModalType from '../types/ModalType';

describe('BillModule_Modal', () => {
  describe('inventory modal', () => {
    it('runs the inventoryModalModule when modal opens', () => {
      const { module } = setUpWithNew();
      module.inventoryModalModule.run = jest.fn();

      module.openInventoryModal();
      expect(module.inventoryModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId', region: 'au', isBuying: true, isSelling: false,
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('saves the newly added item option, calls the line onChange and shows success alert on page when the user successfully saves a newly created item from the inventory modal', () => {
      const { module, store, integration } = setUpWithNew();

      const onChangeItemTableRow = jest.fn();
      module.inventoryModalModule.resetState = jest.fn();
      integration.mapSuccess(SAVE_ITEM, { itemId: 'itemId', message: 'message' });

      module.openInventoryModal(onChangeItemTableRow);
      module.inventoryModalModule.save();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'success', message: 'message' },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        expect.objectContaining({ intent: LOAD_ITEM_OPTION }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        { intent: LOAD_ITEM_OPTION, urlParams: { businessId: 'bizId', itemId: 'itemId' } },
      );

      expect(onChangeItemTableRow).toHaveBeenCalledWith({ id: 'itemId' });
      expect(module.inventoryModalModule.resetState).toHaveBeenCalled();
    });

    it('displays page failure alert when inventory modal fails to load', () => {
      const { module, store, integration } = setUpWithNew();

      module.inventoryModalModule.resetState = jest.fn();
      integration.mapFailure(LOAD_NEW_ITEM, { message: 'failed' });

      module.openInventoryModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'danger', message: 'failed' },
      ]);

      expect(module.inventoryModalModule.resetState).toHaveBeenCalled();
    });
  });

  describe('account modal', () => {
    it('runs the accountModalModule when modal opens', () => {
      const { module } = setUpWithNew();
      module.accountModalModule.run = jest.fn();

      module.openAccountModal();
      expect(module.accountModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId', region: 'au',
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('saves the newly added account, calls the line onChange and shows success alert on page when user successfully saves the newly created account on the account modal', () => {
      const { module, store, integration } = setUpWithNew();

      const onChange = jest.fn();
      module.accountModalModule.close = jest.fn();

      const createAccountSuccessPayload = { id: 'id', message: 'message' };
      integration.mapSuccess(CREATE_ACCOUNT_MODAL, createAccountSuccessPayload);

      const loadAccountAfterCreateSuccessPayload = { id: 'afterId', message: 'afterCreateSuccess' };
      integration.mapSuccess(LOAD_ACCOUNT_AFTER_CREATE, loadAccountAfterCreateSuccessPayload);

      module.openAccountModal(onChange);
      module.accountModalModule.save();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'success', message: 'message' },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        expect.objectContaining({ intent: LOAD_ACCOUNT_AFTER_CREATE }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        { intent: LOAD_ACCOUNT_AFTER_CREATE, urlParams: { businessId: 'bizId', accountId: 'id' } },
      );

      expect(onChange).toHaveBeenCalledWith(loadAccountAfterCreateSuccessPayload);
      expect(module.accountModalModule.close).toHaveBeenCalled();
    });

    it('displays page failure alert when inventory modal fails to load', () => {
      const { module, store, integration } = setUpWithNew();

      module.accountModalModule.close = jest.fn();
      integration.mapFailure(LOAD_NEW_ACCOUNT_MODAL, { message: 'failed' });

      module.openAccountModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'danger', message: 'failed' },
      ]);

      expect(module.accountModalModule.close).toHaveBeenCalled();
    });
  });

  describe('contact modal', () => {
    it('runs the contactModalModule when modal opens', () => {
      const { module } = setUpWithNew();
      module.contactModalModule.run = jest.fn();

      module.openSupplierModal();
      expect(module.contactModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId', region: 'au', contactType: 'Supplier',
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('saves the newly added supplier and shows success alert on page when user successfully saves the newly created supplier on the contact modal', () => {
      const { module, store, integration } = setUpWithNew();

      module.contactModalModule.resetState = jest.fn();

      integration.mapSuccess(CREATE_CONTACT_MODAL, { id: 'supplierId', message: 'message' });

      module.openSupplierModal();
      module.contactModalModule.save();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'success', message: 'message' },
        { intent: START_SUPPLIER_BLOCKING },
        { intent: STOP_SUPPLIER_BLOCKING },
        expect.objectContaining({ intent: LOAD_SUPPLIER_AFTER_CREATE, supplierId: 'supplierId' }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        { intent: LOAD_SUPPLIER_AFTER_CREATE, urlParams: { businessId: 'bizId', supplierId: 'supplierId' } },
      );

      expect(module.contactModalModule.resetState).toHaveBeenCalled();
    });

    it('displays page failure alert when contact modal fails to load', () => {
      const { module, store, integration } = setUpWithNew();

      integration.mapFailure(LOAD_CONTACT_MODAL, { message: 'failed' });

      module.openSupplierModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'danger', message: 'failed' },
      ]);
    });
  });

  describe('in tray modal', () => {
    it('runs the inTrayModalModule when modal opens', () => {
      const { module } = setUpWithNew();
      module.inTrayModalModule.run = jest.fn();

      module.openInTrayModal();
      expect(module.inTrayModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId', region: 'au',
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('prefills bill with in tray data on document link action on in tray modal when creating a new bill', () => {
      const { module, store, integration } = setUpWithNew();
      module.inTrayModalModule.close = jest.fn();

      module.openInTrayModal();
      module.inTrayModalModule.linkInTrayDocument();

      expect(module.inTrayModalModule.close).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_IN_TRAY_DOCUMENT_ID }),
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: false },
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
        expect.objectContaining({ intent: GET_TAX_CALCULATIONS }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
      );
    });

    it('successfully links in tray doc to existing bill and prefills bill with in tray data, on document link action on in tray modal, when updating an existing bill', () => {
      const { module, store, integration } = setUpWithExisting();
      module.inTrayModalModule.close = jest.fn();
      integration.mapSuccess(LINK_IN_TRAY_DOCUMENT, { message: 'link success', attachmentId: 'attachmentId' });

      module.openInTrayModal();
      module.inTrayModalModule.linkInTrayDocument();

      expect(module.inTrayModalModule.close).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_IN_TRAY_DOCUMENT_ID }),
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: OPEN_ALERT, type: 'success', message: 'link success' },
        { intent: SET_ATTACHMENT_ID, attachmentId: 'attachmentId' },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: false },
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
        expect.objectContaining({ intent: GET_TAX_CALCULATIONS }),
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: LINK_IN_TRAY_DOCUMENT }),
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
      );
    });

    it('fails to link in tray doc to existing bill, on document link action on in tray modal', () => {
      const { module, store, integration } = setUpWithExisting();
      module.inTrayModalModule.close = jest.fn();
      integration.mapFailure(LINK_IN_TRAY_DOCUMENT, { message: 'link failure' });

      module.openInTrayModal();
      module.inTrayModalModule.linkInTrayDocument();

      expect(module.inTrayModalModule.close).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_IN_TRAY_DOCUMENT_ID }),
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: false },
        { intent: OPEN_ALERT, type: 'danger', message: 'link failure' },
        { intent: UNLINK_IN_TRAY_DOCUMENT },
      ]);
    });

    it('displays page failure alert when in tray modal fails to load', () => {
      const { module, store, integration } = setUpWithNew();

      integration.mapFailure(LOAD_IN_TRAY_MODAL, { message: 'failed' });

      module.openInTrayModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'danger', message: 'failed' },
      ]);
    });
  });

  describe('unlink in tray document modal', () => {
    it('opens unlink in tray document modal', () => {
      const { module, store } = setUpNewBillWithPrefilled();

      module.openUnlinkDocumentModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.UnlinkDocument },
      ]);
    });

    it('sends request to unlink document for an existing bill', () => {
      const { module, store, integration } = setUpWithExisting();
      store.state.attachmentId = 'attachmentId';

      module.unlinkInTrayDocument();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: false },
        { intent: UNLINK_IN_TRAY_DOCUMENT },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UNLINK_IN_TRAY_DOCUMENT }),
      ]);
    });

    it('does not send request to unlink document but just resets store for a new bill', () => {
      const { module, store } = setUpNewBillWithPrefilled();

      module.unlinkInTrayDocument();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: UNLINK_IN_TRAY_DOCUMENT },
      ]);
    });

    it('shows alert when request to unlink document fails for existing bill', () => {
      const { module, store, integration } = setUpWithExisting();
      store.state.attachmentId = 'attachmentId';
      integration.mapFailure(UNLINK_IN_TRAY_DOCUMENT, { message: 'unlink failure' });

      module.unlinkInTrayDocument();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: false },
        { intent: OPEN_ALERT, type: 'danger', message: 'unlink failure' },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UNLINK_IN_TRAY_DOCUMENT }),
      ]);
    });
  });

  describe('export pdf modal', () => {
    it('opens export pdf modal if opening an existing bill and page is not edited', () => {
      const { module, store } = setUpWithExisting();

      module.openExportPdfModalOrSaveAndExportPdf();

      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.ExportPdf },
      ]);
    });

    it('creates new bill and updates bill id and redirects to read bill page with export modal open', () => {
      const { module, store, integration } = setUpWithNew();
      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();
      integration.mapSuccess(CREATE_BILL, { id: 'id' });

      module.openExportPdfModalOrSaveAndExportPdf();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        { intent: UPDATE_BILL_ID, id: 'id' },
      ]);

      expect(integration.getRequests()).toEqual([
        { intent: CREATE_BILL },
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill/id?openExportPdf=true'));
    });

    it('updates existing bill and redirects to read bill page with export modal open', () => {
      const { module, store, integration } = setUpWithExisting();
      module.addBillLine({ id: 'id', description: 'new line' });
      store.resetActions();

      module.pushMessage = jest.fn();
      module.globalCallbacks.inTrayBillSaved = jest.fn();

      module.openExportPdfModalOrSaveAndExportPdf();

      expect(store.getActions()).toEqual([
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
      ]);

      expect(integration.getRequests()).toEqual([
        { intent: UPDATE_BILL },
      ]);

      expect(module.globalCallbacks.inTrayBillSaved).toHaveBeenCalled();
      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_BILL }),
      );
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill/billId?openExportPdf=true'));
    });
  });

  describe('saveAnd modal', () => {
    it('opens the save and create new modal', () => {
      const { module, store } = setUpWithNew();

      module.openSaveAndModal(ModalType.SaveAndCreateNew);
      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.SaveAndCreateNew },
      ]);
    });

    it('opens the save and duplicate modal', () => {
      const { module, store } = setUpWithNew();

      module.openSaveAndModal(ModalType.SaveAndDuplicate);
      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.SaveAndDuplicate },
      ]);
    });
  });

  describe('cancel modal', () => {
    it('opens cancel modal if page has been edited', () => {
      const { module, store } = setUpWithNew();
      module.addBillLine({ id: '2', description: 'hello' });
      store.resetActions();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.CancelModal },
      ]);
    });

    it('does not open cancel modal and redirects if page has been edited', () => {
      const { module } = setUpWithNew();

      module.openCancelModal();

      expect(window.location.href).toEqual(expect.stringContaining('/#/au/bizId/bill'));
    });
  });
});