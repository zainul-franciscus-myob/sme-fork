import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_PAY_RUN_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PAY_RUN_LIST,
  UPDATE_FILTER_OPTIONS,
} from './PayRunListIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getCreatePayRunUrl,
  getFilterOptions,
  getSortOrder,
} from './payRunListSelectors';
import PayRunListView from './components/PayRunListView';
import Store from '../../store/Store';
import payRunListReducer from './payRunListReducer';

export default class PayrunListModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(payRunListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
  }

  render = () => {
    const payRunListView = (
      <PayRunListView
        onCreatePayRun={this.redirectToCreatePayrun}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortPayRunList}
        onApplyFilter={this.applyFilter}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

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

  applyFilter = () => {
    this.filterPayRunList();
  }

  updateFilterBarOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  }

  filterPayRunList = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);
    this.fetchPayRunList({
      filterOptions,
      isSort: false,
    });
  }

  sortPayRunList = () => {
    const state = this.store.getState();
    const filterOptions = getAppliedFilterOptions(state);
    this.fetchPayRunList({
      filterOptions,
      isSort: true,
    });
  }

  fetchPayRunList = ({ filterOptions, isSort }) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);
    const intent = SORT_AND_FILTER_PAY_RUN_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, sortOrder }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort,
        sortOrder,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    let sortOrder;
    if (isSort) {
      sortOrder = getSortOrder(state) === 'desc' ? 'asc' : 'desc';
    } else {
      sortOrder = getSortOrder(state);
    }

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
      },
      onSuccess,
      onFailure,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  redirectToCreatePayrun = () => {
    const state = this.store.getState();
    const url = getCreatePayRunUrl(state);
    this.redirectTo(url);
  }

  redirectTo = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;
    this.store.dispatch({
      intent,
      context,
    });
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  loadPayRunList = () => {
    const state = this.store.getState();
    this.setIsLoading(true);
    const urlParams = { businessId: state.businessId };
    const intent = LOAD_PAY_RUN_LIST;

    const onSuccess = (entries) => {
      this.setIsLoading(false);
      this.store.dispatch({
        intent,
        entries,
      });
    };
    const onFailure = () => {
      console.log('Failed to load pay run list entries.');
    };

    this.integration.read({
      onSuccess,
      urlParams,
      onFailure,
      intent,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadPayRunList();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
