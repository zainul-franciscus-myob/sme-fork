import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_ITEM,
  SUCCESSFULLY_SAVED_ITEM,
} from '../../../common/types/MessageTypes';
import { getBusinessId, getRegion } from './itemListSelectors';
import CreateItemListDispatcher from './CreateItemListDispatcher';
import CreateItemListIntegrator from './CreateItemListIntegrator';
import ItemListView from './components/ItemListView';
import Store from '../../../store/Store';
import debounce from '../../../common/debounce/debounce';
import itemListReducer from './itemListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_ITEM, SUCCESSFULLY_SAVED_ITEM,
];

export default class ItemListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(itemListReducer);
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = CreateItemListDispatcher(this.store);
    this.integrator = CreateItemListIntegrator(this.store, integration);
  }

  render = () => {
    const itemListView = (
      <ItemListView
        onUpdateFilters={this.updateFilterOptions}
        onDismissAlert={this.dismissAlert}
        onSort={this.updateSort}
        onCreateItem={this.createItem}
        onLoadMoreButtonClick={this.loadNextPage}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {itemListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  loadItemList = () => {
    const onSuccess = (
      response,
    ) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadItemList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.loadItemList({ onSuccess, onFailure });
  }

  sortAndFilterItemList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.filterItemList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setTableLoadingState(true);
    this.integrator.sortAndFilterItemList({ onSuccess, onFailure });
  };

  loadNextPage = () => {
    this.dispatcher.setNextPageLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.loadNextPage(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadNextPage({ onSuccess, onFailure });
  };

  createItem = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/inventory/new`;
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  }

  updateSort = (orderBy) => {
    this.dispatcher.setSortOrder(orderBy);

    this.sortAndFilterItemList();
  }

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.sortAndFilterItemList)();
    } else {
      this.sortAndFilterItemList();
    }
  }

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadItemList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
