import {
  CLOSE_MODAL,
  CREATE_BANKING_RULE,
  DELETE_BANKING_RULE,
  LOAD_BANKING_RULE,
  LOAD_NEW_BANKING_RULE,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_BANKING_RULE,
  UPDATE_FORM,
} from '../BankingRuleDetailIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
} from '../../../../common/types/MessageTypes';
import BankingRuleDetailModule from '../BankingRuleDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import bankingRuleDetailReducer from '../reducers';
import createBankingRuleDetailDispatcher from '../createBankingRuleDetailDispatcher';
import createBankingRuleDetailIntegrator from '../createBankingRuleDetailIntegrator';

describe('BankingRuleDetailModule', () => {
  const setup = () => {
    const setRootView = () => {};
    const store = new TestStore(bankingRuleDetailReducer);
    const integration = new TestIntegration();

    const module = new BankingRuleDetailModule({ integration, setRootView });
    module.store = store;
    module.integrator = createBankingRuleDetailIntegrator(store, integration);
    module.dispatcher = createBankingRuleDetailDispatcher(store);

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '🐛',
      region: 'au',
      bankingRuleId: 'new',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '🐛',
      region: 'au',
      bankingRuleId: '🦕',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        bankingRuleId: 'new',
        intent: LOAD_NEW_BANKING_RULE,
      },
      {
        name: 'existing',
        bankingRuleId: '🦕',
        intent: LOAD_BANKING_RULE,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        it('loads successfully', () => {
          const { module, store, integration } = setup();

          module.run({
            businessId: '🐛',
            region: 'au',
            bankingRuleId: test.bankingRuleId,
          });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                businessId: '🐛',
                region: 'au',
                bankingRuleId: test.bankingRuleId,
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
          const { module, store, integration } = setup();
          integration.mapFailure(test.intent);

          module.run({
            businessId: '🐛',
            region: 'au',
            bankingRuleId: test.bankingRuleId,
          });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                businessId: '🐛',
                region: 'au',
                bankingRuleId: test.bankingRuleId,
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

  describe('saveBankingRule', () => {
    [
      {
        name: 'new',
        setup: setupWithNew,
        intent: CREATE_BANKING_RULE,
      },
      {
        name: 'existing',
        setup: setupWithExisting,
        intent: UPDATE_BANKING_RULE,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        const setupWithOpenCancelModal = () => {
          const toolbox = test.setup();
          const { module, store } = toolbox;

          module.updateForm({ key: 'name', value: '🦄' });
          module.openUnsavedModal();

          expect(store.getActions()).toEqual([
            {
              intent: SET_IS_PAGE_EDITED,
            },
            {
              intent: UPDATE_FORM,
              key: 'name',
              value: '🦄',
            },
            {
              intent: OPEN_MODAL,
              modal: {
                type: ModalType.UNSAVED,
              },
            },
          ]);

          store.resetActions();

          return toolbox;
        };

        it('successfully saves', () => {
          const { module, store, integration } = setupWithOpenCancelModal();
          module.pushMessage = jest.fn();

          module.saveBankingRule();

          expect(store.getActions()).toEqual([
            {
              intent: CLOSE_MODAL,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
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
          expect(module.pushMessage).toHaveBeenCalledWith({
            type: SUCCESSFULLY_SAVED_BANKING_RULE,
            content: expect.any(String),
          });
        });

        it('fails to save', () => {
          const { module, store, integration } = setupWithOpenCancelModal();
          integration.mapFailure(test.intent);

          module.saveBankingRule();

          expect(store.getActions()).toEqual([
            {
              intent: CLOSE_MODAL,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
            {
              intent: SET_ALERT_MESSAGE,
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

  describe('deleteBankingRule', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.DELETE,
            url: '/#/au/🐛/bankingRule',
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successfully deletes', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();

      module.deleteBankingRule();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_BANKING_RULE,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        content: "Great Work! You've done it well!",
        type: SUCCESSFULLY_DELETED_BANKING_RULE,
      });
    });

    it('fails to delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_BANKING_RULE);

      module.deleteBankingRule();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alertMessage: 'fails',
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_BANKING_RULE,
        }),
      ]);
    });
  });
});
