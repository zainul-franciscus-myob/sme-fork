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
  F3,
  F4,
  F8,
  FORWARD_SLASH,
  G,
  L,
  M,
  NUMPAD_PLUS,
  NUMPAD_SLASH,
  OPTION,
  P,
  R,
  SHIFT,
  T,
} from './hotkeys/HotkeyEnums';
import { ALL_BANK_ACCOUNTS } from './types/BankAccountEnums';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../common/taxCalculator';
import {
  getAccountModalContext,
  getBankTransactionLineByIndex,
  getBankingRuleModuleContext,
  getBusinessId,
  getDefaultTabFocusLocation,
  getIndexOfNextUnapprovedLine,
  getIsAllBankAccountsSelected,
  getIsAllocated,
  getIsEntryLoading,
  getIsOpenEntryEdited,
  getIsOpenTransactionWithdrawal,
  getIsTabDisabled,
  getIsTransactionLineTabDisabled,
  getLastAllocatedAccount,
  getLocationOfTransactionLine,
  getMatchTransactionsContext,
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
  getSplitAllocationJobComboboxContext,
  getSplitAllocationUniqueSelectedJobIds,
  getViewedAccountToolTip,
} from './tabs/splitAllocation/splitAllocationSelectors';
import {
  getCanSelectMore,
  getIsEditedEntryInBulkSelection,
} from './selectors/bulkActionSelectors';
import {
  getFilesForUpload,
  getInTrayModalContext,
} from './selectors/attachmentsSelectors';
import {
  getMatchTransferMoneyFlipSortOrder,
  getMatchTransferMoneyOrderBy,
} from './tabs/transferMoney/transferMoneySelectors';
import { trackUserEvent } from '../../telemetry';
import AccountModalModule from '../account/accountModal/AccountModalModule';
import BankingRuleComboboxModule from '../bankingRules/bankingRuleCombobox/BankingRuleComboboxModule';
import BankingRuleModule from './bankingRule/BankingRuleModule';
import BankingView from './components/BankingView';
import ContactComboboxModule from '../contact/contactCombobox/ContactComboboxModule';
import FocusLocations from './types/FocusLocations';
import HelpPageRoutes from '../../drawer/help/HelpPageRoutes';
import HotkeyLocations from './hotkeys/HotkeyLocations';
import Hotkeys from './hotkeys/Hotkeys';
import InTrayModalModule from '../inTray/inTrayModal/InTrayModalModule';
import JobComboboxModule from '../job/jobCombobox/JobComboboxModule';
import LoadingState from '../../components/PageView/LoadingState';
import MatchTransactionsModule from './tabs/matchTransaction/MatchTransactionsModule';
import Store from '../../store/Store';
import TabItems from './types/TabItems';
import bankingReducer from './reducers';
import createBankingDispatcher from './BankingDispatcher';
import createBankingIntegrator from './BankingIntegrator';
import debounce from '../../common/debounce/debounce';
import openBlob from '../../common/blobOpener/openBlob';

