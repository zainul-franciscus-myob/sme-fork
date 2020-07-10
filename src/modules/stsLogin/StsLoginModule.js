import { Provider } from 'react-redux';
import React from 'react';

import {
  clearSettings,
  loadSettings,
  saveSettings,
} from '../../store/sessionStorageDriver';
import { getBusinessId } from './stsLoginSelectors';
import RouteName from '../../router/RouteName';
import Store from '../../store/Store';
import StsLoginModal from './components/StsLoginModal';
import createStsLoginDispatcher from './createStsLoginDispatcher';
import createStsLoginIntegrator from './createStsLoginIntegrator';
import stsLoginReducer from './StsLoginReducer';

export default class StsLoginModule {
  constructor({ integration, onLoggedIn, onCancel }) {
    this.store = new Store(stsLoginReducer);
    this.dispatcher = createStsLoginDispatcher(this.store);
    this.integrator = createStsLoginIntegrator(this.store, integration);
    this.onLoggedIn = onLoggedIn || (() => {});
    this.onCancel = onCancel || (() => {});
  }

  onClose = () => {
    this.dispatcher.closeModal();
    this.onCancel();
  };

  saveToSession = (refreshToken) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    saveSettings(businessId, RouteName.PAY_SUPER_LIST, { refreshToken });
  };

  loadFromSession = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    return loadSettings(businessId, RouteName.PAY_SUPER_LIST);
  };

  removeFromSession = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    clearSettings(businessId, RouteName.PAY_SUPER_LIST);
  };

  onLogIn = () => {
    this.dispatcher.setIsModalLoading(true);
    this.dispatcher.clearAlert();

    const onSuccess = (response) => {
      this.saveToSession(response.refreshToken);
      this.dispatcher.setIsModalLoading(false);
      this.dispatcher.closeModal();
      this.onLoggedIn(response.accessToken);
    };

    const onFailure = ({ message }) => {
      this.removeFromSession();
      this.dispatcher.setAlert(message);
      this.dispatcher.clearPassword();
      this.dispatcher.setIsModalLoading(false);
    };

    this.integrator.logIn({ onSuccess, onFailure });
  };

  onRefresh = (refreshToken) => {
    const onSuccess = (response) => {
      this.saveToSession(response.refreshToken);
      this.onLoggedIn(response.accessToken);
    };

    const onFailure = () => {
      this.removeFromSession();
      this.dispatcher.openModal();
    };

    this.integrator.refreshLogin({ refreshToken, onSuccess, onFailure });
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);

    const refreshToken = this.loadFromSession();

    if (refreshToken) {
      this.onRefresh(refreshToken);
    } else {
      this.dispatcher.openModal();
    }
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StsLoginModal
          updateLoginInfo={this.dispatcher.updateLoginInfo}
          onCancelButtonClick={this.onClose}
          onLoginClick={this.onLogIn}
        />
      </Provider>
    );
  }
}
