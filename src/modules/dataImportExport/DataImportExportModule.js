import { Provider } from 'react-redux';
import React from 'react';

import {
  getChartOfAccountExportDetail,
  getCurrentDataTypeInCurrentTab,
  getDeleteUnusedAccounts,
  getFileValidationError,
  getIsFileValid,
  getTab,
} from './selectors/DataImportExportSelectors';
import DataImportExportView from './components/DataImportExportView';
import ExportStatus from './ExportStatus';
import ImportExportDataType from './types/ImportExportDataType';
import ImportExportFileType from './types/ImportExportFileType';
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
    this.pollTimer = null;
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
        if (!getIsFileValid(state)) {
          this.displayFailureAlert(getFileValidationError(state));
          return;
        }
        this.openImportConfirmModal();
        break;
      case TabItem.EXPORT:
        this.exportData(currentDataTypeInCurrentTab);
        break;
      default:
    }
  };

  exportData = (dataType) => {
    switch (dataType) {
      case ImportExportDataType.CHART_OF_ACCOUNTS:
        this.exportChartOfAccounts();
        break;
      default:
      case ImportExportDataType.COMPANY_FILE:
        this.exportCompanyFile();
        break;
    }
  }

  handleChartOfAccountsImport = (onSuccess, onFailure) => {
    const state = this.store.getState();
    const deleteUnusedAccounts = getDeleteUnusedAccounts(state);
    if (deleteUnusedAccounts) {
      const onDeleteSuccess = () => {
        this.integrator.importChartOfAccounts({ onSuccess, onFailure });
      };

      return this.integrator.bulkDeleteUnusedAccounts({ onDeleteSuccess, onFailure });
    }

    return this.integrator.importChartOfAccounts({ onSuccess, onFailure });
  };

  importData = () => {
    const state = this.store.getState();
    const dataType = getCurrentDataTypeInCurrentTab(state);
    this.closeModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.updateImportDataType(ImportExportDataType.NONE);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displaySuccessMessage(response.message);
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displayFailureAlert(response.message);
    };

    switch (dataType) {
      case ImportExportDataType.CHART_OF_ACCOUNTS:
        return this.handleChartOfAccountsImport(onSuccess, onFailure);
      case ImportExportDataType.CONTACTS:
        return this.integrator.importContacts({ onSuccess, onFailure });
      case ImportExportDataType.EMPLOYEES:
        return this.integrator.importEmployees({ onSuccess, onFailure });
      case ImportExportDataType.ITEMS:
        return this.integrator.importItems({ onSuccess, onFailure });
      case ImportExportDataType.GENERAL_JOURNALS:
        return this.integrator.importGeneralJournals({ onSuccess, onFailure });
      case ImportExportDataType.TRANSACTION_JOURNALS:
        return this.integrator.importTransactionJournals({ onSuccess, onFailure });
      case ImportExportDataType.TIMESHEETS:
        return this.integrator.importTimesheets({ onSuccess, onFailure });
      default:
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        this.displayFailureAlert('Invalid Data Type selected.');
        return undefined;
    }
  }

  exportChartOfAccounts = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (data) => {
      this.dispatcher.updateExportDataType(ImportExportDataType.NONE);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      const { fileType } = getChartOfAccountExportDetail(this.store.getState());
      const message = fileType === ImportExportFileType.TXT
        ? 'Export successful! A tab-delimited TXT file has been downloaded.'
        : 'Export successful! A CSV file has been downloaded.';
      this.displaySuccessMessage(message);

      openBlob({
        blob: data,
        filename: `exportedChartOfAccounts.${fileType.toLowerCase()}`,
        shouldDownload: true,
      });
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displayFailureAlert(response.message);
    };

    this.integrator.exportChartOfAccounts({ onSuccess, onFailure });
  }

  exportCompanyFile = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ jobId }) => this.exportCompanyFileResult(jobId);
    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displayFailureAlert(response.message);
    };

    this.integrator.exportCompanyFile({ onSuccess, onFailure });
  };

  exportCompanyFileResult = (jobId) => {
    const onSuccess = ({ status, fileUrl }) => {
      switch (status) {
        case ExportStatus.SUCCESS:
          this.dispatcher.updateExportDataType(ImportExportDataType.NONE);
          this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
          this.displaySuccessMessage('Export successful! A file has been downloaded.');
          window.open(fileUrl, '_blank');
          break;
        case ExportStatus.PENDING:
          this.pollTimer = setTimeout(() => this.exportCompanyFileResult(jobId), 5000);
          break;
        case ExportStatus.FAIL:
        default:
          this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
          this.displayFailureAlert('Export failed.');
          break;
      }
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.displayFailureAlert(response.message);
    };

    this.integrator.exportCompanyFileResult({ jobId, onSuccess, onFailure });
  }

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
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
    }

    this.store.unsubscribeAll();
  };

  updateContactsIdentifyBy = ({ value }) => {
    this.dispatcher.updateContactsIdentifyBy(value);
  }

  updateContactsType = ({ value }) => {
    this.dispatcher.updateContactsType(value);
  }

  updateImportDataType = ({ value }) => {
    this.dispatcher.updateImportDataType(value);
    this.replaceURLParams({ importType: value });
  }

  updateExportDataType = ({ value }) => {
    this.dispatcher.updateExportDataType(value);
    this.replaceURLParams({ exportType: value });
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <DataImportExportView
          onDismissAlert={this.dispatcher.dismissAlert}
          onSelectTab={this.dispatcher.setSelectedTab}
          onSaveButtonClick={this.importOrExportData}
          onUpdateExportDataType={this.updateExportDataType}
          onUpdateImportDataType={this.updateImportDataType}
          onCancelImportData={this.closeModal}
          onConfirmImportData={this.importData}
          exportChartOfAccountsListeners={{
            onExportChartOfAccountsDetailChange: this.dispatcher.updateExportChartOfAccountsDetail,
          }}
          onUpdateContactsIdentifyBy={this.updateContactsIdentifyBy}
          onUpdateContactsType={this.updateContactsType}
          exportCompanyFileListeners={{
            onChange: this.dispatcher.updateExportCompanyFileDetail,
          }}
          updateContactsIdentifyBy={this.updateContactsIdentifyBy}
          updateContactsType={this.updateContactsType}
          onFileSelected={this.dispatcher.addImportFile}
          onFileRemove={this.dispatcher.removeImportFile}
          onDuplicateRecordsOptionChange={this.dispatcher.updateDuplicateRecordsOption}
          onDeleteUnusedAccountsChange={this.dispatcher.updateDeleteUnusedAccounts}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  handlers = {
    SAVE_ACTION: this.importOrExportData,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadDataImportExport();
  }
}
