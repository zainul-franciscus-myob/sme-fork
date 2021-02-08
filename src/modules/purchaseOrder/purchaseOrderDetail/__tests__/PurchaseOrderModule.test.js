import {
  CREATE_PURCHASE_ORDER,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_NEW_DUPLICATE_PURCHASE_ORDER,
  LOAD_NEW_PURCHASE_ORDER,
  LOAD_PURCHASE_ORDER,
  LOAD_SUPPLIER_DETAIL,
  OPEN_ALERT,
  OPEN_MODAL,
  RELOAD_PURCHASE_ORDER,
  RELOAD_PURCHASE_ORDER_FAILED,
  RESET_SUPPLIER,
  SAVE_PURCHASE_ORDER_FAILED,
  SET_ABN_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_MODAL_ALERT,
  START_BLOCKING,
  START_LOADING,
  STOP_BLOCKING,
  STOP_LOADING,
  UPDATE_LAYOUT,
  UPDATE_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER_ID,
  UPDATE_PURCHASE_ORDER_OPTION,
} from '../PurchaseOrderIntents';
import {
  DUPLICATE_PURCHASE_ORDER,
  SUCCESSFULLY_SAVED_PURCHASE_ORDER,
  SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK,
} from '../../../../common/types/MessageTypes';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import ModalType from '../types/ModalType';
import PurchaseOrderModule from '../PurchaseOrderModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createPurchaseOrderDispatcher from '../createPurchaseOrderDispatcher';
import createPurchaseOrderIntegrator from '../createPurchaseOrderIntegrator';
import loadServicePurchaseOrder from '../mappings/data/loadServicePurchaseOrder';
import purchaseOrderReducer from '../reducer/purchaseOrderReducer';

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
  const navigateTo = jest.fn();
  const integration = new TestIntegration();
  const featureToggles = { isPurchaseOrderEnabled: false };

  const module = new PurchaseOrderModule({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    navigateTo,
    featureToggles,
  });
  const store = new TestStore(purchaseOrderReducer);
  module.store = store;
  module.dispatcher = createPurchaseOrderDispatcher(store);
  module.integrator = createPurchaseOrderIntegrator(store, integration);

  return {
    module,
    store,
    integration,
    pushMessage,
    navigateTo,
  };
};

export const setUpWithRun = ({
  isCreating = false,
  isPageEdited = false,
} = {}) => {
  const { module, integration, store, pushMessage, navigateTo } = setUp();

  // With the current memory data, there are two lines created
  // when this set up is created for an existing purchaseOrder
  module.run({
    purchaseOrderId: isCreating ? 'new' : 'purchaseOrderId',
    businessId: 'bizId',
    region: 'au',
  });

  if (isPageEdited) {
    module.updatePurchaseOrderOption({ key: 'option', value: 'A' });
  }

  store.resetActions();
  integration.resetRequests();

  return {
    module,
    integration,
    store,
    navigateTo,
    pushMessage,
  };
};

export const setUpWithPreConversion = ({ isCreating = false }) => {
  const { module, integration, store } = setUpWithRun({
    isCreating,
  });

  module.updatePurchaseOrderOption({ kye: 'issueDate', value: '2000-01-01' });
  module.validateIssueDate();
  module.convertToPreConversionPurchaseOrder();

  store.resetActions();
  integration.resetRequests();

  return {
    module,
    integration,
    store,
  };
};

