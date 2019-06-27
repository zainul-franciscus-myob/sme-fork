import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_QUOTE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../QuoteIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_ITEM_QUOTE,
  SUCCESSFULLY_DELETED_SERVICE_QUOTE,
  SUCCESSFULLY_SAVED_ITEM_QUOTE,
  SUCCESSFULLY_SAVED_SERVICE_QUOTE,
} from '../quoteDetail/quoteMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getNewQuoteUrlParam,
  getOrderBy,
  getRegion,
  getSortOrder,
} from './quoteListSelector';
import QuoteListView from './components/QuoteListView';
import Store from '../../store/Store';
import quoteListReducer from './quoteListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_SERVICE_QUOTE,
  SUCCESSFULLY_DELETED_SERVICE_QUOTE,
  SUCCESSFULLY_SAVED_ITEM_QUOTE,
  SUCCESSFULLY_DELETED_ITEM_QUOTE,
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
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
        total,
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
    const onSuccess = ({ entries, total }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        total,
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
    const newQuoteUrlParam = getNewQuoteUrlParam(state);

    window.location.href = `/#/${region}/${businessId}/quote/${newQuoteUrlParam}`;
  }

  render = () => {
    const quoteListView = (
      <QuoteListView
        onApplyFilter={this.filterQuoteList}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortQuoteList}
        onUpdateFilters={this.updateFilterOptions}
        onAddQuote={this.redirectToAddQuote}
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
