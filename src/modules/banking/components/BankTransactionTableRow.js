import { Button, Checkbox, Icons, Spinner, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getBankEntryByIndexSelector,
  getIsEditingNote,
  getIsFocused,
  getIsHovering,
  getIsSubmittingNote,
  getPendingNote,
  getShouldShowNote,
} from '../bankingSelectors';
import { getIsCheckboxDisabled } from '../bankingSelectors/bulkActionSelectors';
import ClearableTextArea from '../../../components/ClearableTextArea/ClearableTextArea';
import MatchedOrAllocated from './MatchedOrAllocated';
import handleTextAreaChange from '../../../components/handlers/handleTextAreaChange';
import styles from './BankTransactionTable.module.css';

const onCheckboxChange = (handler, index) => (e) => {
  const { checked } = e.target;
  handler({ index, value: checked });
};

const handleClearTextArea = (handler) => () => handler({ value: '' });

const handleRowEvent = (handler, index) => () => handler(index);

const BankingTableRowField = ({ title, children, className }) => (
  <div className={className}>
    <span className={styles.label}>
      <strong>{title}</strong>
    </span>
    {children}
  </div>
);

const BankingTableDescription = ({
  isExpanded,
  shouldShowNote,
  description,
  note,
  className,
  onEditNote,
  onPendingNoteChange,
  onNoteBlur,
  isEditingNote,
  pendingNote,
}) => {
  const editingView = (
    <ClearableTextArea
      name="note"
      autoFocus
      autoSize
      placeholder={description}
      value={pendingNote}
      rows={1}
      maxLength={255}
      onChange={handleTextAreaChange(onPendingNoteChange)}
      onBlur={onNoteBlur}
      onClear={handleClearTextArea(onPendingNoteChange)}
    />
  );

  const noteExpandView = (
    <Tooltip
      className={styles.noteLink}
      triggerContent={<span className={styles.note}>{note}</span>}
    >
      {description}
    </Tooltip>
  );

  const noteCollapseView = (
    <button type="button" className={styles.noteLink} onClick={onEditNote}>
      <Tooltip triggerContent={<span className={styles.note}>{note}</span>}>
        {description}
      </Tooltip>
    </button>
  );

  const noteView = isExpanded ? noteExpandView : noteCollapseView;

  const descriptionView = shouldShowNote ? (
    noteView
  ) : (
    <span className={styles.note}>{description}</span>
  );

  const readOnlyView = (
    <>
      {descriptionView}
      {!isExpanded && (
        <Tooltip
          triggerContent={
            <button
              type="button"
              className={styles.editIcon}
              onClick={onEditNote}
            >
              <Icons.Edit />
            </button>
          }
        >
          Edit description
        </Tooltip>
      )}
    </>
  );

  const view = isEditingNote ? editingView : readOnlyView;

  return (
    <div
      className={classNames(styles.noteContainer, className, {
        [styles.noteHighlight]: shouldShowNote,
      })}
    >
      {view}
    </div>
  );
};

