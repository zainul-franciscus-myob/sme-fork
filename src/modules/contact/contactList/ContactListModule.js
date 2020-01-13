import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  RESET_FILTERS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../ContactIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_CONTACT, SUCCESSFULLY_SAVED_CONTACT } from '../ContactMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterContactListParams,
  getLoadContactListNextPageParams,
  getOrderBy,
  getRegion,
} from './contactListSelector';
import ContactListView from './components/ContactListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
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
        onAddContactButtonClick={this.redirectToAddContact}
        onDismissAlert={this.dismissAlert}
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterContactList}
        onSort={this.sortContactList}
        onLoadMoreButtonClick={this.loadContactListNextPage}
        // Disabled until decision on whether Reset link will be on all list screens
        // onResetFilter={this.resetFilters}
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
      businessId: getBusinessId(this.store.getState()),
    };

    const params = {
      offset: 0,
    };

    const onSuccess = ({
      entries,
      typeFilters,
      type,
      sortOrder,
      orderBy,
      pagination,
    }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        entries,
        typeFilters,
        type,
        sortOrder,
        orderBy,
        pagination,
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

  redirectToAddContact = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/contact/new`;
  }

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

  setNextPageLoadingState = (isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isNextPageLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => this.store.dispatch({
    intent: UPDATE_FILTER_OPTIONS,
    filterName,
    value,
  });


  flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  }

  sortContactList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getAppliedFilterOptions(state);
    const params = {
      ...filterOptions,
      sortOrder: newSortOrder,
      orderBy,
      offset: 0,
    };

    const intent = SORT_AND_FILTER_CONTACT_LIST;
    const onSuccess = ({ entries, pagination }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };


    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  filterContactList = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_CONTACT_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries, pagination,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };


    const params = getFilterContactListParams(state);

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  loadContactListNextPage = () => {
    const state = this.store.getState();
    this.setNextPageLoadingState(true);

    const intent = LOAD_CONTACT_LIST_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getLoadContactListNextPageParams(state);

    const onSuccess = ({
      entries, pagination,
    }) => {
      this.setNextPageLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.setNextPageLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };


    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  resetFilters = () => {
    this.store.dispatch({
      intent: RESET_FILTERS,
    });

    this.filterContactList();
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.setLoadingState(LoadingState.LOADING);
    this.loadContactList();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
