import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION } from '../../../../common/types/MessageTypes';
import EmployeePayDetailView from './components/EmployeePayDetailView';
import LoadingState from '../../../../components/PageView/LoadingState';
import RouteName from '../../../../router/RouteName';
import Store from '../../../../store/Store';
import createEmployeePayDetailDispatchers from './createEmployeePayDetailDispatchers';
import createEmployeePayDetailIntegrator from './createEmployeePayDetailIntegrator';
import employeePayDetailReducer from './employeePayDetailReducer';

export default class EmployeePayDetailModule {
  constructor({
    integration,
    setRootView,
    navigateToName,
    pushMessage,
    featureToggles,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.navigateToName = navigateToName;
    this.store = new Store(employeePayDetailReducer);
    this.integrator = createEmployeePayDetailIntegrator(
      this.store,
      integration
    );
    this.dispatcher = createEmployeePayDetailDispatchers(this.store);
    this.featureToggles = featureToggles;
  }

  loadEmployeePayDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setEmployeePayDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeePayDetail({ onSuccess, onFailure });
  };

  goBack = () => {
    window.history.back();
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  onDeleteEmployeePayDetailsClicked = () => {
    this.dispatcher.displayDeleteConfirmationModal();
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadEmployeePayDetail();
  }

  onCancelDeleteConfirmation = () => {
    this.dispatcher.closeDeleteConfirmationModal();
  };

  redirectToEmployeePayList = () => {
    this.navigateToName(RouteName.GENERAL_JOURNAL_LIST);
  };

  onConfirmDelete = () => {
    this.dispatcher.closeDeleteConfirmationModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION,
        content: 'Successfully deleted employee pay transaction',
      });
      this.redirectToEmployeePayList();
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.deleteEmployeeFailed(response.message);
    };

    this.integrator.deleteEmployeePay({ onSuccess, onFailure });
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <EmployeePayDetailView
          onGoBackClick={this.goBack}
          onDeleteClick={this.onDeleteEmployeePayDetailsClicked}
          onDismissAlertClick={this.dispatcher.dismissAlert}
          confirmModalListeners={{
            onCancel: this.onCancelDeleteConfirmation,
            onConfirm: this.onConfirmDelete,
          }}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
