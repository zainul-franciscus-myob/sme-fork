import {
  Alert, Button, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsEntryLoading, getIsLoading, getModalType,
} from '../bankingSelectors';
import {
  getIsFetchingTransactions,
} from '../bankingSelectors/bankFeedsLoginSelectors';
import BankTransactionFilterOptions from './BankTransactionFilterOptions';
import BankTransactionTable from './BankTransactionTable';
import BankingModal from './BankingModal';
import style from './BankingView.css';

const BankingView = (props) => {
  const {
    isLoading,
    isEntryLoading,
    alert,
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
    />
    ));

  const transactionListView = (
    <div className={isEntryLoading ? style.entryLoading : ''}>
      <StandardTemplate sticky="none" alert={alertComponent} pageHead={pageHead} filterBar={filterBar}>
        {modal}
        <div className={style.list}>
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
          />
        </div>
      </StandardTemplate>
    </div>
  );

  const view = isLoading ? (<Spinner />) : transactionListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isFetchingTransactions: getIsFetchingTransactions(state),
  isEntryLoading: getIsEntryLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(BankingView);
