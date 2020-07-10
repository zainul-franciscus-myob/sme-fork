import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_CONTACT,
  SUCCESSFULLY_SAVED_CONTACT,
} from '../../../common/types/MessageTypes';
import {
  getContactCreateLink,
  getFlipSortOrder,
  getOrderBy,
} from './contactListSelector';
import ContactListView from './components/ContactListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import contactListReducer from './contactListReducer';
import createContactListDispatcher from './createContactListDispatcher';
import createContactListIntegrator from './createContactListIntegrator';
import debounce from '../../../common/debounce/debounce';

const messageTypes = [SUCCESSFULLY_DELETED_CONTACT, SUCCESSFULLY_SAVED_CONTACT];

export default class ContactListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(contactListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createContactListDispatcher(this.store);
    this.integrator = createContactListIntegrator(this.store, integration);
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <ContactListView
          onAddContactButtonClick={this.redirectToAddContact}
          onDismissAlert={this.dispatcher.dismissAlert}
          onUpdateFilters={this.updateFilterOptions}
          onSort={this.updateSortOrder}
          onLoadMoreButtonClick={this.loadContactListNextPage}
          // Disabled until decision on whether Reset link will be on all list screens
          // onResetFilter={this.resetFilters}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  updateFilterOptions = ({ filterName, value }) => {
    this.dispatcher.updateFilterOptions({ filterName, value });

    if (filterName === 'keywords') {
      this.debouncedSortAndFilterContactList();
    } else {
      this.sortAndFilterContactList();
    }
  };

  loadContactList = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadContactList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadContactList({ onSuccess, onFailure });
  };

  loadContactListNextPage = () => {
    this.dispatcher.setNextPageLoadingState(true);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.loadContactListNextPage({ entries, pagination });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadContactListNextPage({ onSuccess, onFailure });
  };

  sortAndFilterContactList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterContactList({ entries, pagination });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterContactList({ onSuccess, onFailure });
  };

  debouncedSortAndFilterContactList = debounce(this.sortAndFilterContactList);

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder =
      orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterContactList();
  };

  resetFilters = () => {
    this.dispatcher.resetFilters();
    this.sortAndFilterContactList();
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  };

  redirectToAddContact = () => {
    const state = this.store.getState();
    const url = getContactCreateLink(state);

    window.location.href = url;
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadContactList();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
