import {
  LOAD_BANKING_RULE_LIST,
  SORT_AND_FILTER_BANKING_RULE_LIST,
} from './BankingRuleListIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './BankingRuleListSelectors';

const createBankingRuleListIntegrator = (store, integration) => ({
  loadBankingRuleList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BANKING_RULE_LIST,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterBankingRuleList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    integration.read({
      intent: SORT_AND_FILTER_BANKING_RULE_LIST,
      urlParams: {
        businessId: getBusinessId(state),
      },
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingRuleListIntegrator;
