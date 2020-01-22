import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BANKING_RULE, SUCCESSFULLY_SAVED_BANKING_RULE } from './BankingRuleDetailMessageTypes';
import {
  getBankingRuleListUrl,
  getIsPagedEdited,
  getLoadingState,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
} from './bankingRuleDetailSelectors';
import BankingRuleDetailView from './components/BankingRuleDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import Store from '../../../store/Store';
import bankingRuleDetailReducer from './reducers';
import createBankingRuleDetailDispatcher from './createBankingRuleDetailDispatcher';
import createBankingRuleDetailIntegrator from './createBankingRuleDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BankingRuleDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(bankingRuleDetailReducer);
    this.dispatcher = createBankingRuleDetailDispatcher(this.store);
    this.integrator = createBankingRuleDetailIntegrator(this.store, this.integration);
  }

  render = () => {
    const bankingRuleDetailView = (
      <BankingRuleDetailView
        onRuleDetailsChange={this.updateForm}
        onRuleConditionsChange={this.updateForm}
        onConditionChange={this.updateRuleCondition}
        onConditionAdd={this.addRuleCondition}
        onPredicateAdd={this.addConditionPredicate}
        onPredicateChange={this.updateConditionPredicate}
        onPredicateRemove={this.removeConditionPredicate}
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
        {bankingRuleDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  loadBankingRule = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = intent => (bankingRule) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankingRule(intent, bankingRule);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankingRule(onSuccess, onFailure);
  }

  saveBankingRule = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BANKING_RULE,
        content: message,
      });

      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.displayAlert(message);
      this.dismissModal();
    };

    this.integrator.saveBankingRule(onSuccess, onFailure);
  }

  deleteBankingRule = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BANKING_RULE,
        content: message,
      });

      this.redirectToBankingRuleList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
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

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.saveBankingRule();
        break;
    }
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveHandler,
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
