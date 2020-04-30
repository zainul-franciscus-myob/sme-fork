import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_EMPLOYEE, SUCCESSFULLY_SAVED_EMPLOYEE } from '../EmployeeMessageTypes';
import {
  getEmployeeListUrl, getModalUrl, getURLParams, isPageEdited,
} from './EmployeeDetailNzSelectors';
import { tabItems } from './tabItems';
import ContactDetailsNzTabModule from './contactDetails/ContactDetailsNzTabModule';
import EmployeeDetailsNzView from './components/EmployeeDetailsNzView';
import EmploymentDetailsNzModule from './employmentDetails/EmploymentDetailsNzModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalTypes from './ModalTypes';
import SalaryAndWagesModule from './salaryAndWages/salaryAndWagesModule';
import Store from '../../../../store/Store';
import createEmployeeDetailNzDispatcher from './createEmployeeDetailNzDispatcher';
import createEmployeeDetailNzIntegrator from './createEmployeeDetailNzIntegrator';
import employeeDetailNzReducer from './employeeDetailNzReducer';

export default class EmployeeDetailNzModule {
  constructor({
    setRootView, integration, replaceURLParams, pushMessage,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.replaceURLParams = replaceURLParams;
    this.pushMessage = pushMessage;
    this.store = new Store(employeeDetailNzReducer);
    this.dispatcher = createEmployeeDetailNzDispatcher({ store: this.store });
    this.integrator = createEmployeeDetailNzIntegrator({ store: this.store, integration });
    this.subModules = {
      contactDetails: new ContactDetailsNzTabModule({ store: this.store }),
      employmentDetails: new EmploymentDetailsNzModule({ store: this.store }),
      salaryAndWages: new SalaryAndWagesModule({ store: this.store }),
    };
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  updateURLFromState = state => this.replaceURLParams(getURLParams(state));

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  loadEmployeeDetails = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadEmployeeDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeeDetails({ onSuccess, onFailure });
  };

  setMainTab = (mainTab) => {
    this.dispatcher.setMainTab(mainTab);
    this.replaceURLParams(getURLParams(this.store.getState()));
  }

  setSubTab = (mainTab, subTab) => {
    this.dispatcher.setSubTab(mainTab, subTab);
    this.replaceURLParams({ mainTab, subTab });
  }

  render() {
    const employeeDetailNzView = <EmployeeDetailsNzView
      tabItems={tabItems}
      subModules={this.subModules}
      onMainTabSelected={this.setMainTab}
      onSubTabSelected={this.setSubTab}
      onCancelButtonClick={this.onCancelButtonClick}
      onSaveButtonClick={this.onSaveButtonClick}
      onDeleteButtonClick={this.onDeleteButtonClick}
      onDismissAlertClick={this.dispatcher.dismissAlert}
      confirmModalListeners={{
        onConfirmClose: this.dispatcher.closeModal,
        onConfirmCancel: this.redirectToModalUrl,
        onConfirmDelete: this.deleteEmployee,
        onConfirmSave: this.saveUnsavedChanges,
      }}
    />;
    const wrappedView = <Provider store={this.store}>{employeeDetailNzView}</Provider>;
    this.setRootView(wrappedView);
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadEmployeeDetails();
  }

  saveEmployee = (onSuccess) => {
    this.dispatcher.setSavingState();

    const onFailure = (response) => {
      this.dispatcher.updateEmployeeFailed(response.message);
    };

    this.integrator.saveEmployeeDetails({ onSuccess, onFailure });
  }

  onSaveButtonClick = () => {
    const onSuccess = (response) => {
      this.dispatcher.updateEmployeeDetails(response);
    };

    this.saveEmployee(onSuccess);
  };

  saveUnsavedChanges = () => {
    const onSuccess = (response) => {
      this.dispatcher.updateEmployeeDetails(response);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToEmployeeList();
    };

    this.saveEmployee(onSuccess);
  };

  onDeleteButtonClick = () => {
    const url = getEmployeeListUrl(this.store.getState());
    this.dispatcher.openModal({ type: ModalTypes.DELETE, url });
  };

  onCancelButtonClick = () => {
    const url = getEmployeeListUrl(this.store.getState());

    if (isPageEdited(this.store.getState())) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };

  openUnsavedModal = url => {
    this.dispatcher.openModal({ type: ModalTypes.UNSAVED, url });
  };

  deleteEmployee = () => {
    this.dispatcher.closeModal();
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToEmployeeList();
    };

    const onFailure = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.deleteEmployee({ onSuccess, onFailure });
  };

  redirectToEmployeeList = () => {
    const url = getEmployeeListUrl(this.store.getState());
    this.redirectToUrl(url);
  };

  redirectToUrl = url => {
    if (url) window.location.href = url;
  };

  redirectToModalUrl = () => {
    const url = getModalUrl(this.store.getState());
    this.redirectToUrl(url);
  };
}
