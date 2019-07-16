import {
  Spinner, Table,
} from '@myob/myob-widgets';
import React from 'react';

import { tabIds } from '../tabItems';
import BankTransactionExpansionToggle from './BankTransactionExpansionToggle';
import BankTransactionTableRow from './BankTransactionTableRow';
import BankTransactionTabs from './BankTransactionTabs';
import MatchTransactionBody from './MatchTransactionBody';
import OpenEntryFooter from './OpenEntryFooter';
import PaymentAllocationBody from './PaymentAllocationBody';
import PaymentAllocationFooter from './PaymentAllocationFooter';
import SplitAllocationBody from './SplitAllocationBody';
import TableCollapsibleRow from '../../components/Feelix/Accordion/TableCollapsibleRow';
import TransferMoneyBody from './TransferMoneyBody';
import style from './BankingView.module.css';

/* eslint-disable react/no-array-index-key */

const BankTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
    entrySelectStatus,
    isOpenEntryLoading,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onMatchedToBlur,
    onMatchedToFocus,
    onUnmatchedFocus,
    onUnmatchedBlur,
    onUnallocate,
    onAllocate,
    openPosition,
    activeTabId,
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
  } = props;

  const spinner = (
    <div className={style.spinner}>
      <Spinner size="medium" />
    </div>
  );

  const Content = {
    [tabIds.allocate]: SplitAllocationBody,
    [tabIds.match]: MatchTransactionBody,
    [tabIds.payment]: PaymentAllocationBody,
    [tabIds.transfer]: TransferMoneyBody,
  }[activeTabId];

  const contentProps = {
    [tabIds.allocate]: {
      onUpdateSplitAllocationHeader,
      onAddSplitAllocationLine,
      onUpdateSplitAllocationLine,
      onDeleteSplitAllocationLine,
    },
    [tabIds.match]: {
      onApplyMatchTransactionOptions,
      onUpdateMatchTransactionOptions,
      onSortMatchTransactions,
      onUpdateMatchTransactionSelection,
    },
    [tabIds.payment]: {
      onUpdatePaymentAllocationOptions,
      onUpdatePaymentAllocationLine,
    },
    [tabIds.transfer]: {
      onUpdateTransfer,
    },
  }[activeTabId];

  const footerProps = {
    [tabIds.allocate]: {
      onSave: onSaveSplitAllocation,
      onCancel: onCancelSplitAllocation,
      onUnmatch: onUnallocateSplitAllocation,
    },
    [tabIds.match]: {
      onSave: onSaveMatchTransaction,
      onCancel: onCancelMatchTransaction,
      onUnmatch: onUnmatchTransaction,
    },
    [tabIds.payment]: {
      onSave: onSavePaymentAllocation,
      onCancel: onCancelPaymentAllocation,
      onUnmatch: onUnallocateSplitAllocation,
    },
    [tabIds.transfer]: {
      onSave: onSaveTransferMoney,
      onCancel: onCancelTransferMoney,
      onUnmatch: onUnallocateSplitAllocation,
    },
  }[activeTabId];

  const openEntry = (
    <React.Fragment>
      <BankTransactionTabs
        selected={activeTabId}
        onSelected={onTabChange}
      />
      <Content {...contentProps} />
    </React.Fragment>
  );

  const openEntryFooter = (
    <OpenEntryFooter {...footerProps}>
      {activeTabId === tabIds.payment ? <PaymentAllocationFooter /> : null}
    </OpenEntryFooter>
  );

  const rows = entries.map((entry, index) => {
    const entryClassName = `${style.openEntry} ${isOpenEntryLoading ? style.isLoading : ''}`;

    return (
      <TableCollapsibleRow
        key={index}
        renderExpansionToggle={
          ({ getButtonProps, isOpen }) => (
            <BankTransactionExpansionToggle
              index={index}
              getButtonProps={getButtonProps}
              isOpen={isOpen}
            />
          )
        }
        expansionToggle
        footer={!isOpenEntryLoading ? openEntryFooter : null}
        header={(
          <Table.Row isSelected={entrySelectStatus[index]}>
            <BankTransactionTableRow
              onSplitRowItemClick={onSplitRowItemClick}
              onMatchRowItemClick={onMatchRowItemClick}
              onMatchedToFocus={onMatchedToFocus}
              onMatchedToBlur={onMatchedToBlur}
              onUnmatchedBlur={onUnmatchedBlur}
              onUnmatchedFocus={onUnmatchedFocus}
              onAllocate={onAllocate}
              onUnallocate={onUnallocate}
              tableConfig={tableConfig}
              index={index}
              isExpanded={index === openPosition}
              onSelectTransaction={onSelectTransaction}
            />
          </Table.Row>
        )}
      >
        {openPosition === index
          && (
          <div className={entryClassName}>
            { isOpenEntryLoading ? spinner : openEntry }
          </div>
          )}
      </TableCollapsibleRow>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

export default BankTransactionTableBody;
