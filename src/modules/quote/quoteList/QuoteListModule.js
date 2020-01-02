import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_FILTER_OPTIONS,
} from '../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_QUOTE,
  SUCCESSFULLY_EMAILED_QUOTE,
  SUCCESSFULLY_SAVED_QUOTE,
} from '../quoteDetail/QuoteMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getLoadNextPageParams,
  getOrderBy,
  getRegion,
  getSortOrder,
} from './quoteListSelector';
import QuoteListView from './components/QuoteListView';
import Store from '../../../store/Store';
import quoteListReducer from './quoteListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_QUOTE,
  SUCCESSFULLY_DELETED_QUOTE,
  SUCCESSFULLY_EMAILED_QUOTE,
];

export default class QuoteListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.store = new Store(quoteListReducer);
    this.setRootView = setRootView;
    this.messageTypes = messageTypes;
    this.popMessages = popMessages;
  }

  filterQuoteList = () => {
    const state = this.store.getState();

    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_QUOTE_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries,
      total,
      pagination,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
        total,
        pagination,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
        offset: 0,
      },
      onSuccess,
      onFailure,
    });
  };

  flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  loadQuoteList = () => {
    const state = this.store.getState();

    const intent = LOAD_QUOTE_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (quoteListResponse) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...quoteListResponse,
      });
    };

    const onFailure = () => {
      console.error('Failed to load quote list entries');
    };

    const filterOptions = getFilterOptions(state);

    this.integration.read({
      intent,
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  startLoadingMore = () => {
    this.store.dispatch({
      intent: START_LOADING_MORE,
    });
  }

  stopLoadingMore = () => {
    this.store.dispatch({
      intent: STOP_LOADING_MORE,
    });
  }

  loadQuoteListNextPage = () => {
    const state = this.store.getState();
    const params = getLoadNextPageParams(state);

    this.startLoadingMore();

    const intent = LOAD_QUOTE_LIST_NEXT_PAGE;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, pagination }) => {
      this.stopLoadingMore();
      this.store.dispatch({
        intent,
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.stopLoadingMore();
      this.setAlert({ message, type: 'danger' });
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
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
  };

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
  };

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
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

  sortQuoteList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_QUOTE_LIST;
    const onSuccess = ({ entries, total, pagination }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        total,
        pagination,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getAppliedFilterOptions(state);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
        offset: 0,
      },
      onSuccess,
      onFailure,
    });
  };

  updateFilterOptions = ({ filterName, value }) => this.store.dispatch({
    intent: UPDATE_FILTER_OPTIONS,
    filterName,
    value,
  });

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

  redirectToAddQuote = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/quote/new`;
  }

  render = () => {
    const quoteListView = (
      <QuoteListView
        onApplyFilter={this.filterQuoteList}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortQuoteList}
        onUpdateFilters={this.updateFilterOptions}
        onAddQuote={this.redirectToAddQuote}
        onLoadQuoteListNextPage={this.loadQuoteListNextPage}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {quoteListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadQuoteList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
