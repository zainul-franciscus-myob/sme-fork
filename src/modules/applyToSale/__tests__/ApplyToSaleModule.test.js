import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
  SET_ALERT_MESSAGE,
  SET_IS_LOADING,
  SET_IS_PAGE_EDITED,
  SET_IS_SUBMITTING,
  SET_MODAL_TYPE,
  UPDATE_APPLY_TO_SALE_OPTION,
} from '../ApplyToSaleIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import ApplyToSaleModule from '../ApplyToSaleModule';
import ModalType from '../ModalType';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import applyToSaleReducer from '../applyToSaleReducer';
import createApplyToSaleDispatcher from '../createApplyToSaleDispatcher';
import createApplyToSaleIntegrator from '../createApplyToSaleIntegrator';

const setup = () => {
  const setRootView = () => {};
  const pushMessage = jest.fn();
  const integration = new TestIntegration();

  const module = new ApplyToSaleModule({
    integration,
    setRootView,
    pushMessage,
  });
  const store = new TestStore(applyToSaleReducer);
  module.store = store;
  module.dispatcher = createApplyToSaleDispatcher(store);
  module.integrator = createApplyToSaleIntegrator(store, integration);

  return {
    store,
    module,
    integration,
    pushMessage,
  };
};

const setupWithNew = () => {
  const { store, module, integration, pushMessage } = setup();
  module.run({
    applyToSaleId: '',
    customerReturnId: '👻',
    businessId: '💩',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return {
    store,
    module,
    integration,
    pushMessage,
  };
};

const setupWithExisting = () => {
  const { store, module, integration, pushMessage } = setup();
  module.run({
    applyToSaleId: '🆔',
    customerReturnId: '👻',
    businessId: '💩',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return {
    store,
    module,
    integration,
    pushMessage,
  };
};

const setupEditedPage = () => {
  const { store, module, integration, pushMessage } = setupWithExisting();
  module.updateApplyToSaleOption({
    key: 'description',
    value: '👀 some description',
  }); // edit page
  integration.resetRequests();
  store.resetActions();

  return {
    store,
    module,
    integration,
    pushMessage,
  };
};

describe('ApplyToSaleModule', () => {
  describe('run', () => {
    it('should successfully load new', () => {
      const { store, module, integration } = setup();
      module.run({ applyToSaleId: '' });

      expect(integration.requests).toEqual([
        expect.objectContaining({ intent: LOAD_NEW_APPLY_TO_SALE }),
      ]);
      expect(store.getActions()).toEqual([
        {
          context: {
            applyToSaleId: '',
          },
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: true,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_NEW_APPLY_TO_SALE }),
      ]);
    });

    it('should fail to load new', () => {
      const { store, module, integration } = setup();
      integration.mapFailure(LOAD_NEW_APPLY_TO_SALE);
      module.run({ applyToSaleId: '' });

      expect(integration.requests).toEqual([
        expect.objectContaining({ intent: LOAD_NEW_APPLY_TO_SALE }),
      ]);
      expect(store.getActions()).toEqual([
        {
          context: {
            applyToSaleId: '',
          },
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: true,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
    });

    it('should successfully load existing', () => {
      const { store, module, integration } = setup();
      module.run({ applyToSaleId: '1' });

      expect(integration.requests).toEqual([
        expect.objectContaining({ intent: LOAD_APPLY_TO_SALE }),
      ]);
      expect(store.getActions()).toEqual([
        {
          context: {
            applyToSaleId: '1',
          },
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: true,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_APPLY_TO_SALE }),
      ]);
    });

    it('should fail to load ', () => {
      const { store, module, integration } = setup();
      integration.mapFailure(LOAD_APPLY_TO_SALE);
      module.run({ applyToSaleId: '1' });

      expect(integration.requests).toEqual([
        expect.objectContaining({ intent: LOAD_APPLY_TO_SALE }),
      ]);
      expect(store.getActions()).toEqual([
        {
          context: {
            applyToSaleId: '1',
          },
          intent: SET_INITIAL_STATE,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: true,
        },
        {
          intent: SET_IS_LOADING,
          isLoading: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
    });
  });

  describe('update ApplyToSale option', () => {
    const { module, store } = setupWithNew();
    module.updateApplyToSaleOption({
      key: 'description',
      value: '👀 some description',
    });

    expect(store.getActions()).toEqual([
      {
        intent: UPDATE_APPLY_TO_SALE_OPTION,
        key: 'description',
        value: '👀 some description',
      },
      {
        intent: SET_IS_PAGE_EDITED,
        isPageEdited: true,
      },
    ]);
  });

  describe('cancel handler', () => {
    it('opens when page is edited', () => {
      const { store, module } = setupEditedPage();
      module.openCancelModal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: ModalType.CANCEL,
        },
      ]);
    });
  });

  describe('save handler', () => {
    it('should do nothing if modal is open', () => {
      const { store, module } = setupEditedPage();
      module.openCancelModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
    });

    it('should do nothing if is already saving', () => {
      const { store, module } = setupEditedPage();
      module.dispatcher.setIsSubmitting(true);
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
    });

    it('save susccessfully', () => {
      const { store, integration, module } = setupEditedPage();
      module.redirectToCustomerReturnList = jest.fn();
      module.saveHandler();

      expect(store.getActions()).toEqual([
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: true,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_APPLY_TO_SALE,
        }),
      ]);
      expect(module.redirectToCustomerReturnList).toHaveBeenCalled();
    });

    it('save failure', () => {
      const { store, integration, module } = setupEditedPage();
      integration.mapFailure(CREATE_APPLY_TO_SALE);

      module.saveHandler();

      expect(store.getActions()).toEqual([
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: true,
        },
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_APPLY_TO_SALE,
        }),
      ]);
    });
  });

  describe('delete handler', () => {
    it('delete successfully', () => {
      const { store, module, integration } = setupEditedPage();
      module.redirectToTransactionList = jest.fn();
      module.openDeleteModal();
      module.deleteApplyToSale();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: ModalType.DELETE,
        },
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: true,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_APPLY_TO_SALE,
        }),
      ]);
      expect(module.redirectToTransactionList).toHaveBeenCalled();
    });

    it('delete failure', () => {
      const { store, module, integration } = setupEditedPage();
      integration.mapFailure(DELETE_APPLY_TO_SALE);
      module.openDeleteModal();
      module.deleteApplyToSale();

      expect(store.getActions()).toEqual([
        {
          intent: SET_MODAL_TYPE,
          modalType: ModalType.DELETE,
        },
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: true,
        },
        {
          intent: SET_IS_SUBMITTING,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_APPLY_TO_SALE,
        }),
      ]);
    });
  });
});
