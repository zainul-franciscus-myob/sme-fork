import { Provider } from 'react-redux';
import React from 'react';

import { getShouldLoadBankingRuleOptionById } from './BankingRuleComboboxSelectors';
import BankingRuleComboboxView from './components/BankingRuleComboboxView';
import Store from '../../../store/Store';
import bankingRuleComboboxReducer from './bankingRuleComboboxReducer';
import createBankingRuleComboboxDispatcher from './createBankingRuleComboboxDispatcher';
import createBankingRuleComboboxIntegrator from './createBankingRuleComboboxIntegrator';

export default class BankingRuleComboboxModule {
  constructor({ integration, onAlert = () => {} }) {
    this.onAlert = onAlert;

    this.store = new Store(bankingRuleComboboxReducer);
    this.integrator = createBankingRuleComboboxIntegrator({
      store: this.store,
      integration,
    });
    this.dispatcher = createBankingRuleComboboxDispatcher({
      store: this.store,
    });
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.loadBankingRuleOptions();
  };

  load = (bankingRuleId) => {
    const state = this.store.getState();
    const shouldLoadBankingRuleOptionById = getShouldLoadBankingRuleOptionById(
      state,
      bankingRuleId
    );
    if (shouldLoadBankingRuleOptionById) {
      this.loadBankingRuleOptionById({ id: bankingRuleId });
    }
  };

  loadBankingRuleOptionById = ({ id, onSuccess: next = () => {} }) => {
    this.dispatcher.setBankingRuleLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setBankingRuleLoadingState(false);
      this.dispatcher.loadBankingRuleOptionById(payload);

      next(payload);
    };

    const onFailure = () => {
      this.dispatcher.setBankingRuleLoadingState(false);
    };

    this.integrator.loadBankingRuleOptionById({ id, onSuccess, onFailure });
  };

  loadBankingRuleOptions = () => {
    this.dispatcher.setBankingRuleOptionsLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setBankingRuleOptionsLoadingState(false);
      this.dispatcher.loadBankingRuleOptions(payload);
    };

    const onFailure = () => {
      this.dispatcher.setBankingRuleOptionsLoadingState(false);
    };

    this.integrator.loadBankingRuleOptions({ onSuccess, onFailure });
  };

  searchBankingRule = ({
    keywords,
    onSuccess: onSearchBankingRuleSuccess,
    onFailure: onSearchBankingRuleFailure,
  }) => {
    const onSuccess = ({ bankingRuleOptions }) => {
      onSearchBankingRuleSuccess(bankingRuleOptions);
    };

    const onFailure = () => {
      onSearchBankingRuleFailure();
    };

    this.integrator.searchBankingRule({ keywords, onSuccess, onFailure });
  };

  handleOnChange = (bankingRule, onChange) => {
    if (bankingRule) {
      this.dispatcher.updateBankingRuleOptions(bankingRule);
    }
    onChange(bankingRule);
  };

  render({ onChange = () => {}, ...otherProps }) {
    return (
      <Provider store={this.store}>
        <BankingRuleComboboxView
          onLoadMore={this.loadBankingRuleOptions}
          onSearch={this.searchBankingRule}
          onChange={(bankingRule) => this.handleOnChange(bankingRule, onChange)}
          {...otherProps}
        />
      </Provider>
    );
  }
}
