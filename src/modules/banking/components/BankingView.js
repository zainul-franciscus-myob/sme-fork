import {
  Alert,
  BulkActions,
  Button,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsSetupBankFeedsView,
  getLoadingState,
  getModalType,
  // getLoadMoreButtonStatus, See comment below on <LoadMoreButton>
} from '../selectors';
import {
  getBulkMessage,
  getShowBulkUnallocate,
  showBulkActionsSelector,
} from '../selectors/bulkActionSelectors';
import BankTransactionFilterOptions from './BankTransactionFilterOptions';
import BankTransactionPageHead from './BankTransactionPageHead';
import BankTransactionTable from './BankTransactionTable';
import BankingModal from './BankingModal';
import BulkAllocationPopover from './BulkAllocationPopover';
import NoContentView from './NoContentView';
import PageView from '../../../components/PageView/PageView';
import styles from './BankingView.module.css';

const BankingView = (props) => {
  const {
    splitAllocationProps,
    matchTransactionProps,
    transferMoneyProps,
    inTrayModal,
    accountModal,
    jobModal,
    renderBankingRuleModule,
    loadingState,
    isSetupBankFeedsView,
    alert,
    bulkMessage,
    showBulkActions,
    showBulkUnallocate,
    getBankingRuleModal,
    onUpdateFilters,
    onPeriodChange,
    onResetFilters,
    onAddAccount,
    onBankAccountChange,
    onSort,
    onAllocate,
    onDismissAlert,
    onDismissModalAlert,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onBlur,
    onFocusTransactionLine,
    onEntryHover,
    onHeaderClick,
    onTabChange,
    onSaveTransferMoney,
    modalType,
    onCancelModal,
    onCloseModal,
    onUpdateTransfer,
    onSelectTransaction,
    onSelectAllTransactions,
    onUpdateBulkAllocationOption,
    onSaveBulkAllocation,
    onCloseBulkAllocation,
    onOpenBulkAllocation,
    onBulkUnallocationButtonClick,
    onConfirmBulkUnallocation,
    onAddAttachments,
    onDownloadAttachment,
    onRemoveAttachment,
    onDeleteAttachmentModal,
    onEditNote,
    onPendingNoteChange,
    onNoteBlur,
    onImportStatementButtonClick,
    onLinkFromInTrayButtonClick,
    // onLoadMoreButtonClick, See comment below on <LoadMoreButton>
    // loadMoreButtonStatus,
  } = props;

  const bulkUnallocate = showBulkUnallocate && (
    <Button type="secondary" onClick={onBulkUnallocationButtonClick}>
      Unallocate
    </Button>
  );

  const bulkActions = showBulkActions && (
    <BulkActions>
      <BulkAllocationPopover
        onUpdateBulkAllocationOption={onUpdateBulkAllocationOption}
        onSaveBulkAllocation={onSaveBulkAllocation}
        onCloseBulkAllocation={onCloseBulkAllocation}
        onOpenBulkAllocation={onOpenBulkAllocation}
      />
      {bulkUnallocate}
      {bulkMessage}
    </BulkActions>
  );

  const pageHead = (
    <>
      <BankTransactionPageHead
        onBankAccountChange={onBankAccountChange}
        onImportStatementButtonClick={onImportStatementButtonClick}
      />
      <BankTransactionFilterOptions
        onUpdateFilters={onUpdateFilters}
        onPeriodChange={onPeriodChange}
        onResetFilters={onResetFilters}
      />
      {bulkActions}
    </>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <BankingModal
      onDismissModalAlert={onDismissModalAlert}
      modalType={modalType}
      getBankingRuleModal={getBankingRuleModal}
      onCloseModal={onCloseModal}
      onConfirmCancelModal={onCancelModal}
      onConfirmUnallocateModal={onConfirmBulkUnallocation}
      onConfirmUnmatchTransactionModal={onCancelModal}
      onDeleteAttachmentModal={onDeleteAttachmentModal}
      onSaveTransferMoney={onSaveTransferMoney}
      onUpdateTransfer={onUpdateTransfer}
    />
  );

  const transactionListView = (
    <>
      {renderBankingRuleModule()}
      {modal}
      {accountModal}
      {inTrayModal}
      {jobModal}
      <StandardTemplate
        sticky="all"
        alert={alertComponent}
        pageHead={pageHead}
        className={styles.bankTransactionView}
      >
        <BankTransactionTable
          splitAllocationProps={splitAllocationProps}
          matchTransactionProps={matchTransactionProps}
          transferMoneyProps={transferMoneyProps}
          onSort={onSort}
          onAddAccount={onAddAccount}
          onAllocate={onAllocate}
          onBlur={onBlur}
          onFocusTransactionLine={onFocusTransactionLine}
          onSplitRowItemClick={onSplitRowItemClick}
          onMatchRowItemClick={onMatchRowItemClick}
          onEntryHover={onEntryHover}
          onHeaderClick={onHeaderClick}
          onTabChange={onTabChange}
          onSelectTransaction={onSelectTransaction}
          onSelectAllTransactions={onSelectAllTransactions}
          onAddAttachments={onAddAttachments}
          onDownloadAttachment={onDownloadAttachment}
          onRemoveAttachment={onRemoveAttachment}
          onEditNote={onEditNote}
          onPendingNoteChange={onPendingNoteChange}
          onNoteBlur={onNoteBlur}
          onLinkFromInTrayButtonClick={onLinkFromInTrayButtonClick}
        />
      </StandardTemplate>
      {/* Commented out because business highly likely to re-introduce pagination.
          To re-introduce pagination, simply uncomment this. All other wiring is intact.
       <LoadMoreButton
        onLoadMoreButtonClick={onLoadMoreButtonClick}
        loadMoreButtonStatus={loadMoreButtonStatus}
      /> */}
    </>
  );

  const setupBankFeedsView = <NoContentView />;

  const view = isSetupBankFeedsView ? setupBankFeedsView : transactionListView;

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  isSetupBankFeedsView: getIsSetupBankFeedsView(state),
  modalType: getModalType(state),
  bulkMessage: getBulkMessage(state),
  showBulkActions: showBulkActionsSelector(state),
  showBulkUnallocate: getShowBulkUnallocate(state),
  // loadMoreButtonStatus: getLoadMoreButtonStatus(state),  See comment above on <LoadMoreButton>
});

export default connect(mapStateToProps)(BankingView);
