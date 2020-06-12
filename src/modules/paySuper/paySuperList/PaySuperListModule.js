import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_CREATED_SUPER_PAYMENT,
  SUCCESSFULLY_REVERSED_TRANSACTION,
} from '../paySuperMessageTypes';
import {
  getBusinessId,
  getIsRegistered,
  getPaySuperCreateUrl,
  getPaySuperUrl,
  getRegion,
} from './paySuperListSelector';
import LoadingState from '../../../components/PageView/LoadingState';
import PaySuperListView from './components/PaySuperListView';
import Store from '../../../store/Store';
import StsLoginModule from '../../stsLogin/StsLoginModule';
import createPaySuperListDispatcher from './createPaySuperListDispatcher';
import createPaySuperListIntegrator from './createPaySuperListIntegrator';
import paySuperListReducer from './paySuperListReducer';

export default class PaySuperListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(paySuperListReducer);
    this.dispatcher = createPaySuperListDispatcher(this.store);
    this.integrator = createPaySuperListIntegrator(this.store, this.integration);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = [
      SUCCESSFULLY_CREATED_SUPER_PAYMENT,
      SUCCESSFULLY_REVERSED_TRANSACTION,
    ];
    this.stsLoginModal = new StsLoginModule({
      integration,
      onLoggedIn: this.onLoggedIn,
      onCancel: this.goBack,
    });
  }

  updateSuperPaymentStatus = () => {
    const onSuccess = (response) => {
      this.dispatcher.updateSuperPaymentStatus(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.updateSuperPaymentStatus({ onSuccess, onFailure });
  };

  loadPaySuperList = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.loadPaySuperList(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.openLoginModal();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadPaySuperList({ onSuccess, onFailure });
  };

  sortPaySuperList = (sortColumn) => {
    this.dispatcher.setSortOrder(sortColumn);
    this.dispatcher.setIsTableLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.loadPaySuperList(response);
      this.dispatcher.setIsTableLoading(false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadPaySuperList({ onSuccess, onFailure });
  };

  redirectToSuperPaymentDetail = (businessEventId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/paySuper/${businessEventId}`;
  };

  redirectToPaySuper = () => {
    const state = this.store.getState();
    window.location.href = getPaySuperUrl(state);
  };

  redirectToCreate = () => {
    const state = this.store.getState();
    window.location.href = getPaySuperCreateUrl(state);
  };

  popAlert = () => {
    const [alert] = this.popMessages(this.messageTypes);
    if (alert) {
      this.dispatcher.setAlert({ type: 'success', message: alert.content });
    }
  };

  openLoginModal = () => {
    if (getIsRegistered(this.store.getState())) {
      this.dispatcher.setLoadingState(LoadingState.LOADING);
      this.stsLoginModal.run({ businessId: getBusinessId(this.store.getState()) });
    }
  };

  onLoggedIn = (accessToken) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    this.dispatcher.setAccessToken(accessToken);
    this.updateSuperPaymentStatus();
  };

  goBack = () => {
    window.history.back();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.popAlert();
    this.loadPaySuperList();
  };

  render = () => {
    const stsLoginModal = this.stsLoginModal.getView();

    const wrappedView = (
      <Provider store={this.store}>
        {stsLoginModal}
        <PaySuperListView
          onReferenceNumberClick={this.redirectToSuperPaymentDetail}
          onCreateButtonClick={this.redirectToCreate}
          onSettingsButtonClick={this.redirectToPaySuper}
          onRegisterButtonClick={this.redirectToPaySuper}
          onSort={this.sortPaySuperList}
          alertDismiss={this.dispatcher.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
