import {
  CLOSE_MODAL,
  CREATE_PURCHASE_RETURN,
  DELETE_PURCHASE_RETURN,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASE_RETURN,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
} from '../SupplierReturnPurchaseIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_PURCHASE_RETURN,
  SUCCESSFULLY_SAVED_PURCHASE_RETURN,
} from '../../../common/types/MessageTypes';
import SupplierReturnPurchaseModule from '../SupplierReturnPurchaseModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import supplierReturnPurchaseReducer from '../SupplierReturnPurchaseReducer';

describe('SupplierReturnPurchaseModule', () => {
  const setup = () => {
    const store = new TestStore(supplierReturnPurchaseReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};

    const module = new SupplierReturnPurchaseModule({ store, integration, setRootView });
    module.store = store;

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    // @TODO need someone to explain this to me
    module.run({ supplierReturnId: '1' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ supplierReturnId: undefined });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithEditedPage = () => {
    const toolbox = setupWithNew();
    const { store, integration, module } = toolbox;

    module.updatePurchaseOptions({ key: 'description', value: '🤷‍♂️' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        supplierReturnId: '1',
        intent: LOAD_NEW_PURCHASE_RETURN,
      },
      {
        name: 'existing',
        supplierReturnId: undefined,
        intent: LOAD_PURCHASE_RETURN,
      },
    ].forEach((test) => {
      describe(test.name, () => {
        it('successfully loads', () => {
          const { store, integration, module } = setup();

          module.run({ supplierReturnId: test.supplierReturnId });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                supplierReturnId: test.supplierReturnId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              isLoading: true,
            },
            {
              intent: SET_LOADING_STATE,
              isLoading: false,
            },
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });

        it('fails to load', () => {
          const { store, integration, module } = setup();
          integration.mapFailure(test.intent);

          module.run({ supplierReturnId: test.supplierReturnId });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                supplierReturnId: test.supplierReturnId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              isLoading: true,
            },
            {
              intent: SET_LOADING_STATE,
              isLoading: false,
            },
            {
              intent: SET_ALERT,
              alertMessage: 'fails',
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });
      });
    });
  });

  describe('confirmDelete', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { store, module } = toolbox;

      module.confirmBeforeDelete();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: 'delete',
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successfully delete', () => {
      const { store, integration, module } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();
      module.redirectToTransactionList = jest.fn();

      module.confirmDelete();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_PURCHASE_RETURN,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_DELETED_PURCHASE_RETURN,
        content: expect.any(String),
      });
      expect(module.redirectToTransactionList).toHaveBeenCalled();
    });

    it('fails to delete', () => {
      const { store, integration, module } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_PURCHASE_RETURN);

      module.confirmDelete();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_PURCHASE_RETURN,
        }),
      ]);
    });
  });

  describe('createPurchaseReturn', () => {
    it('does nothing when already submitting', () => {
      const { store, integration, module } = setupWithNew();
      module.setSubmittingState(true);
      store.resetActions();

      module.createPurchaseReturn();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('successfully create', () => {
      const { store, integration, module } = setupWithNew();
      module.pushMessage = jest.fn();
      module.redirectToSupplierReturnList = jest.fn();

      module.createPurchaseReturn();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_PURCHASE_RETURN,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_PURCHASE_RETURN,
        content: expect.any(String),
      });
      expect(module.redirectToSupplierReturnList).toHaveBeenCalled();
    });

    it('fails to create', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_PURCHASE_RETURN);

      module.createPurchaseReturn();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_PURCHASE_RETURN,
        }),
      ]);
    });
  });

  describe('saveHandler', () => {
    it('does nothing when not creating', () => {
      const { store, integration, module } = setupWithExisting();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('does nothing when a modal is open', () => {
      const { store, integration, module } = setupWithExisting();
      module.confirmBeforeDelete();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('does nothing when already submitting', () => {
      const { store, integration, module } = setupWithNew();
      module.setSubmittingState(true);
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('successfully create', () => {
      const { store, integration, module } = setupWithNew();
      module.pushMessage = jest.fn();
      module.redirectToSupplierReturnList = jest.fn();

      module.saveHandler();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_PURCHASE_RETURN,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_PURCHASE_RETURN,
        content: expect.any(String),
      });
      expect(module.redirectToSupplierReturnList).toHaveBeenCalled();
    });

    it('fails to create', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_PURCHASE_RETURN);

      module.saveHandler();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_PURCHASE_RETURN,
        }),
      ]);
    });
  });

  describe('confirmBeforeCancel', () => {
    it('redirects when not edited', () => {
      const { store, module } = setupWithNew();
      module.redirectToSupplierReturnList = jest.fn();

      module.confirmBeforeCancel();

      expect(store.getActions()).toEqual([]);
      expect(module.redirectToSupplierReturnList).toHaveBeenCalled();
    });

    it('opens modal when edited', () => {
      const { store, module } = setupWithEditedPage();

      module.confirmBeforeCancel();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: 'cancel',
        },
      ]);
    });
  });
});
