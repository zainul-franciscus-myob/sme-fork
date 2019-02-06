import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_CONTACT_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
} from '../ContactIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_CONTACT, SUCCESSFULLY_SAVED_CONTACT } from '../ContactMessageTypes';
import ContactListView from '../components/ContactListView';
import Store from '../../store/Store';
import contactListReducer from './contactListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_CONTACT, SUCCESSFULLY_SAVED_CONTACT,
];

export default class ContactListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.store = new Store(contactListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  render = () => {
    const contactListView = (
      <ContactListView
        businessId={this.businessId}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {contactListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  loadContactList = () => {
    const intent = LOAD_CONTACT_LIST;
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({
      entries,
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
      });
    };

    const onFailure = () => {
      console.log('Failed to load contact list entries');
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

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  run(context) {
    this.businessId = context.businessId;
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadContactList();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
