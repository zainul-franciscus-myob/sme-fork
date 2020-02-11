import { Provider } from 'react-redux';
import React from 'react';

import {
  getBankTransactionLineByIndex,
  getBankingRuleInitState,
  getBusinessId,
  getFilterOptions,
  getIsAllocated,
  getIsEntryLoading,
  getIsOpenEntryEdited,
  getOpenEntryActiveTabId,
  getOpenEntryDefaultTabId,
  getOpenPosition,
  getRegion,
} from './bankingSelectors';
import {
  getDefaultMatchTransactionFilterRequestParams,
  getMatchTransactionFlipSortOrder,
  getMatchTransactionOrderBy,
  getShowType,
} from './bankingSelectors/matchTransactionSelectors';
import { getFilesForUpload } from './bankingSelectors/attachmentsSelectors';
import { getIsAllSelected, getIsEditedEntryInBulkSelection } from './bankingSelectors/bulkAllocationSelectors';
import {
  getMatchTransferMoneyFlipSortOrder,
  getMatchTransferMoneyOrderBy,
} from './bankingSelectors/transferMoneySelectors';
import { tabIds } from './tabItems';
import BankingRuleModule from './bankingRule/BankingRuleModule';
import BankingView from './components/BankingView';
import Store from '../../store/Store';
import bankingReducer from './bankingReducer';
import createBankingDispatcher from './BankingDispatcher';
import createBankingIntegrator from './BankingIntegrator';

export default class BankingModule {
  constructor({
    integration, setRootView,
  }) {
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
    this.dispatcher = createBankingDispatcher(this.store);
    this.integrator = createBankingIntegrator(this.store, integration);
    this.bankingRuleModule = new BankingRuleModule(
      {
        integration,
        store: this.store,
        onCancel: this.dispatcher.closeModal,
        onSaveSuccess: this.applyRuleToTransaction,
      },
    );
  }

