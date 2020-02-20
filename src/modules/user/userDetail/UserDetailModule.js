import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_USER,
  DELETE_USER,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_USER,
  UPDATE_USER_DETAILS,
  UPDATE_USER_ROLES,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_USER, SUCCESSFULLY_SAVED_USER } from '../UserMessageTypes';
import {
  getBusinessId,
  getIsActionsDisabled,
  getIsCreating,
  getLoadUserIntent,
  getOpenedModalType,
  getRedirectUrl,
  getUserForCreate,
  getUserForUpdate,
  getUserId,
  isPageEdited,
} from './userDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import Store from '../../../store/Store';
import UserDetailView from './components/UserDetailView';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import userDetailReducer from './userDetailReducer';


export default class UserDetailModule {
  constructor({
    integration, setRootView, pushMessage, usersInvited,
  }) {
    this.integration = integration;
    this.store = new Store(userDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.usersInvited = usersInvited;
  }

  createOrUpdateUser = () => {
    const isCreating = getIsCreating(this.store.getState());
    if (isCreating) {
      this.createUser();
      this.usersInvited();
    } else {
      this.updateUser();
    }
  }

  render = () => {
    const userDetailView = (
      <UserDetailView
        onCloseModal={this.closeModal}
        onDeleteModal={this.deleteUser}
        onCancelButtonClick={this.cancelUserDetail}
        onConfirmCancelButtonClick={this.redirect}
        onUserDetailsChange={this.updateUserDetails}
        onUserRolesChange={this.updateSelectedRoles}
        onSaveButtonClick={this.createOrUpdateUser}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {userDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  loadUser = () => {
    const state = this.store.getState();

    const intent = getLoadUserIntent(state);

    const userId = getUserId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      ...(!getIsCreating(state) && { userId }),
    };

    const onSuccess = (data) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        ...data,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  openUnsavedModal = (url) => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: ModalType.UNSAVED, url },
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
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: ModalType.DELETE },
    });
  };

  closeModal = () => {
    this.store.dispatch({ intent: CLOSE_MODAL });
  };

  updateUserDetails = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_USER_DETAILS,
      key,
      value,
    });
  };

  updateSelectedRoles = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_USER_ROLES,
      key,
      value,
    });
  };

  createUser = () => {
    const intent = CREATE_USER;
    const state = this.store.getState();
    const content = getUserForCreate(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveUser(intent, content, urlParams);
  };

  updateUser = () => {
    const intent = UPDATE_USER;
    const state = this.store.getState();
    const content = getUserForUpdate(state);
    const urlParams = {
      businessId: getBusinessId(state),
      userId: getUserId(state),
    };
    this.saveUser(intent, content, urlParams);
  };

  saveUser(intent, content, urlParams) {
    if (getIsActionsDisabled(this.store.getState())) return;

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_USER,
        content: message,
      });
      this.setSubmittingState(false);
      this.redirect();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
      this.closeModal();
    };

    this.setSubmittingState(true);
    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  deleteUser = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_USER,
        content: message,
      });
      this.redirect();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    const state = this.store.getState();
    this.integration.write({
      intent: DELETE_USER,
      urlParams: {
        businessId: getBusinessId(state),
        userId: getUserId(state),
      },
      onSuccess,
      onFailure,
    });
  };

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
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

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
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
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.setLoadingState(LoadingState.LOADING);
    this.loadUser();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
