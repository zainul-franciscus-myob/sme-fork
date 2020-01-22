import { Provider } from 'react-redux';
import React from 'react';

import { getNewSortOrder } from './BankStatementImportListSelectors';
import BankStatementImportListReducer from './BankStatementImportListReducer';
import BankStatementImportListView from './components/BankStatementImportListView';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalTypes from './ModalTypes';
import Store from '../../../store/Store';
import createBankStatementImportListDispatcher from './CreateBankStatementImportListDispatcher';
import createBankStatementImportListIntegrator from './CreateBankStatementImportListIntegrator';

export default class BankStatementImportListModule {
  constructor({
    integration, setRootView,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(BankStatementImportListReducer);
    this.integrator = createBankStatementImportListIntegrator(this.store, integration);
    this.dispatcher = createBankStatementImportListDispatcher(this.store);
  }

  loadBankStatementImportList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankStatementImportList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankStatementImportList({ onSuccess, onFailure });
  };

  filterBankStatementImportList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterBankStatementImportList(entries, false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterBankStatementImportList({ onSuccess, onFailure, isSort: false });
  };

  sortBankStatementImportList = (orderBy) => {
    const state = this.store.getState();
    this.dispatcher.setTableLoadingState(true);

    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    const onSuccess = ({ entries }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterBankStatementImportList(entries, true);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterBankStatementImportList({ onSuccess, onFailure, isSort: true });
  };

  openImportModal = () => this.dispatcher.setModalType(ModalTypes.IMPORT);

  openDeleteModal = (id) => {
    this.dispatcher.setPendingDeleteId(id);
    this.dispatcher.setModalType(ModalTypes.DELETE);
  };

  closeModal = () => this.dispatcher.setModalType();

  importBankStatement = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.importBankStatement();
      this.dispatcher.setAlert({ message, type: 'success' });
      this.closeModal();
      this.filterBankStatementImportList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
      this.closeModal();
    };

    this.integrator.importBankStatement({ onSuccess, onFailure });
  };

  deleteBankStatement = () => {
    this.closeModal();
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.deleteBankStatement();
      this.dispatcher.setAlert({ message, type: 'success' });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.deleteBankStatement({ onSuccess, onFailure });
  };

  render = () => {
    const View = (
      <BankStatementImportListView
        onUpdateFilterBarOptions={this.dispatcher.updateFilterBarOptions}
        onUpdateImportModal={this.dispatcher.updateImportModal}
        onImportButtonClick={this.openImportModal}
        onDeleteButtonClick={this.openDeleteModal}
        onConfirmImportButtonClick={this.importBankStatement}
        onConfirmDeleteButtonClick={this.deleteBankStatement}
        onCloseModal={this.closeModal}
        onApplyFilter={this.filterBankStatementImportList}
        onDismissAlert={this.dispatcher.dismissAlert}
        onSort={this.sortBankStatementImportList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {View}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadBankStatementImportList();
  }
}
