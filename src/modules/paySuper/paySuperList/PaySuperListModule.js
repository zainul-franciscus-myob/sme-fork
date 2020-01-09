import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_CREATED_SUPER_PAYMENT,
  SUCCESSFULLY_REVERSED_TRANSACTION,
} from '../paySuperMessageTypes';
import {
  getBusinessId,
  getPaySuperCreateUrl,
  getPaySuperUrl,
  getRegion,
} from './paySuperListSelector';
import PaySuperListView from './components/PaySuperListView';
import Store from '../../../store/Store';
import StsLoginModule from '../stsLoginModal/StsLoginModule';
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
    const onSuccess = (response) => {
      this.dispatcher.loadPaySuperList(response);
      this.dispatcher.setIsLoading(false);
      this.dispatcher.setIsTableLoading(false);
      this.updateSuperPaymentStatus();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadPaySuperList({ onSuccess, onFailure });
  };

  onSort = (sortColumn) => {
    this.dispatcher.setSortOrder(sortColumn);
    this.dispatcher.setIsTableLoading(true);
    this.loadPaySuperList();
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

  onLoggedIn = (accessToken) => {
    this.dispatcher.setAccessToken(accessToken);
    this.popAlert();
    this.loadPaySuperList();
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
    this.stsLoginModal.run(context);
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
          onSort={this.onSort}
          alertDismiss={this.dispatcher.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
