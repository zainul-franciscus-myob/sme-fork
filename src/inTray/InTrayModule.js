import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import { getEmail, getIsUploadOptionsLoading } from './selectors/UploadOptionsSelectors';
import { getNewSortOrder } from './selectors/InTrayListSelectors';
import InTrayView from './components/InTrayView';
import Store from '../store/Store';
import createInTrayDispatcher from './createInTrayDispatcher';
import createInTrayIntegrator from './createInTrayIntegrator';
import inTrayReducer from './reducer/inTrayReducer';
import modalTypes from './modalTypes';

export default class InTrayModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(inTrayReducer);
    this.setRootView = setRootView;
    this.dispatcher = createInTrayDispatcher(this.store);
    this.integrator = createInTrayIntegrator(this.store, integration);
  }

  loadInTray = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadInTray(payload);
    };

    const onFailure = () => {
      console.log('Failed to load in tray');
    };

    this.integrator.loadInTray({ onSuccess, onFailure });
  }

  filterInTrayList = () => {
    this.dispatcher.setInTrayListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.filterInTrayList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterInTrayList({ onSuccess, onFailure });
  }

  sortInTrayList = (orderBy) => {
    this.dispatcher.setInTrayListTableLoadingState(true);

    const state = this.store.getState();
    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setInTrayListSortOrder(orderBy, sortOrder);

    const onSuccess = (response) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.sortInTrayList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortInTrayList({
      orderBy, sortOrder, onSuccess, onFailure,
    });
  }

  openMoreUploadOptionsDialog = () => {
    this.dispatcher.openModal(modalTypes.uploadOptions);
  }

  showEmailGenerationConfirmation = () => this.dispatcher.setConfirmingEmailGeneration(true);

  hideEmailGenerationConfirmation = () => this.dispatcher.setConfirmingEmailGeneration(false);

  generateNewEmail = () => {
    this.dispatcher.setUploadOptionsLoading(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert('danger', message);
    };

    const onSuccess = ({ message, email }) => {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert('success', message);
      this.dispatcher.generateNewEmail(message, email);
    };

    this.integrator.generateNewEmail({ onSuccess, onFailure });
  }

  onCloseUploadOptionsModal = () => {
    if (!getIsUploadOptionsLoading(this.store.getState())) {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.closeModal();
    }
  }

  copyEmail = () => {
    copy(getEmail(this.store.getState()));
    this.dispatcher.setUploadOptionsAlert('success', 'Copied!');
  }

  render = () => {
    const inTrayView = (
      <InTrayView
        inTrayListeners={{
          onDismissAlert: this.dispatcher.dismissAlert,
          onUploadOptionsButtonClicked: this.openMoreUploadOptionsDialog,
        }}
        inTrayListListeners={{
          onUpdateFilterOptions: this.dispatcher.setInTrayListFilterOptions,
          onApplyFilter: this.filterInTrayList,
          onSort: this.sortInTrayList,
        }}
        uploadOptionsModalListeners={{
          onCancel: this.onCloseUploadOptionsModal,
          onConfirmEmailGenerationButtonClick: this.showEmailGenerationConfirmation,
          onGenerateNewEmailButtonClick: this.generateNewEmail,
          onDismissAlert: this.dispatcher.dismissUploadOptionsAlert,
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
