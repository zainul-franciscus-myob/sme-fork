import {
  CREATE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  LOAD_BILL,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  LOAD_SUPPLIER_DETAIL,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  RELOAD_BILL,
  SET_DOCUMENT_LOADING_STATE,
  SET_SHOW_SPLIT_VIEW,
  START_BLOCKING,
  START_LOADING,
  STOP_BLOCKING,
  STOP_LOADING,
  UPDATE_BILL,
  UPDATE_BILL_ID,
  UPDATE_BILL_OPTION,
  UPDATE_LAYOUT,
} from '../BillIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_SAVED_BILL, SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK } from '../types/BillMessageTypes';
import BillModule from '../BillModule';
import InTrayModalModule from '../../../inTray/inTrayModal/InTrayModalModule';
import ModalType from '../types/ModalType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import billReducer from '../reducer/billReducer';
import createBillDispatcher from '../createBillDispatcher';
import createBillIntegrator from '../createBillIntegrator';
import loadItemAndServiceBill from '../mappings/data/loadItemAndServiceBill.json';
import prefillBillFromInTrayResponse from '../mappings/data/prefillBillFromSupplierFeed';

export const mockCreateObjectUrl = () => {
  const { createObjectURL } = URL;
  beforeAll(() => {
    URL.createObjectURL = () => 'http://www.🐀.com';
  });
  afterAll(() => {
    URL.createObjectURL = createObjectURL;
  });
};

export const setUp = () => {
  const setRootView = () => {};
  const pushMessage = () => {};
  const popMessages = () => [];
  const replaceURLParams = () => {};
  const globalCallbacks = {};
  const integration = new TestIntegration();

  const module = new BillModule({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    globalCallbacks,
  });
  const store = new TestStore(billReducer);
  module.store = store;
  module.dispatcher = createBillDispatcher(store);
  module.integrator = createBillIntegrator(store, integration);

  return {
    module,
    store,
    integration,
    pushMessage,
  };
};

export const setUpWithFailDocumentLoad = () => {
  const {
    module,
    integration,
    store,
    pushMessage,
  } = setUp();
  integration.mapFailure(DOWNLOAD_IN_TRAY_DOCUMENT);
  module.inTrayModalModule = new InTrayModalModule({ integration });

  module.run({ billId: 'new', businessId: 'bizId', region: 'au' });

  store.resetActions();
  integration.resetRequests();

  module.openInTrayModal();
  module.inTrayModalModule.onSaveSuccess('🔖');

  store.resetActions();
  integration.resetRequests();
  integration.resetMapping();
  return {
    module,
    integration,
    store,
    pushMessage,
  };
};

export const setUpWithRun = ({ isCreating = false, isPageEdited = false } = {}) => {
  const {
    module,
    integration,
    store,
    pushMessage,
  } = setUp();

  // With the current memory data, there are two lines created
  // when this set up is created for an existing bill
  module.run({ billId: isCreating ? 'new' : 'billId', businessId: 'bizId', region: 'au' });

  if (isPageEdited) {
    module.updateBillOption({ key: 'option', value: 'A' });
  }

  store.resetActions();
  integration.resetRequests();

  return {
    module,
    integration,
    store,
    pushMessage,
  };
};

export const setUpNewBillWithPrefilled = () => {
  const {
    module,
    integration,
    store,
    pushMessage,
  } = setUp();

  module.run({
    billId: 'new',
    businessId: 'bizId',
    region: 'au',
    inTrayDocumentId: '🍟',
    source: 'inTray',
  });

  store.resetActions();
  integration.resetRequests();

  return {
    module,
    integration,
    store,
    pushMessage,
  };
};

