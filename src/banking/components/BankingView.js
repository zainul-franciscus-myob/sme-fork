import {
  Alert, BulkActions, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsEntryLoading, getIsLoading, getModalType,
} from '../bankingSelectors';
import {
  getIsFetchingTransactions,
} from '../bankingSelectors/bankFeedsLoginSelectors';
import {
  selectedCountSelector,
  showBulkActionsSelector,
} from '../bankingSelectors/bulkAllocationSelectors';
import BankTransactionFilterOptions from './BankTransactionFilterOptions';
import BankTransactionTable from './BankTransactionTable';
import BankingModal from './BankingModal';
import BulkAllocationPopover from './BulkAllocationPopover';
import PageView from '../../components/PageView/PageView';
import styles from './BankingView.module.css';

const BankingView = (props) => {
  const {
    isLoading,
    isEntryLoading,
    alert,
    selectedCount,
    showBulkActions,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onAllocate,
    onUnallocate,
    onDismissAlert,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onMatchedToBlur,
    onMatchedToFocus,
    onUnmatchedFocus,
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
    onSaveMatchTransaction,
    onCancelMatchTransaction,
    onUnmatchTransaction,
    onUpdatePaymentAllocationOptions,
    onUpdatePaymentAllocationLine,
    onSavePaymentAllocation,
    onCancelPaymentAllocation,
    onSaveTransferMoney,
    onCancelTransferMoney,
    modalType,
    onCancelModal,
    onCloseModal,
    onUpdateTransfer,
    onGetBankTransactions,
    onUpdateBankFeedsLoginDetails,
    onCancelBankFeedsLogin,
    onConfirmBankFeedsLogin,
    isFetchingTransactions,
    onSelectTransaction,
    onSelectAllTransactions,
    onUpdateBulkAllocationOption,
    onSaveBulkAllocation,
    onSaveBulkUnallocation,
    onCancelUnallocateModal,
    onConfirmUnallocateModal,
  } = props;

  const filterBar = (
    <BankTransactionFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = (
    <PageHead title="Bank Transactions">
      <Button type="secondary" disabled={isFetchingTransactions} onClick={onGetBankTransactions}>Get bank transactions</Button>
    </PageHead>
  );

  const modal = (modalType
    && (<BankingModal
      modalType={modalType}
      onCloseCancelModal={onCloseModal}
      onConfirmCancelModal={onCancelModal}
      onCancelBankFeedsLogin={onCancelBankFeedsLogin}
      onConfirmBankFeedsLogin={onConfirmBankFeedsLogin}
      onUpdateBankFeedsLoginDetails={onUpdateBankFeedsLoginDetails}
      onConfirmUnallocateModal={onConfirmUnallocateModal}
      onCancelUnallocateModal={onCancelUnallocateModal}
    />
    ));

  const bulkActions = (
    <BulkActions>
      <BulkAllocationPopover
        onUpdateBulkAllocationOption={onUpdateBulkAllocationOption}
        onSaveBulkAllocation={onSaveBulkAllocation}
      />
      <Button type="secondary" onClick={onSaveBulkUnallocation}>Unallocate</Button>
      <BulkActions.Counter count={selectedCount} />
      <div className={styles.popover} />
    </BulkActions>
  );

  const transactionListView = (
    <div className={`${isEntryLoading ? styles.entryLoading : ''} ${styles.bankTransactionView}`}>
      <StandardTemplate sticky="none" alert={alertComponent} pageHead={pageHead} filterBar={filterBar}>
        {modal}
        {showBulkActions && bulkActions}
        <BankTransactionTable
          onSort={onSort}
          onAllocate={onAllocate}
          onUnallocate={onUnallocate}
          onMatchedToBlur={onMatchedToBlur}
          onMatchedToFocus={onMatchedToFocus}
          onSplitRowItemClick={onSplitRowItemClick}
          onMatchRowItemClick={onMatchRowItemClick}
          onUnmatchedFocus={onUnmatchedFocus}
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
          onSelectAllTransactions={onSelectAllTransactions}
        />
      </StandardTemplate>
    </div>
  );

  return <PageView isLoading={isLoading} view={transactionListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isFetchingTransactions: getIsFetchingTransactions(state),
  isEntryLoading: getIsEntryLoading(state),
  modalType: getModalType(state),
  selectedCount: selectedCountSelector(state),
  showBulkActions: showBulkActionsSelector(state),
});

export default connect(mapStateToProps)(BankingView);
