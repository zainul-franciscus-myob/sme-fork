import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_QUOTE,
  SUCCESSFULLY_EMAILED_QUOTE,
  SUCCESSFULLY_SAVED_QUOTE,
} from '../quoteDetail/QuoteMessageTypes';
import {
  getFlipSortOrder, getOrderBy, getQuoteCreateUrl, getSettings,
} from './quoteListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import LoadingState from '../../../components/PageView/LoadingState';
import QuoteListView from './components/QuoteListView';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import createQuoteListDispatcher from './createQuoteListDispatcher';
import createQuoteListIntegrator from './createQuoteListIntegrator';
import debounce from '../../../common/debounce/debounce';
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
    this.store = new Store(quoteListReducer);
    this.setRootView = setRootView;
    this.messageTypes = messageTypes;
    this.popMessages = popMessages;
    this.integrator = createQuoteListIntegrator(this.store, integration);
    this.dispatcher = createQuoteListDispatcher(this.store);
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <QuoteListView
          onDismissAlert={this.dispatcher.dismissAlert}
          onSort={this.sortQuoteList}
          onUpdateFilters={this.updateFilterOptions}
          onAddQuote={this.redirectToAddQuote}
          onLoadQuoteListNextPage={this.loadQuoteListNextPage}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  loadQuoteList = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadQuoteList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadQuoteList({ onSuccess, onFailure });
  };

  loadQuoteListNextPage = () => {
    this.dispatcher.setNextPageLoadingState(true);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.loadQuoteListNextPage({ entries, pagination });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadQuoteListNextPage({ onSuccess, onFailure });
  }

  sortAndFilterQuoteList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries, total, pagination }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterQuoteList({
        entries,
        total,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterQuoteList({ onSuccess, onFailure });
  }

  updateFilterOptions = ({ filterName, value }) => {
    this.dispatcher.updateFilterOptions({ filterName, value });

    if (filterName === 'keywords') {
      debounce(this.sortAndFilterQuoteList)();
    } else {
      this.sortAndFilterQuoteList();
    }
  }

  filterQuoteList = () => {
    this.sortAndFilterQuoteList();
  };

  sortQuoteList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterQuoteList();
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  }

  redirectToAddQuote = () => {
    const state = this.store.getState();
    const url = getQuoteCreateUrl(state);

    window.location.href = url;
  }

  run(context) {
    const settings = loadSettings(context.businessId, RouteName.QUOTE_LIST);
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.store.subscribe(state => (
      saveSettings(context.businessId, RouteName.QUOTE_LIST, getSettings(state))
    ));
    this.loadQuoteList();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
