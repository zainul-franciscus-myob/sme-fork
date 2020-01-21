import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_CREATED_SUPER_PAYMENT } from '../paySuperMessageTypes';
import {
  getAppliedFilterOptions,
  getBatchPaymentId,
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getRegion,
  getSuperPaymentListUrl,
} from './paySuperCreateSelector';
import EmployeePayModalModule from '../../employeePay/employeePayModal/EmployeePayModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import PaySuperAuthorisationModalModule
  from '../paySuperAuthorisationModal/PaySuperAuthorisationModalModule';
import PaySuperCreateView from './components/PaySuperCreateView';
import Store from '../../../store/Store';
import StsLoginModule from '../stsLoginModal/StsLoginModule';
import createPaySuperCreateDispatcher from './createPaySuperCreateDispatcher';
import createPaySuperCreateIntegrator from './createPaySuperCreateIntegrator';
import paySuperCreateReducer from './paySuperCreateReducer';

export default class PaySuperCreateModule {
  constructor({ setRootView, integration, pushMessage }) {
    this.setRootView = setRootView;
    this.store = new Store(paySuperCreateReducer);
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createPaySuperCreateDispatcher(this.store);
    this.integrator = createPaySuperCreateIntegrator(this.store, integration);
    this.subModules = {
      employeePayModal: new EmployeePayModalModule({
        integration,
        onDelete: this.onEmployeePayDeleteSuccess,
      }),
      paySuperAuthorisationModal: new PaySuperAuthorisationModalModule({
        integration,
        onClose: this.goToSuperPaymentList,
        onAuthoriseSuccess: this.onAuthoriseSuccess,
      }),
      stsLoginModal: new StsLoginModule({
        integration,
        onLoggedIn: this.onLoggedIn,
        onCancel: this.goToSuperPaymentList,
      }),
    };
  }

  onLoggedIn = (accessToken) => {
    this.dispatcher.setAccessToken(accessToken);
    this.loadAccountsAndSuperPayments();
  };

  onAuthoriseSuccess = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_CREATED_SUPER_PAYMENT,
      content: message,
    });
    this.goToSuperPaymentList();
  };

  onEmployeePayDeleteSuccess = (message) => {
    this.dispatcher.setAlert({ message, type: 'success' });
    this.filterSuperPayments();
  };

  filterSuperPayments = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.fetchSuperPayments({ filterOptions });
    this.dispatcher.updateAppliedFilterOptions(filterOptions);
  };

  fetchSuperPayments = ({ filterOptions }) => {
    this.dispatcher.setIsTableLoading(true);

    const onSuccess = ({ entries }) => {
      this.dispatcher.sortAndFilterPayments(entries);
      this.dispatcher.setIsTableLoading(false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.fetchSuperPayments({ filterOptions, onSuccess, onFailure });
  };

  getFirstAccountId = accounts => accounts && accounts[0] && accounts[0].id;

  loadAccountsAndSuperPayments = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.loadAccountsAndPayments(response);

      const firstAccountId = this.getFirstAccountId(response && response.accounts);
      this.dispatcher.updateSelectedAccount(firstAccountId);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadAccountsAndSuperPayments({ onSuccess, onFailure });
  };

  flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

  sortSuperPayments = (orderBy) => {
    const state = this.store.getState();
    const filterOptions = getAppliedFilterOptions(state);

    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.fetchSuperPayments({
      filterOptions,
    });
  };

  recordPaySuper = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.updateBatchPaymentId(response.batchPaymentId);
      this.openModal(ModalType.AUTHORISE);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.closeModal();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.recordPaySuper({ onSuccess, onFailure });
  };

  openAuthoriseModal = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const context = {
      batchPaymentId: getBatchPaymentId(state),
      businessId: getBusinessId(state),
    };
    this.subModules.paySuperAuthorisationModal.openModal(context);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  openEmployeeTransactionModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.subModules.employeePayModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
    });
  };

  goToSuperPaymentList = () => {
    const state = this.store.getState();
    window.location.href = getSuperPaymentListUrl(state);
  };

  openModal = (modalType) => {
    this.dispatcher.closeModal();
    this.dispatcher.openModal(modalType);
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.subModules.stsLoginModal.run(context);
  }

  render = () => {
    const employeeTransactionModal = this.subModules.employeePayModal.getView();
    const paySuperAuthorisationModal = this.subModules.paySuperAuthorisationModal.getView();
    const stsLoginModal = this.subModules.stsLoginModal.getView();

    const wrappedView = (
      <Provider store={this.store}>
        {stsLoginModal}
        <PaySuperCreateView
          selectAll={this.dispatcher.selectAll}
          selectItem={this.dispatcher.selectItem}
          onAccountChange={this.dispatcher.updateSelectedAccountId}
          onInputChange={this.dispatcher.updateInputField}
          onSort={this.sortSuperPayments}
          onUpdateFilterBarOptions={this.dispatcher.updateFilterBarOptions}
          onApplyFilter={this.filterSuperPayments}
          employeeTransactionModal={employeeTransactionModal}
          paySuperAuthorisationModal={paySuperAuthorisationModal}
          onDateLinkClick={this.openEmployeeTransactionModal}
          onDismissAlert={this.dispatcher.dismissAlert}
          onRecord={this.recordPaySuper}
          onCloseModalClick={this.goToSuperPaymentList}
          onCancelButtonClick={this.goToSuperPaymentList}
          onModalCancelButtonClick={this.goToSuperPaymentList}
          onDoNotAuthoriseButtonClick={this.goToSuperPaymentList}
          onYesAuthoriseButtonClick={this.openAuthoriseModal}
        />
      </Provider>);

    this.setRootView(wrappedView);
  };
}
