import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsModalActive,
  getIsOutOfBalance,
  getIsSubmitting,
} from './BankReconciliationSelectors';
import BankReconciliationView from './components/BankReconciliationView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import bankReconciliationReducer from './bankReconciliationReducer';
import createBankReconciliationDispatcher from './createBankReconciliationDispatcher';
import createBankReconciliationIntegrator from './createBankReconciliationIntegrator';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class BankReconciliationModule {
  constructor({ integration, setRootView }) {
    this.store = new Store(bankReconciliationReducer);
    this.dispatcher = createBankReconciliationDispatcher(this.store);
    this.integrator = createBankReconciliationIntegrator(this.store, integration);
    this.setRootView = setRootView;
  }

  loadBankReconciliation = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.dispatcher.loadBankReconciliation(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankReconciliation({ onSuccess, onFailure });
  };

  sortAndFilterBankReconciliation = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterBankReconciliation(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.sortAndFilterBankReconciliation({ onSuccess, onFailure });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setSubmittingState = (isSubmitting) => {
    this.dispatcher.setSubmittingState(isSubmitting);
  }

  shouldLoad = (key, value) => [
    'selectedAccountId', 'statementDate',
  ].includes(key) && value.length > 0;

  updateHeaderOption = ({ key, value }) => {
    this.dispatcher.updateHeaderOption({
      key,
      value,
    });

    if (this.shouldLoad(key, value)) {
      if (key === 'selectedAccountId') {
        this.dispatcher.resetStatementDate();
      }
      this.sortAndFilterBankReconciliation();
    }
  };

  setSortOrder = (orderBy) => {
    this.dispatcher.setSortOrder(orderBy);

    this.sortAndFilterBankReconciliation();
  };

  saveBankReconciliation = () => {
    const state = this.store.getState();

    const isOutOfBalance = getIsOutOfBalance(state);
    if (isOutOfBalance) {
      this.dispatcher.openOutOfBalanceModal();
      return;
    }

    if (getIsSubmitting(state)) return;

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.dispatcher.updateReconciliationResult();
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.saveBankReconciliation({ onSuccess, onFailure });
  };

  undoReconciliation = () => {
    this.dispatcher.closeModal();
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
      this.sortAndFilterBankReconciliation();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.undoReconciliation({ onSuccess, onFailure });
  }

  render = () => {
    const bankReconciliationView = (
      <BankReconciliationView
        onUpdateHeaderOption={this.updateHeaderOption}
        onSelectRow={this.dispatcher.selectRow}
        onSelectAll={this.dispatcher.selectAll}
        onSort={this.setSortOrder}
        onReconcileButtonClick={this.saveBankReconciliation}
        onDismissAlert={this.dispatcher.dismissAlert}
        onUndoReconciliationClick={this.dispatcher.openUndoReconciliationModal}
        onModalCancel={this.dispatcher.closeModal}
        onUndoBankReconciliationModalConfirm={this.undoReconciliation}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {bankReconciliationView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    const state = this.store.getState();
    const isModalActive = getIsModalActive(state);
    if (isModalActive) return;

    this.saveBankReconciliation();
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.render();
    this.loadBankReconciliation();
  };

  resetState() {
    this.dispatcher.resetState();
  }
}
