import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  OPEN_MODAL,
  RECORD_PAY_SUPER,
  SELECT_ALL_SUPER_PAYMENTS,
  SELECT_ITEM_SUPER_PAYMENT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPER_PAYMENTS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_BATCH_PAYMENT_ID,
  UPDATE_DETAIL_HEADER_FIELDS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './paySuperCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_CREATED_SUPER_PAYMENT } from '../paySuperMessageTypes';
import {
  getAppliedFilterOptions,
  getBatchPaymentId,
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getRecordPaySuperContent,
  getRegion,
  getSortOrder,
  getSuperPaymentListUrl,
} from './paySuperCreateSelector';
import EmployeePayModalModule from '../../employeePay/employeePayModal/EmployeePayModalModule';
import ModalType from './ModalType';
import PaySuperAuthorisationModalModule from '../paySuperAuthorisationModal/PaySuperAuthorisationModalModule';
import PaySuperCreateView from './components/PaySuperCreateView';
import Store from '../../../store/Store';
import paySuperCreateReducer from './paySuperCreateReducer';

export default class PaySuperCreateModule {
  constructor({
    setRootView,
    integration,
    pushMessage,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(paySuperCreateReducer);
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.subModules = {
      employeePayModal: new EmployeePayModalModule({
        integration,
      }),
      paySuperAuthorisationModal: new PaySuperAuthorisationModalModule({
        integration,
        onClose: this.goToSuperPaymentList,
        onAuthoriseSuccess: this.onAuthoriseSuccess,
      }),
    };
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadAccountsAndSuperPayments();
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

  onAuthoriseSuccess = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_CREATED_SUPER_PAYMENT,
      content: message,
    });
    this.goToSuperPaymentList();
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

  filterSuperPayments = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.fetchSuperPayments({
      filterOptions,
    });
    this.updateAppliedFilterOptions(filterOptions);
  }

  fetchSuperPayments = ({ filterOptions }) => {
    this.setIsTableLoading(true);
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_SUPER_PAYMENTS;
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

  loadAccountsAndSuperPayments = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent: LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
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
      intent: LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
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

  sortSuperPayments = (orderBy) => {
    const state = this.store.getState();
    const filterOptions = getAppliedFilterOptions(state);

    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    this.fetchSuperPayments({
      filterOptions,
    });
  }

  recordPaySuper = () => {
    const state = this.store.getState();
    const intent = RECORD_PAY_SUPER;
    const content = getRecordPaySuperContent(state);
    this.setIsLoading(true);

    const onSuccess = (response) => {
      this.setIsLoading(false);
      this.store.dispatch({
        intent: UPDATE_BATCH_PAYMENT_ID,
        batchPaymentId: response.batchPaymentId,
      });
      this.openModal(ModalType.AUTHORISE);
    };

    const onFailure = ({ message }) => {
      this.setIsLoading(false);
      this.closeModal();
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

  openAuthoriseModal = () => {
    this.closeModal();
    const state = this.store.getState();
    const context = {
      batchPaymentId: getBatchPaymentId(state),
      businessId: getBusinessId(state),
    };
    this.subModules.paySuperAuthorisationModal.openModal(context);
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
      intent: SELECT_ALL_SUPER_PAYMENTS,
      isSelected,
    });
  }

  selectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: SELECT_ITEM_SUPER_PAYMENT,
      isSelected,
      item,
    });
  }

  updateInputField = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_DETAIL_HEADER_FIELDS,
      key,
      value,
    });
  }

  render = () => {
    const employeeTransactionModal = this.subModules.employeePayModal.getView();
    const paySuperAuthorisationModal = this.subModules.paySuperAuthorisationModal.getView();

    const view = (
      <PaySuperCreateView
        selectAll={this.selectAll}
        selectItem={this.selectItem}
        onAccountChange={this.updateSelectedAccountId}
        onInputChange={this.updateInputField}
        onSort={this.sortSuperPayments}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onApplyFilter={this.filterSuperPayments}
        employeeTransactionModal={employeeTransactionModal}
        paySuperAuthorisationModal={paySuperAuthorisationModal}
        onDateLinkClick={this.openEmployeeTransactionModal}
        onDismissAlert={this.dismissAlert}
        onRecord={this.recordPaySuper}
        onCloseModalClick={this.goToSuperPaymentList}
        onCancelButtonClick={this.goToSuperPaymentList}
        onModalCancelButtonClick={this.goToSuperPaymentList}
        onDoNotAuthoriseButtonClick={this.goToSuperPaymentList}
        onAuthoriseButtonClick={this.authoriseSuperPayment}
        onYesAuthoriseButtonClick={this.openAuthoriseModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>);

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

  goToSuperPaymentList = () => {
    const state = this.store.getState();
    window.location.href = getSuperPaymentListUrl(state);
  }

  openModal = (modalType) => {
    this.closeModal();
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