const BankTransactionTableRow = ({
  index,
  entry,
  shouldShowNote,
  isEditingNote,
  isSubmittingNote,
  pendingNote,
  onEditNote,
  onPendingNoteChange,
  onNoteBlur,
  onAddAccount,
  onHeaderClick,
  onSplitRowItemClick,
  onMatchRowItemClick,
  onAllocate,
  onMatchedToBlur,
  onMatchedToFocus,
  onUnmatchedFocus,
  onEntryHover,
  onUnmatchedBlur,
  isExpanded,
  isSelected,
  isHovering,
  isFocused,
  isCheckboxDisabled,
  onSelectTransaction,
  children,
}) => {
  const matchedOrAllocatedRowItem = (
    <MatchedOrAllocated
      entry={entry}
      index={index}
      isExpanded={isExpanded}
      isHovering={isHovering}
      isFocused={isFocused}
      onAddAccount={onAddAccount}
      onSplitRowItemClick={onSplitRowItemClick}
      onMatchRowItemClick={onMatchRowItemClick}
      onAllocate={onAllocate}
      onMatchedToBlur={onMatchedToBlur}
      onMatchedToFocus={onMatchedToFocus}
      onUnmatchedFocus={onUnmatchedFocus}
      onEntryHover={onEntryHover}
      onUnmatchedBlur={onUnmatchedBlur}
    />
  );

  const expandIcon = isExpanded ? <Icons.UpChevron /> : <Icons.DownChevron />;

  const amount = entry.deposit ? `$${entry.deposit}` : `-$${entry.withdrawal}`;

  const spinnerView = <Spinner size="small" />;

  const descriptionView = (
    <BankingTableDescription
      isExpanded={isExpanded}
      description={entry.description}
      note={entry.note}
      onEditNote={handleRowEvent(onEditNote, index)}
      onPendingNoteChange={onPendingNoteChange}
      onNoteBlur={onNoteBlur}
      isEditingNote={isEditingNote}
      pendingNote={pendingNote}
      shouldShowNote={shouldShowNote}
    />
  );

  const desktopInfoColumn = (
    <div className={styles.infoColumn}>
      <BankingTableRowField
        title="Date:"
        className={classNames(styles.column, styles.date)}
      >
        {entry.displayDate}
      </BankingTableRowField>
      <div className={styles.description}>
        {isSubmittingNote ? spinnerView : descriptionView}
        <BankingTableRowField
          title="Withdrawal"
          className={styles.withdrawalOrDeposit}
        >
          {entry.withdrawal}
        </BankingTableRowField>
        <BankingTableRowField
          title="Deposit"
          className={styles.withdrawalOrDeposit}
        >
          {entry.deposit}
        </BankingTableRowField>
      </div>
    </div>
  );

  const mobileInfoColumn = (
    <div className={styles.mobileInfoColumn}>
      <BankingTableDescription
        className={styles.mobileDescription}
        isExpanded={isExpanded}
        description={entry.description}
        note={entry.note}
        onEditNote={handleRowEvent(onEditNote, index)}
        onPendingNoteChange={onPendingNoteChange}
        onNoteBlur={onNoteBlur}
        isEditingNote={isEditingNote}
        pendingNote={pendingNote}
        shouldShowNote={shouldShowNote}
      />
      <div className={styles.description}>
        <BankingTableRowField className={styles.date}>
          {entry.displayDate}
        </BankingTableRowField>
        <BankingTableRowField className={styles.amount}>
          {amount}
        </BankingTableRowField>
      </div>
    </div>
  );

  const tableRowClassName = classNames(styles.row, {
    [styles.expanded]: isExpanded,
    [styles.selected]: isSelected,
  });

  const columnsClassName = classNames(styles.columns, {
    [styles.expandedHeader]: isExpanded,
  });

  return (
    <div className={tableRowClassName}>
      <div className={columnsClassName}>
        <div className={styles.selectionColumn}>
          <Checkbox
            name={`${index}-select`}
            label={`Select row ${index}`}
            hideLabel
            onChange={onCheckboxChange(onSelectTransaction, index)}
            checked={entry.selected}
            disabled={isCheckboxDisabled}
          />
        </div>
        {mobileInfoColumn}
        {desktopInfoColumn}
        <div
          className={classNames(
            styles.allocationColumn,
            styles.allocationColumnTableRow
          )}
        >
          <div
            className={styles.allocationAndTaxCode}
            onMouseEnter={() => onEntryHover(index, true)}
            onMouseLeave={() => onEntryHover(index, false)}
          >
            {matchedOrAllocatedRowItem}
            <div className={styles.taxCode}>{entry.taxCode}</div>
          </div>
          <div className={styles.action}>
            <Button
              type="secondary"
              size="xs"
              onClick={handleRowEvent(onHeaderClick, index)}
            >
              {expandIcon}
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const makeMapRowStateToProps = () => {
  const getBankEntryByIndex = getBankEntryByIndexSelector();
  return (state, ownProps) => {
    const isEditingNote = getIsEditingNote(state, ownProps.index);
    const isSubmittingNote = getIsSubmittingNote(state, ownProps.index);
    const pendingNote = isEditingNote && getPendingNote(state);
    const shouldShowNote = getShouldShowNote(state, ownProps.index);
    const entry = getBankEntryByIndex(state, ownProps);
    const isCheckboxDisabled = getIsCheckboxDisabled(state, ownProps.index);
    const isHovering = getIsHovering(state, ownProps.index);
    const isFocused = getIsFocused(state, ownProps.index);

    return {
      entry,
      isHovering,
      isFocused,
      isCheckboxDisabled,
      isEditingNote,
      isSubmittingNote,
      pendingNote,
      shouldShowNote,
    };
  };
};

export default connect(makeMapRowStateToProps)(BankTransactionTableRow);