describe('BillModule', () => {
  mockCreateObjectUrl();

  describe('run', () => {
    [
      {
        name: 'load new',
        billId: 'new',
        requestIntent: LOAD_NEW_BILL,
      },
      {
        name: 'load existing',
        billId: '🔑',
        requestIntent: LOAD_BILL,
      },
      {
        name: 'load new duplicated',
        billId: 'new',
        duplicatedBillId: '🍉',
        requestIntent: LOAD_NEW_DUPLICATE_BILL,
      },
    ].forEach((test) => {
      it(`should successfully ${test.name}`, () => {
        const { module, integration, store } = setUp();

        const context = {
          billId: test.billId,
          duplicatedBillId: test.duplicatedBillId,
          businessId: '🐷',
          region: 'au',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
          },
          {
            intent: START_LOADING,
          },
          {
            intent: STOP_LOADING,
          },
          expect.objectContaining({
            intent: LOAD_BILL,
          }),
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: test.requestIntent }),
        ]);
      });

      it(`should fail to ${test.name}`, () => {
        const { module, integration, store } = setUp();
        integration.mapFailure(test.requestIntent);

        const context = {
          billId: test.billId,
          duplicatedBillId: test.duplicatedBillId,
          businessId: '🐷',
          region: 'au',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
          },
          {
            intent: START_LOADING,
          },
          {
            intent: FAIL_LOADING,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: test.requestIntent }),
        ]);
      });
    });

    describe('with document', () => {
      const setupWithDocument = () => {
        const { module, integration, store } = setUp();
        integration.overrideMapping(LOAD_BILL, ({ onSuccess }) => {
          onSuccess({
            ...loadItemAndServiceBill,
            attachmentId: '19eb4da0-8c52-4307-9ca7-74bd481f5b99',
          });
        });

        return { module, integration, store };
      };

      it('should successfully load', () => {
        const { module, integration, store } = setupWithDocument();

        const context = {
          billId: '🐀',
          businessId: '🐷',
          region: 'au',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
          },
          {
            intent: START_LOADING,
          },
          {
            intent: STOP_LOADING,
          },
          expect.objectContaining({
            intent: LOAD_BILL,
          }),
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: true,
          },
          {
            intent: DOWNLOAD_IN_TRAY_DOCUMENT,
            inTrayDocumentUrl: 'http://www.🐀.com',
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: LOAD_BILL }),
          expect.objectContaining({
            intent: DOWNLOAD_IN_TRAY_DOCUMENT,
            params: { isAttachment: true },
          }),
        ]);
      });

      it('should fail to load', () => {
        const { module, integration, store } = setupWithDocument();
        integration.mapFailure(DOWNLOAD_IN_TRAY_DOCUMENT);

        const context = {
          billId: '🐀',
          businessId: '🐷',
          region: 'au',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
          },
          {
            intent: START_LOADING,
          },
          {
            intent: STOP_LOADING,
          },
          expect.objectContaining({
            intent: LOAD_BILL,
          }),
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: true,
          },
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: false,
          },
          {
            intent: OPEN_ALERT,
            message: 'fails',
            type: 'danger',
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: LOAD_BILL }),
          expect.objectContaining({ intent: DOWNLOAD_IN_TRAY_DOCUMENT }),
        ]);
      });
    });

    describe('prefill bill', () => {
      const context = {
        billId: 'new',
        businessId: '🐷',
        region: 'au',
        source: 'inTray',
        inTrayDocumentId: '🍟',
      };

      const expectedActionsWithoutPrefillAndTaxCalc = [
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: START_LOADING,
        },
        {
          intent: STOP_LOADING,
        },
        expect.objectContaining({
          intent: LOAD_BILL,
        }),
        {
          intent: SET_SHOW_SPLIT_VIEW,
          showSplitView: true,
        },
        {
          intent: DOWNLOAD_IN_TRAY_DOCUMENT,
          inTrayDocumentUrl: 'http://www.🐀.com',
        },
        {
          intent: SET_DOCUMENT_LOADING_STATE,
          isDocumentLoading: true,
        },
        {
          intent: SET_DOCUMENT_LOADING_STATE,
          isDocumentLoading: false,
        },
      ];

      const expectedIntegrationRequests = [
        expect.objectContaining({ intent: LOAD_NEW_BILL }),
        expect.objectContaining({ intent: DOWNLOAD_IN_TRAY_DOCUMENT }),
        expect.objectContaining({ intent: PREFILL_BILL_FROM_IN_TRAY }),
      ];

      it('should successfully prefill bill from intray and calls tax calculator', () => {
        const { module, integration, store } = setUp();
        module.run(context);

        expect(store.getActions()).toEqual([
          ...expectedActionsWithoutPrefillAndTaxCalc,
          expect.objectContaining({
            intent: PREFILL_BILL_FROM_IN_TRAY,
          }),
          expect.objectContaining({
            intent: GET_TAX_CALCULATIONS,
          }),
        ]);

        expect(integration.getRequests()).toEqual(expectedIntegrationRequests);
      });

      it('should successfully prefill bill from intray and not call tax calculator', () => {
        const { module, integration, store } = setUp();
        integration.overrideMapping(PREFILL_BILL_FROM_IN_TRAY, ({ onSuccess }) => onSuccess({
          ...prefillBillFromInTrayResponse,
          lines: [],
        }));

        module.run(context);

        expect(store.getActions()).toEqual([
          ...expectedActionsWithoutPrefillAndTaxCalc,
          expect.objectContaining({
            intent: PREFILL_BILL_FROM_IN_TRAY,
          }),
        ]);
        expect(integration.getRequests()).toEqual(expectedIntegrationRequests);
      });

      it('should fail to prefill bill from intray', () => {
        const { module, integration, store } = setUp();
        integration.mapFailure(PREFILL_BILL_FROM_IN_TRAY);

        module.run(context);

        expect(store.getActions()).toEqual([
          ...expectedActionsWithoutPrefillAndTaxCalc,
          expect.objectContaining({
            intent: OPEN_ALERT,
            message: 'fails',
            type: 'danger',
          }),
        ]);
        expect(integration.getRequests()).toEqual(expectedIntegrationRequests);
      });

      it('should fail to download document', () => {
        const { module, integration, store } = setUp();
        integration.mapFailure(DOWNLOAD_IN_TRAY_DOCUMENT);

        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
          },
          {
            intent: START_LOADING,
          },
          {
            intent: STOP_LOADING,
          },
          expect.objectContaining({
            intent: LOAD_BILL,
          }),
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: true,
          },
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: false,
          },
          {
            intent: OPEN_ALERT,
            message: 'fails',
            type: 'danger',
          },
          {
            intent: SET_DOCUMENT_LOADING_STATE,
            isDocumentLoading: true,
          },
          {
            intent: SET_DOCUMENT_LOADING_STATE,
            isDocumentLoading: false,
          },
          expect.objectContaining({
            intent: PREFILL_BILL_FROM_IN_TRAY,
          }),
          expect.objectContaining({
            intent: GET_TAX_CALCULATIONS,
          }),
        ]);
        expect(integration.getRequests()).toEqual(expectedIntegrationRequests);
      });
    });
  });

  describe('updateBillOption', () => {
    it('updates key with value', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updateBillOption({ key: 'supplierInvoiceNumber', value: '1' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_BILL_OPTION,
          key: 'supplierInvoiceNumber',
          value: '1',
        },
      ]);
    });

    describe('when update key is supplierId', () => {
      it('loads supplier detail but does not call tax calculator if user is viewing or editing an existing bill', () => {
        const { module, integration, store } = setUpWithRun();

        module.updateBillOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          {
            intent: STOP_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);
      });

      it('loads supplier detail but does not call tax calculator - if the user is creating a new bill but the selected supplier has no associated expense account', () => {
        const { module, integration, store } = setUpWithRun();
        integration.mapSuccess(LOAD_SUPPLIER_DETAIL, {});

        module.updateBillOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          {
            intent: STOP_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);
      });

      it('loads supplier detail and does not call tax calc - if user is creating a new bill and the selected supplier has default expense account - but the table is empty', () => {
        const { module, integration, store } = setUpWithRun({ isCreating: true });

        module.updateBillOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          {
            intent: STOP_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);
      });

      it('loads supplier detail and calls tax calc - if user is creating a new bill and the selected supplier has default expense account - and the table has lines', () => {
        const { module, integration, store } = setUpWithRun({ isCreating: true });
        module.addBillLine({ id: '2', description: 'hello' });
        integration.resetRequests();
        store.resetActions();

        module.updateBillOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          {
            intent: STOP_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          {
            intent: GET_TAX_CALCULATIONS,
            isSwitchingTaxInclusive: false,
            taxCalculations: expect.any(Object),
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
        ]);
      });
    });

    [
      {
        key: 'isTaxInclusive',
        value: true,
        isSwitchingTaxInclusive: true,
      },
      {
        key: 'expenseAccountId',
        value: '1',
        isSwitchingTaxInclusive: false,
      },
    ].forEach(({ key, value, isSwitchingTaxInclusive }) => {
      it(`calls the tax calculator if key is ${key}`, () => {
        const { module, store } = setUpWithRun();

        module.updateBillOption({ key, value });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_OPTION,
            key,
            value,
          },
          {
            intent: GET_TAX_CALCULATIONS,
            isSwitchingTaxInclusive,
            taxCalculations: expect.any(Object),
          },
        ]);
      });
    });

    [
      {
        key: 'isTaxInclusive',
        value: true,
      },
      {
        key: 'expenseAccountId',
        value: '1',
      },
    ].forEach((test) => {
      it(`does not call the tax calculator if key is ${test.key} and table is empty`, () => {
        const { module, store } = setUpWithRun({ isCreating: true });

        module.updateBillOption({ key: test.key, value: test.value });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_OPTION,
            key: test.key,
            value: test.value,
          },
        ]);
      });
    });
  });

  describe('updateLayout', () => {
    it('updates the layout of the bill', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updateLayout({ value: 'itemAndService' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_LAYOUT,
          value: 'itemAndService',
        },
      ]);
    });

    it('calls the tax calculator after updating layout if table has lines', () => {
      const { module, store } = setUpWithRun();

      module.updateLayout({ value: 'itemAndService' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_LAYOUT,
          value: 'itemAndService',
        },
        {
          intent: GET_TAX_CALCULATIONS,
          isSwitchingTaxInclusive: false,
          taxCalculations: expect.any(Object),
        },
      ]);
    });
  });

  describe('splitView', () => {
    describe('downloadDocument', () => {
      it('opens split view and downloads document if document has not been downloaded before', () => {
        const { module, store, integration } = setUpWithFailDocumentLoad();

        const blob = new Blob([], { type: 'application/pdf' });
        integration.mapSuccess(DOWNLOAD_IN_TRAY_DOCUMENT, blob);

        module.downloadDocument();

        expect(store.getActions()).toEqual([
          { intent: SET_SHOW_SPLIT_VIEW, showSplitView: true },
          {
            intent: DOWNLOAD_IN_TRAY_DOCUMENT,
            inTrayDocumentUrl: 'http://www.🐀.com',
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: DOWNLOAD_IN_TRAY_DOCUMENT }),
        ]);
      });

      it('opens split view but does not download document if it has already been downloaded', () => {
        const { module, store } = setUpNewBillWithPrefilled();

        module.downloadDocument();

        expect(store.getActions()).toEqual([
          { intent: SET_SHOW_SPLIT_VIEW, showSplitView: true },
        ]);
      });

      it('closes split view and shows alert if document download fails', () => {
        const { module, store, integration } = setUpWithFailDocumentLoad();

        integration.mapFailure(DOWNLOAD_IN_TRAY_DOCUMENT, { message: 'download failure' });

        module.downloadDocument();

        expect(store.getActions()).toEqual([
          { intent: SET_SHOW_SPLIT_VIEW, showSplitView: true },
          { intent: SET_SHOW_SPLIT_VIEW, showSplitView: false },
          { intent: OPEN_ALERT, type: 'danger', message: 'download failure' },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: DOWNLOAD_IN_TRAY_DOCUMENT }),
        ]);
      });
    });

    describe('closeSplitView', () => {
      it('closes split view', () => {
        const { module, store } = setUpNewBillWithPrefilled();
        store.state.inTrayDocumentUrl = 'url';
        module.downloadDocument();
        store.resetActions();

        module.closeSplitView();

        expect(store.getActions()).toEqual([
          { intent: SET_SHOW_SPLIT_VIEW, showSplitView: false },
        ]);
      });
    });
  });

  [
    {
      name: 'open info alert',
      message: { content: '✌️', type: SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK },
      messageType: 'info',
    },
    {
      name: 'open success alert',
      message: { content: '✌️', type: SUCCESSFULLY_SAVED_BILL },
      messageType: 'success',
    },
  ].forEach((test) => {
    it(`should ${test.name}`, () => {
      const { module, store } = setUp();
      module.popMessages = () => [
        test.message,
      ];
      module.run();

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { intent: OPEN_ALERT, message: '✌️', type: test.messageType },
        ]),
      );
    });
  });

  describe('openExportPdfModalOrSaveAndExportPdf', () => {
    describe('new bill', () => {
      it('create bill, update bill id, update url params, reload bill, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
        module.globalCallbacks.inTrayBillSaved = jest.fn();
        module.replaceURLParams = jest.fn();
        module.pushMessage = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: UPDATE_BILL_ID, id: '1' },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_BILL }),
          { intent: OPEN_MODAL, modalType: ModalType.ExportPdf },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_BILL }),
          { intent: LOAD_BILL, urlParams: { businessId: 'bizId', billId: '1' } },
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
        expect(module.pushMessage).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when create bill failed', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(CREATE_BILL, { message });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: OPEN_ALERT, type: 'danger', message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_BILL }),
        ]);
      });

      it('does not open export pdf modal when reload bill failed', () => {
        const { module, store, integration } = setUpWithRun({ isCreating: true });
        const message = 'Error';
        integration.mapFailure(LOAD_BILL, { message });
        module.globalCallbacks.inTrayBillSaved = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: UPDATE_BILL_ID, id: '1' },
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: OPEN_ALERT, type: 'danger', message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_BILL }),
          expect.objectContaining({ intent: LOAD_BILL }),
        ]);
      });
    });

    describe('existing bill that has been edited', () => {
      it('update bill, reload bill, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        module.globalCallbacks.inTrayBillSaved = jest.fn();
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_BILL }),
          { intent: OPEN_MODAL, modalType: ModalType.ExportPdf },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_BILL }),
          { intent: LOAD_BILL, urlParams: { businessId: 'bizId', billId: 'billId' } },
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update bill failed', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(UPDATE_BILL, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: OPEN_ALERT, type: 'danger', message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_BILL }),
        ]);
      });

      it('does not open export pdf modal when reload bill failed', () => {
        const { module, store, integration } = setUpWithRun({ isPageEdited: true });
        const message = 'Error';
        integration.mapFailure(LOAD_BILL, { message });
        module.globalCallbacks.inTrayBillSaved = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: OPEN_ALERT, type: 'danger', message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_BILL }),
          expect.objectContaining({ intent: LOAD_BILL }),
        ]);
      });
    });

    describe('existing bill that has not been edited', () => {
      it('open export pdf modal', () => {
        const { module, store, integration } = setUpWithRun();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: OPEN_MODAL, modalType: ModalType.ExportPdf },
        ]);
        expect(integration.getRequests().length).toBe(0);
      });
    });
  });
});
