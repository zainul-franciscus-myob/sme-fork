import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_CREATED_SUPER_PAYMENT } from '../../../common/types/MessageTypes';
import {
  getBatchPaymentId,
  getBusinessId,
  getOrderBy,
  getRegion,
  getSuperPaymentListUrl,
} from './paySuperCreateSelector';
import EmployeePayModalModule from '../../employeePay/employeePayModal/EmployeePayModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import PaySuperAuthorisationModalModule from '../paySuperAuthorisationModal/PaySuperAuthorisationModalModule';
import PaySuperCreateView from './components/PaySuperCreateView';
import Store from '../../../store/Store';
import StsLoginModule from '../../stsLogin/StsLoginModule';
import createPaySuperCreateDispatcher from './createPaySuperCreateDispatcher';
import createPaySuperCreateIntegrator from './createPaySuperCreateIntegrator';
import paySuperCreateReducer from './paySuperCreateReducer';

export default class PaySuperCreateModule {
  constructor({ setRootView, integration, pushMessage, featureToggles }) {
    this.setRootView = setRootView;
    this.store = new Store(paySuperCreateReducer);
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createPaySuperCreateDispatcher(this.store);
    this.integrator = createPaySuperCreateIntegrator(this.store, integration);
    this.featureToggles = featureToggles;
    this.subModules = {
      employeePayModal: new EmployeePayModalModule({
        integration,
        onDelete: this.onEmployeePayDeleteSuccess,
        featureToggles: this.featureToggles,
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

  updateFilterBarOptions = ({ filterName, value }) => {
    this.dispatcher.updateFilterBarOptions({ filterName, value });
    this.sortAndFilterSuperPayments();
  };

  resetFilterBarOptions = () => {
    this.dispatcher.resetFilterBarOptions();
    this.sortAndFilterSuperPayments();
  };

  sortAndFilterSuperPayments = () => {
    this.dispatcher.setIsTableLoading(true);

    const onSuccess = ({ entries }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.sortAndFilterPayments(entries);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterSuperPayments({ onSuccess, onFailure });
  };

  getFirstAccountId = (accounts) => accounts && accounts[0] && accounts[0].id;

  loadAccountsAndSuperPayments = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.loadAccountsAndPayments(response);

      const firstAccountId = this.getFirstAccountId(
        response && response.accounts
      );
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
    const newSortOrder =
      orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterSuperPayments();
  };

  recordPaySuper = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.updateBatchPaymentId(response.batchPaymentId);
      this.openModal(ModalType.AUTHORISE);
    };

    const onFailure = ({ message, fieldErrors }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.closeModal();
      this.setAlert(message);
      if (fieldErrors) this.setInlineErrors(fieldErrors);
    };

    this.integrator.recordPaySuper({ onSuccess, onFailure });
  };

  setInlineErrors = (fieldErrors) =>
    this.dispatcher.setInlineErrors(fieldErrors);

  setAlert = (message) => this.dispatcher.setAlert({ type: 'danger', message });

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
      readonly: true,
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
          onUpdateFilterBarOptions={this.updateFilterBarOptions}
          onResetFilterBarOptions={this.resetFilterBarOptions}
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
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
