import {
  Card, Spinner,
} from '@myob/myob-widgets';
import React from 'react';

import { tabIds } from '../tabItems';
import BankTransactionTableRow from './BankTransactionTableRow';
import BankTransactionTabs from './BankTransactionTabs';
import MatchTransactionBody from './MatchTransactionBody';
import OpenEntryFooter from './OpenEntryFooter';
import PaymentAllocationBody from './PaymentAllocationBody';
import PaymentAllocationFooter from './PaymentAllocationFooter';
import SplitAllocationBody from './SplitAllocationBody';
import TransferMoneyBody from './TransferMoneyBody';
import styles from './BankingView.module.css';

/* eslint-disable react/no-array-index-key */

const BankTransactionTableBody = (props) => {
  const {
    entries,
    entrySelectStatus,
    isOpenEntryLoading,
    onHeaderClick,
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
    onOpenBankingRuleModal,
  } = props;

  const spinner = (
    <div className={styles.spinner}>
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
      onCreateRule: onOpenBankingRuleModal,
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
      onCreateRule: onOpenBankingRuleModal,
    },
    [tabIds.transfer]: {
      onSave: onSaveTransferMoney,
      onCancel: onCancelTransferMoney,
      onUnmatch: onUnallocateSplitAllocation,
    },
  }[activeTabId];

  const openEntry = (
    <Card
      classes={[styles.openEntryCard]}
      body={(
        <Card.Body
          classes={[styles.openEntryCardBody]}
          child={(
            <React.Fragment>
              <BankTransactionTabs
                selected={activeTabId}
                onSelected={onTabChange}
              />
              <Content {...contentProps} />
            </React.Fragment>
          )}
        />
      )}
      footer={(
        <Card.Footer
          classes={[styles.openEntryCardFooter]}
          child={(
            <OpenEntryFooter {...footerProps}>
              {activeTabId === tabIds.payment ? <PaymentAllocationFooter /> : null}
            </OpenEntryFooter>
        )}
        />
      )}
    />
  );

  const rows = entries.map((entry, index) => {
    const entryClassName = `${styles.openEntry} ${isOpenEntryLoading ? styles.isLoading : ''}`;

    return (
      <BankTransactionTableRow
        key={index}
        onHeaderClick={onHeaderClick}
        onSplitRowItemClick={onSplitRowItemClick}
        onMatchRowItemClick={onMatchRowItemClick}
        onMatchedToFocus={onMatchedToFocus}
        onMatchedToBlur={onMatchedToBlur}
        onUnmatchedBlur={onUnmatchedBlur}
        onUnmatchedFocus={onUnmatchedFocus}
        onAllocate={onAllocate}
        onUnallocate={onUnallocate}
        index={index}
        isExpanded={index === openPosition}
        isSelected={entrySelectStatus[index]}
        onSelectTransaction={onSelectTransaction}
      >
        {openPosition === index
          && (
          <div className={entryClassName}>
            { isOpenEntryLoading ? spinner : openEntry }
          </div>
          )}
      </BankTransactionTableRow>
    );
  });

  return (
    <React.Fragment>
      {rows}
    </React.Fragment>
  );
};

export default BankTransactionTableBody;
