import { Provider } from 'react-redux';
import React from 'react';

import { CUSTOMER_STATEMENT_LIST_ROUTE } from './getCustomerStatementRoutes';
import {
  getAppliedFilterOptions,
  getDefaultTemplateOption,
  getFilterOptions,
  getNewSortOrder,
  getSelectedTemplateOption,
  getSettings,
} from './selectors/customerStatementListSelectors';
import { loadSettings, saveSettings } from '../store/localStorageDriver';
import CustomerStatementListView from './components/CustomerStatementListView';
import ModalType from './ModalType';
import PDFType from './PDFType';
import Store from '../store/Store';
import createCustomerStatementListDispatcher from './createCustomerStatementListDispatcher';
import createCustomerStatementListIntegrator from './createCustomerStatementListIntegrator';
import customerStatementListReducer from './customerStatementListReducer';
import openBlob from '../blobOpener/openBlob';

export default class CustomerStatementListModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(customerStatementListReducer);
    this.dispatcher = createCustomerStatementListDispatcher(this.store);
    this.integrator = createCustomerStatementListIntegrator(this.store, this.integration);
  }

  loadCustomerStatementList = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadCustomerStatementList(payload);
    };

    const onFailure = () => console.log('Failed to load customer statements');

    this.integrator.loadCustomerStatementList({ onSuccess, onFailure });
  }

  filterCustomerStatementList = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCustomerStatementList(payload, filterOptions);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.sortAndfilterCustomerStatementList({ onSuccess, onFailure });
  }

  sortCustomerStatementsList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    const filterOptions = getAppliedFilterOptions(state);

    this.dispatcher.setTableLoadingState(true);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCustomerStatementList(payload, filterOptions);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.sortAndfilterCustomerStatementList({ onSuccess, onFailure });
  }

  selectPdfOption = (pdfOption) => {
    if (pdfOption === PDFType.DEFAULT_TEMPLATE) {
      this.downloadDefaultPdf();
    } else if (pdfOption === PDFType.CHOOSE_TEMPLATE) {
      this.dispatcher.openModal(ModalType.PDF);
    }
  }

  downloadDefaultPdf = () => {
    const state = this.store.getState();
    const templateOption = getDefaultTemplateOption(state);

    this.dispatcher.setAreActionsDisabled(true);

    const onSuccess = (data) => {
      this.dispatcher.setAreActionsDisabled(false);
      this.dispatcher.unselectAllCustomerStatements();
      this.dispatcher.setAlert({
        message: 'Success! Your customer statements have been downloaded.',
        type: 'success',
      });
      openBlob(data, 'customer-statements', '_self');
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAreActionsDisabled(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.downloadPdf({ onSuccess, onFailure, templateOption });
  }

  downloadPdf = () => {
    const state = this.store.getState();
    const templateOption = getSelectedTemplateOption(state);

    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (data) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.closeModal();
      this.dispatcher.unselectAllCustomerStatements();
      this.dispatcher.setAlert({
        message: 'Success! Your customer statements have been downloaded.',
        type: 'success',
      });
      openBlob(data, 'customer-statements', '_self');
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.setModalAlertMessage(message);
    };

    this.integrator.downloadPdf({ onSuccess, onFailure, templateOption });
  }

  sendEmail = () => {
    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.closeModal();
      this.dispatcher.setAlert({
        message,
        type: 'success',
      });
      this.dispatcher.unselectAllCustomerStatements();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.setModalAlertMessage(message);
    };

    this.integrator.sendEmail({ onSuccess, onFailure });
  }

  openEmailModal = () => this.dispatcher.openModal(ModalType.EMAIL)

  dismissModalAlert = () => this.dispatcher.setModalAlertMessage('');

  dismissAlert = () => this.dispatcher.setAlert(undefined);

  render = () => {
    const view = (
      <CustomerStatementListView
        onApplyFilters={this.filterCustomerStatementList}
        onUpdateFilters={this.dispatcher.updateFilterOptions}
        onToggleAllCustomerStatements={this.dispatcher.toggleAllCustomerStatements}
        onSelectCustomerStatement={this.dispatcher.selectCustomerStatement}
        onSelectPdfDropdown={this.selectPdfOption}
        onClickEmailButton={this.openEmailModal}
        onDismissModal={this.dispatcher.closeModal}
        onDismissModalAlert={this.dismissModalAlert}
        onDismissAlert={this.dismissAlert}
        onDownloadPdf={this.downloadPdf}
        onUpdateTemplateOption={this.dispatcher.updateTemplateOption}
        onSendEmail={this.sendEmail}
        onUpdateEmailOptions={this.dispatcher.updateEmailOption}
        onSort={this.sortCustomerStatementsList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  run(context) {
    const settings = loadSettings(context.businessId, CUSTOMER_STATEMENT_LIST_ROUTE);
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.dispatcher.setLoadingState(true);
    this.store.subscribe(state => (
      saveSettings(context.businessId, CUSTOMER_STATEMENT_LIST_ROUTE, getSettings(state))
    ));
    this.loadCustomerStatementList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.dispatcher.resetState();
  }
}