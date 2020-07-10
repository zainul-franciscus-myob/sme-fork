import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_CONFIRMATION_MODAL,
  GET_SOFTWARE_ID,
  LOAD_CONTEXT,
  OPEN_CONFIRMATION_MODAL,
  SET_ALERT,
  SET_IS_LOADING,
  SUBMIT_STP_REGISTRATION,
} from './stpNotifyAtoIntents';
import { getBusinessId } from './stpNotifyAtoModuleSelectors';
import Store from '../../../../../store/Store';
import StpNotifyView from './components/StpNotifyView';
import stpNotifyAtoModuleReducer from './stpNotifyAtoModuleReducer';

export default class StpNotifyAtoModule {
  constructor({ onPrevious, onFinish, integration, context }) {
    this.onPrevious = onPrevious;
    this.onFinish = onFinish;
    this.integration = integration;
    this.store = new Store(stpNotifyAtoModuleReducer);
    this.store.dispatch({
      intent: LOAD_CONTEXT,
      context,
    });
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  };

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  };

  showError = ({ message }) => {
    this.setAlert({
      type: 'danger',
      message,
    });
  };

  getSoftwareId = ({ payerAbn, agentAbn }) => {
    this.setIsLoading(true);

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = { agentAbn, payerAbn };

    const onSuccess = ({ sid }) => {
      this.store.dispatch({
        intent: GET_SOFTWARE_ID,
        sid,
      });
      this.setIsLoading(false);
    };

    const onFailure = (error) => {
      this.setIsLoading(false);
      this.showError(error);
    };

    this.integration.read({
      intent: GET_SOFTWARE_ID,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  confirmAtoNotification = ({ agentAbn, agentNumber, onConfirmSuccess }) => {
    this.setIsLoading(true);
    this.closeConfirmationModal();

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = {
      abn: agentAbn,
      agentNumber,
    };

    const onSuccess = () => {
      this.setIsLoading(false);
      onConfirmSuccess();
    };

    const onFailure = (error) => {
      this.setIsLoading(false);
      this.showError(error);
    };

    this.integration.write({
      intent: SUBMIT_STP_REGISTRATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  openConfirmationModal = () => {
    this.store.dispatch({
      intent: OPEN_CONFIRMATION_MODAL,
    });
  };

  closeConfirmationModal = () => {
    this.store.dispatch({
      intent: CLOSE_CONFIRMATION_MODAL,
    });
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StpNotifyView
          onPreviousClick={this.onPrevious}
          onNotifiedAtoClick={this.openConfirmationModal}
          onCloseConfirmationModal={this.closeConfirmationModal}
          onFinish={this.onFinish}
        />
      </Provider>
    );
  }
}
