import { Card } from '@myob/myob-widgets';
import React from 'react';

import { tabIds } from '../tabItems';
import BankTransactionTableRow from './BankTransactionTableRow';
import BankTransactionTabs from './BankTransactionTabs';
import DropZoneCardBody from './DropZoneCardBody';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import MatchTransactionBody from './MatchTransactionBody';
import OpenEntryFooter from './OpenEntryFooter';
import OpenEntrySecondaryContent from './OpenEntrySecondaryContent';
import SplitAllocationBody from './SplitAllocationBody';
import TransferMoneyBody from './TransferMoneyBody';
import styles from './BankingView.module.css';

const BankTransactionTableBody = (props) => {
  const {
    entries,
    entrySelectStatus,
    isOpenEntryLoading,
    onHeaderClick,
    onAddAccount,
    onAddJob,
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
    onResetMatchTransactionOptions,
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
      onAddJob,
    },
    [tabIds.match]: {
      onUpdateMatchTransactionOptions,
      onResetMatchTransactionOptions,
      onSortMatchTransactions,
      onUpdateMatchTransactionSelection,
      onUpdateSelectedTransactionDetails,
      onToggleSelectAllState,
      onAddAdjustment,
      onUpdateAdjustment,
      onRemoveAdjustment,
      onExpandAdjustmentSection,
      onAddAccount,
      onAddJob,
    },
    [tabIds.transfer]: {
      onUpdateTransfer,
      onSortTransfer,
      onUpdateTransferSelection,
      onCreateTransferMoney: onOpenTransferMoneyModal,
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

  const openEntryPrimaryContent = isOpenEntryLoading ? (
    <LoadingPageState size="medium" />
  ) : (
    <Content {...contentProps} />
  );

  const openEntry = (
    <Card
      classes={[styles.openEntryCard]}
      body={
        <DropZoneCardBody
          onDrop={onAddAttachments}
          onFileSelected={onAddAttachments}
        >
          <BankTransactionTabs
            selected={activeTabId}
            onSelected={onTabChange}
          />
          {openEntryPrimaryContent}
          <OpenEntrySecondaryContent
            onDownloadAttachment={onDownloadAttachment}
            onRemoveAttachment={onRemoveAttachment}
          />
        </DropZoneCardBody>
      }
      footer={
        <Card.Footer
          classes={[styles.openEntryCardFooter]}
          child={
            <OpenEntryFooter
              {...footerProps}
              onLinkFromInTrayButtonClick={onLinkFromInTrayButtonClick}
              onAddAttachments={onAddAttachments}
            />
          }
        />
      }
    />
  );

  const rows = entries.map((entry, index) => (
    <BankTransactionTableRow
      // eslint-disable-next-line react/no-array-index-key
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
      {openPosition === index && openEntry}
    </BankTransactionTableRow>
  ));

  return <React.Fragment>{rows}</React.Fragment>;
};

export default BankTransactionTableBody;
