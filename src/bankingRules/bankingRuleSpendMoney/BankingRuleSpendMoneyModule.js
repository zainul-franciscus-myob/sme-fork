import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BANKING_RULE_SPEND_MONEY, SUCCESSFULLY_SAVED_BANKING_RULE_SPEND_MONEY } from './BankingRuleSpendMoneyMessageTypes';
import {
  getBankingRuleListUrl,
  getIsPagedEdited,
  getModalUrl,
  getSaveUrl,
} from './bankingRuleSpendMoneySelectors';
import BankingRuleSpendMoneyView from './components/BankingRuleSpendMoneyView';
import ModalType from './ModalType';
import Store from '../../store/Store';
import bankingRuleSpendMoneyReducer from './bankingRuleSpendMoneyReducer';
import createBankingRuleSpendMoneyDispatcher from './createBankingRuleSpendMoneyDispatcher';
import createBankingRuleSpendMoneyIntegrator from './createBankingRuleSpendMoneyIntegrator';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class BankingRuleSpendMoneyModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(bankingRuleSpendMoneyReducer);
    this.dispatcher = createBankingRuleSpendMoneyDispatcher(this.store);
    this.integrator = createBankingRuleSpendMoneyIntegrator(this.store, this.integration);
  }

  render = () => {
    const bankingRuleSpendMoneyView = (
      <BankingRuleSpendMoneyView
        onRuleDetailsChange={this.updateForm}
        onRuleConditionsChange={this.updateForm}
        onRowInputBlur={this.formatAmount}
        onAddRow={this.addTableRow}
        onRowChange={this.changeTableRow}
        onRemoveRow={this.removeTableRow}
        onSaveButtonClick={this.saveBankingRule}
        onCancelButtonClick={this.cancelBankingRule}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.dismissModal}
        onConfirmDeleteButtonClick={this.deleteBankingRule}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onConfirmSave={this.saveBankingRule}
        onDismissAlert={this.dispatcher.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {bankingRuleSpendMoneyView}
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
    const state = this.store.getState();
    this.dispatcher.setLoadingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(false);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BANKING_RULE_SPEND_MONEY,
        content: message,
      });

      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.displayAlert(message);
      this.dismissModal();
    };

    this.integrator.saveBankingRule(onSuccess, onFailure);
  }

  deleteBankingRule = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BANKING_RULE_SPEND_MONEY,
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
    const url = getBankingRuleListUrl(state);
    this.redirectToUrl(url);
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  }

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
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
    const state = this.store.getState();
    const url = getBankingRuleListUrl(state);
    this.dispatcher.openModal({ type: ModalType.DELETE, url });
  }

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  }

  cancelBankingRule = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPagedEdited(state);
    const url = getBankingRuleListUrl(state);

    if (isPageEdited) {
      this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
    } else {
      this.redirectToBankingRuleList();
    }
  }

  dismissModal = () => {
    this.dispatcher.closeModal();
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

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPagedEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
