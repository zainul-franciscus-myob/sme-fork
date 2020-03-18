import { Provider } from 'react-redux';
import React from 'react';

import {
  getDefaultTemplateOption,
  getFileName,
  getIsModalSubmitting,
  getNewSortOrder,
  getOpenedModalType,
  getSelectedTemplateOption,
  getSettings,
} from './selectors/customerStatementListSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import CustomerStatementListView from './components/CustomerStatementListView';
import LoadingState from '../../components/PageView/LoadingState';
import ModalType from './ModalType';
import PDFType from './PDFType';
import RouteName from '../../router/RouteName';
import Store from '../../store/Store';
import createCustomerStatementListDispatcher from './createCustomerStatementListDispatcher';
import createCustomerStatementListIntegrator from './createCustomerStatementListIntegrator';
import customerStatementListReducer from './customerStatementListReducer';
import keyMap from '../../hotKeys/keyMap';
import openBlob from '../../common/blobOpener/openBlob';
import setupHotKeys from '../../hotKeys/setupHotKeys';

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
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadCustomerStatementList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadCustomerStatementList({ onSuccess, onFailure });
  }

  sortAndfilterCustomerStatementList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCustomerStatementList(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.sortAndfilterCustomerStatementList({ onSuccess, onFailure });
  };

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndfilterCustomerStatementList();
  };

  selectPDFOption = (pdfOption) => {
    if (pdfOption === PDFType.DEFAULT_TEMPLATE) {
      this.downloadDefaultPDF();
    } else if (pdfOption === PDFType.CHOOSE_TEMPLATE) {
      this.dispatcher.openModal(ModalType.PDF);
    }
  };

  downloadDefaultPDF = () => {
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
      openBlob({
        blob: data,
        filename: getFileName(state),
        shouldDownload: true,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAreActionsDisabled(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.downloadPDF({ onSuccess, onFailure, templateOption });
  }

  downloadPDF = () => {
    const state = this.store.getState();
    if (getIsModalSubmitting(state)) return;

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
      openBlob({
        blob: data,
        filename: getFileName(state),
        shouldDownload: true,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.setModalAlertMessage(message);
    };

    this.integrator.downloadPDF({ onSuccess, onFailure, templateOption });
  }

  sendEmail = () => {
    if (getIsModalSubmitting(this.store.getState())) return;

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

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions({ key, value });

    this.sortAndfilterCustomerStatementList();
  };

  render = () => {
    const view = (
      <CustomerStatementListView
        onUpdateFilters={this.updateFilterOptions}
        onUpdateTemplateAdditionalOptions={this.dispatcher.updateTemplateAdditionalOptions}
        onToggleAllCustomerStatements={this.dispatcher.toggleAllCustomerStatements}
        onSelectCustomerStatement={this.dispatcher.selectCustomerStatement}
        onSelectPDFDropdown={this.selectPDFOption}
        onClickEmailButton={this.openEmailModal}
        onDismissModal={this.dispatcher.closeModal}
        onDismissModalAlert={this.dismissModalAlert}
        onDismissAlert={this.dismissAlert}
        onDownloadPDF={this.downloadPDF}
        onUpdateTemplateOption={this.dispatcher.updateTemplateOption}
        onSendEmail={this.sendEmail}
        onUpdateEmailOptions={this.dispatcher.updateEmailOption}
        onSort={this.updateSortOrder}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.EMAIL:
        this.sendEmail();
        break;
      case ModalType.PDF:
        this.downloadPDF();
        break;
      default:
        // DO NOTHING
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    const settings = loadSettings(context.businessId, RouteName.CUSTOMER_STATEMENT_LIST);
    this.dispatcher.setInitialState(context, settings);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.store.subscribe(state => (
      saveSettings(context.businessId, RouteName.CUSTOMER_STATEMENT_LIST, getSettings(state))
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
