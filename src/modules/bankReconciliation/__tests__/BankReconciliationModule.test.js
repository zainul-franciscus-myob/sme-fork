import {
  CLOSE_MODAL,
  CREATE_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
  OPEN_MODAL,
  RESET_STATEMENT_DATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UNDO_BANK_RECONCILIATION,
  UPDATE_HEADER_OPTION,
  UPDATE_RESULT,
} from '../BankReconciliationIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import BankReconciliationModule from '../BankReconciliationModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import bankReconciliationDetailReducer from '../bankReconciliationReducer';
import createBankReconciliationDispatcher from '../createBankReconciliationDispatcher';
import createBankReconciliationIntegrator from '../createBankReconciliationIntegrator';

describe('BankReconciliationModule', () => {
  const setup = () => {
    const store = new TestStore(bankReconciliationDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const module = new BankReconciliationModule({ integration, setRootView });
    module.store = store;
    module.dispatcher = createBankReconciliationDispatcher(store);
    module.integrator = createBankReconciliationIntegrator(store, integration);

    return {
      store,
      integration,
      module,
    };
  };

  const setupWithoutBankAccount = () => {
    const { store, integration, module } = setup();

    module.run({ businessId: '🐤', region: 'au', bankAccount: '' });
    store.resetActions();
    integration.resetRequests();

    return {
      store,
      integration,
      module,
    };
  };

  const setupWithBankAccount = () => {
    const { store, integration, module } = setup();

    module.run({ businessId: '🐤', region: 'au', bankAccount: '🐧' });
    store.resetActions();
    integration.resetRequests();

    return {
      store,
      integration,
      module,
    };
  };

  describe('run', () => {
    [
      {
        name: 'load without bank account',
        intent: LOAD_BANK_RECONCILIATION,
        bankAccount: '',
      },
      {
        name: 'successfully load without bank account',
        intent: LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
        bankAccount: '🐧',
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { module, integration, store } = setup();

        const context = {
          businessId: '🐤',
          region: 'au',
          bankAccount: test.bankAccount,
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
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
          expect.objectContaining({ intent: test.intent }),
        ]);
      });

      it(`fails to ${test.name}`, () => {
        const { module, integration, store } = setup();

        integration.mapFailure(test.intent);

        const context = {
          businessId: '🐤',
          region: 'au',
          bankAccount: test.bankAccount,
        };
        module.run(context);

        expect(store.getActions()).toEqual([
          {
            intent: SET_INITIAL_STATE,
            context,
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
          expect.objectContaining({ intent: test.intent }),
        ]);
      });
    });
  });

  describe('setSortOrder', () => {
    [
      {
        name: 'sort list with banck account',
        setup: setupWithBankAccount,
      },
      {
        name: 'sort list without banck account',
        setup: setupWithoutBankAccount,
      },
    ].forEach((test) => {
      it(`successfully ${test.name}`, () => {
        const { module, integration, store } = test.setup();
        module.setSortOrder('displayId');

        expect(store.getActions()).toEqual([
          {
            intent: SET_SORT_ORDER,
            orderBy: 'displayId',
          },
          {
            intent: SET_TABLE_LOADING_STATE,
            isTableLoading: true,
          },
          {
            intent: SET_TABLE_LOADING_STATE,
            isTableLoading: false,
          },
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_RECONCILIATION,
          }),
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_RECONCILIATION,
          }),
        ]);
      });

      it(`fails to ${test.name}`, () => {
        const { module, integration, store } = test.setup();
        integration.mapFailure(SORT_AND_FILTER_BANK_RECONCILIATION);

        module.setSortOrder('displayId');

        expect(store.getActions()).toEqual([
          {
            intent: SET_SORT_ORDER,
            orderBy: 'displayId',
          },
          {
            intent: SET_TABLE_LOADING_STATE,
            isTableLoading: true,
          },
          {
            intent: SET_TABLE_LOADING_STATE,
            isTableLoading: false,
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
          expect.objectContaining({
            intent: SORT_AND_FILTER_BANK_RECONCILIATION,
          }),
        ]);
      });
    });
  });

  describe('saveBankReconciliation', () => {
    const setupWithBalancedData = () => {
      const loadBalancedBankReconciliationData = {
        closingBankStatementBalance: '400.00',
        calculatedClosingBalance: 400,
      };
      const { integration, module, store } = setup();

      integration.overrideMapping(LOAD_BANK_RECONCILIATION, ({ onSuccess }) => {
        onSuccess(loadBalancedBankReconciliationData);
      });
      module.run({ businessId: '🐤', region: 'au', bankAccount: '' });
      store.resetActions();
      integration.resetRequests();
      return { integration, module, store };
    };

    const setupWithUnbalancedData = () => {
      const loadUnbalancedBankReconciliationData = {
        closingBankStatementBalance: '400.00',
        calculatedClosingBalance: 200,
      };
      const { integration, module, store } = setup();

      integration.overrideMapping(LOAD_BANK_RECONCILIATION, ({ onSuccess }) => {
        onSuccess(loadUnbalancedBankReconciliationData);
      });
      module.run({ businessId: '🐤', region: 'au', bankAccount: '' });
      store.resetActions();
      integration.resetRequests();
      return { integration, module, store };
    };

    it("successfully save when it's balanced", () => {
      const { integration, module, store } = setupWithBalancedData();

      // action
      module.saveBankReconciliation();

      // assertion
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
          intent: UPDATE_RESULT,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: CREATE_BANK_RECONCILIATION }),
      ]);
    });

    it("open modal when it's out of balance", () => {
      const { integration, module, store } = setupWithUnbalancedData();

      // action
      module.saveBankReconciliation();

      // assertion
      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.OUT_OF_BALANCE,
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([]);
    });

    it('should do nothing if is already saving', () => {
      const { integration, module, store } = setupWithBalancedData();
      module.setSubmittingState(true);
      integration.resetRequests();
      store.resetActions();

      // action
      module.saveBankReconciliation();

      // assertion
      expect(store.getActions()).toEqual([]);

      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('undoReconciliation', () => {
    it('successfully undo reconciliation', () => {
      const { module, store, integration } = setupWithBankAccount();

      module.undoReconciliation();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
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
          alert: expect.objectContaining({ type: 'success' }),
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UNDO_BANK_RECONCILIATION }),
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        }),
      ]);
    });

    it('fail to undo reconciliation', () => {
      const { module, store, integration } = setupWithBankAccount();
      integration.mapFailure(UNDO_BANK_RECONCILIATION);

      module.undoReconciliation();

      expect(store.getActions()).toEqual([
        { intent: CLOSE_MODAL },
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
          alert: expect.objectContaining({ type: 'danger' }),
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: UNDO_BANK_RECONCILIATION }),
      ]);
    });
  });

  describe('updateHeaderOption', () => {
    it('successfully update key with value', () => {
      const { module, integration, store } = setupWithBankAccount();

      const toUpdate = { key: 'accountName', value: '🐣' };
      module.updateHeaderOption(toUpdate);

      expect(store.getActions()).toEqual([
        { intent: UPDATE_HEADER_OPTION, ...toUpdate },
      ]);

      expect(integration.getRequests()).toEqual([]);
    });

    it('reloads after updating selectedAccountId', () => {
      const { module, integration, store } = setupWithBankAccount();
      const headerOptions = { key: 'selectedAccountId', value: '123🦁' };

      module.updateHeaderOption(headerOptions);

      expect(store.getActions()).toEqual([
        { intent: UPDATE_HEADER_OPTION, ...headerOptions },
        { intent: RESET_STATEMENT_DATE },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        }),
      ]);
    });

    it('reloads after updating statementDate', () => {
      const { module, integration, store } = setupWithBankAccount();
      const headerOptions = { key: 'statementDate', value: '2020-10-12' };

      module.updateHeaderOption(headerOptions);

      expect(store.getActions()).toEqual([
        { intent: UPDATE_HEADER_OPTION, ...headerOptions },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANK_RECONCILIATION,
        }),
      ]);
    });

    [
      { key: 'selectedAccountId', value: '' },
      { key: 'statementDate', value: '' },
    ].forEach((test) => {
      it(`does not reload when update ${test.key} value empty`, () => {
        const { module, integration, store } = setupWithBankAccount();

        module.updateHeaderOption(test);

        expect(store.getActions()).toEqual([
          { intent: UPDATE_HEADER_OPTION, ...test },
        ]);

        expect(integration.getRequests()).toEqual([]);
      });
    });
  });
});
