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
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_USER, SUCCESSFULLY_SAVED_USER } from '../UserMessageTypes';
import {
  getBusinessId,
  getIsCreating, getLoadUserIntent,
  getRegion,
  getUserForCreate,
  getUserForUpdate,
  getUserId,
  isPageEdited,
} from './userDetailSelectors';
import Store from '../../store/Store';
import UserDetailView from './components/UserDetailView';
import userDetailReducer from './userDetailReducer';

export default class UserDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(userDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  render = () => {
    const isCreating = getIsCreating(this.store.getState());
    const onSaveButtonClick = isCreating
      ? this.createUser : this.updateUser;

    const userDetailView = (
      <UserDetailView
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToUserList}
        onDeleteModal={this.deleteUser}
        onCancelButtonClick={this.openCancelModal}
        onUserDetailsChange={this.updateUserDetails}
        onUserRolesChange={this.updateSelectedRoles}
        onSaveButtonClick={onSaveButtonClick}
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

    const onSuccess = (user) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        user,
        isLoading: false,
      });
    };

    const onFailure = () => {
      console.log('Failed to load User details');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.store.dispatch({
        intent: OPEN_MODAL,
        modalType: 'cancel',
      });
    } else {
      this.redirectToUserList();
    }
  };

  openDeleteModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: 'delete',
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
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_USER,
        content: message,
      });
      this.setSubmittingState(false);
      this.redirectToUserList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });

    this.setSubmittingState(true);
  }

  deleteUser = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_USER,
        content: message,
      });
      this.redirectToUserList();
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

  redirectToUserList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/user`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
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

  run(context) {
    this.setInitialState(context);
    this.render();
    this.setLoadingState(true);
    this.loadUser();
  }
}
