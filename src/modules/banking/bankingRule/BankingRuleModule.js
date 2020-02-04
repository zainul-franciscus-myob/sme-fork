import React from 'react';

import BankingRuleModal from './components/BankingRuleModal';
import createBankingRuleDispatcher from './createBankingRuleDispatcher';
import createBankingRuleIntegrator from './createBankingRuleIntegrator';

export default class BankingRuleModule {
  constructor({
    integration,
    store,
    onCancel,
    onSaveSuccess,
  }) {
    this.dispatcher = createBankingRuleDispatcher(store);
    this.integrator = createBankingRuleIntegrator(store, integration);
    this.closeModal = onCancel;
    this.onSaveSuccess = onSaveSuccess;
  }

  updateRuleDetails = ({ key, value }) => {
    this.dispatcher.updateRuleDetails(key, value);
  }

  addRuleCondition = () => {
    this.dispatcher.addRuleCondition();
  }

  updateRuleCondition = (conditionIndex, { key, value }) => {
    this.dispatcher.updateRuleCondition(conditionIndex, key, value);
  }

  addConditionPredicate = (conditionIndex, newData) => {
    this.dispatcher.addConditionPredicate(conditionIndex, newData);
  }

  updateConditionPredicate = (conditionIndex, predicationIndex, { key, value }) => {
    this.dispatcher.updateConditionPredicate(conditionIndex, predicationIndex, key, value);
  }

  removeConditionPredicate = (conditionIndex, predicationIndex) => {
    this.dispatcher.removeConditionPredicate(conditionIndex, predicationIndex);
  }

  addTableRow = (row) => {
    this.dispatcher.addTableRow(row);
  }

  updateTableRow = (index, key, value) => {
    this.dispatcher.updateTableRow(index, key, value);
  }

  removeTableRow = (index) => {
    this.dispatcher.removeTableRow(index);
  }

  formatAmount = ({ index }) => {
    this.dispatcher.formatAmount(index);
  }

  createBankingRule = () => {
    this.dispatcher.setSavingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setSavingState(false);
      this.onSaveSuccess(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSavingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.createBankingRule({
      onSuccess,
      onFailure,
    });
  }

  getView(state) {
    this.dispatcher.setInitialState(state);

    return (
      <BankingRuleModal
        onDetailsChange={this.updateRuleDetails}
        onConditionChange={this.updateRuleCondition}
        onConditionAdd={this.addRuleCondition}
        onPredicateAdd={this.addConditionPredicate}
        onPredicateChange={this.updateConditionPredicate}
        onPredicateRemove={this.removeConditionPredicate}
        onAddAllocationLine={this.addTableRow}
        onUpdateAllocationLine={this.updateTableRow}
        onRemoveAllocationLine={this.removeTableRow}
        onBlurAmountField={this.formatAmount}
        onCancel={this.closeModal}
        onSave={this.createBankingRule}
      />
    );
  }
}
