import { Provider } from 'react-redux';
import React from 'react';

import {
  getBankTransactionLineByIndex,
  getDefaultOpenPosition,
  getFilterOptions,
  getIsAllocated,
  getIsEntryLoading,
  getIsOpenEntryCreating,
  getIsOpenEntryEdited,
  getIsSplitAllocationSelected,
  getOpenEntryActiveTabId,
  getOpenEntryDefaultTabId,
  getOpenPosition,
} from './bankingSelectors';
import {
  getDefaultMatchTransactionFilterOptions,
  getMatchTransactionFlipSortOrder,
  getMatchTransactionOrderBy,
} from './bankingSelectors/matchTransactionSelectors';
import {
  getIsAllSelected,
  getIsEditedEntryInBulkSelection,
} from './bankingSelectors/bulkAllocationSelectors';
import { getPaymentAllocationContactId } from './bankingSelectors/paymentAllocationSelectors';
import { tabIds } from './tabItems';
import BankingView from './components/BankingView';
import Store from '../store/Store';
import bankingReducer from './bankingReducer';
import createBankingDispatcher from './BankingDispatcher';
import createBankingIntegrator from './BankingIntegrator';
import keyMap from '../hotKeys/keyMap';
import setupHotKeys from '../hotKeys/setupHotKeys';

export default class BankingModule {
  constructor({
    integration, setRootView,
  }) {
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
    this.dispatcher = createBankingDispatcher(this.store);
    this.integrator = createBankingIntegrator(this.store, integration);
  }

