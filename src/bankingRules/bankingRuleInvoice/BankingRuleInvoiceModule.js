import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BANKING_RULE_INVOICE, SUCCESSFULLY_SAVED_BANKING_RULE_INVOICE } from './BankingRuleInvoiceMessageTypes';
import {
  getBankingRuleListUrl,
  getIsPagedEdited,
} from './bankingRuleInvoiceSelectors';
import BankingRuleInvoiceView from './components/BankingRuleInvoiceView';
import ModalType from './ModalType';
import Store from '../../store/Store';
import bankingRuleInvoiceReducer from './bankingRuleInvoiceReducer';
import createBankingRuleInvoiceDispatcher from './createBankingRuleInvoiceDispatcher';
import createBankingRuleInvoiceIntegrator from './createBankingRuleInvoiceIntegrator';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class BankingRuleInvoiceModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(bankingRuleInvoiceReducer);
    this.dispatcher = createBankingRuleInvoiceDispatcher(this.store);
    this.integrator = createBankingRuleInvoiceIntegrator(this.store, this.integration);
  }

  render = () => {
    const bankingRuleInvoiceView = (
      <BankingRuleInvoiceView
        onRuleDetailsChange={this.updateForm}
        onRuleConditionsChange={this.updateForm}
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
        {bankingRuleInvoiceView}
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
        type: SUCCESSFULLY_SAVED_BANKING_RULE_INVOICE,
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
        type: SUCCESSFULLY_DELETED_BANKING_RULE_INVOICE,
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
