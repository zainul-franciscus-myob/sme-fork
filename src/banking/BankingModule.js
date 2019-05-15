import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_SPLIT_ALLOCATION_LINE,
  ALLOCATE_TRANSACTION,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  DELETE_SPLIT_ALLOCATION_LINE,
  LOAD_BANK_TRANSACTIONS, LOAD_MATCH_TRANSACTION,
  LOAD_NEW_SPLIT_ALLOCATION,
  LOAD_SPLIT_ALLOCATION,
  OPEN_MODAL,
  SAVE_SPLIT_ALLOCATION,
  SET_ALERT,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_LOADING_STATE,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_SPLIT_ALLOCATION,
  UNALLOCATE_TRANSACTION,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SPLIT_ALLOCATION_HEADER,
  UPDATE_SPLIT_ALLOCATION_LINE,
} from './BankingIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import {
  getAllocationPayload,
  getAppliedFilterOptions,
  getBankTransactionLineByIndex,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getIsAllocated,
  getIsOpenEntryEdited,
  getOpenEntryActiveTabId,
  getOpenEntryDefaultTabId,
  getOpenPosition,
  getOrderBy,
  getSortOrder,
  getUnallocationPayload,
} from './bankingSelectors';
import { getSplitAllocationPayload } from './bankingSelectors/splitAllocationSelectors';
import { tabIds } from './tabItems';
import BankingView from './components/BankingView';
import Store from '../store/Store';
import bankingReducer from './bankingReducer';