describe('PurchaseOrderModule', () => {
  mockCreateObjectUrl();

  describe('run', () => {
    it('should successfully load new', () => {
      const purchaseOrderId = 'new';

      const { module, integration, store } = setUp();

      const context = {
        purchaseOrderId,
        businessId: '🐷',
        region: 'au',
        recordPurchaseOrderPayment: {
          isElectronicPaymentEnabled: false,
        },
        isPurchaseOrderEnabled: false,
      };
      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: START_LOADING },
        { intent: STOP_LOADING },
        expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_NEW_PURCHASE_ORDER }),
        ])
      );
    });

    it('should successfully load existing', () => {
      const purchaseOrderId = '🔑';

      const { module, integration, store } = setUp();

      const context = {
        purchaseOrderId,
        businessId: '🐷',
        region: 'au',
        recordPurchaseOrderPayment: {
          isElectronicPaymentEnabled: false,
        },
        isPurchaseOrderEnabled: false,
      };
      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: START_LOADING },
        { intent: STOP_LOADING },
        expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ])
      );
    });

    [
      {
        name: 'load new',
        purchaseOrderId: 'new',
        requestIntent: LOAD_NEW_PURCHASE_ORDER,
      },
      {
        name: 'load existing',
        purchaseOrderId: '🔑',
        requestIntent: LOAD_PURCHASE_ORDER,
      },
    ].forEach((test) => {
      it(`should fail to ${test.name}`, () => {
        const { module, integration, store } = setUp();
        integration.mapFailure(test.requestIntent);

        const context = {
          purchaseOrderId: test.purchaseOrderId,
          businessId: '🐷',
          region: 'au',
          recordPurchaseOrderPayment: {
            isElectronicPaymentEnabled: false,
          },
          isPurchaseOrderEnabled: false,
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
        expect(integration.getRequests()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ intent: test.requestIntent }),
          ])
        );
      });
    });

    it('should successfully load duplicate', () => {
      const { module, integration, store } = setUp();
      module.popMessages = () => [
        {
          type: DUPLICATE_PURCHASE_ORDER,
          duplicateId: '🐶',
        },
      ];

      const context = {
        purchaseOrderId: 'new',
        businessId: '🐷',
        region: 'au',
        recordPurchaseOrderPayment: {
          isElectronicPaymentEnabled: false,
        },
        isPurchaseOrderEnabled: false,
      };
      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: SET_DUPLICATE_ID,
          duplicateId: '🐶',
        },
        {
          intent: START_LOADING,
        },
        {
          intent: STOP_LOADING,
        },
        expect.objectContaining({
          intent: LOAD_PURCHASE_ORDER,
        }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_NEW_DUPLICATE_PURCHASE_ORDER,
            urlParams: {
              businessId: '🐷',
              duplicateId: '🐶',
            },
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ])
      );
    });

    it('should fail to load duplicate purchaseOrder', () => {
      const { module, integration, store } = setUp();
      module.popMessages = () => [
        {
          type: DUPLICATE_PURCHASE_ORDER,
          duplicateId: '🐶',
        },
      ];
      integration.mapFailure(LOAD_NEW_DUPLICATE_PURCHASE_ORDER);
      const context = {
        purchaseOrderId: 'new',
        businessId: '🐷',
        region: 'au',
        recordPurchaseOrderPayment: {
          isElectronicPaymentEnabled: false,
        },
        isPurchaseOrderEnabled: false,
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context,
        },
        {
          intent: SET_DUPLICATE_ID,
          duplicateId: '🐶',
        },
        {
          intent: START_LOADING,
        },
        {
          intent: FAIL_LOADING,
        },
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            intent: LOAD_NEW_DUPLICATE_PURCHASE_ORDER,
            urlParams: {
              businessId: '🐷',
              duplicateId: '🐶',
            },
          }),
        ])
      );
    });

    it('displays a success alert on successfully save', () => {
      const { module, store } = setUp();
      module.popMessages = () => [
        {
          type: SUCCESSFULLY_SAVED_PURCHASE_ORDER,
          content: '🥬',
        },
      ];

      const context = {
        purchaseOrderId: 'new',
        businessId: '🐷',
        region: 'au',
      };

      module.run(context);

      expect(store.getActions()).toContainEqual({
        intent: OPEN_ALERT,
        type: 'success',
        message: '🥬',
      });
    });

    it('displays an info alert on successfully save but not link', () => {
      const { module, store } = setUp();
      module.popMessages = () => [
        {
          type: SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK,
          content: '🥬',
        },
      ];

      const context = {
        purchaseOrderId: 'new',
        businessId: '🐷',
        region: 'au',
      };

      module.run(context);

      expect(store.getActions()).toContainEqual({
        intent: OPEN_ALERT,
        type: 'info',
        message: '🥬',
      });
    });
  });

  describe('updatePurchaseOrderOption', () => {
    it('updates key with value', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updatePurchaseOrderOption({
        key: 'supplierPurchaseOrderNumber',
        value: '1',
      });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_PURCHASE_ORDER_OPTION,
          key: 'supplierPurchaseOrderNumber',
          value: '1',
        },
      ]);
    });

    describe('when update key is supplierId', () => {
      it('loads supplier detail but does not call tax calculator if user is viewing or editing an existing purchaseOrder', () => {
        const { module, integration, store } = setUpWithRun();

        module.updatePurchaseOrderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          { intent: RESET_SUPPLIER },
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
      });

      it('loads supplier detail but does not call tax calculator - if the user is creating a new purchaseOrder but the selected supplier has no associated expense account', () => {
        const { module, integration, store } = setUpWithRun();
        integration.mapSuccess(LOAD_SUPPLIER_DETAIL, {});

        module.updatePurchaseOrderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          { intent: RESET_SUPPLIER },
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
      });

      it('loads supplier detail and does not call tax calc - if user is creating a new purchaseOrder and the selected supplier has default expense account - but the table is empty', () => {
        const { module, integration, store } = setUpWithRun({
          isCreating: true,
        });

        module.updatePurchaseOrderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          { intent: RESET_SUPPLIER },
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
      });

      it('loads supplier detail and calls tax calc - if user is creating a new purchaseOrder and the selected supplier has default expense account - and the table has lines', () => {
        const { module, integration, store } = setUpWithRun({
          isCreating: true,
        });
        module.addPurchaseOrderLine({ id: '2', description: 'hello' });
        integration.resetRequests();
        store.resetActions();

        module.updatePurchaseOrderOption({ key: 'supplierId', value: '2' });

        expect(store.getActions()).toEqual([
          { intent: RESET_SUPPLIER },
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
            key: 'supplierId',
            value: '2',
          },
          {
            intent: START_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_SUPPLIER_DETAIL,
          }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
      });

      it('do not loads supplier detail if user clears supplier', () => {
        const { module, integration, store } = setUpWithRun();

        module.updatePurchaseOrderOption({ key: 'supplierId', value: '' });

        expect(store.getActions()).toEqual([
          { intent: RESET_SUPPLIER },
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
            key: 'supplierId',
            value: '',
          },
        ]);

        expect(integration.getRequests().length).toEqual(0);
      });
    });

    [
      {
        key: 'isTaxInclusive',
        value: true,
        isSwitchingTaxInclusive: true,
      },
    ].forEach(({ key, value, isSwitchingTaxInclusive }) => {
      it(`calls the tax calculator if key is ${key}`, () => {
        const { module, store } = setUpWithRun();

        module.updatePurchaseOrderOption({ key, value });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
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
        key: 'expenseAccountId',
        value: '1',
      },
    ].forEach((test) => {
      it(`does not call the tax calculator if key is ${test.key} and table is empty`, () => {
        const { module, store } = setUpWithRun({ isCreating: true });

        module.updatePurchaseOrderOption({ key: test.key, value: test.value });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_PURCHASE_ORDER_OPTION,
            key: test.key,
            value: test.value,
          },
        ]);
      });
    });
  });

  describe('updateLayout', () => {
    it('updates the layout of the purchaseOrder', () => {
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

  [
    {
      name: 'open info alert',
      message: {
        content: '✌️',
        type: SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK,
      },
      messageType: 'info',
    },
    {
      name: 'open success alert',
      message: { content: '✌️', type: SUCCESSFULLY_SAVED_PURCHASE_ORDER },
      messageType: 'success',
    },
  ].forEach((test) => {
    it(`should ${test.name}`, () => {
      const { module, store } = setUp();
      module.popMessages = () => [test.message];
      module.run();

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { intent: OPEN_ALERT, message: '✌️', type: test.messageType },
        ])
      );
    });
  });

  describe('savePurchaseOrder', () => {
    describe('new purchase order', () => {
      it('create purchase order, update purchase order id, update url params, reload purchase order, and show success alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.savePurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          {
            intent: UPDATE_PURCHASE_ORDER_ID,
            id: '1',
          },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_PURCHASE_ORDER }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
          {
            intent: OPEN_ALERT,
            type: 'success',
            message:
              "Success! You've successfully created a new purchase Order.",
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('show danger alert when create purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_PURCHASE_ORDER, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: SAVE_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
        ]);
      });

      it('show danger alert when reload purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_PURCHASE_ORDER, { message });

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          {
            intent: UPDATE_PURCHASE_ORDER_ID,
            id: '1',
          },
          { intent: START_BLOCKING },
          { intent: RELOAD_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        ]);
      });
    });

    describe('existing purchase order', () => {
      it('update purchase order, reload purchase order and show success alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.savePurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_PURCHASE_ORDER }),
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
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('show danger alert when update purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_PURCHASE_ORDER, { message });

        module.savePurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: SAVE_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
        ]);
      });

      it('show danger alert when reload purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_PURCHASE_ORDER, { message });

        module.savePurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          { intent: RELOAD_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        ]);
      });
    });
  });

  describe('openExportPdfModalOrSaveAndExportPdf', () => {
    describe('new purchaseOrder', () => {
      it('create purchaseOrder, update purchaseOrder id, update url params, reload purchaseOrder, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();
        module.pushMessage = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: UPDATE_PURCHASE_ORDER_ID, id: '1' },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_PURCHASE_ORDER }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
          { intent: OPEN_MODAL, modalType: ModalType.EXPORT_PDF },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
          {
            intent: LOAD_PURCHASE_ORDER,
            urlParams: { businessId: 'bizId', purchaseOrderId: '1' },
          },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
        expect(module.pushMessage).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when create purchaseOrder failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_PURCHASE_ORDER, { message });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: SAVE_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
        ]);
      });

      it('does not open export pdf modal when reload purchaseOrder failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_PURCHASE_ORDER, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: UPDATE_PURCHASE_ORDER_ID, id: '1' },
          { intent: START_BLOCKING },
          { intent: RELOAD_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        ]);
      });
    });

    describe('existing purchaseOrder that has been edited', () => {
      it('update purchaseOrder, reload purchaseOrder, open export pdf modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_PURCHASE_ORDER }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
          { intent: OPEN_MODAL, modalType: ModalType.EXPORT_PDF },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
          {
            intent: LOAD_PURCHASE_ORDER,
            urlParams: {
              businessId: 'bizId',
              purchaseOrderId: 'purchaseOrderId',
            },
          },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open export pdf modal when update purchaseOrder failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_PURCHASE_ORDER, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: SAVE_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
        ]);
      });

      it('does not open export pdf modal when reload purchaseOrder failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_PURCHASE_ORDER, { message });

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          { intent: RELOAD_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        ]);
      });
    });

    describe('existing purchaseOrder that has not been edited', () => {
      it('open export pdf modal', () => {
        const { module, store, integration } = setUpWithRun();

        module.openExportPdfModalOrSaveAndExportPdf();

        expect(store.getActions()).toEqual([
          { intent: OPEN_MODAL, modalType: ModalType.EXPORT_PDF },
        ]);
        expect(integration.getRequests().length).toBe(0);
      });
    });

    describe('when click on ConvertToBill button', () => {
      describe('when there are changes', () => {
        it('open unsaved modal', () => {
          const { module, store } = setUpWithRun({
            isPageEdited: true,
          });

          module.convertToBillOrOpenUnsavedModal();

          const expectedUrl = '/#/au/bizId/bill/new?orderId=purchaseOrderId';
          expect(store.getActions()).toEqual([
            {
              intent: OPEN_MODAL,
              modalType: ModalType.UNSAVED,
              redirectUrl: expectedUrl,
            },
          ]);
        });
      });

      describe('when there are no changes', () => {
        it('redirect to bill form', () => {
          const { module, navigateTo } = setUpWithRun();

          module.convertToBillOrOpenUnsavedModal();

          const expectedUrl = '/#/au/bizId/bill/new?orderId=purchaseOrderId';

          expect(navigateTo).toBeCalledWith(expectedUrl);
        });
      });
    });
  });

  describe('saveAndEmailPurchaseOrder', () => {
    describe('new purchase order', () => {
      it('create purchase order, update purchase order id, update url params, reload purchase order, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: UPDATE_PURCHASE_ORDER_ID, id: '1' },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_PURCHASE_ORDER }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
          {
            intent: OPEN_MODAL,
            modalType: ModalType.EMAIL_PURCHASE_ORDER,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message:
                "Success! You've successfully created a new purchase Order.",
            },
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);
        expect(module.replaceURLParams).toHaveBeenCalled();
      });

      it('does not open email modal when create purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(CREATE_PURCHASE_ORDER, { message });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: SAVE_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
        ]);
      });

      it('does not open email modal when reload purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isCreating: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_PURCHASE_ORDER, { message });

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: UPDATE_PURCHASE_ORDER_ID, id: '1' },
          { intent: START_BLOCKING },
          { intent: RELOAD_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: CREATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        ]);
      });
    });

    describe('existing purchase order that has been edited', () => {
      it('update purchase order, reload purchase order, open email modal and show alert inside modal', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        module.replaceURLParams = jest.fn();

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          expect.objectContaining({ intent: RELOAD_PURCHASE_ORDER }),
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
          { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
          {
            intent: OPEN_MODAL,
            modalType: ModalType.EMAIL_PURCHASE_ORDER,
          },
          {
            intent: SET_MODAL_ALERT,
            modalAlert: {
              type: 'success',
              message: "Great Work! You've done it well!",
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ]);

        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });

      it('does not open email modal when update purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(UPDATE_PURCHASE_ORDER, { message });

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: SAVE_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
        ]);
      });

      it('does not open email modal when reload purchase order failed', () => {
        const { module, store, integration } = setUpWithRun({
          isPageEdited: true,
        });
        const message = 'Error';
        integration.mapFailure(LOAD_PURCHASE_ORDER, { message });

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          { intent: START_BLOCKING },
          { intent: STOP_BLOCKING },
          { intent: START_BLOCKING },
          { intent: RELOAD_PURCHASE_ORDER_FAILED, message },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: UPDATE_PURCHASE_ORDER }),
          expect.objectContaining({ intent: LOAD_PURCHASE_ORDER }),
        ]);
      });
    });

    describe('existing purchase order that has not been edited', () => {
      it('should open email modal', () => {
        const { module, store } = setUpWithRun();

        module.replaceURLParams = jest.fn();

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual([
          {
            intent: OPEN_MODAL,
            modalType: ModalType.EMAIL_PURCHASE_ORDER,
          },
        ]);

        expect(module.replaceURLParams).not.toHaveBeenCalled();
      });
    });

    describe('does not have reply email address', () => {
      it('open email settings', () => {
        const { module, store, integration } = setUp();
        integration.mapSuccess(LOAD_PURCHASE_ORDER, {
          ...loadServicePurchaseOrder,
          emailPurchaseOrder: {
            ...loadServicePurchaseOrder.emailPurchaseOrder,
            hasEmailReplyDetails: false,
          },
        });
        module.run({
          purchaseOrderId: 'purchaseOrderId',
          businessId: 'businessId',
          region: 'au',
        });
        store.resetActions();
        integration.resetRequests();

        module.saveAndEmailPurchaseOrder();

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              intent: OPEN_MODAL,
              modalType: ModalType.EMAIL_SETTINGS,
            },
          ])
        );
      });
    });
  });
});
