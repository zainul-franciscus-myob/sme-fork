import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION } from '../../../common/types/MessageTypes';
import {
  getPayRunListUrl,
  getStpDeclarationContext,
  getStpRegistrationAlertContext,
  getTransactionListUrl,
  isUserStpRegistered,
} from './EmployeePayDetailSelectors';
import EmployeePayDetailView from './components/EmployeePayDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import StpDeclarationModalModule from '../../stp/stpDeclarationModal/StpDeclarationModalModule';
import StpRegistrationAlertModalModule from '../../stp/stpRegistrationAlertModal/StpRegistrationAlertModalModule';
import createEmployeePayDetailDispatchers from './createEmployeePayDetailDispatchers';
import createEmployeePayDetailIntegrator from './createEmployeePayDetailIntegrator';
import employeePayDetailReducer from './employeePayDetailReducer';

export default class EmployeePayDetailModule {
  constructor({ integration, setRootView, pushMessage, featureToggles }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(employeePayDetailReducer);
    this.integrator = createEmployeePayDetailIntegrator(
      this.store,
      integration
    );
    this.dispatcher = createEmployeePayDetailDispatchers(this.store);
    this.featureToggles = featureToggles;
    this.stpDeclarationModule = new StpDeclarationModalModule({
      integration,
      onDeclared: this.sendReversalEmployeePay,
    });

    this.stpRegistrationAlertModal = new StpRegistrationAlertModalModule({
      onContinue: this.sendReversalEmployeePay,
    });
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

  deleteEmployeePayDetail = () => {
    this.dispatcher.closeDeleteModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION,
        content: message,
      });
      window.location.href = getTransactionListUrl(this.store.getState());
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlertMessage(message);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    this.integrator.deleteEmployeePayDetail({ onSuccess, onFailure });
  };

  loadEmployeePayReversalPreviewDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setEmployeePayReversalPreviewDetails(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeePayReversalPreviewDetail({
      onSuccess,
      onFailure,
    });
  };

  sendReversalEmployeePay = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      window.location.href = getPayRunListUrl(this.store.getState());
    };

    const onFailure = (message) => {
      this.dispatcher.setAlertMessage(message);
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.sendReversalEmployeePay({ onSuccess, onFailure });
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

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadEmployeePayDetail();
  }

  onRecordReversal = () => {
    if (!isUserStpRegistered(this.store.getState())) {
      this.stpRegistrationAlertModal.run(
        getStpRegistrationAlertContext(this.store.getState())
      );
    } else {
      this.stpDeclarationModule.run(
        getStpDeclarationContext(this.store.getState())
      );
    }
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        {this.stpDeclarationModule.getView()}
        {this.stpRegistrationAlertModal.getView()}
        <EmployeePayDetailView
          onGoBackClick={this.goBack}
          onDeleteButtonClick={this.dispatcher.openDeleteModal}
          onDeleteConfirmButtonClick={this.deleteEmployeePayDetail}
          onDeleteCancelButtonClick={this.dispatcher.closeDeleteModal}
          onDismissAlert={this.dispatcher.dismissAlert}
          onReverseButtonClick={this.loadEmployeePayReversalPreviewDetail}
          onRecordReversalButtonClick={this.onRecordReversal}
          featureToggles={this.featureToggles}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