  render = () => {
    const {
      updateFilterOptions,
      dismissAlert,
      dismissModalAlert,
      focusEntry,
      blurEntry,
      collapseTransactionLine,
      updateSplitAllocationHeader,
      updateSplitAllocationLine,
      deleteSplitAllocationLine,
      updateMatchTransactionOptions,
      updateMatchTransactionSelection,
      addMatchTransactionAdjustment,
      updateMatchTransactionAdjustment,
      removeMatchTransactionAdjustment,
      expandAdjustmentSection,
      updateSelectedTransactionDetails,
      setTransferMoneyDetail,
      setMatchTransferMoneySelection,
      closeModal,
      updateBulkAllocationOption,
      openBankingRuleModal,
      resetBulkAllocation,
      setEditingNoteState,
      setPendingNote,
    } = this.dispatcher;

    const transactionListView = (
      <BankingView
        onUpdateFilters={updateFilterOptions}
        onApplyFilter={this.confirmBefore(this.filterBankTransactions)}
        onBankAccountChange={this.bankAccountChange}
        onSort={this.confirmBefore(this.sortBankTransactions)}
        onDismissAlert={dismissAlert}
        onDismissModalAlert={dismissModalAlert}
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
        onUnallocateSplitAllocation={
          this.openUnmatchTransactionModal(this.unallocateOpenEntryTransaction)
        }
        onUpdateSplitAllocationHeader={updateSplitAllocationHeader}
        onAddSplitAllocationLine={this.addSplitAllocationLine}
        onUpdateSplitAllocationLine={updateSplitAllocationLine}
        onDeleteSplitAllocationLine={deleteSplitAllocationLine}
        onApplyMatchTransactionOptions={this.sortOrFilterMatchTransaction}
        onUpdateMatchTransactionOptions={updateMatchTransactionOptions}
        onSortMatchTransactions={this.sortMatchTransaction}
        onUpdateMatchTransactionSelection={updateMatchTransactionSelection}
        onAddAdjustment={addMatchTransactionAdjustment}
        onUpdateAdjustment={updateMatchTransactionAdjustment}
        onRemoveAdjustment={removeMatchTransactionAdjustment}
        onExpandAdjustmentSection={expandAdjustmentSection}
        onUpdateSelectedTransactionDetails={updateSelectedTransactionDetails}
        onToggleSelectAllState={this.toggleSelectAllState}
        onSaveMatchTransaction={this.saveMatchTransaction}
        onCancelMatchTransaction={this.confirmBefore(collapseTransactionLine)}
        onSaveTransferMoney={this.saveTransferMoney}
        onSaveMatchTransferMoney={this.saveMatchTransferMoney}
        onCancelTransferMoney={this.confirmBefore(collapseTransactionLine)}
        onUnmatchTransaction={this.openUnmatchTransactionModal(this.unmatchTransaction)}
        onUpdateTransfer={setTransferMoneyDetail}
        onSortTransfer={this.sortMatchTransferMoney}
        onUpdateTransferSelection={setMatchTransferMoneySelection}
        onCancelModal={this.cancelModal}
        onCloseModal={closeModal}
        onSelectTransaction={this.selectTransaction}
        onSelectAllTransactions={this.selectAllTransactions}
        onUpdateBulkAllocationOption={updateBulkAllocationOption}
        onSaveBulkAllocation={this.saveBulkAllocation}
        onSaveBulkUnallocation={this.openBulkUnallocateModal}
        onCloseBulkAllocation={resetBulkAllocation}
        onCancelUnallocateModal={closeModal}
        onConfirmUnallocateModal={this.bulkUnallocateTransactions}
        onOpenBankingRuleModal={openBankingRuleModal}
        onOpenTransferMoneyModal={this.openTransferMoneyModal}
        onRenderBankingRuleModal={this.renderBankingRuleModal}
        onAddAttachments={this.addAttachments}
        onRemoveAttachment={this.openDeleteAttachmentModal}
        onDeleteAttachmentModal={this.removeAttachment}
        onEditNote={setEditingNoteState}
        onPendingNoteChange={setPendingNote}
        onNoteBlur={this.savePendingNote}
        onImportStatementButtonClick={this.redirectToBankStatementImport}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {transactionListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  redirectToBankStatementImport = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bankStatementImport`;
  }

  toggleSelectAllState = ({ value }) => {
    this.dispatcher.toggleSelectAllState(value);
  }

  applyRuleToTransaction = ({ message, bankingRuleId }) => {
    this.dispatcher.closeModal();
    this.dispatcher.collapseTransactionLine();
    this.dispatcher.setLoadingState(true);

    const onSuccess = (entries) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.applyRuleToTransactions(entries);
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    };

    const onFailure = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message: payload.message,
      });
    };

    this.integrator.applyRuleToTransactions({
      onSuccess, onFailure, bankingRuleId,
    });
  }

  renderBankingRuleModal = () => {
    const initState = getBankingRuleInitState(this.store.getState());
    return this.bankingRuleModule.getView(initState);
  };

  allocateTransaction = (index, selectedAccount) => {
    this.dispatcher.focusEntry(index + 1);
    this.dispatcher.blurEntry(index);
    this.dispatcher.setEntryLoadingState(index, true);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.allocateTransaction(index, { payload, selectedAccount });
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
      this.dispatcher.unselectTransactions();
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

  openUnmatchTransactionModal = onConfirm => (index) => {
    this.afterCancel = () => onConfirm(index);
    this.dispatcher.openUnmatchTransactionModal();
  }

  unallocateTransaction = (index) => {
    this.dispatcher.setEntryLoadingState(index, true);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.unAllocateTransaction(index, payload);
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
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setErrorState(true);
    };

    this.integrator.loadBankTransactions({
      onSuccess,
      onFailure,
    });
  }

  bankAccountChange = ({ value }) => {
    this.dispatcher.updateFilterOptions({ filterName: 'bankAccount', value });
    this.confirmBefore(this.filterBankTransactions)();
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
    this.loadAttachments();
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
      this.loadMatchTransferMoney(index);
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

  loadMatchTransferMoney = (index) => {
    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setOpenEntryLoadingState(false);
        this.dispatcher.loadMatchTransferMoney(index, payload);
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setOpenEntryPosition(index);
    this.dispatcher.setOpenEntryLoadingState(true);
    this.integrator.loadMatchTransferMoney({ index, onSuccess, onFailure });
  }

  sortMatchTransferMoney = (orderBy) => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const newSortOrder = orderBy === getMatchTransferMoneyOrderBy(state)
      ? getMatchTransferMoneyFlipSortOrder(state) : 'asc';
    this.dispatcher.setMatchTransferMoneySortOrder(orderBy, newSortOrder);

    const onSuccess = this.ifOpen(
      index,
      (payload) => {
        this.dispatcher.setMatchTransferMoneyLoadingState(false);
        this.dispatcher.sortMatchTransferMoney(payload);
      },
    );

    const onFailure = ({ message }) => {
      this.dispatcher.setMatchTransferMoneyLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setMatchTransferMoneyLoadingState(true);
    this.integrator.loadMatchTransferMoney({ index, onSuccess, onFailure });
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

  unmatchTransaction = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);
    const onSuccess = (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.unmatchTransaction(index, payload);
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
    this.integrator.unmatchTransaction({
      onSuccess,
      onFailure,
    });
  }

  unallocateOpenEntryTransaction = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.unAllocateOpenEntryTransaction(index, payload);
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

  openBulkUnallocateModal = () => {
    this.dispatcher.openBulkUnallocateModal();
  };

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
    const filterOptions = getDefaultMatchTransactionFilterRequestParams(accountId, line);

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

    const showType = getShowType(state);
    if (showType === 'selected') {
      this.dispatcher.showSelectedMatchTransactions();
    } else {
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

  saveMatchTransferMoney = () => {
    const state = this.store.getState();

    this.dispatcher.startModalBlocking();

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.saveTransferMoney(index, payload);
      this.dispatcher.setAlert({ type: 'success', message: payload.message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setEntryLoadingState(index, true);
    this.integrator.saveMatchTransferMoney({
      index,
      onSuccess,
      onFailure,
    });
    this.dispatcher.collapseTransactionLine();
  }

  saveTransferMoney = () => {
    const state = this.store.getState();

    this.dispatcher.startModalBlocking();

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.saveTransferMoney(index, payload);
      this.dispatcher.stopModalBlocking();
      this.dispatcher.closeModal();
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
      this.dispatcher.collapseTransactionLine();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntryLoadingState(index, false);
      this.dispatcher.stopModalBlocking();
      this.dispatcher.setModalAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.saveTransferMoney({
      index,
      onSuccess,
      onFailure,
    });
  };

  openTransferMoneyModal = () => {
    this.dispatcher.openTransferMoneyModal();
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

  savePendingNote = () => {
    this.dispatcher.setSubmittingNoteState(true);

    const onSuccess = () => {
      this.dispatcher.setSubmittingNoteState(false);
      this.dispatcher.savePendingNote();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingNoteState(false);
      this.dispatcher.setEditingNoteState(-1);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.savePendingNote({
      onSuccess,
      onFailure,
    });
  };

  loadAttachments = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setAttachemntsLoadingState(false);
      this.dispatcher.loadAttachments(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAttachemntsLoadingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setAttachemntsLoadingState(true);

    this.integrator.loadAttachments({
      onSuccess,
      onFailure,
    });
  };

  addAttachments = (files) => {
    this.dispatcher.addAttachments(files);

    this.uploadAttachments(files);
  };

  uploadAttachments = (files) => {
    const state = this.store.getState();

    getFilesForUpload(state, files).forEach(file => this.uploadAttachment(file));
  };

  uploadAttachment = (file) => {
    const onSuccess = (response) => {
      this.dispatcher.uploadAttachment({ response, file });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadAttachmentFailed({ message, file });
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.updateUploadProgress({ uploadProgress, file });
    };

    this.integrator.uploadAttachment({
      onSuccess,
      onFailure,
      onProgress,
      file,
    });
  };

  openDeleteAttachmentModal = (index) => {
    const state = this.store.getState();
    const { id } = state.openEntry.attachments[index];

    if (id) {
      this.dispatcher.openRemoveAttachmentModal(id);
    } else {
      this.dispatcher.removeAttachmentByIndex(index);
    }
  };

  removeAttachment = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const id = state.openEntry.pendingDeleteId;

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = () => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.removeAttachment(id);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.removeAttachment({
      onSuccess,
      onFailure,
    });
  };

  resetState = () => {
    this.dispatcher.resetState();
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.dispatcher.setLoadingState(true);
    this.loadBankTransactions();
  }
}