import { Provider } from 'react-redux';
import React from 'react';

import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  LOAD_PAY_RUN_DETAILS,
  PRINT_TAB_SELECT_ALL,
  PRINT_TAB_SELECT_ITEM,
  SET_LOADING_STATE,
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
import EmailPaySlipModalModule from '../../employeePay/emailPaySlipModal/EmailPaySlipModalModule';
import EmployeePayModalModule from '../../employeePay/employeePayModal/EmployeePayModalModule';
import PayRunDetailView from './components/payRunDetailView';
import Store from '../../store/Store';
import openBlob from '../../common/blobOpener/openBlob';
import payRunDetailReducer from './payRunDetailReducer';

export default class PayRunDetailModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(payRunDetailReducer);
    this.setRootView = setRootView;
    this.employeePayModal = new EmployeePayModalModule({ integration });
    this.emailPaySlipModal = new EmailPaySlipModalModule({ integration });
  }

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
    this.store.dispatch({
      intent: RESET_STATE,
    });
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

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  loadPayRunDetails = () => {
    console.log('Loading!');
    this.setIsLoading(true);
    const intent = LOAD_PAY_RUN_DETAILS;

    const state = this.store.getState();
    const urlParams = getUrlParams(state);

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setIsLoading(false);
    };
    const onFailure = message => console.log(message);

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
    const onSuccess = (data) => {
      const filename = `payslip-${transactionId}.pdf`;
      openBlob({ blob: data, filename });
    };
    const onFailure = () => {
      console.log('Failed to download PDF.');
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
        <PayRunDetailView
          employeePayModal={employeePayModalView}
          emailPaySlipModal={emailPaySlipModalView}
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
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
