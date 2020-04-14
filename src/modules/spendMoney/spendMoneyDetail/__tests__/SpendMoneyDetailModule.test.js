import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GET_TAX_CALCULATIONS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  LOAD_SUPPLIER_EXPENSE_ACCOUNT,
  PREFILL_DATA_FROM_IN_TRAY,
  RESET_TOTALS,
  SET_ALERT,
  SET_IN_TRAY_DOCUMENT_URL,
  SET_LOADING_STATE,
  SET_SHOW_SPLIT_VIEW,
  SET_SUBMITTING_STATE,
  SET_SUPPLIER_BLOCKING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_SPEND_MONEY,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_ID,
} from '../../SpendMoneyIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SUCCESSFULLY_SAVED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK } from '../../spendMoneyMessageTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../components/ModalType';
import SaveActionType from '../components/SaveActionType';
import SpendMoneyDetailModule from '../SpendMoneyDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createSpendMoneyDispatcher from '../createSpendMoneyDispatcher';
import createSpendMoneyIntegrator from '../createSpendMoneyIntegrator';
import spendMoneyDetailReducer from '../spendMoneyDetailReducer';

const mockCreateObjectUrl = () => {
  const { createObjectURL } = URL;
  beforeAll(() => {
    URL.createObjectURL = () => 'http://www.🐀.com';
  });
  afterAll(() => {
    URL.createObjectURL = createObjectURL;
  });
};

