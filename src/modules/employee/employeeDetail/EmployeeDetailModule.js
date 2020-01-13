import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_EMPLOYEE,
  SUCCESSFULLY_SAVED_EMPLOYEE,
} from '../EmployeeMessageTypes';
import {
  getEmployeeDetailUrl,
  getEmployeeListUrl,
  getIsCreating,
  getModalUrl,
  getURLParams,
  isPageEdited,
} from './EmployeeDetailSelectors';
import ContactDetailsTabModule from './contactDetails/ContactDetailsTabModule';
import EmployeeDetailView from './components/EmployeeDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
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
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
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
      }),
      paymentDetails: new PaymentDetailsTabModule({
        integration,
        store: this.store,
        pushMessage,
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
  }

  openDeleteModal = () => {
    const state = this.store.getState();
    const url = getEmployeeListUrl(state);
    this.dispatcher.openModal({ type: 'delete', url });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: 'unsaved', url });
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

  render = () => {
    const employeeDetailView = (
      <EmployeeDetailView
        tabViews={this.subModules}
        onMainTabSelected={this.dispatcher.setMainTab}
        onCancelButtonClick={this.cancelEmployee}
        onSaveButtonClick={this.saveEmployee}
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

  handlers = {
    SAVE_ACTION: this.saveEmployee,
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
