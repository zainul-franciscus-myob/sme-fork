import { Provider } from 'react-redux';
import React from 'react';

import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SET_ALERT,
  SET_DEDUCTIONS_SORT_ORDER,
  SET_EXPENSES_SORT_ORDER,
  SET_LEAVE_SORT_ORDER,
  SET_LOADING_STATE,
  SET_SUPERANNUATION_SORT_ORDER,
  SET_TAB,
  SET_TABLE_LOADING_STATE,
  SET_WAGES_SORT_ORDER,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
} from '../PayItemIntents';
import {
  SUCCESSFULLY_DELETED_PAY_ITEM,
  SUCCESSFULLY_SAVED_PAY_ITEM,
} from '../deductionPayItem/DeductionPayItemMessageTypes';
import { SUCCESSFULLY_DELETED_SUPER_PAY_ITEM, SUCCESSFULLY_SAVED_SUPER_PAY_ITEM } from '../superPayItem/SuperPayItemMessageTypes';
import {
  getBusinessId,
  getLoadTabContentIntent,
  getNewDeductionsSortOrder,
  getNewExpensesSortOrder,
  getNewLeaveSortOrder,
  getNewSuperannuationSortOrder,
  getNewWagesSortOrder, getRegion,
  getUrlParams,
  getUrlTabParams,
} from './PayItemListSelectors';
import PayItemListView from './components/PayItemListView';
import Store from '../../store/Store';
import payItemListReducer from './payItemListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_SUPER_PAY_ITEM,
  SUCCESSFULLY_DELETED_SUPER_PAY_ITEM,
  SUCCESSFULLY_DELETED_PAY_ITEM,
  SUCCESSFULLY_SAVED_PAY_ITEM,
];

export default class PayItemListModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(payItemListReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
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

  setTab = selectedTab => this.store.dispatch({
    intent: SET_TAB,
    selectedTab,
  })

  setTabAndLoadContent = (selectedTab) => {
    this.setTab(selectedTab);
    this.loadTabContentList();
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
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
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  }

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  }

  setSortOrder = (intent, orderBy, sortOrder) => this.store.dispatch({
    intent,
    orderBy,
    sortOrder,
  })

  loadInitialList = () => {
    const state = this.store.getState();

    const intent = getLoadTabContentIntent(state);

    const urlParams = getUrlParams(state);

    const onSuccess = (payload) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = () => console.log('Failed to get initial load');

    this.setLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  loadTabContentList = () => {
    const state = this.store.getState();

    const intent = getLoadTabContentIntent(state);
    const urlParams = getUrlParams(state);

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = (error) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message: error.message, type: 'danger',
      });
    };

    this.setTableLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  sortList = ({
    intent, sortIntent, newSortOrder, orderBy,
  }) => {
    this.setSortOrder(sortIntent, orderBy, newSortOrder);

    const state = this.store.getState();

    const urlParams = getUrlParams(state);

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
        isSort: true,
      });
    };

    const onFailure = (error) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message: error.message, type: 'danger',
      });
    };

    const params = {
      sortOrder: newSortOrder,
      orderBy,
    };

    this.setTableLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  sortWagesList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_WAGES_LIST;
    const sortIntent = SET_WAGES_SORT_ORDER;
    const newSortOrder = getNewWagesSortOrder(state, { orderBy });

    this.sortList({
      intent, sortIntent, newSortOrder, orderBy,
    });
  }

  sortSuperannuationList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_SUPERANNUATION_LIST;
    const sortIntent = SET_SUPERANNUATION_SORT_ORDER;
    const newSortOrder = getNewSuperannuationSortOrder(state, { orderBy });

    this.sortList({
      intent, sortIntent, newSortOrder, orderBy,
    });
  }

  sortLeaveList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_LEAVE_LIST;
    const sortIntent = SET_LEAVE_SORT_ORDER;
    const newSortOrder = getNewLeaveSortOrder(state, { orderBy });

    this.sortList({
      intent, sortIntent, newSortOrder, orderBy,
    });
  }

  sortDeductionsList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_DEDUCTIONS_LIST;
    const sortIntent = SET_DEDUCTIONS_SORT_ORDER;
    const newSortOrder = getNewDeductionsSortOrder(state, { orderBy });

    this.sortList({
      intent, sortIntent, newSortOrder, orderBy,
    });
  }

  sortExpensesList = (orderBy) => {
    const state = this.store.getState();
    const intent = SORT_EXPENSES_LIST;
    const sortIntent = SET_EXPENSES_SORT_ORDER;
    const newSortOrder = getNewExpensesSortOrder(state, { orderBy });

    this.sortList({
      intent, sortIntent, newSortOrder, orderBy,
    });
  }

  redirectToCreateSuperPayItem= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payItem/superannuation/new`;
  }

  redirectToCreateDeductionPayItem = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payItem/deduction/new`;
  }

  render = () => {
    const payItemListView = (
      <PayItemListView
        listeners={{
          onTabSelected: this.setTabAndLoadContent,
          onSortWagesList: this.sortWagesList,
          onSortSuperannuationList: this.sortSuperannuationList,
          onSortLeaveList: this.sortLeaveList,
          onSortDeductionsList: this.sortDeductionsList,
          onSortExpensesList: this.sortExpensesList,
          onDismissAlert: this.dismissAlert,
          onCreateSuperannuationButtonClick: this.redirectToCreateSuperPayItem,
          onCreateDeductionButtonClick: this.redirectToCreateDeductionPayItem,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payItemListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

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

  updateURLFromState = state => this.replaceURLParams(getUrlTabParams(state))

  run(context) {
    this.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
    this.readMessages();
    this.loadInitialList();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
