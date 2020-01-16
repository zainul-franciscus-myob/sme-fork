import { Provider } from 'react-redux';
import React from 'react';

import {
  getCanImportChartOfAccounts,
  getCurrentDataTypeInCurrentTab,
  getTab,
  getUrlDataTypeParams,
} from './selectors/DataImportExportSelectors';
import DataImportExportView from './components/DataImportExportView';
import ImportExportDataType from './types/ImportExportDataType';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import TabItem from './types/TabItem';
import createDataImportExportDispatcher from './createDataImportExportDispatcher';
import createDataImportExportIntegrator from './createDataImportExportIntegrator';
import dataImportExportReducer from './dataImportExportReducer';
import keyMap from '../../hotKeys/keyMap';
import openBlob from '../../common/blobOpener/openBlob';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class DataImportExportModule {
  constructor({
    integration, setRootView, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(dataImportExportReducer);
    this.dispatcher = createDataImportExportDispatcher(this.store);
    this.integrator = createDataImportExportIntegrator(this.store, integration);
  }

  loadDataImportExport = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadDataImportExport(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadDataImportExport({ onSuccess, onFailure });
  }

  importOrExportData = () => {
    const state = this.store.getState();
    const currentTab = getTab(state);
    const currentDataTypeInCurrentTab = getCurrentDataTypeInCurrentTab(state);

    switch (currentTab) {
      case TabItem.IMPORT:
        this.importData(currentDataTypeInCurrentTab);
        break;
      case TabItem.EXPORT:
        this.exportData(currentDataTypeInCurrentTab);
        break;
      default:
    }
  };

  importData = (dataType) => {
    switch (dataType) {
      case ImportExportDataType.CHART_OF_ACCOUNTS:
        this.confirmCriteriaForImportCoaAction();
        break;
      default:
    }
  }

  exportData = (dataType) => {
    switch (dataType) {
      case ImportExportDataType.CHART_OF_ACCOUNTS:
        this.exportChartOfAccounts();
        break;
      default:
    }
  }

  confirmCriteriaForImportCoaAction = () => {
    const canImport = getCanImportChartOfAccounts(this.store.getState());
    if (canImport) {
      this.dispatcher.dismissAlert();
      this.openImportConfirmModal();
    } else {
      this.displayFailureAlert('Please fill out all required fields in order to proceed');
    }
  }

  importChartOfAccounts = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.emptyDataTypeForTab(TabItem.IMPORT);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.closeModal();
      this.displaySuccessMessage(response.message);
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.closeModal();
      this.displayFailureAlert(response.message);
    };

    this.integrator.importChartOfAccounts({ onSuccess, onFailure });
  }

  exportChartOfAccounts = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (data) => {
      this.emptyDataTypeForTab(TabItem.EXPORT);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displaySuccessMessage('Export successful! A tab-delimited TXT file has been downloaded.');

      openBlob({
        blob: data,
        filename: 'exportedChartOfAccounts.txt',
        shouldDownload: true,
      });
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displayFailureAlert(response.message);
    };

    this.integrator.exportChartOfAccounts({ onSuccess, onFailure });
  }

  emptyDataTypeForTab = tab => this.dispatcher.updateDataType({ key: tab })

  displaySuccessMessage = successMessage => this.dispatcher.setAlert({
    message: successMessage,
    type: 'success',
  });

  displayFailureAlert = errorMessage => this.dispatcher.setAlert({
    message: errorMessage,
    type: 'danger',
  });

  openImportConfirmModal = () => this.dispatcher.setModalType('importConfirmModal');

  closeModal = () => this.dispatcher.setModalType();

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <DataImportExportView
          onDismissAlert={this.dispatcher.dismissAlert}
          onSelectTab={this.dispatcher.setSelectedTab}
          onSaveButtonClick={this.importOrExportData}
          onDataTypeChange={this.dispatcher.updateDataType}
          importChartOfAccountsListeners={{
            onFileSelected: this.dispatcher.addImportChartOfAccountsFile,
            onFileRemove: this.dispatcher.removeImportChartOfAccountsFile,
            onDuplicateRecordsOptionChange: this.dispatcher.updateDuplicateRecordsOption,
            onCancelImportData: this.closeModal,
            onConfirmImportData: this.importChartOfAccounts,
          }}
          exportChartOfAccountsListeners={{
            onExportChartOfAccountsDetailChange: this.dispatcher.updateExportChartOfAccountsDetail,
          }}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  updateURLFromState = state => this.replaceURLParams(getUrlDataTypeParams(state))

  handlers = {
    SAVE_ACTION: this.importOrExportData,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadDataImportExport();
  }
}
