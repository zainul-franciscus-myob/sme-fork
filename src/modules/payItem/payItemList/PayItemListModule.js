import { Provider } from 'react-redux';
import React from 'react';

import {
  SET_DEDUCTIONS_SORT_ORDER,
  SET_EXPENSES_SORT_ORDER,
  SET_LEAVE_SORT_ORDER,
  SET_SUPERANNUATION_SORT_ORDER,
  SET_WAGES_SORT_ORDER,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
  UPDATE_TAX_PAY_ITEM,
} from '../PayItemIntents';
import {
  SUCCESSFULLY_DELETED_EXPENSE_PAY_ITEM,
  SUCCESSFULLY_SAVED_EXPENSE_PAY_ITEM,
} from '../expensePayItem/ExpensePayItemMessageTypes';
import {
  SUCCESSFULLY_DELETED_LEAVE_PAY_ITEM,
  SUCCESSFULLY_SAVED_LEAVE_PAY_ITEM,
} from '../leavePayItem/LeavePayItemMessageTypes';
import {
  SUCCESSFULLY_DELETED_PAY_ITEM,
  SUCCESSFULLY_SAVED_PAY_ITEM,
} from '../deductionPayItem/DeductionPayItemMessageTypes';
import { SUCCESSFULLY_DELETED_SUPER_PAY_ITEM, SUCCESSFULLY_SAVED_SUPER_PAY_ITEM } from '../superPayItem/SuperPayItemMessageTypes';
import {
  SUCCESSFULLY_DELETED_WAGE_PAY_ITEM,
  SUCCESSFULLY_SAVED_WAGE_PAY_ITEM,
} from '../wagePayItem/WagePayItemMessageTypes';
import {
  getBusinessId,
  getIsPageEdited,
  getLoadTabContentIntent,
  getModalUrl,
  getNewDeductionsSortOrder,
  getNewExpensesSortOrder,
  getNewLeaveSortOrder,
  getNewSuperannuationSortOrder,
  getNewWagesSortOrder,
  getRegion,
  getSaveTaxPayItemPayload,
  getTab,
  getTabUrl,
  getUrlParams,
  getUrlTabParams,
} from './PayItemListSelectors';
import { tabIds } from './tabItems';
import ModalType from './ModalType';
import PayItemListView from './components/PayItemListView';
import Store from '../../../store/Store';
import createPayItemListDispatcher from './createPayItemListDispatcher';
import payItemListReducer from './payItemListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_SUPER_PAY_ITEM,
  SUCCESSFULLY_DELETED_SUPER_PAY_ITEM,
  SUCCESSFULLY_DELETED_PAY_ITEM,
  SUCCESSFULLY_SAVED_PAY_ITEM,
  SUCCESSFULLY_SAVED_WAGE_PAY_ITEM,
  SUCCESSFULLY_DELETED_WAGE_PAY_ITEM,
  SUCCESSFULLY_SAVED_LEAVE_PAY_ITEM,
  SUCCESSFULLY_DELETED_LEAVE_PAY_ITEM,
  SUCCESSFULLY_SAVED_EXPENSE_PAY_ITEM,
  SUCCESSFULLY_DELETED_EXPENSE_PAY_ITEM,
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
    this.dispatcher = createPayItemListDispatcher(this.store);
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

  setTab = (selectedTab) => {
    this.dispatcher.setTab(selectedTab);
  }

  setTabAndLoadContent = (selectedTab) => {
    const state = this.store.getState();
    const url = getTabUrl(state, selectedTab);
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.setTab(selectedTab);
      this.loadTabContentList();
    }
  }

  setAlert = ({ message, type }) => {
    this.dispatcher.setAlert({ message, type });
  }

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  }

  setTableLoadingState = (isTableLoading) => {
    this.dispatcher.setTableLoadingState(isTableLoading);
  }

  setSubmittingState = (isSubmitting) => {
    this.dispatcher.setSubmittingState(isSubmitting);
  };

  setSortOrder = (intent, orderBy, sortOrder) => {
    this.dispatcher.setSortOrder(intent, orderBy, sortOrder);
  };

  loadTabContentList = () => {
    const state = this.store.getState();

    const intent = getLoadTabContentIntent(state);
    const urlParams = getUrlParams(state);

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.dispatcher.loadTabContentList(payload, intent);
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
      this.dispatcher.sortList(payload, intent);
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

  saveTaxPayItem = () => {
    this.setSubmittingState(true);

    const state = this.store.getState();
    const payItemPayload = getSaveTaxPayItemPayload(state);

    const onSuccess = ({ message }) => {
      this.setAlert({
        type: 'success',
        message,
      });
      this.setSubmittingState(false);

      const url = getModalUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.setAlert({
        type: 'danger',
        message,
      });
      this.dismissModal();
    };

    const intent = UPDATE_TAX_PAY_ITEM;
    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: payItemPayload,
      onSuccess,
      onFailure,
    });
  }

  updateTaxPayItemDetail = ({ key, value }) => {
    this.dispatcher.updateTaxPayItemDetail({ key, value });
  }

  redirectToCreatePayItem = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    const selectedTab = getTab(state);

    const linkType = {
      [tabIds.superannuation]: 'superannuation',
      [tabIds.wages]: 'wage',
      [tabIds.deductions]: 'deduction',
      [tabIds.expenses]: 'expense',
      [tabIds.leave]: 'leave',
    }[selectedTab];

    window.location.href = `/#/${region}/${businessId}/payItem/${linkType}/new`;
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
          onCreatePayItemButtonClick: this.redirectToCreatePayItem,
          onSaveTaxPayItemButtonClick: this.saveTaxPayItem,
          onTaxDetailChange: this.updateTaxPayItemDetail,
        }}
        onDismissModal={this.dismissModal}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onConfirmSave={this.saveTaxPayItem}
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

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  openModal= ({ type, url }) => {
    this.dispatcher.openModal({ type, url });
  }

  openUnsavedModal = (url) => {
    this.openModal({ type: ModalType.UNSAVED, url });
  }

  dismissModal = () => {
    this.dispatcher.closeModal();
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  }

  updateURLFromState = state => this.replaceURLParams(getUrlTabParams(state))

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
    this.readMessages();
    this.loadTabContentList();
  }

  resetState = () => {
    this.dispatcher.resetState();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
