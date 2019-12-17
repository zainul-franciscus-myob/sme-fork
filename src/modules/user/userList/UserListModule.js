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
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_USER, SUCCESSFULLY_SAVED_USER } from '../UserMessageTypes';
import {
  getBusinessId, getFlipSortOrder, getOrderBy, getRegion,
} from './userListSelectors';
import Store from '../../../store/Store';
import UserListView from './components/UserListView';
import userListReducer from './userListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_USER, SUCCESSFULLY_SAVED_USER,
];

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
  }

  loadUserList = () => {
    const intent = LOAD_USER_LIST;

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries,
      orderBy,
      sortOrder,
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        orderBy,
        sortOrder,
      });
    };

    const onFailure = () => {
      console.error('Failed to load user list entries');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  redirectToCreateUser = isAdvisor => () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    const destination = isAdvisor ? 'new-advisor' : 'new';
    window.location.href = `/#/${region}/${businessId}/user/${destination}`;
  }

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setSortOrder = (orderBy, sortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder,
      orderBy,
    });
  }

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  }

  sortUserList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const intent = SORT_USER_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries,
    }) => {
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
  }

  render = () => {
    const userListView = (
      <UserListView
        onCreateUser={this.redirectToCreateUser}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortUserList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {userListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

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
