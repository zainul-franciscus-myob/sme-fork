import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_USER,
  SUCCESSFULLY_SAVED_USER,
} from '../../../common/types/MessageTypes';
import {
  getIsActionsDisabled,
  getIsCreating,
  getOpenedModalType,
  getRedirectUrl,
  isPageEdited,
} from './userDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import Store from '../../../store/Store';
import UserDetailView from './components/UserDetailView';
import createUserDetailDispatcher from './createUserDetailDispatcher';
import createUserDetailIntegrator from './createUserDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import userDetailReducer from './userDetailReducer';

export default class UserDetailModule {
  constructor({ integration, setRootView, pushMessage, usersInvited }) {
    this.store = new Store(userDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.usersInvited = usersInvited;
    this.dispatcher = createUserDetailDispatcher(this.store);
    this.integrator = createUserDetailIntegrator(this.store, integration);
  }

  createOrUpdateUser = () => {
    const state = this.store.getState();

    if (getIsActionsDisabled(state)) return;

    const isCreating = getIsCreating(this.store.getState());

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_USER,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirect();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(error.message);
      this.dispatcher.closeModal();
    };

    this.dispatcher.setSubmittingState(true);
    if (isCreating) {
      this.integrator.createUser({ onSuccess, onFailure });
      this.usersInvited();
    } else {
      this.integrator.updateUser({ onSuccess, onFailure });
    }
  };

  render = () => {
    const userDetailView = (
      <UserDetailView
        onCloseModal={this.dispatcher.closeModal}
        onDeleteModal={this.deleteUser}
        onCancelButtonClick={this.cancelUserDetail}
        onConfirmCancelButtonClick={this.redirect}
        onUserDetailsChange={this.dispatcher.updateUserDetails}
        onUserRolesChange={this.dispatcher.updateUserRoles}
        onSaveButtonClick={this.createOrUpdateUser}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{userDetailView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  loadUser = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadUser(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadUser({ onSuccess, onFailure });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({
      type: ModalType.UNSAVED,
      url,
    });
  };

  cancelUserDetail = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal();
    } else {
      this.redirect();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal({
      type: ModalType.DELETE,
    });
  };

  deleteUser = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_USER,
        content: message,
      });
      this.redirect();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(error.message);
    };

    this.integrator.deleteUser({ onSuccess, onFailure });
  };

  dismissAlert = () => {
    this.dispatcher.setAlertMessage('');
  };

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  redirect = () => {
    const state = this.store.getState();

    this.redirectToUrl(getRedirectUrl(state));
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.createOrUpdateUser();
        break;
    }
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadUser();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };
}
