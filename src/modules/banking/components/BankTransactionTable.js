import { Card, PageState, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankTableData,
  getIsOpenEntryLoading,
  getIsTableEmpty,
  getIsTableLoading,
  getOpenEntryActiveTabId,
  getOrder,
} from '../bankingSelectors';
import {
  getBulkSelectStatus,
  getEntrySelectStatus,
  getIsBulkLoading,
} from '../bankingSelectors/bulkAllocationSelectors';
import BankTransactionTableBody from './BankTransactionTableBody';
import BankTransactionTableHeader from './BankTransactionTableHeader';
import ErrorViewImage from './no-results-found.svg';

const emptyView = (header) => (
  <React.Fragment>
    {header}
    <Card>
      <PageState
        title="No transactions found."
        description="Perhaps checks the date or remove the filters and try again"
        image={<img src={ErrorViewImage} alt="Please change your filters" />}
      />
    </Card>
  </React.Fragment>
);

const spinnerView = (header) => (
  <React.Fragment>
    {header}
    <Card>
      <PageState title={<Spinner size="medium" />} description="Loading" />
    </Card>
  </React.Fragment>
);

const BankTransactionTable = ({
  isTableEmpty,
  isTableLoading,
  isBulkLoading,
  isOpenEntryLoading,
  bulkSelectStatus,
  entrySelectStatus,
  onAddAccount,
  onAddJob,
  onMatchedToBlur,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onMatchedToFocus,
  onUnmatchedFocus,
  onEntryHover,
  onUnmatchedBlur,
  onAllocate,
  onSort,
  order,
  entries,
  openPosition,
  activeTabId,
  onHeaderClick,
  onTabChange,
  onSaveSplitAllocation,
  onCancelSplitAllocation,
  onUnallocateSplitAllocation,
  onUpdateSplitAllocationHeader,
  onAddSplitAllocationLine,
  onUpdateSplitAllocationLine,
  onDeleteSplitAllocationLine,
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
  onCancelTransferMoney,
  onUpdateTransfer,
  onSortTransfer,
  onUpdateTransferSelection,
  onSelectTransaction,
  onSelectAllTransactions,
  onOpenBankingRuleModal,
  onAddAttachments,
  onDownloadAttachment,
  onRemoveAttachment,
  onEditNote,
  onPendingNoteChange,
  onNoteBlur,
  onOpenTransferMoneyModal,
  onLinkFromInTrayButtonClick,
}) => {
  const header = (
    <BankTransactionTableHeader
      onSelectAllTransactions={onSelectAllTransactions}
      bulkSelectStatus={bulkSelectStatus}
      isBulkLoading={isBulkLoading}
      onSort={onSort}
      order={order}
    />
  );

  if (isTableLoading) {
    return spinnerView(header);
  }
  if (isTableEmpty) {
    return emptyView(header);
  }
  const body = (
    <BankTransactionTableBody
      entries={entries}
      entrySelectStatus={entrySelectStatus}
      isOpenEntryLoading={isOpenEntryLoading}
      activeTabId={activeTabId}
      onAddAccount={onAddAccount}
      onAddJob={onAddJob}
      onHeaderClick={onHeaderClick}
      onSplitRowItemClick={onSplitRowItemClick}
      onMatchRowItemClick={onMatchRowItemClick}
      onMatchedToBlur={onMatchedToBlur}
      onMatchedToFocus={onMatchedToFocus}
      onAllocate={onAllocate}
      onUnmatchedFocus={onUnmatchedFocus}
      onEntryHover={onEntryHover}
      onUnmatchedBlur={onUnmatchedBlur}
      openPosition={openPosition}
      onTabChange={onTabChange}
      onSaveSplitAllocation={onSaveSplitAllocation}
      onCancelSplitAllocation={onCancelSplitAllocation}
      onUnallocateSplitAllocation={onUnallocateSplitAllocation}
      onUpdateSplitAllocationHeader={onUpdateSplitAllocationHeader}
      onAddSplitAllocationLine={onAddSplitAllocationLine}
      onUpdateSplitAllocationLine={onUpdateSplitAllocationLine}
      onDeleteSplitAllocationLine={onDeleteSplitAllocationLine}
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
      onSaveTransferMoney={onSaveTransferMoney}
      onCancelTransferMoney={onCancelTransferMoney}
      onUpdateTransfer={onUpdateTransfer}
      onSortTransfer={onSortTransfer}
      onUpdateTransferSelection={onUpdateTransferSelection}
      onSelectTransaction={onSelectTransaction}
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
  );

  return (
    <React.Fragment>
      {header}
      {body}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  openPosition: state.openPosition,
  isOpenEntryLoading: getIsOpenEntryLoading(state),
  activeTabId: getOpenEntryActiveTabId(state),
  entries: getBankTableData(state),
  bulkSelectStatus: getBulkSelectStatus(state),
  entrySelectStatus: getEntrySelectStatus(state),
  isBulkLoading: getIsBulkLoading(state),
});

export default connect(mapStateToProps)(BankTransactionTable);
