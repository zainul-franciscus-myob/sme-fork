import {
  CLOSE_MODAL,
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_NEW_INVENTORY_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_INVENTORY_DETAIL,
  UPDATE_ITEM_DETAILS,
} from '../../InventoryIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_ITEM,
  SUCCESSFULLY_SAVED_ITEM,
} from '../../../../common/types/MessageTypes';
import InventoryDetailModule from '../InventoryDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInventoryDetailDispatcher from '../createInventoryDetailDisptacher';
import createInventoryDetailIntegrator from '../createInventoryDetailIntegrator';
import inventoryDetailReducer from '../inventoryDetailReducer';

describe('InventoryDetailModule', () => {
  const setup = () => {
    const store = new TestStore(inventoryDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};

    const module = new InventoryDetailModule({ integration, setRootView });

    module.store = store;
    module.dispatcher = createInventoryDetailDispatcher(store);
    module.integrator = createInventoryDetailIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId: '1', region: 'au', itemId: 'new' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId: '1', region: 'au', itemId: '1' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithEditedPage = () => {
    const toolbox = setupWithNew();
    const { module, store } = toolbox;

    module.dispatcher.updateItemDetails({ key: 'name', value: '💩' });

    expect(store.getActions()).toEqual([
      {
        intent: UPDATE_ITEM_DETAILS,
        key: 'name',
        value: '💩',
      },
    ]);

    store.resetActions();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        itemId: 'new',
        intent: LOAD_NEW_INVENTORY_DETAIL,
      },
      {
        name: 'existing',
        itemId: '1',
        intent: LOAD_INVENTORY_DETAIL,
      },
    ].forEach(({ itemId, intent }) => {
      describe('when new', () => {
        it('successfully load', () => {
          const { module, store, integration } = setup();

          module.run({ itemId });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                itemId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
            expect.objectContaining({
              intent: LOAD_INVENTORY_DETAIL,
            }),
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent,
            }),
          ]);
        });

        it('fails to load', () => {
          const { module, store, integration } = setup();
          integration.mapFailure(intent);

          module.run({ itemId });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                itemId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_FAIL,
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent,
            }),
          ]);
        });
      });
    });
  });

  describe('deleteInventoryDetail', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

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
      const { module, store, integration } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();

      module.deleteInventoryDetail();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_INVENTORY_DETAIL,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_DELETED_ITEM,
        content: expect.any(String),
      });
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/inventory'));
    });

    it('fail to delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_INVENTORY_DETAIL);

      module.deleteInventoryDetail();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_INVENTORY_DETAIL,
        }),
      ]);
    });
  });

  describe('saveHandler', () => {
    it('do nothing when modal open', () => {
      const { module, store, integration } = setupWithExisting();
      module.openDeleteModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    describe('create', () => {
      it('successfully create', () => {
        const { module, store, integration } = setupWithNew();
        module.pushMessage = jest.fn();

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
            intent: CREATE_INVENTORY_DETAIL,
          }),
        ]);
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_ITEM,
          content: expect.any(String),
        });
        expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/inventory'));
      });

      it('fails to create', () => {
        const { module, store, integration } = setupWithNew();
        integration.mapFailure(CREATE_INVENTORY_DETAIL);

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
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: CREATE_INVENTORY_DETAIL,
          }),
        ]);
      });

      it('does nothing when already submitting', () => {
        const { module, store, integration } = setupWithNew();
        module.dispatcher.setSubmittingState(true);
        store.resetActions();

        module.saveHandler();

        expect(store.getActions()).toEqual([]);
        expect(integration.getRequests()).toEqual([]);
      });
    });

    describe('update', () => {
      it('successfully update', () => {
        const { module, store, integration } = setupWithExisting();
        module.pushMessage = jest.fn();

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
            intent: UPDATE_INVENTORY_DETAIL,
          }),
        ]);
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_ITEM,
          content: expect.any(String),
        });
        expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/inventory'));
      });

      it('fails to update', () => {
        const { module, store, integration } = setupWithExisting();
        integration.mapFailure(UPDATE_INVENTORY_DETAIL);

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
            intent: SET_ALERT_MESSAGE,
            alertMessage: 'fails',
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: UPDATE_INVENTORY_DETAIL,
          }),
        ]);
      });

      it('does nothing when already submitting', () => {
        const { module, store, integration } = setupWithExisting();
        module.dispatcher.setSubmittingState(true);
        store.resetActions();

        module.saveHandler();

        expect(store.getActions()).toEqual([]);
        expect(integration.getRequests()).toEqual([]);
      });
    });
  });

  describe('openCancelModal', () => {
    it('opens when page edited', () => {
      const { module, store } = setupWithEditedPage();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modalType: 'cancel',
        },
      ]);
    });

    it('redirects when page not edited', () => {
      const { module, store } = setupWithNew();

      module.openCancelModal();

      expect(store.getActions()).toEqual([]);
      expect(window.location.href).toEqual(expect.stringContaining('/#/au/1/inventory'));
    });
  });
});
