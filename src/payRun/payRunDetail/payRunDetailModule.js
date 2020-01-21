import { Provider } from 'react-redux';
import React from 'react';

import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  LOAD_PAY_RUN_DETAILS,
  PRINT_TAB_SELECT_ALL,
  PRINT_TAB_SELECT_ITEM,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PDF_LOADING_STATE,
  SET_TAB,
} from './payRunDetailIntents';
import { EXPORT_TRANSACTION_PDF } from '../payRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getBusinessId,
  getEmailPaySlipModalContext,
  getEmailSettings,
  getEmployeePayModalContext,
  getPayRunListUrl,
  getSelectedEmployeesToEmail,
  getUrlParams,
} from './payRunDetailSelector';
import EmailPaySlipModalModule from '../../modules/employeePay/emailPaySlipModal/EmailPaySlipModalModule';
import EmployeePayModalModule from '../../modules/employeePay/employeePayModal/EmployeePayModalModule';
import LoadingState from '../../components/PageView/LoadingState';
import PayRunDetailView from './components/PayRunDetailView';
import Store from '../../store/Store';
import openBlob from '../../common/blobOpener/openBlob';
import payRunDetailReducer from './payRunDetailReducer';

export default class PayRunDetailModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(payRunDetailReducer);
    this.setRootView = setRootView;
    this.emailPaySlipModal = new EmailPaySlipModalModule({ integration });

    this.employeePayModal = new EmployeePayModalModule({
      integration,
      onDelete: this.onEmployeePayDeleteSuccess,
    });
  }

  setAlert = ({ message, type }) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: { message, type },
    });
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  };

  setSelectedTab = (newTabId) => {
    this.store.dispatch({
      intent: SET_TAB,
      selectedTab: newTabId,
    });
  };

  emailTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ALL,
      isSelected,
    });
  };

  emailTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  };

  printTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: PRINT_TAB_SELECT_ALL,
      isSelected,
    });
  };

  printTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: PRINT_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  };

  redirectToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  };

  openPayDetailModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    const modalContext = getEmployeePayModalContext({ state, transactionId, employeeName });
    this.employeePayModal.openModal(modalContext);
  };

  openEmailPaySlipModal = () => {
    const state = this.store.getState();
    const employees = getSelectedEmployeesToEmail(state);
    const emailSettings = getEmailSettings(state);
    const context = getEmailPaySlipModalContext({ state, employees, emailSettings });
    this.emailPaySlipModal.run({ context, onClose: this.loadPayRunDetails });
  };

  resetState = () => {
    this.store.dispatch({ intent: RESET_STATE });
    this.employeePayModal.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  setLoadingState(loadingState) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  setPdfIsLoading(transactionId, isLoading) {
    this.store.dispatch({
      intent: SET_PDF_LOADING_STATE,
      transactionId,
      isLoading,
    });
  }

  onEmployeePayDeleteSuccess = (message) => {
    this.setAlert({ message, type: 'success' });
    this.loadPayRunDetails();
  };

  loadPayRunDetails = () => {
    this.setLoadingState(LoadingState.LOADING);
    const intent = LOAD_PAY_RUN_DETAILS;

    const state = this.store.getState();
    const urlParams = getUrlParams(state);

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      onSuccess,
      onFailure,
      urlParams,
      intent,
    });
  };

  exportPdf = (transactionId) => {
    const intent = EXPORT_TRANSACTION_PDF;
    const state = this.store.getState();
    this.setPdfIsLoading(transactionId, true);

    const onSuccess = (data) => {
      const filename = `payslip-${transactionId}.pdf`;
      openBlob({ blob: data, filename });
      this.setPdfIsLoading(transactionId, false);
    };

    const onFailure = (message) => {
      this.setAlert({ message, type: 'danger' });
    };

    const businessId = getBusinessId(state);
    const urlParams = { businessId, transactionId };

    this.integration.readFile({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadPayRunDetails();
  }

  render = () => {
    const employeePayModalView = this.employeePayModal.getView();
    const emailPaySlipModalView = this.emailPaySlipModal.render();

    const wrappedView = (
      <Provider store={this.store}>
        {employeePayModalView}
        {emailPaySlipModalView}
        <PayRunDetailView
          setSelectedTab={this.setSelectedTab}
          emailTabListeners={{
            selectAll: this.emailTabSelectAll,
            selectItem: this.emailTabSelectItem,
            onEmailClick: this.openEmailPaySlipModal,
          }}
          printTabListeners={{
            selectAll: this.printTabSelectAll,
            selectItem: this.printTabSelectItem,
          }}
          onBackButtonClick={this.redirectToPayRunList}
          onEmployeeNameClick={this.openPayDetailModal}
          exportPdf={this.exportPdf}
          onDismissAlert={this.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
