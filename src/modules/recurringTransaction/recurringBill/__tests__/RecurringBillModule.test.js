import {
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_NEW_RECURRING_BILL,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  SET_ABN_LOADING_STATE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILL_HEADER_OPTIONS,
  UPDATE_BILL_LAYOUT,
  UPDATE_BILL_SUPPLIER_OPTIONS,
} from '../RecurringBillIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import RecurringBillModule from '../RecurringBillModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createRecurringBillDispatcher from '../createRecurringBillDispatcher';
import createRecurringBillIntegrator from '../createRecurringBillIntegrator';
import recurringBillReducer from '../reducer/RecurringBillReducer';

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
  const featureToggles = { isRecurringTransactionEnabled: true };
  const navigateTo = jest.fn();
  const integration = new TestIntegration();

  const module = new RecurringBillModule({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    featureToggles,
    navigateTo,
  });
  const store = new TestStore(recurringBillReducer);
  module.store = store;
  module.dispatcher = createRecurringBillDispatcher(store);
  module.integrator = createRecurringBillIntegrator(store, integration);

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
  // when this set up is created for an existing bill
  module.run({
    recurringTransactionId: isCreating ? 'new' : 'recurringTransactionId',
    businessId: 'bizId',
    region: 'au',
  });

  if (isPageEdited) {
    module.updateBillHeaderOption({ key: 'option', value: 'A' });
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

describe('RecurringBillModule', () => {
  mockCreateObjectUrl();

  describe('run', () => {
    it('should successfully load new', () => {
      const recurringTransactionId = 'new';

      const { module, integration, store } = setUp();

      const context = {
        recurringTransactionId,
        businessId: '🐷',
        region: 'au',
      };
      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { ...context, isRecurringTransactionEnabled: true },
        },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_RECURRING_BILL }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_NEW_RECURRING_BILL }),
        ])
      );
    });

    it('should successfully load existing', () => {
      const recurringTransactionId = '🔑';

      const { module, integration, store } = setUp();

      const context = {
        recurringTransactionId,
        businessId: '🐷',
        region: 'au',
      };
      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: { ...context, isRecurringTransactionEnabled: true },
        },
        { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({ intent: LOAD_RECURRING_BILL }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
      expect(integration.getRequests()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ intent: LOAD_RECURRING_BILL }),
          expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
        ])
      );
    });

    [
      {
        name: 'load new',
        recurringTransactionId: 'new',
        requestIntent: LOAD_NEW_RECURRING_BILL,
      },
      {
        name: 'load existing',
        recurringTransactionId: '🔑',
        requestIntent: LOAD_RECURRING_BILL,
      },
    ].forEach((test) => {
      it(`should fail to ${test.name}`, () => {
        const { module, integration, store } = setUp();
        integration.mapFailure(test.requestIntent);

        const context = {
          recurringTransactionId: test.recurringTransactionId,
          businessId: '🐷',
          region: 'au',
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context: { ...context, isRecurringTransactionEnabled: true },
          },
          { intent: SET_LOADING_STATE, loadingState: LoadingState.LOADING },
          {
            intent: SET_LOADING_STATE,
            loadingState: LoadingState.LOADING_FAIL,
          },
        ]);
        expect(integration.getRequests()).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ intent: test.requestIntent }),
          ])
        );
      });
    });
  });

  describe('updateBillHeaderOption', () => {
    it('updates key with value', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updateBillHeaderOption({
        key: 'expirationTerm',
        value: 'COD',
      });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_BILL_HEADER_OPTIONS,
          key: 'expirationTerm',
          value: 'COD',
        },
      ]);
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

        module.updateBillHeaderOption({ key, value });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_HEADER_OPTIONS,
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
    ].forEach((test) => {
      it(`does not call the tax calculator if key is ${test.key} and table is empty`, () => {
        const { module, store } = setUpWithRun({ isCreating: true });

        module.updateBillHeaderOption({ key: test.key, value: test.value });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_HEADER_OPTIONS,
            key: test.key,
            value: test.value,
          },
        ]);
      });
    });
  });

  describe('updateBillSupplierOptions', () => {
    it('loads supplier detail', () => {
      const { module, integration, store } = setUpWithRun();
      const item = { id: '2', displayName: 'Mark Spencer', isReportable: true };

      module.updateBillSupplierOptions({ item });

      expect(store.getActions()).toEqual([
        { intent: UPDATE_BILL_SUPPLIER_OPTIONS, item },
        { intent: SET_SUBMITTING_STATE, isSubmitting: true },
        { intent: SET_SUBMITTING_STATE, isSubmitting: false },
        expect.objectContaining({
          intent: LOAD_SUPPLIER,
        }),
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: true },
        { intent: SET_ABN_LOADING_STATE, isAbnLoading: false },
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_SUPPLIER }),
        expect.objectContaining({ intent: LOAD_ABN_FROM_SUPPLIER }),
      ]);
    });

    it('do not loads supplier detail if user clears supplier', () => {
      const { module, integration, store } = setUpWithRun();

      module.updateBillSupplierOptions({});

      expect(store.getActions()).toEqual([
        { intent: UPDATE_BILL_SUPPLIER_OPTIONS },
      ]);

      expect(integration.getRequests().length).toEqual(0);
    });
  });

  describe('updateLayout', () => {
    it('updates the layout of the recurring bill', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updateBillLayout({ value: 'itemAndService' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_BILL_LAYOUT,
          value: 'itemAndService',
        },
      ]);
    });

    it('calls the tax calculator after updating layout if table has lines', () => {
      const { module, store } = setUpWithRun();

      module.updateBillLayout({ value: 'itemAndService' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_BILL_LAYOUT,
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
});