export default class BankingModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
  }

  render = () => {
    const transactionListView = (
      <BankingView
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.confirmBefore(this.filterBankTransactions)}
        onSort={this.confirmBefore(this.sortBankTransactions)}
        onDismissAlert={this.dismissAlert}
        onAllocate={this.allocateTransaction}
        onUnallocate={this.unallocateTransaction}
        onMatchedToBlur={this.blurEntry}
        onMatchedToFocus={this.focusEntry}
        onUnmatchedFocus={this.focusEntry}
        onUnmatchedBlur={this.blurEntry}
        onHeaderClick={this.confirmBefore(this.toggleLine)}
        onTabChange={this.confirmBefore(this.changeOpenEntryTab)}
        onSaveSplitAllocation={this.saveSplitAllocation}
        onCancelSplitAllocation={this.confirmBefore(this.collapseTransactionLine)}
        onUnallocateSplitAllocation={this.confirmBefore(this.unallocateSplitAllocation)}
        onUpdateSplitAllocationHeader={this.updateSplitAllocationHeader}
        onAddSplitAllocationLine={this.addSplitAllocationLine}
        onUpdateSplitAllocationLine={this.updateSplitAllocationLine}
        onDeleteSplitAllocationLine={this.deleteSplitAllocationLine}
        onCancelModal={this.cancelModal}
        onCloseModal={this.closeModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {transactionListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  focusEntry = (index) => {
    const intent = SET_ENTRY_FOCUS;

    this.store.dispatch({
      intent,
      index,
      isFocused: true,
    });
  }

  blurEntry = (index) => {
    const intent = SET_ENTRY_FOCUS;

    this.store.dispatch({
      intent,
      index,
      isFocused: false,
    });
  }

  setEntryLoadingState = (index, isLoading) => {
    const intent = SET_ENTRY_LOADING_STATE;

    this.store.dispatch({
      intent,
      index,
      isLoading,
    });
  }

  allocateTransaction = (index, selectedAccount) => {
    this.focusEntry(index + 1);
    this.blurEntry(index);
    this.setEntryLoadingState(index, true);

    const state = this.store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    const intent = ALLOCATE_TRANSACTION;

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
    };

    const onFailure = ({ message }) => {
      this.setEntryLoadingState(index, false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    const allocationPayload = getAllocationPayload(index, selectedAccount, state);

    this.integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content: allocationPayload,
      onSuccess,
      onFailure,
    });
  }

  unallocateTransaction = (index) => {
    this.setEntryLoadingState(index, true);

    const state = this.store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    const intent = UNALLOCATE_TRANSACTION;

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);

      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
    };

    const onFailure = ({ message }) => {
      this.setEntryLoadingState(index, false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    const unallocationPayload = getUnallocationPayload(index, state);

    this.integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content: unallocationPayload,
      onSuccess,
      onFailure,
    });
  }

  loadBankTransactions = () => {
    const state = this.store.getState();

    const intent = LOAD_BANK_TRANSACTIONS;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = () => {
      console.log('Failed to load bank transactions');
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
  }

  filterBankTransactions = () => {
    const state = this.store.getState();

    this.collapseTransactionLine();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        isSort: false,
        ...payload,
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
  }

  sortBankTransactions = (orderBy) => {
    const state = this.store.getState();

    this.collapseTransactionLine();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (payload) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        isSort: true,
        ...payload,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    const filterOptions = getAppliedFilterOptions(state);
    const sortOrder = getFlipSortOrder(state);

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
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  }

  updateFilterOptions = ({ filterName, value }) => {
    const intent = UPDATE_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterName,
      value,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  }

  confirmBefore = onConfirm => (...args) => {
    const state = this.store.getState();
    const isEdited = getIsOpenEntryEdited(state);

    if (isEdited) {
      this.openCancelModal({
        onConfirm: () => onConfirm(...args),
      });
    } else {
      onConfirm(...args);
    }
  }

  toggleLine = (index) => {
    const state = this.store.getState();
    const openPosition = getOpenPosition(state);

    const isOpened = openPosition === index;
    if (isOpened) {
      this.collapseTransactionLine();
    } else {
      this.expandTransactionLine(index);
    }
  }

  expandTransactionLine = (index) => {
    const state = this.store.getState();

    const line = getBankTransactionLineByIndex(state, index);
    const tabId = getOpenEntryDefaultTabId(line);

    this.loadOpenEntryTab(state, index, tabId);
  }

  collapseTransactionLine = () => {
    const intent = COLLAPSE_TRANSACTION_LINE;
    this.store.dispatch({ intent });
  }

  setOpenEntryPosition = (index) => {
    const intent = SET_OPEN_ENTRY_POSITION;
    this.store.dispatch({
      intent,
      index,
    });
  }

  setOpenEntryLoadingState = (isLoading) => {
    const intent = SET_OPEN_ENTRY_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  changeOpenEntryTab = (tabId) => {
    const state = this.store.getState();

    if (tabId !== getOpenEntryActiveTabId(state)) {
      const index = getOpenPosition(state);
      this.loadOpenEntryTab(state, index, tabId);
    }
  }

  loadOpenEntryTab = (state, index, tabId) => {
    const line = getBankTransactionLineByIndex(state, index);

    if (tabId === tabIds.allocate) {
      if (getIsAllocated(line)) {
        this.loadSplitAllocation(state, index, line);
      } else {
        this.loadNewSplitAllocation(index);
      }
    }

    if (tabId === tabIds.match) {
      this.loadMatchTransaction(index);
    }
  }

  loadSplitAllocation = (state, index, { withdrawal, journalId }) => {
    const intent = LOAD_SPLIT_ALLOCATION;

    const urlParams = {
      businessId: getBusinessId(state),
      type: withdrawal ? 'spend_money' : 'receive_money',
      journalId,
    };

    const onSuccess = (payload) => {
      this.setOpenEntryLoadingState(false);

      this.store.dispatch({
        intent,
        ...payload,
        index,
      });
    };

    const onFailure = ({ message }) => {
      this.setOpenEntryLoadingState(false);
      this.collapseTransactionLine();
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.setOpenEntryLoadingState(true);
    this.setOpenEntryPosition(index);
    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  loadNewSplitAllocation = (index) => {
    const intent = LOAD_NEW_SPLIT_ALLOCATION;
    this.store.dispatch({
      intent,
      index,
    });
  }

  saveSplitAllocation = () => {
    const intent = SAVE_SPLIT_ALLOCATION;
    const state = this.store.getState();

    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getSplitAllocationPayload(state, index);

    this.collapseTransactionLine();

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
      this.setAlert({
        type: 'success',
        message: 'Success! You\'ve successfully allocated bank transaction',
      });
    };

    const onFailure = ({ message }) => {
      this.setEntryLoadingState(index, false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.setEntryLoadingState(index, true);
    this.integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  }

  unallocateSplitAllocation = () => {
    const intent = UNALLOCATE_SPLIT_ALLOCATION;
    const state = this.store.getState();

    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getUnallocationPayload(index, state);

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
    };

    const onFailure = ({ message }) => {
      this.setEntryLoadingState(index, false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.collapseTransactionLine();
    this.setEntryLoadingState(index, true);
    this.integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  }

  openCancelModal = ({ onConfirm = () => {} }) => {
    this.afterCancel = onConfirm;
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: 'cancel',
    });
  };

  cancelModal = () => {
    this.closeModal();

    this.afterCancel();
    this.afterCancel = () => {};
  }

  closeModal = () => {
    this.store.dispatch({ intent: CLOSE_MODAL });
  };

  updateSplitAllocationHeader = ({ key, value }) => {
    const intent = UPDATE_SPLIT_ALLOCATION_HEADER;
    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  addSplitAllocationLine = (partialLine) => {
    const intent = ADD_SPLIT_ALLOCATION_LINE;
    this.store.dispatch({
      intent,
      line: partialLine,
    });
  }

  updateSplitAllocationLine = (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_SPLIT_ALLOCATION_LINE;
    this.store.dispatch({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });
  }

  deleteSplitAllocationLine = (index) => {
    const intent = DELETE_SPLIT_ALLOCATION_LINE;
    this.store.dispatch({
      intent,
      index,
    });
  }

  loadMatchTransaction = (index) => {
    const intent = LOAD_MATCH_TRANSACTION;
    this.store.dispatch({
      intent,
      index,
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
    this.setLoadingState(true);
    this.loadBankTransactions();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
