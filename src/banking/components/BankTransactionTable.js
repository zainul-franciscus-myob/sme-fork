import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsOpenEntryLoading,
  getIsTableEmpty,
  getIsTableLoading,
  getOpenEntryActiveTabId,
  getOrder,
  getTableEntries,
} from '../bankingSelectors';
import AccordionTable from '../../components/Feelix/Accordion/AccordionTable';
import BankTransactionTableBody from './BankTransactionTableBody';
import style from './BankingView.css';

const tableConfig = {
  date: { width: '11rem' },
  description: { width: 'flex-1' },
  withdrawal: { width: '15rem', align: 'right' },
  deposit: { width: '13rem', align: 'right' },
  allocateOrMatch: { width: '28rem', columnName: 'allocateOrMatch' },
  taxCode: { width: '13rem', columnName: 'taxCode' },
};

const emptyView = header => (
  <Table>
    {header}
    <div className={style.empty}>
    There are no transactions for the selected filter options.
    </div>
  </Table>
);

const spinnerView = header => (
  <Table>
    {header}
    <div className={style.spinner}>
      <Spinner size="medium" />
    </div>
  </Table>
);

const BankTransactionTable = ({
  isTableEmpty,
  isTableLoading,
  isOpenEntryLoading,
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
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="Date" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort title="Description" sortName="Description" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.withdrawal}>
        <HeaderSort title="Withdrawal ($)" sortName="Withdrawal" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.deposit}>
        <HeaderSort title="Deposit ($)" sortName="Deposit" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.allocateOrMatch} columnName="allocateOrMatchHeader">
        <HeaderSort title="Allocate or Match" sortName="AllocateOrMatch" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.taxCode} columnName="taxCodeHeader">
        <HeaderSort title="Tax" sortName="TaxCode" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  if (isTableLoading) {
    return spinnerView(header);
  } if (isTableEmpty) {
    return emptyView(header);
  }
  const body = BankTransactionTableBody({
    entries,
    tableConfig,
    isOpenEntryLoading,
    activeTabId,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onMatchedToBlur,
    onMatchedToFocus,
    onAllocate,
    onUnallocate,
    onUnmatchedFocus,
    onUnmatchedBlur,
    openPosition,
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
  });
  return (
    <AccordionTable
      openPosition={openPosition}
      handleHeaderClick={onHeaderClick}
      header={header}
      body={body}
    />
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  openPosition: state.openPosition,
  isOpenEntryLoading: getIsOpenEntryLoading(state),
  activeTabId: getOpenEntryActiveTabId(state),
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(BankTransactionTable);
