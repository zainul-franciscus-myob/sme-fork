import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_EMPLOYEE, SUCCESSFULLY_SAVED_EMPLOYEE } from '../EmployeeMessageTypes';
import { getDeductionPayItemModal } from './payrollDetails/selectors/DeductionPayItemModalSelectors';
import {
  getEmployeeDetailUrl,
  getEmployeeListUrl,
  getIsActionsDisabled,
  getIsCreating,
  getModalUrl,
  getOpenedModalType,
  getURLParams,
  isPageEdited,
} from './EmployeeDetailSelectors';
import { getExpensePayItemModal } from './payrollDetails/selectors/ExpensePayItemModalSelectors';
import { getLeavePayItemModal } from './payrollDetails/selectors/LeavePayItemModalSelectors';
import { getSuperFundModal } from './payrollDetails/selectors/SuperFundModalSelectors';
import { getSuperPayItemModal } from './payrollDetails/selectors/SuperPayItemModalSelectors';
import { getTaxPayItemModal } from './payrollDetails/selectors/PayrollTaxSelectors';
import { getTerminationDateNewlySet } from './payrollDetails/selectors/EmploymentDetailsSelectors';
import { getWagePayItemModal } from './payrollDetails/selectors/WagePayItemModalSelectors';
import ContactDetailsTabModule from './contactDetails/ContactDetailsTabModule';
import EmployeeDetailView from './components/EmployeeDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalTypes from './ModalTypes';
import PaymentDetailsTabModule from './paymentDetails/PaymentDetailsTabModule';
import PayrollDetailsTabModule from './payrollDetails/PayrollDetailsTabModule';
import Store from '../../../store/Store';
import createEmployeeDetailDispatcher from './createEmployeeDetailDispatcher';
import createEmployeeDetailIntegrator from './createEmployeeDetailIntegrator';
import employeeDetailReducer from './employeeDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

const popMessageTypes = [
  SUCCESSFULLY_SAVED_EMPLOYEE,
];

export default class EmployeeDetailModule {
  constructor({
    integration,
    setRootView,
    popMessages,
    pushMessage,
    replaceURLParams,
    globalCallbacks,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.globalCallbacks = globalCallbacks;
    this.store = new Store(employeeDetailReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.popMessageTypes = popMessageTypes;
    this.dispatcher = createEmployeeDetailDispatcher(this.store);
    this.integrator = createEmployeeDetailIntegrator(this.store, integration);
    this.subModules = {
      contactDetails: new ContactDetailsTabModule({
        integration,
        store: this.store,
        pushMessage,
      }),
      payrollDetails: new PayrollDetailsTabModule({
        integration,
        store: this.store,
        pushMessage,
        saveEmployee: this.saveEmployee,
        globalCallbacks,
      }),
      paymentDetails: new PaymentDetailsTabModule({
        integration,
        store: this.store,
        pushMessage,
        globalCallbacks,
      }),
    };
  }

  loadEmployeeDetails = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadEmployeeDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeeDetails({ onSuccess, onFailure });
  };

  deleteEmployee = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToEmployeeList();
    };

    const onFailure = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.deleteEmployee({ onSuccess, onFailure });
  };

  createOrUpdateEmployee = (onSuccess) => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onFailure = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.createOrUpdateEmployee({ onSuccess, onFailure });
  };

  saveEmployee = () => {
    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.globalCallbacks.addPaymentDetailsAndSaveSuccess();
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.pushMessage({
          type: SUCCESSFULLY_SAVED_EMPLOYEE,
          content: response.message,
        });
        this.redirectToReadEmployee(response.employeeId);
      } else {
        this.dispatcher.setIsPageEdited(false);
        this.dispatcher.updateEmployeeDetail(response);
        this.dispatcher.setAlert({
          type: 'success',
          message: response.message,
        });
      }
    };

    this.createOrUpdateEmployee(onSuccess);
  };

  saveUnsavedChanges = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EMPLOYEE,
        content: response.message,
      });

      this.redirectToUrl(url);
    };

    this.createOrUpdateEmployee(onSuccess);
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.redirectToUrl(url);
  };

  redirectToEmployeeList = () => {
    const state = this.store.getState();
    const url = getEmployeeListUrl(state);

    this.redirectToUrl(url);
  };

  redirectToReadEmployee = (employeeId) => {
    const state = this.store.getState();
    const url = getEmployeeDetailUrl(state, employeeId);

    this.redirectToUrl(url);
  };

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const url = getEmployeeListUrl(state);
    this.dispatcher.openModal({ type: ModalTypes.DELETE, url });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalTypes.UNSAVED, url });
  };

  cancelEmployee = () => {
    const state = this.store.getState();

    const url = getEmployeeListUrl(state);
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.popMessageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  };

  saveButtonClick = () => {
    const state = this.store.getState();
    if (getTerminationDateNewlySet(state)) {
      this.subModules.payrollDetails.openTerminationConfirmModal();
    } else {
      this.saveEmployee();
    }
  }

  render = () => {
    const employeeDetailView = (
      <EmployeeDetailView
        tabViews={this.subModules}
        onMainTabSelected={this.dispatcher.setMainTab}
        onCancelButtonClick={this.cancelEmployee}
        onSaveButtonClick={this.saveButtonClick}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        confirmModalListeners={{
          onConfirmClose: this.dispatcher.closeModal,
          onConfirmCancel: this.redirectToModalUrl,
          onConfirmSave: this.saveUnsavedChanges,
          onConfirmDelete: this.deleteEmployee,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {employeeDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateURLFromState = state => this.replaceURLParams(getURLParams(state));

  saveHandler = () => {
    const state = this.store.getState();

    // Quick add modals
    if (getWagePayItemModal(state)) {
      this.subModules.payrollDetails.saveWagePayItemModal();
      return;
    }

    if (getLeavePayItemModal(state)) {
      this.subModules.payrollDetails.saveLeavePayItem();
      return;
    }

    if (getDeductionPayItemModal(state)) {
      this.subModules.payrollDetails.saveDeductionPayItemModal();
      return;
    }

    if (getSuperFundModal(state)) {
      this.subModules.payrollDetails.saveSuperFundModal();
      return;
    }

    if (getSuperPayItemModal(state)) {
      this.subModules.payrollDetails.saveSuperPayItemModal();
      return;
    }

    if (getExpensePayItemModal(state)) {
      this.subModules.payrollDetails.saveExpensePayItemModal();
      return;
    }

    if (getTaxPayItemModal(state)) {
      this.subModules.payrollDetails.saveTaxPayItemModal();
      return;
    }

    // In module modals
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalTypes.DELETE:
        // DO NOTHING
        break;
      case ModalTypes.UNSAVED:
        this.saveUnsavedChanges();
        break;
      default:
        this.saveEmployee();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.loadEmployeeDetails();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
