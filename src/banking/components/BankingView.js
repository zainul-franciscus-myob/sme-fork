import {
  Alert, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getModalType,
} from '../bankingSelectors';
import BankTransactionFilterOptions from './BankTransactionFilterOptions';
import BankTransactionTable from './BankTransactionTable';
import CancelModal from '../../components/modal/CancelModal';
import style from './BankingView.css';

const BankingView = (props) => {
  const {
    isLoading,
    alert,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    onAllocate,
    onUnallocate,
    onDismissAlert,
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
    modalType,
    onCancelModal,
    onCloseModal,
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

  const modal = (modalType === 'cancel') && (
    <CancelModal
      onCancel={onCloseModal}
      onConfirm={onCancelModal}
      title="Cancel bank transaction alterations"
      description="Are you sure you want to cancel the alterations for this bank transaction?"
    />
  );

  const transactionListView = (
    <StandardTemplate sticky="none" alert={alertComponent} pageHead="Bank transactions" filterBar={filterBar}>
      {modal}
      <div className={style.list}>
        <BankTransactionTable
          onSort={onSort}
          onAllocate={onAllocate}
          onUnallocate={onUnallocate}
          onMatchedToBlur={onMatchedToBlur}
          onMatchedToFocus={onMatchedToFocus}
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
        />
      </div>
    </StandardTemplate>
  );

  const view = isLoading ? (<Spinner />) : transactionListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(BankingView);
