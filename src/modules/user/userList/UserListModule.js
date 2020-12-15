import { Provider } from 'react-redux';
import React from 'react';

import {
  CANCEL_INVITATION,
  LOAD_USER_LIST,
  RESEND_INVITATION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SHOW_STATUS_FILTER_OPTIONS,
  SET_TABLE_LOADING_STATE,
  SET_USER_LIST_FILTER_OPTIONS,
  SORT_USER_LIST,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_USER,
  SUCCESSFULLY_SAVED_USER,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getCancelInvitationDetails,
  getEntries,
  getFilterOptions,
  getFlipSortOrder,
  getMyDotMyobLink,
  getOrderBy,
  getRegion,
  getResendInvitationDetails,
} from './userListSelectors';
import { trackUserEvent } from '../../../telemetry';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import UserListView from './components/UserListView';
import debounce from '../../../common/debounce/debounce';
import userListReducer from './userListReducer';

const messageTypes = [SUCCESSFULLY_DELETED_USER, SUCCESSFULLY_SAVED_USER];

export default class UserListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(userListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  loadUserList = () => {
    const intent = LOAD_USER_LIST;

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      ...getFilterOptions(state),
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
      params,
      onSuccess,
      onFailure,
    });
  };

  onMyMyobClick = () => {
    const state = this.store.getState();
    const myDotMyobLink = getMyDotMyobLink(state);
    window.open(myDotMyobLink, '_blank', 'noopener noreferrer');
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'clicked_mydotlink',
        page: 'user/userList',
      },
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  };

  redirectToCreateUser = (isAdvisor) => () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    const destination = isAdvisor ? 'new-advisor' : 'new';
    window.location.href = `/#/${region}/${businessId}/user/${destination}`;
  };

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  setLoadingState = (loadingState) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      loadingState,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  sortUserList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder =
      orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    const entries = getEntries(state);

    this.store.dispatch({
      intent: SORT_USER_LIST,
      entries,
      sortOrder: newSortOrder,
      orderBy,
    });
  };

  resendInvitation = (userIndex) => {
    const intent = RESEND_INVITATION;

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getResendInvitationDetails(state, userIndex);

    const onSuccess = ({ message }) => {
      this.setAlert({
        type: 'success',
        message,
      });
      this.loadUserList();
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  cancelInvitation = (userIndex) => {
    const intent = CANCEL_INVITATION;

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getCancelInvitationDetails(state, userIndex);

    const onSuccess = ({ message }) => {
      this.setAlert({
        type: 'success',
        message,
      });
      this.loadUserList();
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  updateFilterOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_USER_LIST_FILTER_OPTIONS,
      key,
      value,
    });

    if (key === 'keywords') {
      debounce(this.loadUserList());
    } else {
      this.loadUserList();
    }
  };

  setShowStatusFilterOptions = (value) => {
    this.store.dispatch({
      intent: SET_SHOW_STATUS_FILTER_OPTIONS,
      value,
    });
  };

  render = () => {
    const userListView = (
      <UserListView
        onCreateUser={this.redirectToCreateUser}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortUserList}
        onMyMyobClick={this.onMyMyobClick}
        onResendInvitation={this.resendInvitation}
        onCancelInvitation={this.cancelInvitation}
        onUpdateFilterOptions={this.updateFilterOptions}
        setShowStatusFilterOptions={this.setShowStatusFilterOptions}
      />
    );

    const wrappedView = <Provider store={this.store}>{userListView}</Provider>;
    this.setRootView(wrappedView);
  };

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadUserList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
