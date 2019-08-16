import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BANKING_RULE_RECEIVE_MONEY, SUCCESSFULLY_SAVED_BANKING_RULE_RECEIVE_MONEY } from './BankingRuleReceiveMoneyMessageTypes';
import {
  getBankingRuleListUrl,
  getIsPagedEdited,
} from './bankingRuleReceiveMoneySelectors';
import BankingRuleReceiveMoneyView from './components/BankingRuleReceiveMoneyView';
import ModalType from './ModalType';
import Store from '../../store/Store';
import bankingRuleReceiveMoneyReducer from './bankingRuleReceiveMoneyReducer';
import createBankingRuleReceiveMoneyDispatcher from './createBankingRuleReceiveMoneyDispatcher';
import createBankingRuleReceiveMoneyIntegrator from './createBankingRuleReceiveMoneyIntegrator';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class BankingRuleReceiveMoneyModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(bankingRuleReceiveMoneyReducer);
    this.dispatcher = createBankingRuleReceiveMoneyDispatcher(this.store);
    this.integrator = createBankingRuleReceiveMoneyIntegrator(this.store, this.integration);
  }

  render = () => {
    const bankingRuleReceiveMoneyView = (
      <BankingRuleReceiveMoneyView
        onRuleDetailsChange={this.updateForm}
        onRuleConditionsChange={this.updateForm}
        onRowInputBlur={this.formatAmount}
        onAddRow={this.addTableRow}
        onRowChange={this.changeTableRow}
        onRemoveRow={this.removeTableRow}
        onSaveButtonClick={this.saveBankingRule}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.dismissModal}
        onConfirmDeleteButtonClick={this.deleteBankingRule}
        onConfirmCancelButtonClick={this.redirectToBankingRuleList}
        onDismissAlert={this.dispatcher.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {bankingRuleReceiveMoneyView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  loadBankingRule = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = intent => (bankingRule) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadBankingRule(intent, bankingRule);
    };

    const onFailure = () => {
      console.log('Failed to load the banking rule');
    };

    this.integrator.loadBankingRule(onSuccess, onFailure);
  }

  saveBankingRule = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(false);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BANKING_RULE_RECEIVE_MONEY,
        content: message,
      });

      this.redirectToBankingRuleList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.saveBankingRule(onSuccess, onFailure);
  }

  deleteBankingRule = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BANKING_RULE_RECEIVE_MONEY,
        content: message,
      });

      this.redirectToBankingRuleList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.deleteBankingRule(onSuccess, onFailure);
  }

  redirectToBankingRuleList = () => {
    const state = this.store.getState();
    window.location.href = getBankingRuleListUrl(state);
  }

  addTableRow = (row) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.addTableRow(row);
  };

  changeTableRow = (index, key, value) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.changeTableRow(index, key, value);
  };

  removeTableRow = (index) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.removeTableRow(index);
  };

  formatAmount = ({ index }) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.formatAmount(index);
  };

  updateForm = ({ key, value }) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.updateForm(key, value);
  };

  openDeleteModal = () => {
    this.dispatcher.setModalType(ModalType.DELETE);
  }

  openCancelModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPagedEdited(state);

    if (isPageEdited) {
      this.dispatcher.setModalType(ModalType.CANCEL);
    } else {
      this.redirectToBankingRuleList();
    }
  }

  dismissModal = () => {
    this.dispatcher.setModalType('');
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveBankingRule,
    });
    this.loadBankingRule();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
