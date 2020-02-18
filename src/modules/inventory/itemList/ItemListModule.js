import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_ITEM_LIST,
  LOAD_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InventoryIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_ITEM,
  SUCCESSFULLY_SAVED_ITEM,
} from '../InventoryMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getIsFilteredList,
  getLoadNextPageParams,
  getOrderBy,
  getRegion,
  getSortOrder,
} from './itemListSelectors';
import ItemListView from './components/ItemListView';
import Store from '../../../store/Store';
import itemListReducer from './itemListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_ITEM, SUCCESSFULLY_SAVED_ITEM,
];

export default class ItemListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(itemListReducer);
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  render = () => {
    const itemListView = (
      <ItemListView
        onApplyFilter={this.filterItemList}
        onUpdateFilters={this.updateFilterOptions}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortItemList}
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
    const state = this.store.getState();
    const intent = LOAD_ITEM_LIST;
    const filterOptions = getFilterOptions(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (
      response,
    ) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.setLoadingState(true);
    this.integration.read({
      intent,
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  sortItemList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_ITEM_LIST;
    const filterOptions = getAppliedFilterOptions(state);
    const isFilteredList = getIsFilteredList(state);
    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';

    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        filterOptions,
        isFilteredList,
        ...response,
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
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  };

  filterItemList = () => {
    const intent = SORT_AND_FILTER_ITEM_LIST;

    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        filterOptions,
        isFilteredList: true,
        ...response,
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
        ...filterOptions,
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  };

  loadNextPage = () => {
    const state = this.store.getState();
    this.setNextPageLoadingState(true);

    const intent = LOAD_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getLoadNextPageParams(state);

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

  setNextPageLoadingState = (isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isNextPageLoading,
    });
  };

  updateFilterOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  }

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  };

  setTableLoadingState = (isLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading: isLoading,
    });
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

      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadItemList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
