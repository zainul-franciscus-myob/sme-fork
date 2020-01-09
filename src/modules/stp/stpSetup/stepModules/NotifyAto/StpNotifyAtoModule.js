import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_CONFIRMATION_MODAL,
  GET_BUSINESS_SID,
  LOAD_CONTEXT,
  OPEN_CONFIRMATION_MODAL,
  SET_ALERT,
  SET_IS_LOADING,
} from './stpNotifyAtoIntents';
import {
  getAccessManagerSiteUrl,
  getAgentAbn,
  getBusinessId,
  getHostedSbrUrl,
} from './stpNotifyAtoModuleSelectors';
import Store from '../../../../../store/Store';
import StpNotifyModuleView from './components/StpNotifyView';
import stpNotifyAtoModuleReducer from './stpNotifyAtoModuleReducer';

export default class StpNotifyAtoModule {
  constructor({
    onPrevious,
    onFinish,
    integration,
    context,
  }) {
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
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  getBusinessSid = ({ onSuccess, onFailure }) => {
    this.setIsLoading(true);

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      agentAbn: getAgentAbn(state),
    };

    const onSuccessFunc = ({ sid }) => {
      this.store.dispatch({
        intent: GET_BUSINESS_SID,
        sid,
      });
      this.setIsLoading(false);
      onSuccess();
    };

    const onFailureFunc = ({ message }) => {
      this.setIsLoading(false);
      onFailure({ message });
    };

    this.integration.read({
      intent: GET_BUSINESS_SID,
      urlParams,
      onSuccess: onSuccessFunc,
      onFailure: onFailureFunc,
    });
  }

  goToAccessManagerSite = () => {
    const state = this.store.getState();
    const link = getAccessManagerSiteUrl(state);
    window.open(link, '_blank');
  };

  goToHostedSbrUrl = () => {
    const state = this.store.getState();
    const link = getHostedSbrUrl(state);
    window.open(link, '_blank');
  };

  openConfirmationModal = () => {
    this.store.dispatch({
      intent: OPEN_CONFIRMATION_MODAL,
    });
  }

  closeConfirmationModal = () => {
    this.store.dispatch({
      intent: CLOSE_CONFIRMATION_MODAL,
    });
  }

  getView() {
    return (
      <Provider store={this.store}>
        <StpNotifyModuleView
          onPreviousClick={this.onPrevious}
          onNotifiedAtoClick={this.openConfirmationModal}
          onCloseConfirmationModal={this.closeConfirmationModal}
          onFinish={this.onFinish}
          onAccessManagerLinkClick={this.goToAccessManagerSite}
          onHostedSbrLinkClick={this.goToHostedSbrUrl}
        />
      </Provider>
    );
  }
}
