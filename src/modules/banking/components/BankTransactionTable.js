import { Card, PageState, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBulkSelectStatus,
  getIsBulkLoading,
} from '../selectors/bulkActionSelectors';
import {
  getIsCantLoadTransactionsView,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../selectors';
import BankTransactionTableBody from './BankTransactionTableBody';
import BankTransactionTableHeader from './BankTransactionTableHeader';
import ErrorViewImage from './no-results-found.svg';

const noTransactionsAvailableView = (header) => (
  <React.Fragment>
    {header}
    <Card>
      <PageState
        title="No transactions found"
        description="Perhaps check the date or remove the filters and try again"
        image={<img src={ErrorViewImage} alt="Please change your filters" />}
      />
    </Card>
  </React.Fragment>
);

const cantLoadTransactionsView = (header) => (
  <React.Fragment>
    {header}
    <Card>
      <PageState
        title="Something went wrong"
        description="Please narrow the date range and try again"
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
  splitAllocationProps,
  matchTransactionProps,
  transferMoneyProps,
  isCantLoadTransactionsView,
  isTableEmpty,
  isTableLoading,
  isBulkLoading,
  bulkSelectStatus,
  onAddAccount,
  onBlur,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onFocusTransactionLine,
  onEntryHover,
  onAllocate,
  onSort,
  order,
  onHeaderClick,
  onTabChange,
  onSelectTransaction,
  onSelectAllTransactions,
  onAddAttachments,
  onDownloadAttachment,
  onRemoveAttachment,
  onEditNote,
  onPendingNoteChange,
  onNoteBlur,
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
  if (isCantLoadTransactionsView) {
    return cantLoadTransactionsView(header);
  }
  if (isTableEmpty) {
    return noTransactionsAvailableView(header);
  }

  const body = (
    <BankTransactionTableBody
      splitAllocationProps={splitAllocationProps}
      matchTransactionProps={matchTransactionProps}
      transferMoneyProps={transferMoneyProps}
      onAddAccount={onAddAccount}
      onHeaderClick={onHeaderClick}
      onSplitRowItemClick={onSplitRowItemClick}
      onMatchRowItemClick={onMatchRowItemClick}
      onBlur={onBlur}
      onFocusTransactionLine={onFocusTransactionLine}
      onAllocate={onAllocate}
      onEntryHover={onEntryHover}
      onTabChange={onTabChange}
      onSelectTransaction={onSelectTransaction}
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
  isCantLoadTransactionsView: getIsCantLoadTransactionsView(state),
  isBulkLoading: getIsBulkLoading(state),
  order: getOrder(state),
  bulkSelectStatus: getBulkSelectStatus(state),
});

export default connect(mapStateToProps)(BankTransactionTable);
