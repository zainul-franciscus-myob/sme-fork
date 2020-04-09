import {
  CLOSE_MODAL,
  CREATE_TRANSFER_MONEY,
  DELETE_TRANSFER_MONEY,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_FORM,
} from '../../TransferMoneyIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../../transferMoneyMessageTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../../ModalType';
import SaveActionType from '../../SaveActionType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import TransferMoneyDetailModule from '../TransferMoneyDetailModule';
import createTransferMoneyDetailDispatcher from '../createTransferMoneyDetailDispatcher';
import createTransferMoneyDetailIntegrator from '../createTransferMoneyDetailIntegrator';
import transferMoneyReducer from '../transferMoneyDetailReducer';

describe('TransferMoneyDetailModule', () => {
  const setup = () => {
    const store = new TestStore(transferMoneyReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};
    const popMessages = () => [];

    const module = new TransferMoneyDetailModule({
      store, integration, setRootView, popMessages, pushMessage,
    });
    module.store = store;
    module.dispatcher = createTransferMoneyDetailDispatcher(store);
    module.integrator = createTransferMoneyDetailIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId: '👋', region: 'au', transferMoneyId: 'new' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({ businessId: '👋', region: 'au', transferMoneyId: '1' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithEditedPage = () => {
    const toolbox = setupWithNew();
    const { module, store } = toolbox;

    module.dispatcher.updateForm({ key: 'referenceId', value: '💩' });

    expect(store.getActions()).toEqual([
      {
        intent: UPDATE_FORM,
        key: 'referenceId',
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
        transferMoneyId: 'new',
        intent: LOAD_NEW_TRANSFER_MONEY,
      },
      {
        name: 'existing',
        transferMoneyId: '1',
        intent: LOAD_TRANSFER_MONEY_DETAIL,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        it('successfully load', () => {
          const { module, store, integration } = setup();

          module.run({ transferMoneyId: test.transferMoneyId });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                transferMoneyId: test.transferMoneyId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            expect.objectContaining({
              intent: test.intent,
            }),
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });

        it('fails to load', () => {
          const { module, store, integration } = setup();
          integration.mapFailure(test.intent);

          module.run({ transferMoneyId: test.transferMoneyId });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                transferMoneyId: test.transferMoneyId,
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
              intent: test.intent,
            }),
          ]);
        });
      });
    });
  });

  describe('deleteTransferMoney', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.DELETE,
            url: '/#/au/👋/transactionList',
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    describe('successfully delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();
      module.redirectToUrl = jest.fn();

      module.deleteTransferMoney();

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
          intent: DELETE_TRANSFER_MONEY,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_DELETED_TRANSFER_MONEY,
        content: expect.any(String),
      });
      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/👋/transactionList');
    });

    describe('fail to delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_TRANSFER_MONEY);

      module.deleteTransferMoney();

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
          intent: SET_ALERT,
          alert: { message: 'fails', type: 'danger' },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_TRANSFER_MONEY,
        }),
      ]);
    });
  });

  // TODO: Test redirection after create for save and save from unsaved modal once
  // Nav spike is done
  describe('handleSaveAction', () => {
    it('successfully create', () => {
      const { module, store, integration } = setupWithNew();
      module.redirectToUrl = jest.fn();
      module.pushMessage = jest.fn();

      module.handleSaveAction();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_TRANSFER_MONEY,
        }),
      ]);
      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/👋/transactionList');
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_TRANSFER_MONEY,
        content: expect.any(String),
      });
    });

    it('fails to create', () => {
      const { module, store, integration } = setupWithNew();
      integration.mapFailure(CREATE_TRANSFER_MONEY);

      module.handleSaveAction();

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
          alert: { message: 'fails', type: 'danger' },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_TRANSFER_MONEY,
        }),
      ]);
    });

    it('fails to create and closes modal if there was a modal opened', () => {
      const { module, store, integration } = setupWithEditedPage();
      integration.mapFailure(CREATE_TRANSFER_MONEY);

      module.handlePageTransition('url'); // open unsaved modal
      store.resetActions();

      module.handleSaveAction();

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
          intent: SET_ALERT,
          alert: { message: 'fails', type: 'danger' },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_TRANSFER_MONEY,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithNew();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.handleSaveAction();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('handleSaveActionAnd', () => {
    [
      {
        action: SaveActionType.SAVE_AND_CREATE_NEW, url: '/#/au/👋/transferMoney/new',
      },
      {
        action: SaveActionType.SAVE_AND_DUPLICATE, url: '/#/au/👋/transferMoney/new?duplicateTransferMoneyId=123',
      },
    ].forEach(({ action, url }) => {
      it(`successfully create when ${action}`, () => {
        const { module, store, integration } = setupWithNew();
        module.redirectToUrl = jest.fn();
        module.pushMessage = jest.fn();

        module.handleSaveAndAction(action);

        expect(store.getActions()).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: CREATE_TRANSFER_MONEY,
          }),
        ]);
        expect(module.redirectToUrl).toHaveBeenCalledWith(url);
        expect(module.pushMessage).toHaveBeenCalledWith({
          type: SUCCESSFULLY_SAVED_TRANSFER_MONEY,
          content: expect.any(String),
        });
      });

      it(`fails to create when ${action}`, () => {
        const { module, store, integration } = setupWithNew();
        integration.mapFailure(CREATE_TRANSFER_MONEY);

        module.handleSaveAndAction(action);

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
            alert: { message: 'fails', type: 'danger' },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: CREATE_TRANSFER_MONEY,
          }),
        ]);
      });

      it(`does nothing when already submitting when ${action}`, () => {
        const { module, store, integration } = setupWithNew();
        module.dispatcher.setSubmittingState(true);
        store.resetActions();

        module.handleSaveAndAction(action);

        expect(store.getActions()).toEqual([]);
        expect(integration.getRequests()).toEqual([]);
      });
    });
  });

  describe('saveHandler', () => {
    // TODO: Test redirect after save once Nav Spike is done
    it('should save when an unsaved modal is open', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.reload = jest.fn();
      module.openUnsavedModal();
      store.resetActions();

      module.saveHandler();
      expect(store.getActions()).not.toEqual([]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_TRANSFER_MONEY,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.dispatcher.setSubmittingState(true);
      module.openUnsavedModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('does nothing when cancel modal', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.openCancelModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('does nothing when delete modal', () => {
      const { module, store, integration } = setupWithNew();
      module.openDeleteModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('does nothing when not creating', () => {
      const { module, store, integration } = setupWithExisting();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('openCancelModal', () => {
    it('opens when page edited', () => {
      const { module, store } = setupWithEditedPage();

      module.openCancelModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.CANCEL,
            url: '/#/au/👋/transactionList',
          },
        },
      ]);
    });

    it('redirects when page not edited', () => {
      const { module, store } = setupWithNew();
      module.redirectToUrl = jest.fn();

      module.openCancelModal();

      expect(store.getActions()).toEqual([]);
      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/au/👋/transactionList');
    });
  });

  describe('handlePageTransition', () => {
    it('redirects to url when not edited', () => {
      const { module } = setupWithNew();
      module.redirectToUrl = jest.fn();

      module.handlePageTransition('🤪');

      expect(module.redirectToUrl).toHaveBeenCalledWith('🤪');
    });

    it('opens unsaved modal when edited', () => {
      const { module, store } = setupWithEditedPage();

      module.handlePageTransition('🤪');

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.UNSAVED,
            url: '🤪',
          },
        },
      ]);
    });
  });
});
