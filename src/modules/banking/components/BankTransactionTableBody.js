import { Card, Separator } from '@myob/myob-widgets';
import React from 'react';

import { tabIds } from '../tabItems';
import BankTransactionTableRow from './BankTransactionTableRow';
import BankTransactionTabs from './BankTransactionTabs';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import MatchTransactionBody from './MatchTransactionBody';
import OpenEntryFooter from './OpenEntryFooter';
import OpenEntrySecondaryContent from './OpenEntrySecondaryContent';
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
    onAddAccount,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onMatchedToBlur,
    onMatchedToFocus,
    onEntryHover,
    onUnmatchedFocus,
    onUnmatchedBlur,
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
    onOpenBankingRuleModal,
    onAddAttachments,
    onDownloadAttachment,
    onRemoveAttachment,
    onOpenTransferMoneyModal,
    onEditNote,
    onPendingNoteChange,
    onNoteBlur,
    onLinkFromInTrayButtonClick,
  } = props;

  const spinner = (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <LoadingPageState size="medium" />
      </div>
    </div>
  );

  const Content = {
    [tabIds.allocate]: SplitAllocationBody,
    [tabIds.match]: MatchTransactionBody,
    [tabIds.transfer]: TransferMoneyBody,
  }[activeTabId];

  const contentProps = {
    [tabIds.allocate]: {
      onUpdateSplitAllocationHeader,
      onAddSplitAllocationLine,
      onUpdateSplitAllocationLine,
      onDeleteSplitAllocationLine,
      onAddAccount,
    },
    [tabIds.match]: {
      onUpdateMatchTransactionOptions,
      onSortMatchTransactions,
      onUpdateMatchTransactionSelection,
      onUpdateSelectedTransactionDetails,
      onToggleSelectAllState,
      onAddAdjustment,
      onUpdateAdjustment,
      onRemoveAdjustment,
      onExpandAdjustmentSection,
      onAddAccount,
    },
    [tabIds.transfer]: {
      onUpdateTransfer,
      onSortTransfer,
      onUpdateTransferSelection,
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
      onCreateRule: onOpenBankingRuleModal,
    },
    [tabIds.transfer]: {
      onSave: onSaveTransferMoney,
      onCancel: onCancelTransferMoney,
      onUnmatch: onUnallocateSplitAllocation,
      onCreateTransferMoney: onOpenTransferMoneyModal,
    },
  }[activeTabId];

  const openEntryPrimaryContent = isOpenEntryLoading ? spinner : (
    <>
      <BankTransactionTabs
        selected={activeTabId}
        onSelected={onTabChange}
      />
      <Content {...contentProps} />
    </>
  );

  const openEntry = (
    <Card
      classes={[styles.openEntryCard]}
      body={(
        <Card.Body
          classes={[styles.openEntryCardBody]}
          child={(
            <>
              { openEntryPrimaryContent }
              <Separator />
              <OpenEntrySecondaryContent
                onAddAttachments={onAddAttachments}
                onDownloadAttachment={onDownloadAttachment}
                onRemoveAttachment={onRemoveAttachment}
                onLinkFromInTrayButtonClick={onLinkFromInTrayButtonClick}
              />
            </>
          )}
        />
      )}
      footer={(
        <Card.Footer
          classes={[styles.openEntryCardFooter]}
          child={(
            <OpenEntryFooter {...footerProps} />
        )}
        />
      )}
    />
  );

  const rows = entries.map((entry, index) => (
    <BankTransactionTableRow
      key={index}
      onAddAccount={onAddAccount}
      onHeaderClick={onHeaderClick}
      onSplitRowItemClick={onSplitRowItemClick}
      onMatchRowItemClick={onMatchRowItemClick}
      onMatchedToFocus={onMatchedToFocus}
      onEntryHover={onEntryHover}
      onMatchedToBlur={onMatchedToBlur}
      onUnmatchedBlur={onUnmatchedBlur}
      onUnmatchedFocus={onUnmatchedFocus}
      onAllocate={onAllocate}
      index={index}
      isExpanded={index === openPosition}
      isSelected={entrySelectStatus[index]}
      onSelectTransaction={onSelectTransaction}
      onEditNote={onEditNote}
      onPendingNoteChange={onPendingNoteChange}
      onNoteBlur={onNoteBlur}
    >
      {openPosition === index
          && (
          <div className={styles.openEntry}>
            { openEntry }
          </div>
          )}
    </BankTransactionTableRow>
  ));

  return (
    <React.Fragment>
      {rows}
    </React.Fragment>
  );
};

export default BankTransactionTableBody;
