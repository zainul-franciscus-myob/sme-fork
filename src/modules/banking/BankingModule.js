import { Provider } from 'react-redux';
import React from 'react';

import {
  A,
  COMMAND,
  CTRL,
  ENTER,
  EQUALS,
  ESCAPE,
  F2,
  F4,
  F8,
  FORWARD_SLASH,
  G,
  L,
  M,
  OPTION,
  R,
  SHIFT,
  T,
} from './hotkeys/HotkeyEnums';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../common/taxCalculator';
import {
  getAccountModalContext,
  getBankTransactionLineByIndex,
  getBankingRuleModuleContext,
  getBusinessId,
  getFilterOptions,
  getIndexOfNextUnmatchedLine,
  getIsAllocated,
  getIsEntryLoading,
  getIsOpenEntryEdited,
  getIsOpenTransactionWithdrawal,
  getIsPrefillSplitAllocationEnabled,
  getIsTabDisabled,
  getJobModalContext,
  getLastAllocatedAccount,
  getLocationOfTransactionLine,
  getOpenEntryActiveTabId,
  getOpenEntryDefaultTabId,
  getOpenPosition,
  getRegion,
  getTaxCodes,
  getURLParams,
} from './selectors';
import {
  getBankingRuleId,
  getIsSpendMoney,
  getLinesForTaxCalculation,
  getReceiveMoneyBankingRuleComboboxContext,
  getSpendMoneyBankingRuleComboboxContext,
  getSplitAllocateContactComboboxContext,
} from './tabs/splitAllocation/splitAllocationSelectors';
import {
  getCanSelectMore,
  getIsEditedEntryInBulkSelection,
} from './selectors/bulkActionSelectors';
import {
  getDefaultMatchTransactionFilterRequestParams,
  getMatchTransactionContactComboboxContext,
  getMatchTransactionFlipSortOrder,
  getMatchTransactionOrderBy,
  getShowType,
} from './tabs/matchTransaction/matchTransactionSelectors';
import {
  getFilesForUpload,
  getInTrayModalContext,
} from './selectors/attachmentsSelectors';
import {
  getMatchTransferMoneyFlipSortOrder,
  getMatchTransferMoneyOrderBy,
} from './tabs/transferMoney/transferMoneySelectors';
import AccountModalModule from '../account/accountModal/AccountModalModule';
import BankingRuleComboboxModule from '../bankingRules/bankingRuleCombobox/BankingRuleComboboxModule';
import BankingRuleModule from './bankingRule/BankingRuleModule';
import BankingView from './components/BankingView';
import ContactComboboxModule from '../contact/contactCombobox/ContactComboboxModule';
import FeatureToggle from '../../FeatureToggles';
import FocusLocations from './types/FocusLocations';
import HotkeyLocations from './hotkeys/HotkeyLocations';
import Hotkeys from './hotkeys/Hotkeys';
import InTrayModalModule from '../inTray/inTrayModal/InTrayModalModule';
import JobModalModule from '../job/jobModal/JobModalModule';
import LoadingState from '../../components/PageView/LoadingState';
import MatchTransactionShowType from './types/MatchTransactionShowType';
import Store from '../../store/Store';
import TabItems from './types/TabItems';
import bankingReducer from './reducers';
import createBankingDispatcher from './BankingDispatcher';
import createBankingIntegrator from './BankingIntegrator';
import debounce from '../../common/debounce/debounce';
import isFeatureEnabled from '../../common/feature/isFeatureEnabled';
import openBlob from '../../common/blobOpener/openBlob';

export default class BankingModule {
  constructor({
    integration,
    setRootView,
    isToggleOn,
    replaceURLParams,
    featureToggles,
  }) {
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
    this.dispatcher = createBankingDispatcher(this.store);
    this.integrator = createBankingIntegrator(this.store, integration);
    this.isToggleOn = isToggleOn;
    this.featureToggles = featureToggles;
    this.replaceURLParams = replaceURLParams;
    this.bankingRuleModule = new BankingRuleModule({
      integration,
      isToggleOn,
    });
    this.inTrayModalModule = new InTrayModalModule({ integration });
    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.jobModalModule = new JobModalModule({ integration });
    this.spendMoneyTaxCalculator = createTaxCalculator(
      TaxCalculatorTypes.spendMoney
    );
    this.receiveMoneyTaxCalculator = createTaxCalculator(
      TaxCalculatorTypes.receiveMoney
    );

    this.splitAllocationContactComboboxModule = new ContactComboboxModule({
      integration,
    });
    this.spendMoneyBankingRuleComboboxModule = new BankingRuleComboboxModule({
      integration,
    });
    this.receiveMoneyBankingRuleComboboxModule = new BankingRuleComboboxModule({
      integration,
    });
    this.matchTransactionContactComboboxModule = new ContactComboboxModule({
      integration,
    });
  }

  updateFilterOptions = ({ filterName, value }) => {
    this.dispatcher.updateFilterOptions({ filterName, value });
    if (filterName === 'keywords') {
      debounce(this.filterBankTransactions)();
    } else {
      this.filterBankTransactions();
    }
  };

