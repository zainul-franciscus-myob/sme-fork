import { Provider } from 'react-redux';
import React from 'react';

import {
  flipSortOrder,
  getAppliedFilterOptions,
  getFilterOptions,
  getIsPaymentDateToday,
  getOrderBy,
} from './ElectronicPaymentsCreateSelector';
import ElectronicPaymentsCreateView from './components/ElectronicPaymentsCreateView';
import ModalType from './ModalType';
import Store from '../../store/Store';
import createElectronicPaymentsCreateDispatcher from './createElectronicPaymentsCreateDispatcher';
import createElectronicPaymentsCreateIntegrator from './createElectronicPaymentsCreateIntegrator';
import electronicPaymentsCreateReducer from './electronicPaymentsCreateReducer';
import openBlob from '../../common/blobOpener/openBlob';

const downloadAsFile = (content, filename) => {
  /**
   * This approach was implemented after discussions with both frontend and backend team
   * members. Due to the significant amount of effort required for the backend team to decouple
   * the 'record electronic payment' and 'download bank file' pieces of functionality. This
   * method allows the bank file content to be passed through to the frontend as part of the
   * 'record electronic payments' endpoint response.
   *
   * Unfortunately this is the only method which would allow both the file to be downloaded
   * without user intervention and for the filename to be controlled.
   */
  const blob = new Blob([content], { type: 'text/plain' });

  openBlob({
    blob,
    filename,
    shouldDownload: true,
  });
};

export default class ElectronicPaymentsModule {
  constructor({ setRootView, integration }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(electronicPaymentsCreateReducer);
    this.dispatcher = createElectronicPaymentsCreateDispatcher(this.store);
    this.integrator = createElectronicPaymentsCreateIntegrator(this.store, this.integration);
  }

  loadAccountsAndElectronicPayments = () => {
    this.dispatcher.setIsLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsLoading(false);
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setAccountsAndTransaction(response);
    };

    const onFailure = (message) => {
      console.log(`Failed to load accounts and transactions. ${message}`);
    };

    this.integrator.loadAccountsAndElectronicPayments({ onSuccess, onFailure });
  };

  fetchTransactions = ({ filterOptions }) => {
    this.dispatcher.setIsTableLoading(true);

    const onSuccess = ({ entries }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setTransactions(entries);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.fetchElectronicPayments({ filterOptions, onSuccess, onFailure });
  };

  recordAndDownloadBankFile = () => {
    this.dispatcher.closeModal();
    this.dispatcher.setIsLoading(true);

    const onSuccess = (response) => {
      const { content, filename, message } = response;
      downloadAsFile(content, filename);
      this.dispatcher.setAlert({ type: 'success', message });
      this.loadAccountsAndElectronicPayments();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsLoading(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.recordAndDownloadBankFile({ onSuccess, onFailure });
  };

  filterElectronicPayments = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);
    this.fetchTransactions({ filterOptions });
    this.dispatcher.updateAppliedFilterOptions(filterOptions);
  };

  sortElectronicPayments = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    const filterOptions = getAppliedFilterOptions(state);
    this.fetchTransactions({ filterOptions });
  };

  openModal = () => {
    const state = this.store.getState();
    const modalType = getIsPaymentDateToday(state)
      ? ModalType.RECORD_AND_CREATE_BANK_FILE : ModalType.DATE_MISMATCH;
    this.dispatcher.openModal(modalType);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadAccountsAndElectronicPayments();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <ElectronicPaymentsCreateView
          onUpdateFilterBarOptions={this.dispatcher.updateFilterBarOptions}
          onApplyFilter={this.filterElectronicPayments}
          onAccountChange={this.dispatcher.updateSelectedAccountId}
          selectAll={this.dispatcher.selectAll}
          selectItem={this.dispatcher.selectItem}
          onSort={this.sortElectronicPayments}
          onDismissAlert={this.dispatcher.dismissAlert}
          onRecordAndDownloadBankFile={this.openModal}
          onInputChange={this.dispatcher.updateInputField}
          onCancelButtonClick={this.dispatcher.closeModal}
          onRecordButtonClick={this.recordAndDownloadBankFile}
          onContinueButtonClick={this.recordAndDownloadBankFile}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
