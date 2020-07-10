import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
} from '../../../common/types/MessageTypes';
import { getSelectedBankingRuleUrl } from './BankingRuleListSelectors';
import BankingRuleListView from './components/BankingRuleListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import bankingRuleListReducer from './bankingRuleListReducer';
import createBankingRuleListDispatcher from './createBankingRuleListDispatcher';
import createBankingRuleListIntegrator from './createBankingRuleListIntegrator';
import debounce from '../../../common/debounce/debounce';

const messageTypes = [
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
];

export default class BankingRuleListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.setRootView = setRootView;
    this.store = new Store(bankingRuleListReducer);
    this.popMessages = popMessages;
    this.dispatcher = createBankingRuleListDispatcher(this.store);
    this.integrator = createBankingRuleListIntegrator(this.store, integration);
  }

  loadBankingList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankingRuleList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadBankingRuleList({ onSuccess, onFailure });
  };

  sortBankingRuleList = (orderBy) => {
    this.dispatcher.setTableLoadingState(true);

    this.dispatcher.setSortOrder(orderBy);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortBankingRuleList(response);
    };

    const onFailure = ({ message }) =>
      this.dispatcher.setAlert({ message, type: 'danger' });

    this.integrator.sortAndFilterBankingRuleList({ onSuccess, onFailure });
  };

  filterBankingRuleList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.filterBankingRuleList(response);
    };

    const onFailure = ({ message }) =>
      this.dispatcher.setAlert({ message, type: 'danger' });

    this.integrator.sortAndFilterBankingRuleList({ onSuccess, onFailure });
  };

  selectBankingRule = (value) => {
    const state = this.store.getState();
    window.location.href = getSelectedBankingRuleUrl(state, value);
  };

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.filterBankingRuleList)();
    } else {
      this.filterBankingRuleList();
    }
  };

  render = () => {
    const bankingRuleListView = (
      <BankingRuleListView
        onSort={this.sortBankingRuleList}
        onUpdateFilters={this.updateFilterOptions}
        onDismissAlert={this.dismissAlert}
        onSelectBankingRule={this.selectBankingRule}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{bankingRuleListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  dismissAlert = () => {
    this.dispatcher.setAlert(undefined);
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadBankingList();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
