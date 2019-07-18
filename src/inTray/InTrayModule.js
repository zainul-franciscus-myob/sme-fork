import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import {
  CLOSE_MODAL,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  OPEN_MODAL,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
} from './InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import {
  getBusinessId,
  getEmail,
  getIsUploadOptionsLoading,
} from './InTraySelectors';
import InTrayView from './components/InTrayView';
import Store from '../store/Store';
import inTrayReducer from './inTrayReducer';
import modalTypes from './modalTypes';

export default class InTrayModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(inTrayReducer);
    this.setRootView = setRootView;
  }

  setLoadingState = isLoading => this.store.dispatch({
    intent: SET_LOADING_STATE,
    isLoading,
  });

  loadInTray = () => {
    this.setLoadingState(true);
    const intent = LOAD_IN_TRAY;

    const onSuccess = ({ email }) => {
      this.setLoadingState(false);
      this.store.dispatch({ intent, email });
    };

    const onFailure = () => {
      console.log('Failed to load in tray');
    };

    this.integration.read({
      intent,
      urlParams: { businessId: getBusinessId(this.store.getState()) },
      onSuccess,
      onFailure,
    });
  }

  openModal = modalType => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType,
  });

  closeModal = () => this.store.dispatch({ intent: CLOSE_MODAL })

  openMoreUploadOptionsDialog = () => {
    this.openModal(modalTypes.uploadOptions);
  }

  setConfirmingEmailGeneration = isConfirmingEmailGeneration => this.store.dispatch({
    intent: SET_CONFIRMING_EMAIL_GENERATION,
    isConfirmingEmailGeneration,
  });

  showEmailGenerationConfirmation = () => this.setConfirmingEmailGeneration(true);

  hideEmailGenerationConfirmation = () => this.setConfirmingEmailGeneration(false);

  setUploadOptionLoading = isUploadOptionsLoading => this.store.dispatch({
    intent: SET_UPLOAD_OPTIONS_LOADING_STATE,
    isUploadOptionsLoading,
  })

  setUploadOptionsAlert = (type, message) => this.store.dispatch({
    intent: SET_UPLOAD_OPTIONS_ALERT,
    uploadOptionsAlert: {
      type,
      message,
    },
  });

  dismissUploadOptionsAlert = () => this.store.dispatch({
    intent: SET_UPLOAD_OPTIONS_ALERT,
    uploadOptionsAlert: undefined,
  });

  generateNewEmail = () => {
    this.setUploadOptionLoading(true);
    const intent = GENERATE_IN_TRAY_EMAIL;
    const onFailure = ({ message }) => {
      this.setUploadOptionLoading(false);
      this.setUploadOptionsAlert('danger', message);
    };

    const onSuccess = ({ message, email }) => {
      this.hideEmailGenerationConfirmation();
      this.setUploadOptionLoading(false);
      this.setUploadOptionsAlert('success', message);
      this.store.dispatch({
        intent,
        message,
        email,
      });
    };

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(this.store.getState()) },
      onSuccess,
      onFailure,
    });
  }

  onCloseUploadOptionsModal = () => {
    if (!getIsUploadOptionsLoading(this.store.getState())) {
      this.hideEmailGenerationConfirmation();
      this.closeModal();
    }
  }

  copyEmail = () => {
    copy(getEmail(this.store.getState()));
    this.setUploadOptionsAlert('success', 'Copied!');
  }

  render = () => {
    const inTrayView = (
      <InTrayView
        onUploadOptionsButtonClicked={this.openMoreUploadOptionsDialog}
        uploadOptionsModalListeners={{
          onCancel: this.onCloseUploadOptionsModal,
          onConfirmEmailGenerationButtonClick: this.showEmailGenerationConfirmation,
          onGenerateNewEmailButtonClick: this.generateNewEmail,
          onDismissAlert: this.dismissUploadOptionsAlert,
          onDismissConfirmEmailGeneration: this.hideEmailGenerationConfirmation,
          onCopyEmailButtonClicked: this.copyEmail,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {inTrayView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadInTray();
  }
}
