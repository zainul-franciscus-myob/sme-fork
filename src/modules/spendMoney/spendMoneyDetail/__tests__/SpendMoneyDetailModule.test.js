import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  LOAD_NEW_SPEND_MONEY,
  LOAD_SPEND_MONEY_DETAIL,
  PREFILL_DATA_FROM_IN_TRAY,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SHOW_SPLIT_VIEW,
  SET_SUBMITTING_STATE,
  UPDATE_SPEND_MONEY,
} from '../../SpendMoneyIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../components/ModalType';
import SpendMoneyDetailModule from '../SpendMoneyDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createSpendMoneyDispatcher from '../createSpendMoneyDispatcher';
import createSpendMoneyIntegrator from '../createSpendMoneyIntegrator';
import spendMoneyDetailReducer from '../spendMoneyDetailReducer';

const setup = () => {
  const store = new TestStore(spendMoneyDetailReducer);
  const integration = new TestIntegration();
  const setRootView = () => {};
  const pushMessage = () => {};

  const module = new SpendMoneyDetailModule({ integration, setRootView, pushMessage });
  module.store = store;
  module.dispatcher = createSpendMoneyDispatcher(store);
  module.integrator = createSpendMoneyIntegrator(store, integration);

  return { store, integration, module };
};

// eslint-disable-next-line import/prefer-default-export
export const setupWithNew = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({ spendMoneyId: 'new', businessId: 'bizId' });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

const setUpWithExisting = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({ spendMoneyId: '1' });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

const setUpWithPageEdited = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({ spendMoneyId: '1' });
  module.updateSpendMoneyLine(0, 'accountId', '4');
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

describe('SpendMoneyDetailModule', () => {
  describe('addSpendMoneyLine', () => {
    it('adds a new spend money line', () => {
      const { module, store } = setupWithNew();

      const newlyAddedLine = {
        amount: '10',
      };

      module.addSpendMoneyLine(newlyAddedLine);

      expect(store.getActions()).toEqual([
        {
          intent: ADD_SPEND_MONEY_LINE,
          line: newlyAddedLine,
        },
      ]);
    });
  });

  describe('run', () => {
    it('should fail loading if we cannot load a new spend money', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_NEW_SPEND_MONEY);
      module.run({ spendMoneyId: 'new' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_FAIL,
        },
      ]);
    });

    it('should fail loading if we cannot load an existing spend money', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_SPEND_MONEY_DETAIL);
      module.run({ spendMoneyId: '1' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_FAIL,
        },
      ]);
    });
  });

  describe('prefillSpendMoneyFromInTray', () => {
    it('should display an alert if it fails to prefill', () => {
      const { module, store, integration } = setupWithNew();

      integration.mapFailure(PREFILL_DATA_FROM_IN_TRAY);

      const inTrayDocumentId = '1';
      module.prefillSpendMoneyFromInTray(inTrayDocumentId);

      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);
    });
  });

  describe('saveSpendMoney', () => {
    /*
      Testing onSuccess for create and update spend money
    */
    [
      {
        intent: CREATE_SPEND_MONEY,
        setup: setupWithNew,
      },
      {
        intent: UPDATE_SPEND_MONEY,
        setup: setUpWithExisting,
      },
    ].forEach((test) => {
      it('should save', () => {
        const { module, store, integration } = test.setup();

        module.redirectToUrl = jest.fn();
        module.saveSpendMoney();

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
            intent: test.intent,
          }),
        ]);
      });
    });

    /*
      Testing onFailure for create and update spend money
    */
    [
      {
        intent: CREATE_SPEND_MONEY,
        setup: setupWithNew,
      },
      {
        intent: UPDATE_SPEND_MONEY,
        setup: setUpWithExisting,
      },
    ].forEach((test) => {
      it('should shown an alert if it fails', () => {
        const { module, store, integration } = test.setup();

        integration.mapFailure(test.intent);
        module.saveSpendMoney();

        expect(store.getActions()).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
          expect.objectContaining({
            intent: SET_ALERT,
          }),
        ]);
      });
    });

    it('should do an early return if it\'s already submitting', () => {
      const { module, store, integration } = setUpWithExisting();

      const dontTriggerOnSuccess = () => {};
      integration.overrideMapping(UPDATE_SPEND_MONEY, dontTriggerOnSuccess);

      // Setup: this will trigger an update spend money request, but will not trigger the onSuccess
      // which means that the submitting state will not be set to false
      module.saveSpendMoney();
      store.resetActions();

      module.saveSpendMoney();

      expect(store.getActions()).toEqual([]);
    });
  });

  describe('deleteSpendMoneyTransaction', () => {
    it('should display an alert when it fails to delete a spend money', () => {
      const { module, store, integration } = setUpWithExisting();

      integration.mapFailure(DELETE_SPEND_MONEY);
      module.deleteSpendMoneyTransaction();

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
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);
    });
  });

  describe('openSplitView', () => {
    it('should display an alert if it fails to open a split view', () => {
      const { module, store, integration } = setUpWithExisting();

      integration.mapFailure(DOWNLOAD_IN_TRAY_DOCUMENT);
      module.openSplitView();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SHOW_SPLIT_VIEW,
          showSplitView: true,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);
    });
  });

  describe('saveHandler', () => {
    [
      {
        type: ModalType.CANCEL,
        setup: (module) => {
          module.openCancelModal();
        },
      },
      {
        type: ModalType.DELETE,
        setup: (module) => {
          module.openDeleteModal();
        },
      },
      {
        type: ModalType.DELETE_ATTACHMENT,
        setup: (module, integration) => {
          module.addAttachments([
            {
              name: 'some-file',
              size: 1,
            },
          ]);

          module.openDeleteAttachmentModal(0);
          integration.resetRequests();
        },
      },
      {
        type: 'account quick add',
        setup: (module, integration) => {
          const onChange = () => {};
          module.openAccountModal(onChange);
          integration.resetRequests();
        },
      },
      {
        type: 'contact quick add',
        setup: (module, integration) => {
          module.openContactModal();
          integration.resetRequests();
        },
      },
    ].forEach((test) => {
      it(`should not save a spend money given the modal type ${test.type}`, () => {
        const { module, integration } = setUpWithPageEdited();

        test.setup(module, integration);
        module.saveHandler();

        const toNotContain = (array, i) => array.find(({ intent }) => intent === i) !== undefined;
        const hasUpdateSpendMoneyIntent = toNotContain(
          integration.getRequests(), UPDATE_SPEND_MONEY,
        );

        expect(hasUpdateSpendMoneyIntent).toEqual(false);
      });
    });

    it('should save a spend money given an unsaved modal is open', () => {
      const { module, integration } = setUpWithExisting();

      module.openUnsavedModal('some-url');
      module.redirectToUrl = jest.fn();
      module.saveHandler();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_SPEND_MONEY,
        }),
      ]);
    });
  });
});
