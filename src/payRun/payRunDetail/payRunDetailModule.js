import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  LOAD_EMPLOYEE_PAY_DETAIL,
  LOAD_PAY_RUN_DETAILS,
  OPEN_MODAL,
  PRINT_TAB_SELECT_ALL,
  PRINT_TAB_SELECT_ITEM,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_IS_MODAL_LOADING,
  SET_LOADING_STATE,
  SET_MODAL_EMPLOYEE_DETAILS,
  SET_TAB,
} from './payRunDetailIntents';
import { EXPORT_TRANSACTION_PDF } from '../payRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getBusinessId, getPayRunListUrl, getUrlParams } from './payRunDetailSelector';
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
  }

  render = () => {
    const payRunDetailView = (
      <PayRunDetailView
        setSelectedTab={this.setSelectedTab}
        emailTabListeners={{
          selectAll: this.emailTabSelectAll,
          selectItem: this.emailTabSelectItem,
        }}
        printTabListeners={{
          selectAll: this.printTabSelectAll,
          selectItem: this.printTabSelectItem,
        }}
        onCancelButtonClick={this.hidePayDetailModal}
        onBackButtonClick={this.redirectToPayRunList}
        onEmployeeNameClick={this.openPayDetailModal}
        onDeletePopoverCancel={this.closeDeletePopover}
        onDeleteButtonClick={this.openDeletePopover}
        exportPdf={this.exportPdf}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunDetailView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  setSelectedTab = (newTabId) => {
    this.store.dispatch({
      intent: SET_TAB,
      selectedTab: newTabId,
    });
  }

  emailTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ALL,
      isSelected,
    });
  }

  emailTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  }

  printTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: PRINT_TAB_SELECT_ALL,
      isSelected,
    });
  }

  printTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: PRINT_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  }

  redirectToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  }

  openPayDetailModal = (transactionId, employeeName) => {
    this.setEmployeeDetails({ employeeName });
    this.loadEmployeePayDetail(transactionId);
    this.showPayDetailModal();
  };

  closeDeletePopover = () => {
    this.store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: false,
    });
  }

  openDeletePopover = () => {
    this.store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: true,
    });
  }

  loadEmployeePayDetail = (transactionId) => {
    this.setIsModalLoading(true);
    const state = this.store.getState();
    const urlParams = { ...getUrlParams(state), transactionId };

    const onSuccess = (employeeDetails) => {
      this.setEmployeeDetails(employeeDetails);
      this.setIsModalLoading(false);
    };

    const onFailure = message => console.log(message);

    this.integration.read({
      onSuccess,
      onFailure,
      urlParams,
      intent: LOAD_EMPLOYEE_PAY_DETAIL,
    });
  };

  setEmployeeDetails = (employeeDetails) => {
    this.store.dispatch({
      intent: SET_MODAL_EMPLOYEE_DETAILS,
      employeeDetails,
    });
  }

  setIsModalLoading =(isModalLoading) => {
    this.store.dispatch({
      intent: SET_IS_MODAL_LOADING,
      isModalLoading,
    });
  }

  showPayDetailModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
    });
  }

  hidePayDetailModal = () => {
    this.store.dispatch({
      intent: CLOSE_MODAL,
    });
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  loadPayRunDetails = () => {
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
  }

  exportPdf = (transactionId) => {
    const intent = EXPORT_TRANSACTION_PDF;
    const state = this.store.getState();
    const onSuccess = (data) => {
      const filename = `payslip-${transactionId}.pdf`;
      openBlob(data, filename);
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
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadPayRunDetails();
  }
}
