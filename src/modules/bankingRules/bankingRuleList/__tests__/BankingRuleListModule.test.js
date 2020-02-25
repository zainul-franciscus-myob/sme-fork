import {
  LOAD_BANKING_RULE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANKING_RULE_LIST,
} from '../BankingRuleListIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import BankingRuleListModule from '../BankingRuleListModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import bankingRuleListReducer from '../bankingRuleListReducer';
import createBankingRuleListDispatcher from '../createBankingRuleListDispatcher';
import createBankingRuleListIntegrator from '../createBankingRuleListIntegrator';

describe('BankingRuleListModule', () => {
  const setup = () => {
    const setRootView = () => {};
    const popMessages = () => [];
    const store = new TestStore(bankingRuleListReducer);
    const integration = new TestIntegration();

    const module = new BankingRuleListModule({ integration, setRootView, popMessages });
    module.store = store;
    module.dispatcher = createBankingRuleListDispatcher(store);
    module.integrator = createBankingRuleListIntegrator(store, integration);

    return {
      store, module, integration,
    };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('successfully load', () => {
      const { store, integration, module } = setup();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_BANKING_RULE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([{
        intent: LOAD_BANKING_RULE_LIST,
      }]);
    });

    it('fails to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_BANKING_RULE_LIST);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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

      expect(integration.getRequests()).toEqual([{
        intent: LOAD_BANKING_RULE_LIST,
      }]);
    });

    it('displays alert from inbox', () => {
      const {
        store, integration, module,
      } = setup();
      module.popMessages = jest.fn().mockReturnValue([{
        content: '😭',
      }]);

      integration.mapFailure(LOAD_BANKING_RULE_LIST);

      module.run({});

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT,
        alert: {
          type: 'success',
          message: '😭',
        },
      });
    });
  });

  describe('sortBankingRuleList', () => {
    it('successfully sort', () => {
      const { store, integration, module } = setupWithRun();

      module.sortBankingRuleList('Name');

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'Name',
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANKING_RULE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_BANKING_RULE_LIST,
        },
      ]);
    });

    it('fails to sort', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_BANKING_RULE_LIST);

      module.sortBankingRuleList('Name');

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_SORT_ORDER,
          sortOrder: 'desc',
          orderBy: 'Name',
        },
        // @TODO bug? table loading state not reset
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_BANKING_RULE_LIST,
        },
      ]);
    });

    it('flips the sorting order, when ordering by the same key', () => {
      const { store, module } = setupWithRun();

      module.sortBankingRuleList('Name');

      expect(store.getActions()).toContainEqual({
        intent: SET_SORT_ORDER,
        sortOrder: 'desc',
        orderBy: 'Name',
      });

      store.resetActions();

      module.sortBankingRuleList('Name');

      expect(store.getActions()).toContainEqual({
        intent: SET_SORT_ORDER,
        sortOrder: 'asc',
        orderBy: 'Name',
      });
    });
  });

  describe('filterBankingRuleList', () => {
    it('successfully apply filter', () => {
      const { store, integration, module } = setupWithRun();

      module.filterBankingRuleList();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: false,
        },
        expect.objectContaining({
          intent: SORT_AND_FILTER_BANKING_RULE_LIST,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_BANKING_RULE_LIST,
        },
      ]);
    });

    it('fails to apply filter', () => {
      const { store, integration, module } = setupWithRun();
      integration.mapFailure(SORT_AND_FILTER_BANKING_RULE_LIST);

      module.filterBankingRuleList();

      expect(store.getActions()).toEqual([
        {
          intent: SET_TABLE_LOADING_STATE,
          isTableLoading: true,
        },
        // @TODO bug? table loading state not reset
        {
          intent: SET_ALERT,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);

      expect(integration.getRequests()).toEqual([
        {
          intent: SORT_AND_FILTER_BANKING_RULE_LIST,
        },
      ]);
    });
  });
});
