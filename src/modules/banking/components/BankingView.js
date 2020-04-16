import {
  Alert, BulkActions, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getHasError, getIsEntryLoading, getIsLoading, getLoadMoreButtonStatus, getModalType,
} from '../bankingSelectors';
import { selectedCountSelector, showBulkActionsSelector } from '../bankingSelectors/bulkAllocationSelectors';
import BankTransactionFilterOptions from './BankTransactionFilterOptions';
import BankTransactionPageHead from './BankTransactionPageHead';
import BankTransactionTable from './BankTransactionTable';
import BankingModal from './BankingModal';
import BulkAllocationPopover from './BulkAllocationPopover';
import LoadMoreButton from '../../../components/PaginatedListTemplate/LoadMoreButton';
import NoContentView from './NoContentView';
import PageView from '../../../components/PageView/PageView';
import styles from './BankingView.module.css';

const BankingView = (props) => {
  const {
    inTrayModal,
    accountModal,
    hasError,
    isLoading,
    isEntryLoading,
    alert,
    selectedCount,
    showBulkActions,
    getBankingRuleModal,
    onUpdateFilters,
    onAddAccount,
    onBankAccountChange,
    onSort,
    onAllocate,
    onDismissAlert,
    onDismissModalAlert,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onMatchedToBlur,
    onMatchedToFocus,
    onUnmatchedFocus,
    onEntryHover,
    onUnmatchedBlur,
    onHeaderClick,
    onTabChange,
    onSaveSplitAllocation,
    onCancelSplitAllocation,
    onUnallocateSplitAllocation,
    onUpdateSplitAllocationHeader,
    onAddSplitAllocationLine,
    onUpdateSplitAllocationLine,
    onDeleteSplitAllocationLine,
    onApplyMatchTransactionOptions,
    onUpdateMatchTransactionOptions,
    onSortMatchTransactions,
    onUpdateMatchTransactionSelection,
    onUpdateSelectedTransactionDetails,
    onAddAdjustment,
    onUpdateAdjustment,
    onRemoveAdjustment,
    onExpandAdjustmentSection,
    onToggleSelectAllState,
    onSaveMatchTransaction,
    onCancelMatchTransaction,
    onUnmatchTransaction,
    onSaveTransferMoney,
    onSaveMatchTransferMoney,
    onCancelTransferMoney,
    modalType,
    onCancelModal,
    onCloseModal,
    onUpdateTransfer,
    onSortTransfer,
    onUpdateTransferSelection,
    onSelectTransaction,
    onSelectAllTransactions,
    onUpdateBulkAllocationOption,
    onSaveBulkAllocation,
    onCloseBulkAllocation,
    onOpenBankingRuleModal,
    onOpenTransferMoneyModal,
    onRenderBankingRuleModal,
    onAddAttachments,
    onDownloadAttachment,
    onRemoveAttachment,
    onDeleteAttachmentModal,
    onEditNote,
    onPendingNoteChange,
    onNoteBlur,
    onImportStatementButtonClick,
    onLinkFromInTrayButtonClick,
    onLoadMoreButtonClick,
    loadMoreButtonStatus,
  } = props;

  const filterBar = (
    <BankTransactionFilterOptions
      onUpdateFilters={onUpdateFilters}
    />
  );

  const pageHead = (
    <BankTransactionPageHead
      onBankAccountChange={onBankAccountChange}
      onImportStatementButtonClick={onImportStatementButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = (modalType
    && (<BankingModal
      onDismissModalAlert={onDismissModalAlert}
      modalType={modalType}
      getBankingRuleModal={getBankingRuleModal}
      onCloseModal={onCloseModal}
      onConfirmCancelModal={onCancelModal}
      onConfirmUnmatchTransactionModal={onCancelModal}
      onRenderBankingRuleModal={onRenderBankingRuleModal}
      onDeleteAttachmentModal={onDeleteAttachmentModal}
      onSaveTransferMoney={onSaveTransferMoney}
      onUpdateTransfer={onUpdateTransfer}
    />
    ));

  const bulkActions = (
    <BulkActions>
      <BulkAllocationPopover
        onUpdateBulkAllocationOption={onUpdateBulkAllocationOption}
        onSaveBulkAllocation={onSaveBulkAllocation}
        onCloseBulkAllocation={onCloseBulkAllocation}
      />
      <BulkActions.Counter count={selectedCount} />
      <div className={styles.popover} />
    </BulkActions>
  );

  const transactionListView = (
    <div className={`${isEntryLoading ? styles.entryLoading : ''} ${styles.bankTransactionView}`}>
      <StandardTemplate sticky="all" alert={alertComponent} pageHead={pageHead} filterBar={filterBar}>
        {modal}
        {accountModal}
        {inTrayModal}
        {showBulkActions && bulkActions}
        <BankTransactionTable
          onSort={onSort}
          onAddAccount={onAddAccount}
          onAllocate={onAllocate}
          onMatchedToBlur={onMatchedToBlur}
          onMatchedToFocus={onMatchedToFocus}
          onSplitRowItemClick={onSplitRowItemClick}
          onMatchRowItemClick={onMatchRowItemClick}
          onUnmatchedFocus={onUnmatchedFocus}
          onEntryHover={onEntryHover}
          onUnmatchedBlur={onUnmatchedBlur}
          onHeaderClick={onHeaderClick}
          onTabChange={onTabChange}
          onSaveSplitAllocation={onSaveSplitAllocation}
          onCancelSplitAllocation={onCancelSplitAllocation}
          onUnallocateSplitAllocation={onUnallocateSplitAllocation}
          onUpdateSplitAllocationHeader={onUpdateSplitAllocationHeader}
          onAddSplitAllocationLine={onAddSplitAllocationLine}
          onUpdateSplitAllocationLine={onUpdateSplitAllocationLine}
          onDeleteSplitAllocationLine={onDeleteSplitAllocationLine}
          onApplyMatchTransactionOptions={onApplyMatchTransactionOptions}
          onUpdateMatchTransactionOptions={onUpdateMatchTransactionOptions}
          onSortMatchTransactions={onSortMatchTransactions}
          onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
          onUpdateSelectedTransactionDetails={onUpdateSelectedTransactionDetails}
          onAddAdjustment={onAddAdjustment}
          onUpdateAdjustment={onUpdateAdjustment}
          onRemoveAdjustment={onRemoveAdjustment}
          onExpandAdjustmentSection={onExpandAdjustmentSection}
          onToggleSelectAllState={onToggleSelectAllState}
          onSaveMatchTransaction={onSaveMatchTransaction}
          onCancelMatchTransaction={onCancelMatchTransaction}
          onUnmatchTransaction={onUnmatchTransaction}
          onSaveTransferMoney={onSaveMatchTransferMoney}
          onCancelTransferMoney={onCancelTransferMoney}
          onUpdateTransfer={onUpdateTransfer}
          onSortTransfer={onSortTransfer}
          onUpdateTransferSelection={onUpdateTransferSelection}
          onSelectTransaction={onSelectTransaction}
          onSelectAllTransactions={onSelectAllTransactions}
          onOpenBankingRuleModal={onOpenBankingRuleModal}
          onOpenTransferMoneyModal={onOpenTransferMoneyModal}
          onAddAttachments={onAddAttachments}
          onDownloadAttachment={onDownloadAttachment}
          onRemoveAttachment={onRemoveAttachment}
          onEditNote={onEditNote}
          onPendingNoteChange={onPendingNoteChange}
          onNoteBlur={onNoteBlur}
          onLinkFromInTrayButtonClick={onLinkFromInTrayButtonClick}
        />
      </StandardTemplate>
      <LoadMoreButton
        onLoadMoreButtonClick={onLoadMoreButtonClick}
        loadMoreButtonStatus={loadMoreButtonStatus}
      />
    </div>
  );

  const errorView = <NoContentView />;

  const view = hasError ? errorView : transactionListView;

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
  isEntryLoading: getIsEntryLoading(state),
  modalType: getModalType(state),
  selectedCount: selectedCountSelector(state),
  showBulkActions: showBulkActionsSelector(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(BankingView);
