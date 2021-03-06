import {
  CLOSE_MODAL,
  CREATE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GET_TAX_CALCULATIONS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  SET_ABN_LOADING_STATE,
  SET_ATTACHMENT_ID,
  SET_DOCUMENT_LOADING_STATE,
  SET_IN_TRAY_DOCUMENT_ID,
  SET_REDIRECT_URL,
  SET_SHOW_SPLIT_VIEW,
  START_BLOCKING,
  STOP_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
} from '../BillIntents';
import {
  CREATE_ACCOUNT_MODAL,
  LOAD_NEW_ACCOUNT_MODAL,
} from '../../../account/AccountIntents';
import { LOAD_IN_TRAY_MODAL } from '../../../inTray/InTrayIntents';
import {
  mockCreateObjectUrl,
  setUpNewBillWithPrefilled,
  setUpWithRun,
} from './BillModule.test';
import ModalType from '../types/ModalType';

describe('BillModule_Modal', () => {
  mockCreateObjectUrl();

  describe('account modal', () => {
    it('runs the accountModalModule when modal opens', () => {
      const { module } = setUpWithRun({ isCreating: true });
      module.accountModalModule.run = jest.fn();

      module.openAccountModal();
      expect(module.accountModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId',
          region: 'au',
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('saves the newly added account, calls the line onChange and shows success alert on page when user successfully saves the newly created account on the account modal', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });

      const onChange = jest.fn();
      module.accountModalModule.close = jest.fn();

      const createAccountSuccessPayload = { id: 'id', message: 'message' };
      integration.mapSuccess(CREATE_ACCOUNT_MODAL, createAccountSuccessPayload);

      const loadAccountAfterCreateSuccessPayload = {
        id: 'afterId',
        message: 'afterCreateSuccess',
      };
      integration.mapSuccess(
        LOAD_ACCOUNT_AFTER_CREATE,
        loadAccountAfterCreateSuccessPayload
      );

      module.openAccountModal(onChange);
      module.accountModalModule.save();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'success', message: 'message' },
        { intent: START_BLOCKING },
        { intent: STOP_BLOCKING },
        expect.objectContaining({ intent: LOAD_ACCOUNT_AFTER_CREATE }),
      ]);

      expect(integration.getRequests()).toContainEqual({
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        urlParams: { businessId: 'bizId', accountId: 'id' },
      });

      expect(onChange).toHaveBeenCalledWith(
        loadAccountAfterCreateSuccessPayload
      );
      expect(module.accountModalModule.close).toHaveBeenCalled();
    });

    it('displays page failure alert when inventory modal fails to load', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });

      module.accountModalModule.close = jest.fn();
      integration.mapFailure(LOAD_NEW_ACCOUNT_MODAL, { message: 'failed' });

      module.openAccountModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_ALERT, type: 'danger', message: 'failed' },
      ]);

      expect(module.accountModalModule.close).toHaveBeenCalled();
    });
  });

  describe('in tray modal', () => {
    it('runs the inTrayModalModule when modal opens', () => {
      const { module } = setUpWithRun({ isCreating: true });
      module.inTrayModalModule.run = jest.fn();

      module.openInTrayModal();
      expect(module.inTrayModalModule.run).toHaveBeenCalledWith({
        context: {
          businessId: 'bizId',
          region: 'au',
        },
        onSaveSuccess: expect.any(Function),
        onLoadFailure: expect.any(Function),
      });
    });

    it('prefills bill with in tray data on document link action on in tray modal when creating a new bill', () => {
      const { module, store, integration } = setUpWithRun({ isCreating: true });
      module.inTrayModalModule.close = jest.fn();

      module.openInTrayModal();
      module.inTrayModalModule.linkInTrayDocument();

      expect(module.inTrayModalModule.close).toHaveBeenCalled();

      expect(store.getActions()).toEqual([
        expect.objectContaining({ intent: SET_IN_TRAY_DOCUMENT_ID }),
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: true },
        { intent: SET_DOCUMENT_LOADING_STATE, isDocumentLoading: false },
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
        {
          intent: GET_TAX_CALCULATIONS,
          isSwitchingTaxInclusive: false,
          taxCalculations: expect.any(Object),
        },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        { intent: SET_SHOW_SPLIT_VIEW, showSplitView: true },
        {
          inTrayDocumentUrl: 'http://www.????.com',
          intent: DOWNLOAD_IN_TRAY_DOCUMENT,
        },
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER })
      );
    });

    it('successfully links in tray doc to existing bill and prefills bill with in tray data, on document link action on in tray modal, when updating an existing bill', () => {
      const { module, store, integration } = setUpWithRun();
      module.inTrayModalModule.close = jest.fn();
      integration.mapSuccess(LINK_IN_TRAY_DOCUMENT, {
        message: 'link success',
        attachmentId: 'attachmentId',
      });

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
        {
          intent: GET_TAX_CALCULATIONS,
          isSwitchingTaxInclusive: false,
          taxCalculations: expect.any(Object),
        },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        { intent: SET_SHOW_SPLIT_VIEW, showSplitView: true },
        {
          inTrayDocumentUrl: 'http://www.????.com',
          intent: DOWNLOAD_IN_TRAY_DOCUMENT,
        },
      ]);

      expect(integration.getRequests()).toContainEqual(
        expect.objectContaining({ intent: LINK_IN_TRAY_DOCUMENT }),
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER })
      );
    });

    it('fails to link in tray doc to existing bill, on document link action on in tray modal', () => {
      const { module, store, integration } = setUpWithRun();
      module.inTrayModalModule.close = jest.fn();
      integration.mapFailure(LINK_IN_TRAY_DOCUMENT, {
        message: 'link failure',
      });

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
      const { module, store, integration } = setUpWithRun({ isCreating: true });

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
      const { module, store, integration } = setUpWithRun();
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
      const { module, store, integration } = setUpWithRun();
      store.state.attachmentId = 'attachmentId';
      integration.mapFailure(UNLINK_IN_TRAY_DOCUMENT, {
        message: 'unlink failure',
      });

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

  describe('saveAnd modal', () => {
    it('opens the save and create new modal', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.openSaveAndModal(ModalType.SaveAndCreateNew);
      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.SaveAndCreateNew },
      ]);
    });

    it('opens the save and duplicate modal', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.openSaveAndModal(ModalType.SaveAndDuplicate);
      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.SaveAndDuplicate },
      ]);
    });
  });

  describe('cancel modal', () => {
    it('opens cancel modal if page has been edited', () => {
      const { module, store } = setUpWithRun({ isCreating: true });
      module.addBillLine({ id: '2', description: 'hello' });
      store.resetActions();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.CancelModal },
      ]);
    });

    it('open cancel modal when bill prefilled from in tray', () => {
      const { module, store } = setUpNewBillWithPrefilled();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        { intent: OPEN_MODAL, modalType: ModalType.CancelModal },
      ]);
    });

    describe('when page not edited', () => {
      it('redirects to bill list on new bill', () => {
        const { module } = setUpWithRun({ isCreating: true });
        module.navigateTo = jest.fn();

        module.openCancelModal();

        expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill');
      });

      it('redirects to bill list on existing bill', () => {
        const { module } = setUpWithRun();
        module.navigateTo = jest.fn();

        module.openCancelModal();

        expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/bill');
      });
    });
  });

  describe('unsaved modal', () => {
    it('opens unsaved modal if page has been edited', () => {
      const { module, store } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      store.resetActions();

      module.handlePageTransition('/#/foo');

      expect(store.getActions()).toEqual([
        { intent: SET_REDIRECT_URL, redirectUrl: '/#/foo' },
        { intent: OPEN_MODAL, modalType: ModalType.Unsaved },
      ]);
    });

    it('redirect to target url if page not edited ', () => {
      const { module, navigateTo } = setUpWithRun({ isCreating: true });
      module.handlePageTransition('/#/foo');

      expect(navigateTo).toBeCalledWith('/#/foo');
    });

    it('should save and redirect when confirm modal', () => {
      const { module, integration, navigateTo } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      integration.resetRequests();
      module.handlePageTransition('/#/bar');
      module.saveAndRedirect();
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BILL }),
      ]);
      expect(navigateTo).toBeCalledWith('/#/bar');
    });

    it('should redirect without save when click on discard', () => {
      const { module, integration, navigateTo } = setUpWithRun({
        isCreating: true,
        isPageEdited: true,
      });
      integration.resetRequests();
      module.handlePageTransition('/#/bar');
      module.discardAndRedirect();
      expect(integration.getRequests()).toEqual([]);
      expect(navigateTo).toBeCalledWith('/#/bar');
    });
  });
});