  updateMatchTransactionOptions = ({ key, value }) => {
    this.dispatcher.updateMatchTransactionOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.sortOrFilterMatchTransaction)();
    } else {
      this.sortOrFilterMatchTransaction();
    }
  };

  resetMatchTransactionOptions = () => {
    this.dispatcher.resetMatchTransactionOptions();
    this.sortOrFilterMatchTransaction();
  };

  updatePeriodDateRange = ({ period, dateFrom, dateTo }) => {
    this.dispatcher.updatePeriodDateRange({
      period,
      dateFrom,
      dateTo,
    });

    this.filterBankTransactions();
  };

  resetFilters = () => {
    this.dispatcher.resetFilters();
    this.filterBankTransactions();
  };

  render = () => {
    const inTrayModal = this.inTrayModalModule.render();
    const accountModal = this.accountModalModule.render();
    const jobModal = this.jobModalModule.render();

    const renderSplitAllocationContactCombobox = (props) => {
      return this.splitAllocationContactComboboxModule
        ? this.splitAllocationContactComboboxModule.render(props)
        : null;
    };

    const renderReceiveMoneyBankingRuleCombobox = (props) => {
      const state = this.store.getState();
      const isPrefillSplitAllocationEnabled = getIsPrefillSplitAllocationEnabled(
        state
      );

      return isPrefillSplitAllocationEnabled &&
        this.receiveMoneyBankingRuleComboboxModule
        ? this.receiveMoneyBankingRuleComboboxModule.render(props)
        : null;
    };

    const renderSpendMoneyBankingRuleCombobox = (props) => {
      const state = this.store.getState();
      const isPrefillSplitAllocationEnabled = getIsPrefillSplitAllocationEnabled(
        state
      );

      return isPrefillSplitAllocationEnabled &&
        this.spendMoneyBankingRuleComboboxModule
        ? this.spendMoneyBankingRuleComboboxModule.render(props)
        : null;
    };

    const renderMatchTransactionContactCombobox = (props) => {
      return this.matchTransactionContactComboboxModule
        ? this.matchTransactionContactComboboxModule.render(props)
        : null;
    };

    const hotkeyHandlers = this.buildHotkeyHandlers();

    const splitAllocationContentProps = {
      renderSplitAllocationContactCombobox,
      renderReceiveMoneyBankingRuleCombobox,
      renderSpendMoneyBankingRuleCombobox,
      onUpdateSplitAllocationHeader: this.updateSplitAllocationHeader,
      onUpdateSplitAllocationContactCombobox: this
        .updateSplitAllocationContactCombobox,
      onAddSplitAllocationLine: this.addSplitAllocationLine,
      onUpdateSplitAllocationLine: this.updateSplitAllocationLine,
      onDeleteSplitAllocationLine: this.deleteSplitAllocationLine,
      onAddJob: this.openJobModal,
      onAddAccount: this.openAccountModal,
      onBlur: this.dispatcher.blurEntry,
    };

    const splitAllocationFooterProps = {
      onSaveSplitAllocation: this.saveSplitAllocation,
      onCancelSplitAllocation: this.confirmBefore(
        this.dispatcher.collapseTransactionLine
      ),
      onUnallocateTransaction: this.openUnmatchTransactionModal(
        this.unallocateOpenEntryTransaction
      ),
      onOpenBankingRuleModal: this.openBankingRuleModal,
    };

    const matchTransactionContentProps = {
      renderMatchTransactionContactCombobox,
      onUpdateMatchTransactionOptions: this.updateMatchTransactionOptions,
      onResetMatchTransactionOptions: this.resetMatchTransactionOptions,
      onSortMatchTransactions: this.sortMatchTransaction,
      onUpdateMatchTransactionSelection: this.dispatcher
        .updateMatchTransactionSelection,
      onUpdateSelectedTransactionDetails: this.dispatcher
        .updateSelectedTransactionDetails,
      onToggleSelectAllState: this.toggleSelectAllState,
      onAddAdjustment: this.dispatcher.addMatchTransactionAdjustment,
      onUpdateAdjustment: this.dispatcher.updateMatchTransactionAdjustment,
      onRemoveAdjustment: this.dispatcher.removeMatchTransactionAdjustment,
      onExpandAdjustmentSection: this.dispatcher.expandAdjustmentSection,
      onAddJob: this.openJobModal,
      onAddAccount: this.openAccountModal,
    };

    const matchTransactionFooterProps = {
      onSaveMatchTransaction: this.saveMatchTransaction,
      onCancelMatchTransaction: this.confirmBefore(
        this.dispatcher.collapseTransactionLine
      ),
      onUnmatchTransaction: this.openUnmatchTransactionModal(
        this.unmatchTransaction
      ),
      onOpenBankingRuleModal: this.openBankingRuleModal,
    };

    const transferMoneyContentProps = {
      onSortTransfer: this.sortMatchTransferMoney,
      onUpdateTransferSelection: this.dispatcher.setMatchTransferMoneySelection,
      onOpenTransferMoneyModal: this.openTransferMoneyModal,
    };

    const transferMoneyFooterProps = {
      onSaveMatchTransferMoney: this.saveMatchTransferMoney,
      onCancelTransferMoney: this.confirmBefore(
        this.dispatcher.collapseTransactionLine
      ),
      onUnallocateTransaction: this.openUnmatchTransactionModal(
        this.unallocateOpenEntryTransaction
      ),
      onOpenTransferMoneyModal: this.openTransferMoneyModal,
    };

    const transactionListView = (
      <Hotkeys hotkeyHandlers={hotkeyHandlers}>
        <BankingView
          splitAllocationProps={{
            contentProps: splitAllocationContentProps,
            footerProps: splitAllocationFooterProps,
          }}
          matchTransactionProps={{
            contentProps: matchTransactionContentProps,
            footerProps: matchTransactionFooterProps,
          }}
          transferMoneyProps={{
            contentProps: transferMoneyContentProps,
            footerProps: transferMoneyFooterProps,
          }}
          inTrayModal={inTrayModal}
          accountModal={accountModal}
          jobModal={jobModal}
          renderBankingRuleModule={() =>
            this.bankingRuleModule.render({
              onCreateBankingRule: this.applyRuleToTransaction,
            })
          }
          onUpdateFilters={this.confirmBefore(this.updateFilterOptions)}
          onPeriodChange={this.confirmBefore(this.updatePeriodDateRange)}
          onResetFilters={this.confirmBefore(this.resetFilters)}
          onBankAccountChange={this.bankAccountChange}
          onSort={this.confirmBefore(this.sortBankTransactions)}
          onDismissAlert={this.dispatcher.dismissAlert}
          onDismissModalAlert={this.dispatcher.dismissModalAlert}
          onAllocate={this.allocateTransaction}
          onSplitRowItemClick={this.confirmBefore(this.toggleLine)}
          onMatchRowItemClick={this.confirmBefore(this.toggleLine)}
          onBlur={this.dispatcher.blurEntry}
          onFocusTransactionLine={this.setFocusToTransactionLine}
          onEntryHover={this.dispatcher.hoverEntry}
          onHeaderClick={this.confirmBefore(this.toggleLine)}
          onTabChange={this.confirmBefore(this.changeOpenEntryTab)}
          onSaveTransferMoney={this.saveTransferMoney}
          onUpdateTransfer={this.dispatcher.setTransferMoneyDetail}
          onCancelModal={this.cancelModal}
          onCloseModal={this.dispatcher.closeModal}
          onSelectTransaction={this.selectTransaction}
          onSelectAllTransactions={this.selectAllTransactions}
          onUpdateBulkAllocationOption={
            this.dispatcher.updateBulkAllocationOption
          }
          onSaveBulkAllocation={this.saveBulkAllocation}
          onCloseBulkAllocation={this.closeBulkAllocation}
          onOpenBulkAllocation={this.dispatcher.openBulkAllocation}
          onBulkUnallocationButtonClick={this.openBulkUnallocationModal}
          onConfirmBulkUnallocation={this.bulkUnallocateTransactions}
          onCancelUnallocateModal={this.dispatcher.closeModal}
          onRenderBankingRuleModal={this.renderBankingRuleModal}
          onAddAttachments={this.addAttachments}
          onRemoveAttachment={this.openDeleteAttachmentModal}
          onDownloadAttachment={this.openAttachment}
          onDeleteAttachmentModal={this.removeAttachment}
          onEditNote={this.dispatcher.setEditingNoteState}
          onPendingNoteChange={this.dispatcher.setPendingNote}
          onNoteBlur={this.savePendingNote}
          onImportStatementButtonClick={this.redirectToBankStatementImport}
          onLinkFromInTrayButtonClick={this.openInTrayModal}
          onAddAccount={this.openAccountModal}
          onLoadMoreButtonClick={this.loadBankTransactionsNextPage}
        />
      </Hotkeys>
    );

    const wrappedView = (
      <Provider store={this.store}>{transactionListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  redirectToBankStatementImport = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bankStatementImport`;
  };

  toggleSelectAllState = ({ value }) => {
    this.dispatcher.toggleSelectAllState(value);
  };

  applyRuleToTransaction = ({ message, bankingRuleId }) => {
    this.dispatcher.collapseTransactionLine();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (entries) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.applyRuleToTransactions(entries);
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    };

    const onFailure = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message: payload.message,
      });
    };

    this.integrator.applyRuleToTransactions({
      onSuccess,
      onFailure,
      bankingRuleId,
    });
  };

  allocateTransaction = (index, selectedAccount) => {
    const { displayName } = selectedAccount;

    this.setFocusToTransactionLine(index + 1);
    this.dispatcher.startEntryLoadingState(index, displayName);
    this.dispatcher.setLastAllocatedAccount(selectedAccount);

    const onSuccess = (payload) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.allocateTransaction(index, { payload });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopEntryLoadingState(index);
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

    this.dispatcher.closeBulkAllocation();
    this.dispatcher.resetBulkAllocation();
  };

  closeBulkAllocation = (isBulkOpen) => {
    if (isBulkOpen) {
      this.dispatcher.closeBulkAllocation();
    }

    this.dispatcher.resetBulkAllocation();
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

  openBulkUnallocationModal = () => {
    this.dispatcher.openBulkUnallocateModal();
  };

  bulkUnallocateTransactions = () => {
    this.dispatcher.closeModal();
    this.dispatcher.collapseTransactionLine();
    this.dispatcher.setBulkLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setBulkLoadingState(false);
      this.dispatcher.unselectTransactions();
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

  openUnmatchTransactionModal = (onConfirm) => (index) => {
    this.afterCancel = () => onConfirm(index);
    this.dispatcher.openUnmatchTransactionModal();
  };

  loadBankTransactions = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankTransactions(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankTransactions({
      onSuccess,
      onFailure,
    });
  };

  loadBankTransactionsNextPage = () => {
    this.dispatcher.startLoadingMore();

    const onSuccess = (payload) => {
      this.dispatcher.stopLoadingMore();
      this.dispatcher.loadBankTransactionsNextPage(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopLoadingMore();
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadBankTransactionsNextPage({
      onSuccess,
      onFailure,
    });
  };

  bankAccountChange = ({ value }) => {
    this.dispatcher.updateFilterOptions({ filterName: 'bankAccount', value });
    this.confirmBefore(this.filterBankTransactions)();
  };

  filterBankTransactions = () => {
    this.updateURLParams();
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

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.filterBankTransactions({
      onSuccess,
      onFailure,
    });
  };

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

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortBankTransactions({
      orderBy,
      onSuccess,
      onFailure,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  confirmBefore = (onConfirm) => (...args) => {
    const state = this.store.getState();
    const isEdited = getIsOpenEntryEdited(state);

    if (isEdited) {
      this.openCancelModal({
        onConfirm: () => onConfirm(...args),
      });
    } else {
      onConfirm(...args);
    }
  };

  ifOpen = (index, fn) => (...args) => {
    const state = this.store.getState();
    if (getOpenPosition(state) !== index) {
      return;
    }

    fn(...args);
  };

  toggleLine = (index) => {
    const state = this.store.getState();
    const openPosition = getOpenPosition(state);

    const isOpened = openPosition === index;
    if (isOpened) {
      this.dispatcher.collapseTransactionLine();
    } else {
      this.expandTransactionLine(index);
    }
  };

  expandTransactionLine = (index, tabId) => {
    const state = this.store.getState();

    const line = getBankTransactionLineByIndex(state, index);
    const tabIdToOpen = tabId || getOpenEntryDefaultTabId(line);

    this.loadOpenEntryTab(index, tabIdToOpen);
    this.loadAttachments(index);
  };

  changeOpenEntryTab = (tabId) => {
    const state = this.store.getState();

    if (tabId !== getOpenEntryActiveTabId(state)) {
      const index = getOpenPosition(state);
      this.loadOpenEntryTab(index, tabId);
    }
  };

  loadOpenEntryTab = (index, tabId) => {
    const openEntryAction = {
      [TabItems.match]: this.loadMatchTransaction,
      [TabItems.allocate]: this.loadAllocate,
      [TabItems.transfer]: this.loadTransferMoney,
    }[tabId];

    openEntryAction(index);
  };

  loadTransferMoney = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadExistingTransferMoney(index);
    } else {
      this.loadMatchTransferMoney(index);
    }
  };

  loadExistingTransferMoney = (index) => {
    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.loadExistingTransferMoney(index, payload);
    });

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
  };

  loadMatchTransferMoney = (index) => {
    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.loadMatchTransferMoney(index, payload);
    });

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setOpenEntryPosition(index);
    this.dispatcher.setOpenEntryLoadingState(true);
    this.integrator.loadMatchTransferMoney({ index, onSuccess, onFailure });
  };

  sortMatchTransferMoney = (orderBy) => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const newSortOrder =
      orderBy === getMatchTransferMoneyOrderBy(state)
        ? getMatchTransferMoneyFlipSortOrder(state)
        : 'asc';
    this.dispatcher.setMatchTransferMoneySortOrder(orderBy, newSortOrder);

    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setMatchTransferMoneyLoadingState(false);
      this.dispatcher.sortMatchTransferMoney(payload);
    });

    const onFailure = ({ message }) => {
      this.dispatcher.setMatchTransferMoneyLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setMatchTransferMoneyLoadingState(true);
    this.integrator.loadMatchTransferMoney({ index, onSuccess, onFailure });
  };

  loadAllocate = (index) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (getIsAllocated(line)) {
      this.loadSplitAllocation(index);
    } else {
      this.dispatcher.loadNewSplitAllocation(index);
      this.loadSplitAllocationContactCombobox();
    }
  };

  loadSplitAllocation = (index) => {
    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.loadSplitAllocation(index, payload);
      this.loadSplitAllocationContactCombobox();
      this.calculateSplitAllocationTax();
      this.updateSplitAllocationBankingRuleCombobox();
    });

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
  };

  saveSplitAllocation = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.saveSplitAllocation(index, payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.startEntryLoadingState(index);

    this.integrator.saveSplitAllocation({
      index,
      onSuccess,
      onFailure,
    });

    this.dispatcher.collapseTransactionLine();
  };

  updateSplitAllocationHeader = ({ key, value }) => {
    this.dispatcher.updateSplitAllocationHeader({ key, value });

    if (key === 'bankingRuleId') {
      this.loadPrefillSplitAllocation(value);
    }
  };

  updateSplitAllocationContactCombobox = (contact) => {
    const { key, value, contactType, isReportable } = contact;
    this.dispatcher.updateSplitAllocationContact({
      key,
      value,
      contactType,
      isReportable,
    });
  };

  loadPrefillSplitAllocation = (bankingRuleId) => {
    const state = this.store.getState();
    const index = getOpenPosition(state);

    this.dispatcher.setSplitAllocationLoadingState(true);

    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setSplitAllocationLoadingState(false);
      this.dispatcher.loadPrefillSplitAllocation(payload);
      this.loadSplitAllocationContactCombobox();
      this.calculateSplitAllocationTax();
    });

    const onFailure = ({ message }) => {
      this.dispatcher.setSplitAllocationLoadingState(false);
      this.dispatcher.collapseTransactionLine();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadPrefillSplitAllocation({
      bankingRuleId,
      onSuccess,
      onFailure,
    });
  };

  unmatchTransaction = () => {
    const state = this.store.getState();
    const index = getOpenPosition(state);
    const onSuccess = (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.unallocateTransaction(payload);
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
  };

  unallocateOpenEntryTransaction = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.unallocateTransaction(payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
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
  };

  openCancelModal = ({ onConfirm = () => {} }) => {
    this.afterCancel = onConfirm;
    this.dispatcher.openCancelModal();
  };

  cancelModal = () => {
    this.dispatcher.closeModal();

    this.afterCancel();
    this.afterCancel = () => {};
  };

  calculateSplitAllocationTax = () => {
    const state = this.store.getState();
    const taxCodes = getTaxCodes(state);
    const lines = getLinesForTaxCalculation(state);
    const taxCalculator = getIsOpenTransactionWithdrawal(state)
      ? this.spendMoneyTaxCalculator
      : this.receiveMoneyTaxCalculator;
    const taxCalculations = taxCalculator({
      isTaxInclusive: true,
      taxCodes,
      lines,
      isLineAmountsTaxInclusive: true,
    });

    this.dispatcher.calculateSplitAllocationTax({ taxCalculations });
  };

  updateSplitAllocationLine = (index, key, value) => {
    this.dispatcher.updateSplitAllocationLine(index, key, value);
    this.calculateSplitAllocationTax();
  };

  deleteSplitAllocationLine = (index) => {
    this.dispatcher.deleteSplitAllocationLine(index);
    this.calculateSplitAllocationTax();
  };

  addSplitAllocationLine = (partialLine) => {
    const [key, value] = Object.entries(partialLine)[0] || [];

    this.dispatcher.addSplitAllocationLine({ key, value });
  };

  loadMatchTransaction = (index) => {
    const state = this.store.getState();

    const { bankAccount: accountId } = getFilterOptions(state);

    const line = getBankTransactionLineByIndex(state, index);
    const { withdrawal, deposit } = line;
    const filterOptions = getDefaultMatchTransactionFilterRequestParams(
      accountId,
      line
    );

    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      const totalAmount = withdrawal || deposit;
      this.dispatcher.loadMatchTransaction(
        index,
        filterOptions,
        payload,
        totalAmount
      );
      this.loadMatchTransactionContactCombobox();
    });

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
  };

  sortMatchTransaction = (orderBy) => {
    this.updateMatchTransactionSortOrder(orderBy);
    this.sortOrFilterMatchTransaction();
  };

  sortOrFilterMatchTransaction = () => {
    const state = this.store.getState();

    const showType = getShowType(state);
    if (showType === MatchTransactionShowType.SELECTED) {
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
  };

  saveMatchTransaction = () => {
    const state = this.store.getState();

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.saveMatchTransaction(index, payload);
      this.dispatcher.setAlert({
        type: 'success',
        message: payload.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.startEntryLoadingState(index);
    this.integrator.saveMatchTransaction({
      index,
      onSuccess,
      onFailure,
    });

    this.dispatcher.collapseTransactionLine();
  };

  updateMatchTransactionSortOrder = (orderBy) => {
    const state = this.store.getState();

    const newSortOrder =
      orderBy === getMatchTransactionOrderBy(state)
        ? getMatchTransactionFlipSortOrder(state)
        : 'asc';

    this.dispatcher.updateMatchTransactionSortOrder(orderBy, newSortOrder);
  };

  saveMatchTransferMoney = () => {
    const state = this.store.getState();

    this.dispatcher.startModalBlocking();

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.saveTransferMoney(index, payload);
      this.dispatcher.setAlert({ type: 'success', message: payload.message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.startEntryLoadingState(index);
    this.integrator.saveMatchTransferMoney({
      index,
      onSuccess,
      onFailure,
    });
    this.dispatcher.collapseTransactionLine();
  };

  saveTransferMoney = () => {
    const state = this.store.getState();

    this.dispatcher.startModalBlocking();

    const index = getOpenPosition(state);

    const onSuccess = (payload) => {
      this.dispatcher.stopEntryLoadingState(index);
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
      this.dispatcher.stopEntryLoadingState(index);
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
  };

  selectAllTransactions = () => {
    const state = this.store.getState();
    const isEdited = getIsOpenEntryEdited(state);
    const canSelectMore = getCanSelectMore(state);

    if (isEdited && canSelectMore) {
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

  loadAttachments = (index) => {
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
      index,
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

    getFilesForUpload(state, files).forEach((file) =>
      this.uploadAttachment(file)
    );
  };

  uploadAttachment = (file) => {
    const onSuccess = (response) => {
      this.dispatcher.uploadAttachment({ response, file });
      this.dispatcher.setEntryHasAttachment(true);
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

  openAttachment = (index) => {
    const state = this.store.getState();
    const { id, file } = state.openEntry.attachments[index];

    if (file) {
      openBlob({ blob: file, filename: file.name, shouldDownload: true });
      return;
    }

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = ({ fileUrl }) => {
      this.dispatcher.setOperationInProgressState(id, false);
      window.open(fileUrl, '_blank');
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.openAttachment({
      onSuccess,
      onFailure,
      id,
    });
  };

  removeAttachment = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const id = state.openEntry.pendingDeleteId;

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = () => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.removeAttachment(id);
      const removingLastAttachment = state.openEntry.attachments.length === 1;
      if (removingLastAttachment) {
        this.dispatcher.setEntryHasAttachment(false);
      }
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

  openInTrayModal = () => {
    const state = this.store.getState();
    this.inTrayModalModule.run({
      context: getInTrayModalContext(state),
      onSaveSuccess: (inTrayDocumentId) => {
        this.inTrayModalModule.close();
        this.dispatcher.setAttachemntsLoadingState(true);

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

        this.integrator.linkInTrayDocument({
          onSuccess,
          onFailure,
          inTrayDocumentId,
        });
      },
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({
          type: 'danger',
          message,
        }),
    });
  };

  openBankingRuleModal = () => {
    const context = getBankingRuleModuleContext(this.store.getState());
    return this.bankingRuleModule.run(context);
  };

  openAccountModal = (onAccountCreated) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: ({ id }) => {
        this.loadAccountAfterCreate(id, onAccountCreated);
      },
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({
          type: 'danger',
          message,
        }),
    });
  };

  loadAccountAfterCreate = (accountId, onAccountCreated) => {
    this.accountModalModule.close();
    this.dispatcher.setLoadingSingleAccountState(true);
    const onSuccess = (payload) => {
      const state = this.store.getState();
      this.dispatcher.setLoadingSingleAccountState(false);
      const activeTabId = getOpenEntryActiveTabId(state);
      const openPosition = getOpenPosition(state);
      this.dispatcher.loadAccountAfterCreate(payload);
      if (activeTabId === TabItems.allocate && openPosition > 0) {
        this.dispatcher.appendAccountToAllocateTable(payload);
      }
      onAccountCreated(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingSingleAccountState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadAccountAfterCreate({ accountId, onSuccess, onFailure });
  };

  resetState = () => {
    this.dispatcher.resetState();
    this.inTrayModalModule.resetState();
    this.accountModalModule.resetState();
    this.bankingRuleModule.resetState();
    this.splitAllocationContactComboboxModule.resetState();
    this.matchTransactionContactComboboxModule.resetState();
    this.receiveMoneyBankingRuleComboboxModule.resetState();
    this.spendMoneyBankingRuleComboboxModule.resetState();
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const context = getJobModalContext(state);

    this.jobModalModule.run({
      context,
      onLoadFailure: (message) => this.setAlert({ type: 'danger', message }),
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
    });
  };

  loadJobAfterCreate = ({ id }, onChange) => {
    this.jobModalModule.resetState();
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (payload) => {
      const job = { ...payload, id };
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobAfterCreate(id, job);
      onChange(job);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  updateURLParams = () => {
    const state = this.store.getState();
    this.replaceURLParams(getURLParams(state));
  };

  loadMatchTransactionContactCombobox = () => {
    const state = this.store.getState();
    const context = getMatchTransactionContactComboboxContext(state);
    this.matchTransactionContactComboboxModule.run(context);
  };

  loadSplitAllocationContactCombobox = () => {
    const state = this.store.getState();
    const context = getSplitAllocateContactComboboxContext(state);
    this.splitAllocationContactComboboxModule.run(context);
  };

  loadSplitAllocationBankingRuleCombobox = () => {
    const state = this.store.getState();

    const isPrefillSplitAllocationEnabled = getIsPrefillSplitAllocationEnabled(
      state
    );
    if (isPrefillSplitAllocationEnabled) {
      const smContext = getSpendMoneyBankingRuleComboboxContext(state);
      this.spendMoneyBankingRuleComboboxModule.run(smContext);

      const rmContext = getReceiveMoneyBankingRuleComboboxContext(state);
      this.receiveMoneyBankingRuleComboboxModule.run(rmContext);
    }
  };

  updateSplitAllocationBankingRuleCombobox = () => {
    const state = this.store.getState();

    const isPrefillSplitAllocationEnabled = getIsPrefillSplitAllocationEnabled(
      state
    );
    const bankingRuleId = getBankingRuleId(state);
    if (isPrefillSplitAllocationEnabled && bankingRuleId) {
      const isSpendMoney = getIsSpendMoney(state);
      if (isSpendMoney) {
        this.spendMoneyBankingRuleComboboxModule.load(bankingRuleId);
      } else {
        this.receiveMoneyBankingRuleComboboxModule.load(bankingRuleId);
      }
    }
  };

  /*
  =============================================================================
                                  HOTKEYS
  =============================================================================
  */
  allocateToLastAllocatedAccount = ({ index }) => {
    const lastAllocatedAccount = getLastAllocatedAccount(this.store.getState());
    if (lastAllocatedAccount) {
      this.allocateTransaction(index, lastAllocatedAccount);
    }
  };

  expandTransactionWithHotkey = ({ index }, tabToExpandTo) => {
    this.setFocusTo(0, FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX);
    this.expandTransactionLine(index, tabToExpandTo);
  };

  expandTransactionAndBankingRuleModalWithHotkey = ({ index }) => {
    this.expandTransactionLine(index);
    this.openBankingRuleModal();
  };

  openBankingRuleModalWithAccordionOpen = () => {
    const state = this.store.getState();
    const isAccordionOpen = getOpenPosition(state) >= 0;

    if (isAccordionOpen) {
      this.openBankingRuleModal();
    }
  };

  switchToTab = (tabToSwitchTo) => {
    const state = this.store.getState();
    const isAccordionOpen = getOpenPosition(state) >= 0;
    const shouldSwitchToTab =
      isAccordionOpen && !getIsTabDisabled(state, tabToSwitchTo);

    if (shouldSwitchToTab) {
      this.confirmBefore(this.changeOpenEntryTab)(tabToSwitchTo);
    }
  };

  saveTransactionLine = () => {
    const state = this.store.getState();
    const openPosition = getOpenPosition(state);
    const isAccordionOpen = openPosition >= 0;
    const isBankingRuleModalOpen = this.bankingRuleModule.getIsBankingRuleOpen();

    if (isBankingRuleModalOpen) {
      this.bankingRuleModule.createBankingRule(this.applyRuleToTransaction);
    } else if (isAccordionOpen) {
      const openTabId = getOpenEntryActiveTabId(state);
      const save = {
        [TabItems.match]: this.saveMatchTransaction,
        [TabItems.allocate]: this.saveSplitAllocation,
        [TabItems.transfer]: this.saveMatchTransferMoney,
      };
      save[openTabId]();
      this.setFocusToTransactionLine(openPosition + 1);
    }
  };

  setFocusToFirstUnmatchedLine = () => {
    const index = getIndexOfNextUnmatchedLine(this.store.getState(), 0);
    if (index >= 0) {
      this.setFocusToTransactionLine(index);
    }
  };

  setFocusToUnmatchedLine = ({ index }) => {
    const indexToFocus = getIndexOfNextUnmatchedLine(
      this.store.getState(),
      index
    );

    if (indexToFocus >= 0) {
      this.setFocusToTransactionLine(indexToFocus);
    } else {
      this.setFocusToFirstUnmatchedLine();
    }
  };

  setFocusTo = (index, location) =>
    this.dispatcher.setFocus({
      index,
      location,
    });

  setFocusToTransactionLine = (index) => {
    const state = this.store.getState();
    this.dispatcher.setFocus({
      index,
      location: getLocationOfTransactionLine(state, index),
    });
  };

  collapseTransaction = () => {
    const state = this.store.getState();
    const openPosition = getOpenPosition(state);
    const isAccordionOpen = openPosition >= 0;

    if (isAccordionOpen) {
      this.confirmBefore(this.dispatcher.collapseTransactionLine)(openPosition);
      this.setFocusToTransactionLine(openPosition);
    }
  };

  setTransactionStatusTypeToUnmatched = ({ index }) => {
    this.dispatcher.setTransactionStatusTypeToUnmatched(index);
    this.setFocusToTransactionLine(index);
  };

  buildHotkeyHandlers = () => {
    const hotkeysToExpandAccordionView = [
      {
        key: FORWARD_SLASH,
        action: this.confirmBefore(this.expandTransactionWithHotkey),
      },
      {
        key: [OPTION, A],
        action: (eventDetail) =>
          this.confirmBefore(this.expandTransactionWithHotkey)(
            eventDetail,
            TabItems.allocate
          ),
      },
      {
        key: [OPTION, M],
        action: (eventDetail) =>
          this.confirmBefore(this.expandTransactionWithHotkey)(
            eventDetail,
            TabItems.match
          ),
      },
      {
        key: [OPTION, T],
        action: (eventDetail) =>
          this.confirmBefore(this.expandTransactionWithHotkey)(
            eventDetail,
            TabItems.transfer
          ),
      },
    ];

    const hotkeysToSetFocusToUnmatchedTransactionLine = [
      {
        key: F8,
        action: this.setFocusToUnmatchedLine,
      },
      {
        key: [OPTION, G],
        action: this.setFocusToUnmatchedLine,
      },
    ];

    const hotkeysToCreateBankRule = [
      {
        key: F4,
        action: this.confirmBefore(
          this.expandTransactionAndBankingRuleModalWithHotkey
        ),
      },
      {
        key: [OPTION, R],
        action: this.confirmBefore(
          this.expandTransactionAndBankingRuleModalWithHotkey
        ),
      },
    ];

    const hotkeysAccessibleInAccordion = [
      {
        key: [OPTION, A],
        action: () => this.switchToTab(TabItems.allocate),
      },
      {
        key: [OPTION, M],
        action: () => this.switchToTab(TabItems.match),
      },
      {
        key: [OPTION, T],
        action: () => this.switchToTab(TabItems.transfer),
      },
      {
        key: [COMMAND, ENTER],
        action: this.saveTransactionLine,
      },
      {
        key: [CTRL, ENTER],
        action: this.saveTransactionLine,
      },
      {
        key: F4,
        action: this.openBankingRuleModalWithAccordionOpen,
      },
      {
        key: [OPTION, R],
        action: this.openBankingRuleModalWithAccordionOpen,
      },
      {
        key: ESCAPE,
        action: this.collapseTransaction,
      },
    ];

    const hotkeysToQuickAllocateMatchedTransaction = [
      {
        key: F2,
        action: this.setTransactionStatusTypeToUnmatched,
      },
      {
        key: [OPTION, L],
        action: this.setTransactionStatusTypeToUnmatched,
      },
    ];

    return {
      [HotkeyLocations.GLOBAL]: [
        {
          key: F8,
          action: this.setFocusToFirstUnmatchedLine,
        },
        {
          key: [OPTION, G],
          action: this.setFocusToFirstUnmatchedLine,
        },
        ...hotkeysAccessibleInAccordion,
      ],
      [HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR]: [
        {
          key: EQUALS,
          action: ({ index }) => this.dispatcher.populateRemainingAmount(index),
        },
        ...hotkeysAccessibleInAccordion,
      ],
      [HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX]: [
        {
          key: [SHIFT, EQUALS],
          action: this.allocateToLastAllocatedAccount,
        },
        {
          key: ESCAPE,
          action: this.collapseTransaction,
        },
        ...hotkeysToCreateBankRule,
        ...hotkeysToExpandAccordionView,
      ],
      [HotkeyLocations.POSSIBLE_MATCHED_BUTTON]: [
        {
          key: ESCAPE,
          action: this.collapseTransaction,
        },
        ...hotkeysToSetFocusToUnmatchedTransactionLine,
        ...hotkeysToCreateBankRule,
        ...hotkeysToExpandAccordionView,
        ...hotkeysToQuickAllocateMatchedTransaction,
      ],
      [HotkeyLocations.APPROVED_TRANSACTION_BUTTON]: [
        {
          key: ESCAPE,
          action: this.collapseTransaction,
        },
        ...hotkeysToSetFocusToUnmatchedTransactionLine,
        ...hotkeysToCreateBankRule,
        ...hotkeysToExpandAccordionView,
      ],
    };
  };

  /* */

  run(context) {
    const { fastMode = false, ...rest } = context;
    const { isBankTransactionsFastModeEnabled = false } = this.featureToggles;
    const isFastModeEnabledQueryParam =
      fastMode && isBankTransactionsFastModeEnabled;

    const isFastModeEnabled =
      this.isToggleOn(FeatureToggle.FastModeLoadBankTransactions) ||
      isFastModeEnabledQueryParam;

    const isPrefillSplitAllocationEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isBankLinkPayeeEnabled,
      isEarlyAccess: this.isToggleOn(FeatureToggle.BankLinkPayee),
    });

    this.dispatcher.setInitialState({
      ...rest,
      isBankingJobColumnEnabled: this.isToggleOn(FeatureToggle.EssentialsJobs),
      isFastModeEnabled,
      isPrefillSplitAllocationEnabled,
    });
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadBankTransactions();

    if (isPrefillSplitAllocationEnabled) {
      this.loadSplitAllocationBankingRuleCombobox();
    }
  }
}
