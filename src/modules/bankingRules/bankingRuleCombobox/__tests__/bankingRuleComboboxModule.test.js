import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  SEARCH_COMBOBOX_BANKING_RULE,
  SET_BANKING_RULE_COMBOBOX_LOADING_STATE,
  SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
} from '../BankingRuleComboboxIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import BankingRuleComboboxModule from '../BankingRuleComboboxModule';
import BankingRuleTypes from '../BankingRuleTypes';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import bankingRuleComboboxReducer from '../bankingRuleComboboxReducer';
import createBankingRuleComboboxDispatcher from '../createBankingRuleComboboxDispatcher';
import createBankingRuleComboboxIntegrator from '../createBankingRuleComboboxIntegrator';

describe('BankingRuleComboboxModule', () => {
  const setUp = () => {
    const integration = new TestIntegration();
    const onAlert = jest.fn();

    const module = new BankingRuleComboboxModule({ integration, onAlert });

    const store = new TestStore(bankingRuleComboboxReducer);
    module.store = store;
    module.dispatcher = createBankingRuleComboboxDispatcher({ store });
    module.integrator = createBankingRuleComboboxIntegrator({
      store,
      integration,
    });

    return { module, store, integration };
  };

  const setUpWithRun = () => {
    const { module, store, integration } = setUp();

    module.run({
      businessId: 'businessId',
      region: 'au',
      bankingRuleType: BankingRuleTypes.SpendMoney,
    });
    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('run', () => {
    it('successfully load bankingRule options', () => {
      const { module, store, integration } = setUp();
      const context = {
        businessId: 'businessId',
        region: 'au',
        bankingRuleType: BankingRuleTypes.SpendMoney,
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        {
          intent: SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_BANKING_RULE_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_BANKING_RULE_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('loadBankingRuleComboboxOptions', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();

      module.loadBankingRuleOptions();

      expect(store.getActions()).toEqual([
        {
          intent: SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_BANKING_RULE_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_BANKING_RULE_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_BANKING_RULE_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('searchBankingRuleCombobox', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();
      const onSuccess = jest.fn();

      module.searchBankingRule({
        keywords: 'keywords',
        onSuccess,
        onFailure: () => {},
      });

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SEARCH_COMBOBOX_BANKING_RULE }),
      ]);
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe('load', () => {
    const setUpWithBankingRuleOptions = (bankingRuleOptions) => {
      const { module, store, integration } = setUp();
      integration.mapSuccess(LOAD_BANKING_RULE_COMBOBOX_OPTIONS, {
        bankingRuleOptions,
      });
      module.run({
        businessId: 'businessId',
        region: 'au',
      });
      store.resetActions();
      integration.resetRequests();

      return { module, integration, store };
    };

    it('successfully load option by id', () => {
      const { module, store, integration } = setUpWithBankingRuleOptions([
        { id: '1' },
      ]);

      module.load('2');

      expect(store.getActions()).toEqual([
        { intent: SET_BANKING_RULE_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_BANKING_RULE_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({
          intent: LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
        }),
      ]);
    });
  });
});