const setup = () => {
  const store = new TestStore(spendMoneyDetailReducer);
  const integration = new TestIntegration();
  const setRootView = () => {};
  const pushMessage = () => {};
  const popMessages = () => [];

  const module = new SpendMoneyDetailModule({
    integration, setRootView, pushMessage, popMessages,
  });
  module.store = store;
  module.dispatcher = createSpendMoneyDispatcher(store);
  module.integrator = createSpendMoneyIntegrator(store, integration);

  return {
    store, integration, module, popMessages,
  };
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

export const setUpWithNewFromInTray = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({ spendMoneyId: 'new', businessId: 'bizId', inTrayDocumentId: 'docId' });
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
  mockCreateObjectUrl();

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
    describe('with in tray document', () => {
      const loadSpendMoneyActions = [
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        expect.objectContaining({
          intent: LOAD_NEW_SPEND_MONEY,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: RESET_TOTALS,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: PREFILL_DATA_FROM_IN_TRAY,
        }),
      ];

      it('successfully load', () => {
        const { store, integration, module } = setup();
        module.run({ spendMoneyId: 'new', inTrayDocumentId: '🍌', businessId: '👺' });

        expect(store.getActions()).toEqual([
          ...loadSpendMoneyActions,
          expect.objectContaining({
            intent: GET_TAX_CALCULATIONS,
          }),
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: true,
          },
          {
            inTrayDocumentUrl: 'http://www.🐀.com',
            intent: SET_IN_TRAY_DOCUMENT_URL,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: LOAD_NEW_SPEND_MONEY }),
          expect.objectContaining({
            intent: PREFILL_DATA_FROM_IN_TRAY,
            urlParams: {
              businessId: '👺',
              inTrayDocumentId: '🍌',
            },
          }),
          expect.objectContaining({
            intent: DOWNLOAD_IN_TRAY_DOCUMENT,
            urlParams: {
              businessId: '👺',
              inTrayDocumentId: '🍌',
            },
          }),
        ]);
      });

      it('fail to download in tray document', () => {
        const { store, integration, module } = setup();
        integration.mapFailure(DOWNLOAD_IN_TRAY_DOCUMENT);
        module.run({ spendMoneyId: 'new', inTrayDocumentId: '🍌', businessId: '👺' });

        expect(store.getActions()).toEqual([
          ...loadSpendMoneyActions,
          expect.objectContaining({
            intent: GET_TAX_CALCULATIONS,
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
            intent: SET_ALERT,
            alert: {
              message: 'fails',
              type: 'danger',
            },
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: LOAD_NEW_SPEND_MONEY }),
          expect.objectContaining({
            intent: PREFILL_DATA_FROM_IN_TRAY,
            urlParams: {
              businessId: '👺',
              inTrayDocumentId: '🍌',
            },
          }),
          expect.objectContaining({
            intent: DOWNLOAD_IN_TRAY_DOCUMENT,
            urlParams: {
              businessId: '👺',
              inTrayDocumentId: '🍌',
            },
          }),
        ]);
      });

      it('fail to prefill in tray document', () => {
        const { store, integration, module } = setup();
        integration.mapFailure(PREFILL_DATA_FROM_IN_TRAY);
        module.run({ spendMoneyId: 'new', inTrayDocumentId: '🍌', businessId: '👺' });

        expect(store.getActions()).toEqual([
          expect.objectContaining({
            intent: SET_INITIAL_STATE,
          }),
          {
            intent: SET_LOADING_STATE,
            isLoading: LoadingState.LOADING,
          },
          expect.objectContaining({
            intent: LOAD_NEW_SPEND_MONEY,
          }),
          {
            intent: SET_LOADING_STATE,
            isLoading: LoadingState.LOADING_SUCCESS,
          },
          {
            intent: RESET_TOTALS,
          },
          {
            intent: SET_LOADING_STATE,
            isLoading: LoadingState.LOADING,
          },
          {
            intent: SET_LOADING_STATE,
            isLoading: LoadingState.LOADING_SUCCESS,
          },
          {
            intent: SET_ALERT,
            alert: {
              message: 'fails',
              type: 'danger',
            },
          },
          {
            intent: SET_SHOW_SPLIT_VIEW,
            showSplitView: true,
          },
          {
            inTrayDocumentUrl: 'http://www.🐀.com',
            intent: SET_IN_TRAY_DOCUMENT_URL,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({ intent: LOAD_NEW_SPEND_MONEY }),
          expect.objectContaining({
            intent: PREFILL_DATA_FROM_IN_TRAY,
            urlParams: {
              businessId: '👺',
              inTrayDocumentId: '🍌',
            },
          }),
          expect.objectContaining({
            intent: DOWNLOAD_IN_TRAY_DOCUMENT,
            urlParams: {
              businessId: '👺',
              inTrayDocumentId: '🍌',
            },
          }),
        ]);
      });
    });

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

  describe('updateHeaderOptions', () => {
    describe('key is selectedPayFromAccountId', () => {
      describe('when on a new spend money', () => {
        it('should load the next reference id if the reference field hasn\'t been changed', () => {
          const { module, store, integration } = setupWithNew();

          module.updateHeaderOptions({ key: 'selectedPayFromAccountId', value: '2' });

          expect(store.getActions()).toEqual([
            {
              intent: UPDATE_SPEND_MONEY_HEADER,
              key: 'selectedPayFromAccountId',
              value: '2',
            },
            expect.objectContaining({
              intent: LOAD_REFERENCE_ID,
            }),
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: LOAD_REFERENCE_ID,
            }),
          ]);
        });

        it('should not load the next reference id if the reference field has been changed and should update the bank statement text ', () => {
          const { module, store, integration } = setupWithNew();

          module.updateHeaderOptions({ key: 'referenceId', value: 'hello ' });
          store.resetActions();

          module.updateHeaderOptions({ key: 'selectedPayFromAccountId', value: '2' });

          expect(store.getActions()).toEqual([
            {
              intent: UPDATE_SPEND_MONEY_HEADER,
              key: 'selectedPayFromAccountId',
              value: '2',
            },
            {
              intent: UPDATE_BANK_STATEMENT_TEXT,
            },
          ]);
          expect(integration.getRequests()).toEqual([]);
        });
      });

      describe('when on an existing spend money', () => {
        it('should update the bank statement text', () => {
          const { module, store } = setUpWithExisting();

          module.updateHeaderOptions({ key: 'selectedPayFromAccountId', value: '2' });

          expect(store.getActions()).toEqual([
            {
              intent: UPDATE_SPEND_MONEY_HEADER,
              key: 'selectedPayFromAccountId',
              value: '2',
            },
            {
              intent: UPDATE_BANK_STATEMENT_TEXT,
            },
          ]);
        });
      });
    });

    describe('key is selectedPayToContactId', () => {
      describe('when is creating new spend money', () => {
        it('should load expense account id, calls tax calc. if contact is supplier and has default expense account', () => {
          const { module, store, integration } = setupWithNew();
          module.addSpendMoneyLine({ amount: '10' });
          store.resetActions();
          integration.resetRequests();

          module.updateHeaderOptions({ key: 'selectedPayToContactId', value: '2' });

          expect(store.getActions()).toEqual([
            {
              intent: UPDATE_SPEND_MONEY_HEADER,
              key: 'selectedPayToContactId',
              value: '2',
            },
            {
              intent: SET_SUPPLIER_BLOCKING_STATE,
              isSupplierBlocking: true,
            },
            {
              intent: SET_SUPPLIER_BLOCKING_STATE,
              isSupplierBlocking: false,
            },
            expect.objectContaining({
              intent: LOAD_SUPPLIER_EXPENSE_ACCOUNT,
            }),
            {
              intent: GET_TAX_CALCULATIONS,
              taxCalculations: expect.any(Object),
            },
          ]);

          expect(integration.getRequests()).toContainEqual(
            expect.objectContaining({
              intent: LOAD_SUPPLIER_EXPENSE_ACCOUNT,
            }),
          );
        });

        it('should not load expense account id if contact is not supplier', () => {
          const { module, store } = setupWithNew();
          module.updateHeaderOptions({ key: 'selectedPayToContactId', value: '1' });

          expect(store.getActions()).toEqual([
            {
              intent: UPDATE_SPEND_MONEY_HEADER,
              key: 'selectedPayToContactId',
              value: '1',
            },
          ]);
        });

        it('should load expense account id but not call tax calc. if contact is supplier but does not have default expense account', () => {
          const { module, store, integration } = setupWithNew();

          integration.mapSuccess(LOAD_SUPPLIER_EXPENSE_ACCOUNT, {});
          module.updateHeaderOptions({ key: 'selectedPayToContactId', value: '2' });

          expect(store.getActions()).toEqual([
            {
              intent: UPDATE_SPEND_MONEY_HEADER,
              key: 'selectedPayToContactId',
              value: '2',
            },
            {
              intent: SET_SUPPLIER_BLOCKING_STATE,
              isSupplierBlocking: true,
            },
            {
              intent: SET_SUPPLIER_BLOCKING_STATE,
              isSupplierBlocking: false,
            },
            expect.objectContaining({
              intent: LOAD_SUPPLIER_EXPENSE_ACCOUNT,
            }),
          ]);

          expect(integration.getRequests()).toContainEqual(
            expect.objectContaining({
              intent: LOAD_SUPPLIER_EXPENSE_ACCOUNT,
            }),
          );
        });
      });
    });
  });

  // TODO - Need to test for the redirection scenarios after save
  describe('saveSpendMoney', () => {
    describe('not from in tray', () => {
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
          module.pushMessage = jest.fn();

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

          expect(module.pushMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: SUCCESSFULLY_SAVED_SPEND_MONEY }),
          );
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

        // Setup: this will trigger an update spend money request,
        // but will not trigger the onSuccess which means that
        // the submitting state will not be set to false
        module.saveSpendMoney();
        store.resetActions();

        module.saveSpendMoney();

        expect(store.getActions()).toEqual([]);
      });
    });

    describe('from in tray', () => {
      it('successfully creates a spend money and link in tray document', () => {
        const { module, store, integration } = setUpWithNewFromInTray();
        module.pushMessage = jest.fn();

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
            intent: CREATE_SPEND_MONEY,
          }),
          expect.objectContaining({
            intent: LINK_IN_TRAY_DOCUMENT,
          }),
        ]);

        expect(module.pushMessage).toHaveBeenCalledWith(
          expect.objectContaining({ type: SUCCESSFULLY_SAVED_SPEND_MONEY }),
        );
      });

      it('successfully creates a spend money but fails to link in tray document', () => {
        const { module, store, integration } = setUpWithNewFromInTray();
        integration.mapFailure(LINK_IN_TRAY_DOCUMENT);
        module.pushMessage = jest.fn();

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
            intent: CREATE_SPEND_MONEY,
          }),
          expect.objectContaining({
            intent: LINK_IN_TRAY_DOCUMENT,
          }),
        ]);

        expect(module.pushMessage).toHaveBeenCalledWith(
          expect.objectContaining({ type: SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK }),
        );
      });
    });
  });

  describe('handleSaveAndAction', () => {
    [
      { action: SaveActionType.SAVE_AND_CREATE_NEW },
      { action: SaveActionType.SAVE_AND_DUPLICATE },
    ].forEach(({ action }) => {
      describe('not from in tray', () => {
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
            module.pushMessage = jest.fn();
            module.reload = jest.fn();

            module.handleSaveAndAction(action);

            const commonActions = [
              {
                intent: SET_SUBMITTING_STATE,
                isSubmitting: true,
              },
              {
                intent: SET_SUBMITTING_STATE,
                isSubmitting: false,
              },
            ];

            const expectedActions = (
              action === SaveActionType.SAVE_AND_DUPLICATE
              && test.intent === CREATE_SPEND_MONEY ? [
                  ...commonActions,
                  {
                    intent: UPDATE_SPEND_MONEY_ID,
                    spendMoneyId: '1',
                  },
                ] : commonActions
            );

            expect(store.getActions()).toEqual(expectedActions);

            expect(integration.getRequests()).toEqual([
              expect.objectContaining({
                intent: test.intent,
              }),
            ]);

            expect(module.pushMessage).toHaveBeenCalledWith(
              expect.objectContaining({ type: SUCCESSFULLY_SAVED_SPEND_MONEY }),
            );
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

          // Setup: this will trigger an update spend money request,
          // but will not trigger the onSuccess which means that
          // the submitting state will not be set to false
          module.handleSaveAndAction(action);
          store.resetActions();

          module.handleSaveAndAction(action);

          expect(store.getActions()).toEqual([]);
        });
      });

      describe('from in tray', () => {
        it('successfully creates a spend money and link in tray document', () => {
          const { module, store, integration } = setUpWithNewFromInTray();
          module.pushMessage = jest.fn();

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
              intent: CREATE_SPEND_MONEY,
            }),
            expect.objectContaining({
              intent: LINK_IN_TRAY_DOCUMENT,
            }),
          ]);

          expect(module.pushMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: SUCCESSFULLY_SAVED_SPEND_MONEY }),
          );
        });

        it('successfully creates a spend money but fails to link in tray document', () => {
          const { module, store, integration } = setUpWithNewFromInTray();
          integration.mapFailure(LINK_IN_TRAY_DOCUMENT);
          module.pushMessage = jest.fn();

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
              intent: CREATE_SPEND_MONEY,
            }),
            expect.objectContaining({
              intent: LINK_IN_TRAY_DOCUMENT,
            }),
          ]);

          expect(module.pushMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK }),
          );
        });
      });
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
        {
          intent: SET_SHOW_SPLIT_VIEW,
          showSplitView: false,
        },
        {
          intent: SET_ALERT,
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
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
