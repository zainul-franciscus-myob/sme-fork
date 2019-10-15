import { PageState, Spinner } from '@myob/myob-widgets';
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

const emptyView = header => (
  <React.Fragment>
    {header}
    <PageState
      title="There are no transactions for the selected filter options."
    />
  </React.Fragment>
);

const spinnerView = header => (
  <React.Fragment>
    {header}
    <PageState
      title={<Spinner size="medium" />}
      description="Loading"
    />
  </React.Fragment>
);

const BankTransactionTable = ({
  isTableEmpty,
  isTableLoading,
  isBulkLoading,
  isOpenEntryLoading,
  bulkSelectStatus,
  entrySelectStatus,
  onMatchedToBlur,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onMatchedToFocus,
  onUnmatchedFocus,
  onUnmatchedBlur,
  onAllocate,
  onUnallocate,
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
  onApplyMatchTransactionOptions,
  onUpdateMatchTransactionOptions,
  onSortMatchTransactions,
  onUpdateMatchTransactionSelection,
  onSaveMatchTransaction,
  onCancelMatchTransaction,
  onUnmatchTransaction,
  onUpdatePaymentAllocationOptions,
  onUpdatePaymentAllocationLine,
  onSavePaymentAllocation,
  onCancelPaymentAllocation,
  onSaveTransferMoney,
  onCancelTransferMoney,
  onUpdateTransfer,
  onSelectTransaction,
  onSelectAllTransactions,
}) => {
  const header = (
    <BankTransactionTableHeader
      onSelectAllTransactions={onSelectAllTransactions}
      bulkSelectStatus={bulkSelectStatus}
      isBulkLoading={isBulkLoading}
      onSort={onSort}
      order={order}
    />);

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
      onHeaderClick={onHeaderClick}
      onSplitRowItemClick={onSplitRowItemClick}
      onMatchRowItemClick={onMatchRowItemClick}
      onMatchedToBlur={onMatchedToBlur}
      onMatchedToFocus={onMatchedToFocus}
      onAllocate={onAllocate}
      onUnallocate={onUnallocate}
      onUnmatchedFocus={onUnmatchedFocus}
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
      onApplyMatchTransactionOptions={onApplyMatchTransactionOptions}
      onUpdateMatchTransactionOptions={onUpdateMatchTransactionOptions}
      onSortMatchTransactions={onSortMatchTransactions}
      onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
      onSaveMatchTransaction={onSaveMatchTransaction}
      onCancelMatchTransaction={onCancelMatchTransaction}
      onUnmatchTransaction={onUnmatchTransaction}
      onUpdatePaymentAllocationOptions={onUpdatePaymentAllocationOptions}
      onUpdatePaymentAllocationLine={onUpdatePaymentAllocationLine}
      onSavePaymentAllocation={onSavePaymentAllocation}
      onCancelPaymentAllocation={onCancelPaymentAllocation}
      onSaveTransferMoney={onSaveTransferMoney}
      onCancelTransferMoney={onCancelTransferMoney}
      onUpdateTransfer={onUpdateTransfer}
      onSelectTransaction={onSelectTransaction}
    />);

  return (
    <React.Fragment>
      {header}
      {body}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
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
