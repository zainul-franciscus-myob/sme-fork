import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BANKING_RULE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANKING_RULE_LIST,
  UPDATE_FILTER_OPTIONS,
} from './BankingRuleListIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
} from '../bankingRuleDetail/BankingRuleDetailMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getOrderBy,
  getSelectedBankingRuleUrl,
  getSortOrder,
} from './BankingRuleListSelectors';
import BankingRuleListView from './components/BankingRuleListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import bankingRuleListReducer from './bankingRuleListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
];

export default class BankingRuleListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(bankingRuleListReducer);
    this.popMessages = popMessages;
  }

  loadBankingList = () => {
    const state = this.store.getState();

    const intent = LOAD_BANKING_RULE_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.setLoadingState(LoadingState.LOADING);
    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  updateFilterOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName: key,
      value,
    });
  }

  sortBankingRuleList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_BANKING_RULE_LIST;
    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
        isSort: true,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getAppliedFilterOptions(state);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  }

  filterBankingRuleList = () => {
    const state = this.store.getState();

    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BANKING_RULE_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
        isSort: false,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  }

  selectBankingRule = (value) => {
    const state = this.store.getState();
    window.location.href = getSelectedBankingRuleUrl(state, value);
  };

  render = () => {
    const bankingRuleListView = (
      <BankingRuleListView
        onSort={this.sortBankingRuleList}
        onApplyFilters={this.filterBankingRuleList}
        onUpdateFilters={this.updateFilterOptions}
        onDismissAlert={this.dismissAlert}
        onSelectBankingRule={this.selectBankingRule}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {bankingRuleListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  }

  setLoadingState = (loadingState) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      loadingState,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.setAlert({
        type: 'success',
        message,
      });
    }
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadBankingList();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
