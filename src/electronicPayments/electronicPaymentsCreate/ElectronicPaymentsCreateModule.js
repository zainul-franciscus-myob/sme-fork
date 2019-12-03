import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
  OPEN_MODAL,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SELECT_ALL_ELECTRONIC_PAYMENTS,
  SELECT_ITEM_ELECTRONIC_PAYMENT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_BANK_FILE_DETAILS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from '../ElectronicPaymentsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getDateOfPayment,
  getFilterOptions,
  getOrderBy,
  getRecordAndDownloadBankFileContent,
  getRegion,
  getSortOrder,
} from '../ElectronicPaymentsSelector';
import ElectronicPaymentsCreateView from './components/ElectronicPaymentsCreateView';
import EmployeeTransactionModalModule from '../../employeePay/employeeTransactionModal/EmployeeTransactionModalModule';
import ModalType from './ModalType';
import Store from '../../store/Store';
import electronicPaymentsCreateReducer from './electronicPaymentsCreateReducer';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';
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
  const base64EncodedContent = btoa(content);
  const dataURL = `data:application/octet-stream;charset=utf-8;base64,${base64EncodedContent}`;

  openBlob({
    blob: dataURL,
    filename,
    shouldDownload: true,
  });
};

export default class ElectronicPaymentsModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(electronicPaymentsCreateReducer);
    this.integration = integration;
    this.subModules = {
      employeePayModal: new EmployeeTransactionModalModule({
        integration,
      }),
    };
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadAccountsAndElectronicPayments();
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setIsTableLoading(isTableLoading) {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  updateSelectedAccountId = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SELECTED_ACCOUNT_ID,
      key,
      value,
    });
  }

  updateFilterBarOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  }

  filterElectronicPayments = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.fetchElectronicPayments({
      filterOptions,
    });
    this.updateAppliedFilterOptions(filterOptions);
  }

  fetchElectronicPayments = ({ filterOptions }) => {
    this.setIsTableLoading(true);
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_ELECTRONIC_PAYMENTS;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const onSuccess = ({ entries }) => {
      this.store.dispatch({
        intent,
        entries,
      });
      this.setIsTableLoading(false);
    };
    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  }

  updateAppliedFilterOptions = (filterOptions) => {
    this.store.dispatch({
      intent: UPDATE_APPLIED_FILTER_OPTIONS,
      filterOptions,
    });
  }

  getFirstAccountId = (accounts) => {
    const firstAccountId = accounts && accounts[0] && accounts[0].id;
    return firstAccountId;
  }

  loadAccountsAndElectronicPayments = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent: LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
        response,
      });

      const firstAccountId = this.getFirstAccountId(response && response.accounts);
      this.store.dispatch({
        intent: UPDATE_SELECTED_ACCOUNT_ID,
        value: firstAccountId,
      });
      this.setIsLoading(false);
      this.setIsTableLoading(false);
    };
    const onFailure = () => { };

    this.integration.read({
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
      intent: LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
    });
  }

  flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  }

  sortElectronicPayments = (orderBy) => {
    const state = this.store.getState();
    const filterOptions = getAppliedFilterOptions(state);

    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    this.fetchElectronicPayments({
      filterOptions,
    });
  }

  recordAndDownloadBankFile = () => {
    const state = this.store.getState();
    const intent = RECORD_AND_DOWNLOAD_BANK_FILE;
    this.closeModal();
    const content = getRecordAndDownloadBankFileContent(state);
    const onSuccess = (response) => {
      downloadAsFile(
        response.content,
        response.filename,
      );

      this.setAlert({
        type: 'success',
        message: response.message,
      });
      this.filterElectronicPayments();
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  selectAll = (isSelected) => {
    this.store.dispatch({
      intent: SELECT_ALL_ELECTRONIC_PAYMENTS,
      isSelected,
    });
  }

  selectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: SELECT_ITEM_ELECTRONIC_PAYMENT,
      isSelected,
      item,
    });
  }

  updateInputField = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BANK_FILE_DETAILS,
      key,
      value,
    });
  }

  render = () => {
    const employeeTransactionModal = this.subModules.employeePayModal.getView();
    const view = (
      <ElectronicPaymentsCreateView
        employeeTransactionModal={employeeTransactionModal}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onApplyFilter={this.filterElectronicPayments}
        onAccountChange={this.updateSelectedAccountId}
        selectAll={this.selectAll}
        selectItem={this.selectItem}
        onSort={this.sortElectronicPayments}
        onDismissAlert={this.dismissAlert}
        onRecordAndDownloadBankFile={this.openModal}
        onInputChange={this.updateInputField}
        onCancelButtonClick={this.closeModal}
        onRecordButtonClick={this.recordAndDownloadBankFile}
        onContinueButtonClick={this.recordAndDownloadBankFile}
        onReferenceNumberClick={this.openEmployeeTransactionModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }

  openEmployeeTransactionModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.subModules.employeePayModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
    });
  }

  openModal = () => {
    const state = this.store.getState();
    const modalType = formatIsoDate(new Date(getDateOfPayment(state))) === formatIsoDate(new Date())
      ? ModalType.RECORD_AND_CREATE_BANK_FILE : ModalType.DATE_MISMATCH;
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: modalType },
    });
  }

  closeModal = () => {
    this.store.dispatch({
      intent: CLOSE_MODAL,
    });
  }
}