  render = () => {
    const {
      updateFilterOptions,
      dismissAlert,
      focusEntry,
      blurEntry,
      collapseTransactionLine,
      updateSplitAllocationHeader,
      updateSplitAllocationLine,
      deleteSplitAllocationLine,
      updateMatchTransactionOptions,
      updateMatchTransactionSelection,
      updatePaymentAllocationLine,
      updateTransferMoney,
      closeModal,
      updateBankFeedsLoginDetails,
      updateBulkAllocationOption,
    } = this.dispatcher;

    const transactionListView = (
      <BankingView
        onUpdateFilters={updateFilterOptions}
        onApplyFilter={this.confirmBefore(this.filterBankTransactions)}
        onSort={this.confirmBefore(this.sortBankTransactions)}
        onDismissAlert={dismissAlert}
        onAllocate={this.allocateTransaction}
        onUnallocate={this.unallocateTransaction}
        onSplitRowItemClick={this.confirmBefore(this.toggleLine)}
        onMatchRowItemClick={this.confirmBefore(this.toggleLine)}
        onMatchedToBlur={blurEntry}
        onMatchedToFocus={focusEntry}
        onUnmatchedFocus={focusEntry}
        onUnmatchedBlur={blurEntry}
        onHeaderClick={this.confirmBefore(this.toggleLine)}
        onTabChange={this.confirmBefore(this.changeOpenEntryTab)}
        onSaveSplitAllocation={this.saveSplitAllocation}
        onCancelSplitAllocation={this.confirmBefore(collapseTransactionLine)}
        onUnallocateSplitAllocation={this.confirmBefore(this.unallocateOpenEntryTransaction)}
        onUpdateSplitAllocationHeader={updateSplitAllocationHeader}
        onAddSplitAllocationLine={this.addSplitAllocationLine}
        onUpdateSplitAllocationLine={updateSplitAllocationLine}
        onDeleteSplitAllocationLine={deleteSplitAllocationLine}
        onApplyMatchTransactionOptions={this.confirmBefore(this.sortOrFilterMatchTransaction)}
        onUpdateMatchTransactionOptions={updateMatchTransactionOptions}
        onSortMatchTransactions={this.confirmBefore(this.sortMatchTransaction)}
        onUpdateMatchTransactionSelection={updateMatchTransactionSelection}
        onSaveMatchTransaction={this.saveMatchTransaction}
        onCancelMatchTransaction={this.confirmBefore(collapseTransactionLine)}
        onUpdatePaymentAllocationOptions={this.confirmBefore(this.updatePaymentAllocationOptions)}
        onUpdatePaymentAllocationLine={updatePaymentAllocationLine}
        onSavePaymentAllocation={this.savePaymentAllocation}
        onSaveTransferMoney={this.saveTransferMoney}
        onCancelTransferMoney={this.confirmBefore(collapseTransactionLine)}
        onCancelPaymentAllocation={this.confirmBefore(collapseTransactionLine)}
        onUnmatchTransaction={this.confirmBefore(this.unallocateOpenEntryTransaction)}
        onUpdateTransfer={updateTransferMoney}
        onCancelModal={this.cancelModal}
        onCloseModal={closeModal}
        onGetBankTransactions={this.confirmBefore(this.openBankFeedsLoginModal)}
        onUpdateBankFeedsLoginDetails={updateBankFeedsLoginDetails}
        onCancelBankFeedsLogin={this.closeBankFeedsLoginModal}
        onConfirmBankFeedsLogin={this.confirmBankFeedsLogin}
        onSelectTransaction={this.selectTransaction}
        onSelectAllTransactions={this.selectAllTransactions}
        onUpdateBulkAllocationOption={updateBulkAllocationOption}
        onSaveBulkAllocation={this.saveBulkAllocation}
        onSaveBulkUnallocation={this.openBulkUnallocateModal}
        onCancelUnallocateModal={closeModal}
        onConfirmUnallocateModal={this.bulkUnallocateTransactions}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {transactionListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  allocateTransaction = (index, selectedAccount) => {
    this.dispatcher.focusEntry(index + 1);
    this.dispatcher.blurEntry(index);
    this.dispatcher.setEntryLoadingState(index, true);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.allocateTransaction(index, payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.allocateTransaction({
      index,
      selectedAccount,
      onSuccess,
      onFailure,
    });
  };

  saveBulkAllocation = () => {
    const state = this.store.getState();
    const isEditedEntryInBulkSelection = getIsEditedEntryInBulkSelection(state);

    if (isEditedEntryInBulkSelection) {
      this.openCancelModal({
        onConfirm: () => {
          this.bulkAllocateTransactions();
        },
      });
    } else {
      this.bulkAllocateTransactions();
    }
  };

  bulkAllocateTransactions = () => {
    this.dispatcher.setBulkLoadingState(true);
    this.dispatcher.collapseTransactionLine();

    const onSuccess = (payload) => {
      this.dispatcher.setBulkLoadingState(false);
      this.dispatcher.bulkAllocateTransactions(payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setBulkLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.bulkAllocateTransactions({
      onSuccess,
      onFailure,
    });
  };

  unallocateTransaction = (index) => {
    this.dispatcher.setEntryLoadingState(index, true);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.unAllocateTransaction(index, payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.unallocateTranscation({ index, onSuccess, onFailure });
  }

  bulkUnallocateTransactions = () => {
    this.dispatcher.closeModal();
    this.dispatcher.collapseTransactionLine();
    this.dispatcher.setBulkLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setBulkLoadingState(false);
      this.dispatcher.bulkUnallocateTransactions(payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setBulkLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.bulkUnallocateTransactions({
      onSuccess,
      onFailure,
    });
  };

  loadBankTransactions = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadBankTransactions(payload);
    };

    const onFailure = () => {
      console.log('Failed to load bank transactions');
    };

    this.integrator.loadBankTransactions({
      onSuccess,
      onFailure,
    });
  }

  filterBankTransactions = () => {
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

    this.dispatcher.collapseTransactionLine();
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterBankTransactions(false, payload);
    };

    const onFailure = ({ message }) => this.dispatcher.setAlert({ message, type: 'danger' });

    this.integrator.filterBankTransactions({
      onSuccess,
      onFailure,
    });
  }

  sortBankTransactions = (orderBy) => {
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

    this.dispatcher.collapseTransactionLine();
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterBankTransactions(true, payload);
    };

    const onFailure = ({ message }) => this.dispatcher.setAlert({ message, type: 'danger' });

    this.integrator.sortBankTransactions({
      orderBy,
      onSuccess,
      onFailure,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
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
      this.dispatcher.collapseTransactionLine();
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
      this.loadExistingTransferMoney(index);
    } else {
      this.dispatcher.loadNewTransferMoney(index);
    }
  }

  loadExistingTransferMoney = (index) => {
    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setOpenEntryLoadingState(false);
        this.dispatcher.loadExistingTransferMoney(index, payload);
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setOpenEntryLoadingState(true);
    this.dispatcher.setOpenEntryPosition(index);
    this.integrator.loadExistingTransferMoney({
      index,
      onSuccess,
      onFailure,
    });
  }

  loadAllocate = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadSplitAllocation(index);
    } else {
      this.dispatcher.loadNewSplitAllocation(index);
    }
  }

  loadSplitAllocation = (index) => {
    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setOpenEntryLoadingState(false);
        this.dispatcher.loadSplitAllocation(index, payload);
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setOpenEntryLoadingState(true);
    this.dispatcher.setOpenEntryPosition(index);

    this.integrator.loadSplitAllocation({
      index,
      onSuccess,
      onFailure,
    });
  }

  saveSplitAllocation = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.saveSplitAllocation(index, payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setEntryLoadingState(index, true);

    this.integrator.saveSplitAllocation({
      index,
      onSuccess,
      onFailure,
    });

    this.dispatcher.collapseTransactionLine();
  }

  unallocateOpenEntryTransaction = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.unAllocateOpenEntryTransaction(index, payload);

      this.ifOpen(index, () => this.loadMatchTransaction(index))();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setOpenEntryLoadingState(true);
    this.integrator.unallocateOpenEntryTransaction({
      onSuccess,
      onFailure,
    });
  }

  openCancelModal = ({ onConfirm = () => {} }) => {
    this.afterCancel = onConfirm;
    this.dispatcher.openCancelModal();
  };

  openBankFeedsLoginModal = () => {
    this.dispatcher.collapseTransactionLine();
    this.dispatcher.openBankFeedsLoginModal();
  };

  closeBankFeedsLoginModal = () => {
    this.dispatcher.closeModal();
    this.dispatcher.clearBankFeedsLogin();
  }

  openBulkUnallocateModal = () => {
    this.dispatcher.openBulkUnallocateModal();
  };

  confirmBankFeedsLogin = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setIsFetchingTransactions(false);
      this.dispatcher.resetFilters();
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
      this.filterBankTransactions();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsFetchingTransactions(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setIsFetchingTransactions(true);
    this.integrator.confirmBankFeedsLogin({ onSuccess, onFailure });

    this.closeBankFeedsLoginModal();
  }

  cancelModal = () => {
    this.dispatcher.closeModal();

    this.afterCancel();
    this.afterCancel = () => {};
  }

  addSplitAllocationLine = (partialLine) => {
    const [key, value] = Object.entries(partialLine)[0] || [];

    this.dispatcher.addSplitAllocationLine({ key, value });
  }

  loadMatchTransaction = (index) => {
    const state = this.store.getState();

    const { bankAccount: accountId } = getFilterOptions(state);

    const line = getBankTransactionLineByIndex(state, index);
    const { withdrawal, deposit } = line;
    const filterOptions = getDefaultMatchTransactionFilterOptions(accountId, line);

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setOpenEntryLoadingState(false);
        const totalAmount = withdrawal || deposit;
        this.dispatcher.loadMatchTransaction(
          index, filterOptions, payload, totalAmount,
        );
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setOpenEntryLoadingState(true);
    this.dispatcher.setOpenEntryPosition(index);
    this.integrator.loadMatchTranscation({
      index,
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

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      const updatedState = this.store.getState();
      if (getOpenPosition(updatedState) !== index) {
        return;
      }

      this.dispatcher.setMatchTransactionLoadingState(false);
      this.dispatcher.sortAndFilterMatchTransactions(index, payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setMatchTransactionLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setMatchTransactionLoadingState(true);
    this.integrator.sortOrFilterMatchTransaction({
      onSuccess,
      onFailure,
    });
  }

  saveMatchTransaction = () => {
    const state = this.store.getState();

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.saveMatchTransaction(index, payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setEntryLoadingState(index, true);
    this.integrator.saveMatchTransaction({
      index,
      onSuccess,
      onFailure,
    });

    this.dispatcher.collapseTransactionLine();
  }

  updateMatchTransactionSortOrder = (orderBy) => {
    const state = this.store.getState();

    const newSortOrder = orderBy === getMatchTransactionOrderBy(state)
      ? getMatchTransactionFlipSortOrder(state) : 'asc';

    this.dispatcher.updateMatchTransactionSortOrder(orderBy, newSortOrder);
  }

  loadPayment = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadPaymentAllocation(index);
    } else {
      this.dispatcher.loadPaymentAllocationOptions(index);
    }
  }

  loadPaymentAllocationLines = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setPaymentAllocationLoadingState(false);
        this.dispatcher.loadPaymentAllocationLines(index, payload);
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setPaymentAllocationLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setPaymentAllocationLoadingState(true);

    this.integrator.loadPaymentAllocationLines({
      onSuccess,
      onFailure,
    });
  }

  updatePaymentAllocationOptions = ({ key, value }) => {
    this.dispatcher.updatePaymentAllocationOptions({ key, value });

    const state = this.store.getState();
    const contactId = getPaymentAllocationContactId(state);
    if (contactId) {
      this.loadPaymentAllocationLines();
    }
  }

  loadPaymentAllocation = (index) => {
    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setOpenEntryLoadingState(false);
        this.dispatcher.loadPaymentAllocation(index, payload);
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setOpenEntryLoadingState(true);
    this.dispatcher.setOpenEntryPosition(index);

    this.integrator.loadPaymentAllocation({
      index,
      onSuccess,
      onFailure,
    });
  }

  savePaymentAllocation = () => {
    const state = this.store.getState();

    const isCreating = getIsOpenEntryCreating(state);
    if (!isCreating) {
      this.dispatcher.collapseTransactionLine();
      return;
    }

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.savePaymentAllocation(index, payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setEntryLoadingState(index, true);
    this.integrator.savePaymentAllocation({
      index,
      onSuccess,
      onFailure,
    });

    this.dispatcher.collapseTransactionLine();
  }

  saveTransferMoney = () => {
    const state = this.store.getState();

    this.dispatcher.collapseTransactionLine();

    const isCreating = getIsOpenEntryCreating(state);
    if (!isCreating) {
      return;
    }

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.saveTransferMoney(index, payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setEntryLoadingState(index, true);

    this.integrator.saveTransferMoney({
      index,
      onSuccess,
      onFailure,
    });
  }

  selectAllTransactions = () => {
    const state = this.store.getState();
    const isEdited = getIsOpenEntryEdited(state);
    const isAllSelected = getIsAllSelected(state);

    if (isEdited && !isAllSelected) {
      this.openCancelModal({
        onConfirm: () => {
          this.dispatcher.collapseTransactionLine();
          this.dispatcher.selectAllTransactions();
        },
      });
    } else {
      this.dispatcher.selectAllTransactions();
    }
  };

  selectTransaction = ({ index, value }) => {
    const state = this.store.getState();
    const isEdited = getIsOpenEntryEdited(state);

    if (index === state.openPosition && isEdited && value) {
      this.openCancelModal({
        onConfirm: () => {
          this.dispatcher.collapseTransactionLine();
          this.dispatcher.selectTransaction({ index, value });
        },
      });
    } else {
      this.dispatcher.selectTransaction({ index, value });
    }
  };

  resetState = () => {
    this.dispatcher.resetState();
  }

  saveSplitAllocationHotkey = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);
    if (index !== getDefaultOpenPosition()
        && getIsSplitAllocationSelected(state)) {
      this.saveSplitAllocation();
    }
  }

  handlers = {
    SAVE_ACTION: this.saveSplitAllocationHotkey,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.dispatcher.setLoadingState(true);
    this.loadBankTransactions();
  }
}
