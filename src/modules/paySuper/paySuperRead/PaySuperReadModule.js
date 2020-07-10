import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_PAY_SUPER_READ,
  PREPARE_UI_FOR_REVERSE,
  REVERSE_PAY_SUPER,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_STATUS,
} from './paySuperReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_REVERSED_TRANSACTION } from '../../../common/types/MessageTypes';
import {
  getBatchPaymentId,
  getBusinessEventId,
  getBusinessId,
  getPaySuperListUrl,
  getRegion,
} from './paySuperReadSelector';
import EmployeePayModalModule from '../../employeePay/employeePayModal/EmployeePayModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import PaySuperAuthorisationModalModule from '../paySuperAuthorisationModal/PaySuperAuthorisationModalModule';
import PaySuperReadView from './components/PaySuperReadView';
import Store from '../../../store/Store';
import paySuperReadReducer from './paySuperReadReducer';

export default class PaySuperReadModule {
  constructor({ integration, setRootView, pushMessage, featureToggles }) {
    this.integration = integration;
    this.store = new Store(paySuperReadReducer);
    this.setRootView = setRootView;
    this.featureToggles = featureToggles;
    this.subModules = {
      employeePayModal: new EmployeePayModalModule({
        integration,
        onDelete: this.onEmployeePayDeleteSuccess,
        featureToggles: this.featureToggles,
      }),
      authorisationModal: new PaySuperAuthorisationModalModule({
        integration,
        onAuthoriseSuccess: this.onAuthoriseSuccess,
      }),
    };
    this.pushMessage = pushMessage;
  }

  onAuthoriseSuccess = (message) => {
    this.setAlert({
      type: 'success',
      message,
    });
    this.loadPaySuperRead();
  };

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  };

  onEmployeePayDeleteSuccess = (message) => {
    this.setAlert({ message, type: 'success' });
    this.loadPaySuperRead();
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;
    this.store.dispatch({
      intent,
      context,
    });
  };

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  };

  returnToList = () => {
    const state = this.store.getState();
    window.location.href = getPaySuperListUrl(state);
  };

  openModal = (modalType) => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  };

  closeModal = () => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType: null,
    });
  };

  openAuthorisePaySuperModal = () => {
    const state = this.store.getState();
    const context = {
      batchPaymentId: getBatchPaymentId(state),
      businessId: getBusinessId(state),
    };
    this.subModules.authorisationModal.openModal(context);
  };

  reversePaySuper = () => {
    const intent = REVERSE_PAY_SUPER;
    const state = this.store.getState();
    this.setLoadingState(LoadingState.LOADING);

    const urlParams = {
      businessId: getBusinessId(state),
      businessEventId: getBusinessEventId(state),
    };

    const onSuccess = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_REVERSED_TRANSACTION,
        content: message,
      });
      this.returnToList();
    };
    const onFailure = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  reversePaySuperModalConfirm = () => {
    this.closeModal();
    this.store.dispatch({
      intent: PREPARE_UI_FOR_REVERSE,
    });
    this.store.dispatch({
      intent: SET_STATUS,
      status: 'RecordReversal',
    });
  };

  openReverseModal = () => {
    this.openModal(ModalType.REVERSE);
  };

  render = () => {
    const employeePayModal = this.subModules.employeePayModal.getView();
    const authorisationModal = this.subModules.authorisationModal.getView();

    const wrappedView = (
      <Provider store={this.store}>
        <PaySuperReadView
          employeePayModal={employeePayModal}
          authorisationModal={authorisationModal}
          onCancelClick={this.returnToList}
          onAuthoriseClick={this.openAuthorisePaySuperModal}
          onReverseModalConfirmClick={this.reversePaySuperModalConfirm}
          onReverseModalCancelClick={this.closeModal}
          onReverseClick={this.openReverseModal}
          onRecordReverseClick={this.reversePaySuper}
          onDateLinkClick={this.openEmployeePayModal}
          onDismissAlert={this.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadPaySuperRead();
  };

  openEmployeePayModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.subModules.employeePayModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
      readonly: true,
    });
  };

  loadPaySuperRead = () => {
    const intent = LOAD_PAY_SUPER_READ;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      businessEventId: getBusinessEventId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
