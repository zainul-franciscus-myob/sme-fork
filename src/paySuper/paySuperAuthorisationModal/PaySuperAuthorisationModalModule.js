import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE } from '../../SystemIntents';
import {
  SET_ALERT,
  SET_IS_OPEN,
  SET_MODAL_TYPE,
  SET_OPENING_CONTEXT,
  UPDATE_AUTHORISATION_CODE,
  UPDATE_AUTHORISATION_INFORMATION,
  UPDATE_LOGIN_INFO,
} from './paySuperAuthorisationModalIntents';
import ModalType from './ModalType';
import PaySuperAuthorisationModal from './components/PaySuperAuthorisationModal';
import Store from '../../store/Store';
import createPaySuperAuthorisationModalModuleIntegrator from './createPaySuperAuthorisationModalModuleIntegrator';
import paySuperAuthorisationModalReducer from './paySuperAuthorisationModalReducer';

export default class PaySuperAuthorisationModalModule {
  constructor({ integration, onClose, onAuthoriseSuccess }) {
    this.store = new Store(paySuperAuthorisationModalReducer);
    this.integrator = createPaySuperAuthorisationModalModuleIntegrator(this.store, integration);
    this.onCloseFunc = onClose || (() => {});
    this.onAuthoriseSuccess = onAuthoriseSuccess || (() => {});
  }

  setIsOpen = (isOpen) => {
    this.store.dispatch({
      intent: SET_IS_OPEN,
      isOpen,
    });
  }

  openModal = ({ batchPaymentId, businessId }) => {
    this.setIsOpen(true);
    this.store.dispatch({
      intent: SET_OPENING_CONTEXT,
      context: { batchPaymentId, businessId },
    });
  };

  closeModal = () => {
    this.setIsOpen(false);
    this.resetState();
    this.onCloseFunc();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }

  handleLoginClick = () => this.getCodeToAuthorise();

  setModalType = (modalType) => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  };

  getCodeToAuthorise = () => {
    const onSuccess = (response) => {
      this.store.dispatch({
        intent: UPDATE_AUTHORISATION_INFORMATION,
        response,
      });
      this.setModalType(ModalType.AUTHORISE_CODE);
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.getCodeToAuthorise({ onSuccess, onFailure });
  }

  updateAuthorisationCode = ({ value }) => {
    this.store.dispatch({
      intent: UPDATE_AUTHORISATION_CODE,
      authorisationCode: value,
    });
  }

  updateLoginInfo = (input) => {
    this.store.dispatch({
      intent: UPDATE_LOGIN_INFO,
      input,
    });
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  authoriseSuperPayment = () => {
    const onSuccess = ({ message }) => {
      this.onAuthoriseSuccess(message);
      this.closeModal();
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.authoriseWithCode({ onSuccess, onFailure });
  }

  getView() {
    return (
      <Provider store={this.store}>
        <PaySuperAuthorisationModal
          authorisationModalListeners={{
            updateAuthorisationCode: this.updateAuthorisationCode,
            onCancelButtonClick: this.closeModal,
            onAuthoriseButtonClick: this.authoriseSuperPayment,
            onResendAuthorisationCodeClick: this.getCodeToAuthorise,
          }}
          loginModalListeners={{
            onCancelButtonClick: this.closeModal,
            onLoginClick: this.getCodeToAuthorise,
            updateLoginInfo: this.updateLoginInfo,
          }}
        />
      </Provider>
    );
  }
}
