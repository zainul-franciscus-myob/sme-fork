import { Provider } from 'react-redux';
import React from 'react';

import {
  getContactComboboxContext,
  getCustomerComboboxContext,
  getIsBankingRuleOpen,
  getRuleType,
  getSupplierComboboxContext,
  getViewedAccountToolTip,
} from './bankingRuleSelectors';
import { trackUserEvent } from '../../../telemetry';
import AlertType from '../../../common/types/AlertType';
import BankingRuleView from './components/BankingRuleView';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import RuleTypes from './RuleTypes';
import Store from '../../../store/Store';
import bankingRuleReducer from './bankingRuleReducers';
import createBankingRuleDispatcher from './createBankingRuleDispatcher';
import createBankingRuleIntegrator from './createBankingRuleIntegrator';

export default class BankingRuleModule {
  constructor({ integration, featureToggles }) {
    this.store = new Store(bankingRuleReducer);
    this.dispatcher = createBankingRuleDispatcher(this.store);
    this.integrator = createBankingRuleIntegrator(this.store, integration);
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
  }

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.dispatcher.resetState();
  };

  getIsBankingRuleOpen = () => {
    const state = this.store.getState();
    return getIsBankingRuleOpen(state);
  };

  run = (context) => {
    this.dispatcher.setInitialState({ ...context });
    this.dispatcher.open();
    this.loadContactCombobox();
  };

  viewedAccountToolTip = () => {
    if (getViewedAccountToolTip(this.store.getState()) === false) {
      this.dispatcher.setViewedAccountToolTip(true);
      trackUserEvent({
        eventName: 'viewedAccountToolTip',
        customProperties: {
          action: 'viewed_accountToolTip',
          page: 'Banking rule',
        },
      });
    }
  };

  render = ({ onCreateBankingRule }) => {
    const renderContactCombobox = (props) => {
      return this.contactComboboxModule
        ? this.contactComboboxModule.render(props)
        : null;
    };

    return (
      <Provider store={this.store}>
        <BankingRuleView
          renderContactCombobox={renderContactCombobox}
          onDetailsChange={this.updateRuleDetails}
          onContactChange={this.updateContact}
          onConditionChange={this.updateRuleCondition}
          onConditionAdd={this.addRuleCondition}
          onPredicateAdd={this.addConditionPredicate}
          onPredicateChange={this.updateConditionPredicate}
          onPredicateRemove={this.removeConditionPredicate}
          onAddAllocationLine={this.addTableRow}
          onUpdateAllocationLine={this.updateTableRow}
          onRemoveAllocationLine={this.removeTableRow}
          onCancel={this.dispatcher.close}
          onSave={() => {
            this.createBankingRule(onCreateBankingRule);
          }}
          onAlert={this.dispatcher.setAlert}
          onViewedAccountToolTip={this.viewedAccountToolTip}
        />
      </Provider>
    );
  };

  updateRuleDetails = ({ key, value }) => {
    this.dispatcher.updateRuleDetails(key, value);

    if (key === 'ruleType') {
      this.loadContactCombobox();
    }
  };

  updateContact = (contact) => {
    const { key, value, contactType, isReportable } = contact;
    this.dispatcher.updateContact({
      key,
      value,
      contactType,
      isPaymentReportable: isReportable,
    });
  };

  addRuleCondition = () => {
    this.dispatcher.addRuleCondition();
  };

  updateRuleCondition = (conditionIndex, { key, value }) => {
    this.dispatcher.updateRuleCondition(conditionIndex, key, value);
  };

  addConditionPredicate = (conditionIndex, newData) => {
    this.dispatcher.addConditionPredicate(conditionIndex, newData);
  };

  updateConditionPredicate = (
    conditionIndex,
    predicationIndex,
    { key, value }
  ) => {
    this.dispatcher.updateConditionPredicate(
      conditionIndex,
      predicationIndex,
      key,
      value
    );
  };

  removeConditionPredicate = (conditionIndex, predicationIndex) => {
    this.dispatcher.removeConditionPredicate(conditionIndex, predicationIndex);
  };

  addTableRow = (row) => {
    this.dispatcher.addTableRow(row);
  };

  updateTableRow = (index, key, value) => {
    this.dispatcher.updateTableRow(index, key, value);
  };

  removeTableRow = (index) => {
    this.dispatcher.removeTableRow(index);
  };

  createBankingRule = (onCreateBankingRule) => {
    this.dispatcher.startLoading();

    const onSuccess = (payload) => {
      this.dispatcher.stopLoading();
      this.dispatcher.close();
      onCreateBankingRule(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopLoading();
      this.dispatcher.setAlert({
        type: AlertType.DANGER,
        message,
      });
    };

    this.integrator.createBankingRule({
      onSuccess,
      onFailure,
    });
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const ruleType = getRuleType(state);
    this.contactComboboxModule.resetState();
    switch (ruleType) {
      case RuleTypes.bill:
        this.contactComboboxModule.run(getSupplierComboboxContext(state));
        break;
      case RuleTypes.invoice:
        this.contactComboboxModule.run(getCustomerComboboxContext(state));
        break;
      case RuleTypes.spendMoney:
      case RuleTypes.receiveMoney:
      default:
        this.contactComboboxModule.run(getContactComboboxContext(state));
        break;
    }
  };
}
