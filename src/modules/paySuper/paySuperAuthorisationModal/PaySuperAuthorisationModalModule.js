import { Provider } from 'react-redux';
import React from 'react';

import { SET_IS_LOADING } from './paySuperAuthorisationModalIntents';
import PaySuperAuthorisationModal from './components/PaySuperAuthorisationModal';
import Store from '../../../store/Store';
import StsLoginModule from '../stsLoginModal/StsLoginModule';
import createPaySuperAuthorisationModalDispatcher from './createPaySuperAuthorisationModalDispatcher';
import createPaySuperAuthorisationModalIntegrator from './createPaySuperAuthorisationModalIntegrator';
import paySuperAuthorisationModalReducer from './paySuperAuthorisationModalReducer';

export default class PaySuperAuthorisationModalModule {
  constructor({ integration, onClose, onAuthoriseSuccess }) {
    this.store = new Store(paySuperAuthorisationModalReducer);
    this.dispatcher = createPaySuperAuthorisationModalDispatcher(this.store);
    this.integrator = createPaySuperAuthorisationModalIntegrator(this.store, integration);
    this.onCloseFunc = onClose || (() => {});
    this.onAuthoriseSuccess = onAuthoriseSuccess || (() => {});
    this.stsLoginModal = new StsLoginModule({
      integration,
      onLoggedIn: this.onLoggedIn,
      onCancel: this.closeModal,
    });
  }

  openModal = ({ batchPaymentId, businessId }) => {
    this.dispatcher.setInitialContext(batchPaymentId, businessId);
    this.dispatcher.setIsOpen(true);
    this.stsLoginModal.run({ businessId });
  };

  onLoggedIn = (accessToken) => {
    this.setIsLoading(false);
    this.dispatcher.setAccessToken(accessToken);
    this.getCodeToAuthorise();
  };

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  closeModal = () => {
    this.dispatcher.setIsOpen(false);
    this.dispatcher.resetState();
    this.onCloseFunc();
  };

  getCodeToAuthorise = () => {
    const onSuccess = (response) => {
      this.dispatcher.updateAuthInfo(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.getCodeToAuthorise({ onSuccess, onFailure });
  };

  authoriseSuperPayment = () => {
    const onSuccess = ({ message }) => {
      this.onAuthoriseSuccess(message);
      this.closeModal();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.authoriseWithCode({ onSuccess, onFailure });
  };

  getView() {
    const stsLoginModal = this.stsLoginModal.getView();

    return (
      <Provider store={this.store}>
        {stsLoginModal}
        <PaySuperAuthorisationModal
          updateAuthorisationCode={this.dispatcher.updateAuthorisationCode}
          onCancelButtonClick={this.closeModal}
          onAuthoriseButtonClick={this.authoriseSuperPayment}
          onResendAuthorisationCodeClick={this.getCodeToAuthorise}
        />
      </Provider>
    );
  }
}
