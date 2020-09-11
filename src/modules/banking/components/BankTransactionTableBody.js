import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankTableData,
  getIsOpenEntryLoading,
  getOpenEntryActiveTabId,
  getOpenPosition,
} from '../selectors';
import BankTransactionTableRow from './BankTransactionTableRow';
import BankTransactionTabs from './BankTransactionTabs';
import DropZoneCardBody from './DropZoneCardBody';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import MatchTransactionBody from '../tabs/matchTransaction/components/MatchTransactionBody';
import OpenEntryFooter from './OpenEntryFooter';
import OpenEntrySecondaryContent from './OpenEntrySecondaryContent';
import SplitAllocationBody from '../tabs/splitAllocation/components/SplitAllocationBody';
import TabItems from '../types/TabItems';
import TransferMoneyBody from '../tabs/transferMoney/components/TransferMoneyBody';
import styles from './BankingView.module.css';

const BankTransactionTableBody = (props) => {
  const {
    splitAllocationProps,
    matchTransactionProps,
    transferMoneyProps,
    entries,
    isOpenEntryLoading,
    onHeaderClick,
    onAddAccount,
    onSplitRowItemClick,
    onMatchRowItemClick,
    onBlur,
    onFocusTransactionLine,
    onEntryHover,
    onAllocate,
    openPosition,
    activeTabId,
    onTabChange,
    onSelectTransaction,
    onAddAttachments,
    onDownloadAttachment,
    onRemoveAttachment,
    onEditNote,
    onPendingNoteChange,
    onNoteBlur,
    onLinkFromInTrayButtonClick,
  } = props;

  const Content = {
    [TabItems.allocate]: SplitAllocationBody,
    [TabItems.match]: MatchTransactionBody,
    [TabItems.transfer]: TransferMoneyBody,
  }[activeTabId];

  const contentProps = {
    [TabItems.allocate]: splitAllocationProps.contentProps,
    [TabItems.match]: matchTransactionProps.contentProps,
    [TabItems.transfer]: transferMoneyProps.contentProps,
  }[activeTabId];

  const footerProps = {
    [TabItems.allocate]: {
      onSave: splitAllocationProps.footerProps.onSaveSplitAllocation,
      onCancel: splitAllocationProps.footerProps.onCancelSplitAllocation,
      onUnmatch: splitAllocationProps.footerProps.onUnallocateTransaction,
      onCreateRule: splitAllocationProps.footerProps.onOpenBankingRuleModal,
    },
    [TabItems.match]: {
      onSave: matchTransactionProps.footerProps.onSaveMatchTransaction,
      onCancel: matchTransactionProps.footerProps.onCancelMatchTransaction,
      onUnmatch: matchTransactionProps.footerProps.onUnmatchTransaction,
      onCreateRule: matchTransactionProps.footerProps.onOpenBankingRuleModal,
    },
    [TabItems.transfer]: {
      onSave: transferMoneyProps.footerProps.onSaveMatchTransferMoney,
      onCancel: transferMoneyProps.footerProps.onCancelTransferMoney,
      onUnmatch: transferMoneyProps.footerProps.onUnallocateTransaction,
      onOpenTransferMoneyModal:
        transferMoneyProps.footerProps.onOpenTransferMoneyModal,
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
      onFocusTransactionLine={onFocusTransactionLine}
      onEntryHover={onEntryHover}
      onBlur={onBlur}
      onAllocate={onAllocate}
      index={index}
      isExpanded={index === openPosition}
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

const mapStateToProps = (state) => ({
  entries: getBankTableData(state),
  activeTabId: getOpenEntryActiveTabId(state),
  openPosition: getOpenPosition(state),
  isOpenEntryLoading: getIsOpenEntryLoading(state),
});

export default connect(mapStateToProps)(BankTransactionTableBody);
