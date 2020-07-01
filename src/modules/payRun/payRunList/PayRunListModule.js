import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PAY_RUN_LIST,
  UPDATE_FILTER_OPTIONS,
} from './PayRunListIntents';
import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getCreatePayRunUrl,
  getFilterOptions,
  getFlipSortOrder,
  getSortOrder,
  getStpRegistrationUrl,
} from './payRunListSelectors';
import PayRunListView from './components/PayRunListView';
import Store from '../../../store/Store';
import payRunListReducer from './payRunListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_DRAFT_PAY_RUN,
];

export default class PayrunListModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(payRunListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.messageTypes = messageTypes;
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

  updateFilterBarOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setTableLoadingState });
  }

  loadPayRunList = () => {
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setIsLoading });
  }

  sortPayRunList = () => {
    const sortOrder = getFlipSortOrder(this.store.getState());
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder,
    });
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setTableLoadingState });
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  sortAndFilterPayRunList = ({ setLoadingFunc }) => {
    const state = this.store.getState();
    setLoadingFunc(true);
    const intent = SORT_AND_FILTER_PAY_RUN_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, sortOrder, stpRegistrationStatus }) => {
      setLoadingFunc(false);
      this.store.dispatch({
        intent,
        entries,
        sortOrder,
        stpRegistrationStatus,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...getFilterOptions(state),
        sortOrder: getSortOrder(state),
        orderBy: 'PaymentDate',
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

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  goToStpReporting = () => {
    const state = this.store.getState();
    window.location.href = getStpRegistrationUrl(state);
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadPayRunList();
  }

  render = () => {
    const payRunListView = (
      <PayRunListView
        onCreatePayRun={this.redirectToCreatePayrun}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortPayRunList}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onStpSignUpClick={this.goToStpReporting}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
