import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_SPLIT_ALLOCATION_LINE,
  ALLOCATE_TRANSACTION,
  CLEAR_BANK_FEEDS_LOGIN,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  DELETE_SPLIT_ALLOCATION_LINE,
  FETCH_BANK_FEEDS_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_NEW_SPLIT_ALLOCATION,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_PAYMENT_ALLOCATION,
  LOAD_PAYMENT_ALLOCATION_LINES,
  LOAD_PAYMENT_ALLOCATION_OPTIONS,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  OPEN_MODAL,
  RESET_FILTER_OPTIONS,
  SAVE_MATCH_TRANSACTION,
  SAVE_PAYMENT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SET_ALERT,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_FETCHING_TRANSACTIONS_STATE,
  SET_LOADING_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_PAYMENT_ALLOCATION_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
  UPDATE_BANK_FEEDS_LOGIN,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_PAYMENT_ALLOCATION_LINE,
  UPDATE_PAYMENT_ALLOCATION_OPTIONS,
  UPDATE_SPLIT_ALLOCATION_HEADER,
  UPDATE_SPLIT_ALLOCATION_LINE,
  UPDATE_TRANSFER_MONEY,
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
  getIsEntryLoading,
  getIsOpenEntryCreating,
  getIsOpenEntryEdited,
  getOpenEntryActiveTabId,
  getOpenEntryDefaultTabId,
  getOpenPosition,
  getOrderBy,
  getSortOrder,
  getUnallocationPayload,
} from './bankingSelectors';
import { getBankFeedsLoginDetails } from './bankingSelectors/bankFeedsLoginSelectors';
import {
  getDefaultMatchTransactionFilterOptions,
  getMatchTransactionFilterOptions,
  getMatchTransactionFlipSortOrder,
  getMatchTransactionOrderBy,
  getMatchTransactionPayload,
  getMatchTransactionSortOrder,
} from './bankingSelectors/matchTransactionSelectors';
import {
  getPaymentAllocationContactId,
  getPaymentAllocationFilterOptions, getPaymentAllocationPayload,
  getPaymentTypeUrlParam,
} from './bankingSelectors/paymentAllocationSelectors';
import { getSplitAllocationPayload } from './bankingSelectors/splitAllocationSelectors';
import { getTransferMoneyPayload } from './bankingSelectors/transferMoneySelectors';
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
        onSplitRowItemClick={this.confirmBefore(this.toggleLine)}
        onMatchRowItemClick={this.confirmBefore(this.toggleLine)}
        onMatchedToBlur={this.blurEntry}
        onMatchedToFocus={this.focusEntry}
        onUnmatchedFocus={this.focusEntry}
        onUnmatchedBlur={this.blurEntry}
        onHeaderClick={this.confirmBefore(this.toggleLine)}
        onTabChange={this.confirmBefore(this.changeOpenEntryTab)}
        onSaveSplitAllocation={this.saveSplitAllocation}
        onCancelSplitAllocation={this.confirmBefore(this.collapseTransactionLine)}
        onUnallocateSplitAllocation={this.confirmBefore(this.unallocateOpenEntryTransaction)}
        onUpdateSplitAllocationHeader={this.updateSplitAllocationHeader}
        onAddSplitAllocationLine={this.addSplitAllocationLine}
        onUpdateSplitAllocationLine={this.updateSplitAllocationLine}
        onDeleteSplitAllocationLine={this.deleteSplitAllocationLine}
        onApplyMatchTransactionOptions={this.confirmBefore(this.sortOrFilterMatchTransaction)}
        onUpdateMatchTransactionOptions={this.updateMatchTransactionOptions}
        onSortMatchTransactions={this.confirmBefore(this.sortMatchTransaction)}
        onUpdateMatchTransactionSelection={this.updateMatchTransactionSelection}
        onSaveMatchTransaction={this.saveMatchTransaction}
        onCancelMatchTransaction={this.confirmBefore(this.collapseTransactionLine)}
        onUpdatePaymentAllocationOptions={this.confirmBefore(this.updatePaymentAllocationOptions)}
        onUpdatePaymentAllocationLine={this.updatePaymentAllocationLine}
        onSavePaymentAllocation={this.savePaymentAllocation}
        onSaveTransferMoney={this.saveTransferMoney}
        onCancelTransferMoney={this.confirmBefore(this.collapseTransactionLine)}
        onCancelPaymentAllocation={this.confirmBefore(this.collapseTransactionLine)}
        onUnmatchTransaction={this.confirmBefore(this.unallocateOpenEntryTransaction)}
        onUpdateTransfer={this.updateTransferMoney}
        onCancelModal={this.cancelModal}
        onCloseModal={this.closeModal}
        onGetBankTransactions={this.confirmBefore(this.openBankFeedsLoginModal)}
        onUpdateBankFeedsLoginDetails={this.updateBankFeedsLoginDetails}
        onCancelBankFeedsLogin={this.cancelBankFeedsLoginModal}
        onConfirmBankFeedsLogin={this.confirmBankFeedsLogin}
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
    if (getIsEntryLoading(state)) {
      return;
    }

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
    if (getIsEntryLoading(state)) {
      return;
    }

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

  ifOpen = (index, fn) => (...args) => {
    const state = this.store.getState();
    if (getOpenPosition(state) !== index) {
      return;
    }

    fn(...args);
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

    this.loadOpenEntryTab(index, tabId);
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
      this.loadOpenEntryTab(index, tabId);
    }
  }

  loadOpenEntryTab = (index, tabId) => {
    const openEntryAction = {
      [tabIds.match]: this.loadMatchTransaction,
      [tabIds.allocate]: this.loadAllocate,
      [tabIds.payment]: this.loadPayment,
      [tabIds.transfer]: this.loadTransferMoney,
    }[tabId] || this.loadAllocate;

    openEntryAction(index);
  }

  loadTransferMoney = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadExistingTransferMoney(index, line);
    } else {
      this.loadNewTransferMoney(index);
    }
  }

  loadExistingTransferMoney = (index, line) => {
    const state = this.store.getState();
    const intent = LOAD_TRANSFER_MONEY;

    const urlParams = {
      businessId: getBusinessId(state),
      transferMoneyId: line.journalId,
    };

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.setOpenEntryLoadingState(false);
        this.store.dispatch({
          intent,
          ...payload,
          index,
        });
      },
    );

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

  loadNewTransferMoney = (index) => {
    const intent = LOAD_NEW_TRANSFER_MONEY;

    this.store.dispatch({
      intent,
      index,
    });
  }

  updateTransferMoney = ({ key, value }) => {
    const intent = UPDATE_TRANSFER_MONEY;
    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  loadAllocate = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadSplitAllocation(index, line);
    } else {
      this.loadNewSplitAllocation(index);
    }
  }

  loadSplitAllocation = (index, { withdrawal, journalId }) => {
    const state = this.store.getState();
    const intent = LOAD_SPLIT_ALLOCATION;

    const urlParams = {
      businessId: getBusinessId(state),
      type: withdrawal ? 'spend_money' : 'receive_money',
      journalId,
    };

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.setOpenEntryLoadingState(false);
        this.store.dispatch({
          intent,
          ...payload,
          index,
        });
      },
    );

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
        message: payload.message,
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

  unallocateOpenEntryTransaction = () => {
    const intent = UNALLOCATE_OPEN_ENTRY_TRANSACTION;
    const state = this.store.getState();

    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getUnallocationPayload(index, state);

    const onSuccess = (payload) => {
      this.setOpenEntryLoadingState(false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });

      this.ifOpen(index, () => this.loadMatchTransaction(index))();
    };

    const onFailure = ({ message }) => {
      this.setOpenEntryLoadingState(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.setOpenEntryLoadingState(true);
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

  openBankFeedsLoginModal = () => {
    this.collapseTransactionLine();
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: 'bankFeedsLogin',
    });
  };

  cancelBankFeedsLoginModal = () => {
    this.closeModal();
    this.store.dispatch({ intent: CLEAR_BANK_FEEDS_LOGIN });
  }

  updateBankFeedsLoginDetails = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BANK_FEEDS_LOGIN,
      key,
      value,
    });
  }

  setIsFetchingTransactions = (isFetchingTransactions) => {
    this.store.dispatch({
      intent: SET_FETCHING_TRANSACTIONS_STATE,
      isFetchingTransactions,
    });
  }

  resetFilters = () => {
    this.store.dispatch({
      intent: RESET_FILTER_OPTIONS,
    });
  }

  confirmBankFeedsLogin = () => {
    const onSuccess = ({ message }) => {
      this.setIsFetchingTransactions(false);
      this.resetFilters();
      this.setAlert({
        type: 'success',
        message,
      });
      this.loadBankTransactions();
    };

    const onFailure = ({ message }) => {
      this.setIsFetchingTransactions(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    const state = this.store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getBankFeedsLoginDetails(state);
    this.setIsFetchingTransactions(true);

    this.integration.write({
      intent: FETCH_BANK_FEEDS_TRANSACTIONS,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
    this.cancelBankFeedsLoginModal();
  }

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
    const [key, value] = Object.entries(partialLine)[0] || [];

    this.store.dispatch({
      intent,
      key,
      value,
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
    const state = this.store.getState();

    const intent = LOAD_MATCH_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const { bankAccount: accountId } = getFilterOptions(state);

    const line = getBankTransactionLineByIndex(state, index);
    const { withdrawal, deposit } = line;
    const filterOptions = getDefaultMatchTransactionFilterOptions(accountId, line);

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.setOpenEntryLoadingState(false);
        this.store.dispatch({
          intent,
          ...filterOptions,
          ...payload,
          totalAmount: (withdrawal || deposit),
          index,
        });
      },
    );

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
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  sortMatchTransaction = (orderBy) => {
    this.updateMatchTransactionSortOrder(orderBy);
    this.sortOrFilterMatchTransaction();
  }

  sortOrFilterMatchTransaction = () => {
    const state = this.store.getState();

    const intent = SORT_AND_FILTER_MATCH_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const index = getOpenPosition(state);
    const filterOptions = getMatchTransactionFilterOptions(state);
    const sortOrder = getMatchTransactionSortOrder(state);
    const orderBy = getMatchTransactionOrderBy(state);

    const onSuccess = (payload) => {
      const updatedState = this.store.getState();
      if (getOpenPosition(updatedState) !== index) {
        return;
      }

      this.setMatchTransactionLoadingState(false);
      this.store.dispatch({
        intent,
        ...payload,
        index,
      });
    };

    const onFailure = ({ message }) => {
      this.setMatchTransactionLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.setMatchTransactionLoadingState(true);
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

  saveMatchTransaction = () => {
    const intent = SAVE_MATCH_TRANSACTION;
    const state = this.store.getState();

    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getMatchTransactionPayload(state, index);

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
        message: payload.message,
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

  updateMatchTransactionOptions = ({ key, value }) => {
    const intent = UPDATE_MATCH_TRANSACTION_OPTIONS;
    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  updateMatchTransactionSortOrder = (orderBy) => {
    const state = this.store.getState();

    const newSortOrder = orderBy === getMatchTransactionOrderBy(state)
      ? getMatchTransactionFlipSortOrder(state) : 'asc';

    const intent = SET_MATCH_TRANSACTION_SORT_ORDER;
    this.store.dispatch({
      intent,
      orderBy,
      sortOrder: newSortOrder,
    });
  }

  setMatchTransactionLoadingState = (isLoading) => {
    const intent = SET_MATCH_TRANSACTION_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  updateMatchTransactionSelection = (selectedJournalLineId) => {
    const intent = UPDATE_MATCH_TRANSACTION_SELECTION;
    this.store.dispatch({
      intent,
      selectedJournalLineId,
    });
  }

  loadPayment = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadPaymentAllocation(index, line);
    } else {
      this.loadPaymentAllocationOptions(index);
    }
  }

  loadPaymentAllocationOptions = (index) => {
    const intent = LOAD_PAYMENT_ALLOCATION_OPTIONS;
    this.store.dispatch({
      intent,
      index,
    });
  }

  loadPaymentAllocationLines = () => {
    const intent = LOAD_PAYMENT_ALLOCATION_LINES;

    const state = this.store.getState();

    const index = getOpenPosition(state);

    const urlParams = {
      businessId: getBusinessId(state),
      paymentType: getPaymentTypeUrlParam(state, index),
    };

    const filterOptions = getPaymentAllocationFilterOptions(state);

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.setPaymentAllocationLoadingState(false);
        this.store.dispatch({
          intent,
          ...payload,
        });
      },
    );

    const onFailure = ({ message }) => {
      this.setPaymentAllocationLoadingState(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.setPaymentAllocationLoadingState(true);
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

  loadPaymentAllocation = (index, { journalId }) => {
    const intent = LOAD_PAYMENT_ALLOCATION;

    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      paymentType: getPaymentTypeUrlParam(state, index),
      paymentId: journalId,
    };

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.setOpenEntryLoadingState(false);
        this.store.dispatch({
          intent,
          ...payload,
          index,
        });
      },
    );

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

  savePaymentAllocation = () => {
    const intent = SAVE_PAYMENT_ALLOCATION;
    const state = this.store.getState();

    this.collapseTransactionLine();

    const isCreating = getIsOpenEntryCreating(state);
    if (!isCreating) {
      return;
    }

    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getPaymentAllocationPayload(state, index);

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
      this.setAlert({
        type: 'success',
        message: payload.message,
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

  saveTransferMoney = () => {
    const intent = SAVE_TRANSFER_MONEY;
    const state = this.store.getState();

    this.collapseTransactionLine();

    const isCreating = getIsOpenEntryCreating(state);
    if (!isCreating) {
      return;
    }
    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getTransferMoneyPayload(state);

    const onSuccess = (payload) => {
      this.setEntryLoadingState(index, false);
      this.store.dispatch({
        intent,
        index,
        ...payload,
      });
      this.setAlert({
        type: 'success',
        message: payload.message,
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

  updatePaymentAllocationOptions = ({ key, value }) => {
    const intent = UPDATE_PAYMENT_ALLOCATION_OPTIONS;
    this.store.dispatch({
      intent,
      key,
      value,
    });

    const state = this.store.getState();
    const contactId = getPaymentAllocationContactId(state);
    if (contactId) {
      this.loadPaymentAllocationLines();
    }
  }

  updatePaymentAllocationLine = ({ index, key, value }) => {
    const intent = UPDATE_PAYMENT_ALLOCATION_LINE;
    this.store.dispatch({
      intent,
      index,
      key,
      value,
    });
  }

  setPaymentAllocationLoadingState = (isLoading) => {
    const intent = SET_PAYMENT_ALLOCATION_LOADING_STATE;
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