export default class BankingModule {
  constructor({
    integration,
    setRootView,
    replaceURLParams,
    featureToggles,
    loadHelpContentBasedOnRoute,
    navigateTo,
  }) {
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
    this.dispatcher = createBankingDispatcher(this.store);
    this.integrator = createBankingIntegrator(this.store, integration);
    this.featureToggles = featureToggles;
    this.replaceURLParams = replaceURLParams;
    this.loadHelpContentBasedOnRoute = loadHelpContentBasedOnRoute;
    this.bankingRuleModule = new BankingRuleModule({
      integration,
      featureToggles,
    });
    this.inTrayModalModule = new InTrayModalModule({ integration, navigateTo });
    this.navigateTo = navigateTo;
    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.spendMoneyTaxCalculator = createTaxCalculator(
      TaxCalculatorTypes.spendMoney
    );
    this.receiveMoneyTaxCalculator = createTaxCalculator(
      TaxCalculatorTypes.receiveMoney
    );
    this.splitAllocationContactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.spendMoneyBankingRuleComboboxModule = new BankingRuleComboboxModule({
      integration,
    });
    this.receiveMoneyBankingRuleComboboxModule = new BankingRuleComboboxModule({
      integration,
    });
    this.matchTransactionsSubModule = new MatchTransactionsModule({
      integration,
      setAlert: this.dispatcher.setAlert,
    });
    this.splitAllocationJobComboboxModule = new JobComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
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

  viewedAccountToolTip = () => {
    if (getViewedAccountToolTip(this.store.getState()) === false) {
      this.dispatcher.setViewedAccountToolTip(true);
      trackUserEvent({
        eventName: 'viewedAccountToolTip',
        customProperties: {
          action: 'viewed_accountToolTip',
          page: 'Bank feed transactions',
        },
      });
    }
  };

  render = () => {
    const inTrayModal = this.inTrayModalModule.render();
    const accountModal = this.accountModalModule.render();

    const renderSplitAllocationContactCombobox = (props) => {
      return this.splitAllocationContactComboboxModule
        ? this.splitAllocationContactComboboxModule.render(props)
        : null;
    };

    const renderSplitAllocationJobCombobox = (props) => {
      return this.splitAllocationJobComboboxModule
        ? this.splitAllocationJobComboboxModule.render(props)
        : null;
    };

    const renderReceiveMoneyBankingRuleCombobox = (props) => {
      return this.receiveMoneyBankingRuleComboboxModule.render(props);
    };

    const renderSpendMoneyBankingRuleCombobox = (props) => {
      return this.spendMoneyBankingRuleComboboxModule.render(props);
    };

    const hotkeyHandlers = this.buildHotkeyHandlers();

    const splitAllocationContentProps = {
      renderSplitAllocationContactCombobox,
      renderSplitAllocationJobCombobox,
      renderReceiveMoneyBankingRuleCombobox,
      renderSpendMoneyBankingRuleCombobox,
      onUpdateSplitAllocationHeader: this.updateSplitAllocationHeader,
      onUpdateSplitAllocationContactCombobox: this
        .updateSplitAllocationContactCombobox,
      onAddSplitAllocationLine: this.addSplitAllocationLine,
      onUpdateSplitAllocationLine: this.updateSplitAllocationLine,
      onDeleteSplitAllocationLine: this.deleteSplitAllocationLine,
      onAddAccount: this.openAccountModal,
      onBlur: this.dispatcher.blurEntry,
      onViewedAccountToolTip: this.viewedAccountToolTip,
    };

    const splitAllocationFooterProps = {
      onSaveSplitAllocation: this.saveSplitAllocation,
      onCancelSplitAllocation: this.confirmBefore(this.collapseTransactionLine),
      onUnallocateTransaction: this.openUnmatchTransactionModal(
        this.unallocateOpenEntryTransaction
      ),
      onOpenBankingRuleModal: this.openBankingRuleModal,
    };

    /*
      I'm going to leave this props here at the moment. Not going to refactor into
      the match transactions sub module until there's a bigger need for it.
    */
    const matchTransactionContentProps = {
      onAddAccount: this.openAccountModal,
    };

    /*
      I'm going to leave this props here at the moment. Not going to refactor into
      the match transactions sub module until there's a bigger need for it.
    */
    const matchTransactionFooterProps = {
      onSaveMatchTransaction: this.saveMatchTransaction,
      onCancelMatchTransaction: this.confirmBefore(
        this.collapseTransactionLine
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
      onCancelTransferMoney: this.confirmBefore(this.collapseTransactionLine),
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
            render: this.matchTransactionsSubModule.render,
            contentProps: matchTransactionContentProps,
            footerProps: matchTransactionFooterProps,
          }}
          transferMoneyProps={{
            contentProps: transferMoneyContentProps,
            footerProps: transferMoneyFooterProps,
          }}
          inTrayModal={inTrayModal}
          accountModal={accountModal}
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

  applyRuleToTransaction = ({ message, bankingRuleId }) => {
    this.collapseTransactionLine();
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
    const isMatchTransactionEdited = this.matchTransactionsSubModule.getIsEdited();

    if (isEditedEntryInBulkSelection || isMatchTransactionEdited) {
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
    this.collapseTransactionLine();

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
    this.collapseTransactionLine();
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
      if (!getIsAllBankAccountsSelected(this.store.getState())) {
        this.loadBankBalance();
      } else {
        this.dispatcher.resetBankBalances();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankTransactions({
      onSuccess,
      onFailure,
    });
  };

  loadBankBalance = () => {
    const onSuccess = (payload) => {
      this.dispatcher.loadBankBalances(payload);
    };

    const onFailure = () => {
      this.dispatcher.resetBankBalances();
    };

    this.integrator.loadBankBalances({
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
    const bankAccount = value === undefined ? ALL_BANK_ACCOUNTS : value;

    this.dispatcher.updateFilterOptions({
      filterName: 'bankAccount',
      value: bankAccount,
    });
    this.confirmBefore(this.filterBankTransactions)();
  };

  filterBankTransactions = () => {
    this.updateURLParams();
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

    this.collapseTransactionLine();
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterBankTransactions(false, payload);
      if (!getIsAllBankAccountsSelected(this.store.getState())) {
        this.loadBankBalance();
      } else {
        this.dispatcher.resetBankBalances();
      }
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

    this.collapseTransactionLine();
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
    const isMatchTransactionEdited = this.matchTransactionsSubModule.getIsEdited();

    if (isEdited || isMatchTransactionEdited) {
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
      this.collapseTransactionLine();
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
      this.collapseTransactionLine();
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
      this.collapseTransactionLine();
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
      this.loadSplitAllocationJobCombobox();
    }
  };

  loadSplitAllocation = (index) => {
    const onSuccess = this.ifOpen(index, (payload) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.dispatcher.loadSplitAllocation(index, payload);
      this.loadSplitAllocationContactCombobox();
      this.calculateSplitAllocationTax();
      this.updateSplitAllocationBankingRuleCombobox();

      this.loadSplitAllocationJobCombobox();
      this.updateSplitAllocationJobCombobox();
    });

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.collapseTransactionLine();
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

    this.collapseTransactionLine();
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

      this.loadSplitAllocationJobCombobox();
      this.updateSplitAllocationJobCombobox();
    });

    const onFailure = ({ message }) => {
      this.dispatcher.setSplitAllocationLoadingState(false);
      this.collapseTransactionLine();
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

    let taxCalculations;

    // SMEP-2466 add logs for tracing a tax-calculator error.
    try {
      taxCalculations = taxCalculator({
        isTaxInclusive: true,
        taxCodes,
        lines,
        isLineAmountsTaxInclusive: true,
      });
    } catch (error) {
      if (window.newrelic) {
        window.newrelic.noticeError(JSON.stringify({ lines, taxCodes }));
      }

      throw error;
    }

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
    this.dispatcher.startLoadingOpenEntry(index, TabItems.match);

    const onSuccess = () => {
      const currentOpenPosition = getOpenPosition(this.store.getState());
      if (index === currentOpenPosition) {
        this.dispatcher.finishLoadingOpenEntry(index);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setOpenEntryLoadingState(false);
      this.collapseTransactionLine();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    const state = this.store.getState();
    const context = getMatchTransactionsContext(state, index);
    this.matchTransactionsSubModule.run(context);
    this.matchTransactionsSubModule.loadMatchTransactions(onSuccess, onFailure);
  };

  saveMatchTransaction = () => {
    const state = this.store.getState();

    const index = getOpenPosition(state);
    this.dispatcher.startEntryLoadingState(index);

    const onSuccess = (payload) => {
      this.dispatcher.stopEntryLoadingState(index);
      this.dispatcher.allocateTransaction(index, { payload });
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

    this.matchTransactionsSubModule.saveMatchTransaction(onSuccess, onFailure);
    this.collapseTransactionLine();
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
    this.matchTransactionsSubModule.unmatchTransaction(onSuccess, onFailure);
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
    this.collapseTransactionLine();
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
      this.collapseTransactionLine();
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
    const isMatchTransactionEdited = this.matchTransactionsSubModule.getIsEdited();
    const canSelectMore = getCanSelectMore(state);

    if ((isEdited || isMatchTransactionEdited) && canSelectMore) {
      this.openCancelModal({
        onConfirm: () => {
          this.collapseTransactionLine();
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
    const isMatchTransactionEdited = this.matchTransactionsSubModule.getIsEdited();

    if (
      index === state.openPosition &&
      (isEdited || isMatchTransactionEdited) &&
      value
    ) {
      this.openCancelModal({
        onConfirm: () => {
          this.collapseTransactionLine();
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

    // @TODO: Remove this once we've refactored the match transaction module to load accounts
    this.matchTransactionsSubModule.setLoadingSingleAccountState(true);

    const onSuccess = (payload) => {
      const state = this.store.getState();
      const activeTabId = getOpenEntryActiveTabId(state);
      const openPosition = getOpenPosition(state);

      this.dispatcher.setLoadingSingleAccountState(false);
      this.dispatcher.loadAccountAfterCreate(payload);

      // @TODO: Remove this once we've refactored the match transaction module to load accounts
      this.matchTransactionsSubModule.loadAccountAfterCreate(payload);
      this.matchTransactionsSubModule.setLoadingSingleAccountState(false);

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

      // @TODO: Remove this once we've refactored the match transaction module to load accounts
      this.matchTransactionsSubModule.setLoadingSingleAccountState(false);
    };

    this.integrator.loadAccountAfterCreate({ accountId, onSuccess, onFailure });
  };

  collapseTransactionLine = () => {
    this.dispatcher.collapseTransactionLine();
    this.matchTransactionsSubModule.resetState();
    this.splitAllocationContactComboboxModule.resetState();
    this.splitAllocationJobComboboxModule.resetState();
  };

  resetState = () => {
    this.dispatcher.resetState();
    this.inTrayModalModule.resetState();
    this.accountModalModule.resetState();
    this.bankingRuleModule.resetState();
    this.splitAllocationContactComboboxModule.resetState();
    this.splitAllocationJobComboboxModule.resetState();
    this.receiveMoneyBankingRuleComboboxModule.resetState();
    this.spendMoneyBankingRuleComboboxModule.resetState();
    this.matchTransactionsSubModule.resetState();
  };

  updateURLParams = () => {
    const state = this.store.getState();
    this.replaceURLParams(getURLParams(state));
  };

  loadSplitAllocationContactCombobox = () => {
    const state = this.store.getState();
    const context = getSplitAllocateContactComboboxContext(state);
    this.splitAllocationContactComboboxModule.run(context);
  };

  loadSplitAllocationBankingRuleCombobox = () => {
    const state = this.store.getState();

    const smContext = getSpendMoneyBankingRuleComboboxContext(state);
    this.spendMoneyBankingRuleComboboxModule.run(smContext);

    const rmContext = getReceiveMoneyBankingRuleComboboxContext(state);
    this.receiveMoneyBankingRuleComboboxModule.run(rmContext);
  };

  updateSplitAllocationBankingRuleCombobox = () => {
    const state = this.store.getState();

    const bankingRuleId = getBankingRuleId(state);
    if (bankingRuleId) {
      const isSpendMoney = getIsSpendMoney(state);
      if (isSpendMoney) {
        this.spendMoneyBankingRuleComboboxModule.load(bankingRuleId);
      } else {
        this.receiveMoneyBankingRuleComboboxModule.load(bankingRuleId);
      }
    }
  };

  loadSplitAllocationJobCombobox = () => {
    const state = this.store.getState();
    const context = getSplitAllocationJobComboboxContext(state);
    this.splitAllocationJobComboboxModule.run(context);
  };

  updateSplitAllocationJobCombobox = () => {
    const state = this.store.getState();
    const selectedJobIds = getSplitAllocationUniqueSelectedJobIds(state);
    if (selectedJobIds.length > 0) {
      this.splitAllocationJobComboboxModule.load(selectedJobIds);
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

  expandTransactionWithHotkey = (
    { index },
    tabId,
    focusLocation,
    focusIndex = 0
  ) => {
    const state = this.store.getState();
    const line = getBankTransactionLineByIndex(state, index);

    if (tabId && !getIsTransactionLineTabDisabled(line, tabId)) {
      const focus = focusLocation
        ? { location: focusLocation, index: focusIndex }
        : getDefaultTabFocusLocation(tabId);

      this.setFocusTo(focus.index, focus.location);
      this.expandTransactionLine(index, tabId);
    } else {
      const defaultTabId = getOpenEntryDefaultTabId(line);
      const defaultFocus = getDefaultTabFocusLocation(defaultTabId);

      this.setFocusTo(defaultFocus.index, defaultFocus.location);
      this.expandTransactionLine(index, defaultTabId);
    }
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

  switchToTab = (tabToSwitchTo, focusLocation, focusIndex = 0) => {
    const state = this.store.getState();
    const isAccordionOpen = getOpenPosition(state) >= 0;
    const shouldSwitchToTab =
      isAccordionOpen && !getIsTabDisabled(state, tabToSwitchTo);

    if (shouldSwitchToTab) {
      if (focusLocation) {
        this.setFocusTo(focusIndex, focusLocation);
      }

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

  setFocusToFirstUnapprovedLine = () => {
    const index = getIndexOfNextUnapprovedLine(this.store.getState(), 0);
    if (index >= 0) {
      this.setFocusToTransactionLine(index);
    }
  };

  setFocusToUnapprovedLine = ({ index }) => {
    const indexToFocus = getIndexOfNextUnapprovedLine(
      this.store.getState(),
      index
    );

    if (indexToFocus >= 0) {
      this.setFocusToTransactionLine(indexToFocus);
    } else {
      this.setFocusToFirstUnapprovedLine();
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
      this.confirmBefore(this.collapseTransactionLine)(openPosition);
      this.setFocusToTransactionLine(openPosition);
    }
  };

  setTransactionStatusTypeToUnmatched = ({ index }) => {
    this.dispatcher.setTransactionStatusTypeToUnmatched(index);
    this.setFocusToTransactionLine(index);
  };

  openHelpPanelForKeyboardShortcuts = () => {
    this.loadHelpContentBasedOnRoute(
      HelpPageRoutes.BANKING_TRANSACTION_LIST_KEYBOARDSHORTCUTS
    );
  };

  buildHotkeyHandlers = () => {
    const hotkeysToExpandAccordionView = [
      {
        key: FORWARD_SLASH,
        action: this.confirmBefore(this.expandTransactionWithHotkey),
      },
      {
        key: NUMPAD_SLASH,
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
      {
        key: F3,
        action: (eventDetail) =>
          this.confirmBefore(this.expandTransactionWithHotkey)(
            eventDetail,
            TabItems.allocate,
            FocusLocations.SPLIT_ALLOCATION_BANKING_RULE_COMBOBOX
          ),
      },
      {
        key: [OPTION, P],
        action: (eventDetail) =>
          this.confirmBefore(this.expandTransactionWithHotkey)(
            eventDetail,
            TabItems.allocate,
            FocusLocations.SPLIT_ALLOCATION_BANKING_RULE_COMBOBOX
          ),
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
        key: F3,
        action: () =>
          this.switchToTab(
            TabItems.allocate,
            FocusLocations.SPLIT_ALLOCATION_BANKING_RULE_COMBOBOX
          ),
      },
      {
        key: [OPTION, P],
        action: () =>
          this.switchToTab(
            TabItems.allocate,
            FocusLocations.SPLIT_ALLOCATION_BANKING_RULE_COMBOBOX
          ),
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

    const hotkeysToOpenHelpPanel = [
      {
        key: [COMMAND, FORWARD_SLASH],
        action: this.openHelpPanelForKeyboardShortcuts,
      },
      {
        key: [CTRL, FORWARD_SLASH],
        action: this.openHelpPanelForKeyboardShortcuts,
      },
      {
        key: [COMMAND, NUMPAD_SLASH],
        action: this.openHelpPanelForKeyboardShortcuts,
      },
      {
        key: [CTRL, NUMPAD_SLASH],
        action: this.openHelpPanelForKeyboardShortcuts,
      },
    ];

    return {
      [HotkeyLocations.GLOBAL]: [
        {
          key: F8,
          action: this.setFocusToFirstUnapprovedLine,
        },
        {
          key: [OPTION, G],
          action: this.setFocusToFirstUnapprovedLine,
        },
        ...hotkeysToOpenHelpPanel,
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
          key: NUMPAD_PLUS,
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
        ...hotkeysToCreateBankRule,
        ...hotkeysToExpandAccordionView,
        ...hotkeysToQuickAllocateMatchedTransaction,
      ],
      [HotkeyLocations.APPROVED_TRANSACTION_BUTTON]: [
        {
          key: ESCAPE,
          action: this.collapseTransaction,
        },
        {
          key: F8,
          action: this.setFocusToUnapprovedLine,
        },
        {
          key: [OPTION, G],
          action: this.setFocusToUnapprovedLine,
        },
        ...hotkeysToCreateBankRule,
        ...hotkeysToExpandAccordionView,
      ],
    };
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadBankTransactions();
    this.loadSplitAllocationBankingRuleCombobox();
  }
}
