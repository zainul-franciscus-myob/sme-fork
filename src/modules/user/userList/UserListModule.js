import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_USER_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_USER_LIST,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_USER,
  SUCCESSFULLY_SAVED_USER,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getFlipSortOrder,
  getMyDotMyobLink,
  getOrderBy,
  getRegion,
} from './userListSelectors';
import { trackUserEvent } from '../../../telemetry';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import UserListView from './components/UserListView';
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

  setSortOrder = (orderBy, sortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder,
      orderBy,
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
    this.setSortOrder(orderBy, newSortOrder);

    const intent = SORT_USER_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.setTableLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      params: {
        sortOrder: newSortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  };

  render = () => {
    const userListView = (
      <UserListView
        onCreateUser={this.redirectToCreateUser}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortUserList}
        onMyMyobClick={this.onMyMyobClick}
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
