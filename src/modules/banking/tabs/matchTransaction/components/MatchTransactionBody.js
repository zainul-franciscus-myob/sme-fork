import { Button, FieldGroup, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSelectedText,
  getShowAdjustmentTable,
} from '../matchTransactionSelectors';
import MatchTransactionAdjustments from './MatchTransactionAdjustments';
import MatchTransactionOptions from './MatchTransactionOptions';
import MatchTransactionTable from './MatchTransactionTable';
import MatchTransactionTotals from './MatchTransactionTotals';
import styles from './MatchTransactionBody.module.css';

const MatchTransactionBody = ({
  renderMatchTransactionContactCombobox,
  onAddAccount,
  onAddJob,
  onUpdateMatchTransactionOptions,
  onSortMatchTransactions,
  onUpdateMatchTransactionSelection,
  onUpdateSelectedTransactionDetails,
  onResetMatchTransactionOptions,
  onToggleSelectAllState,
  onAddAdjustment,
  onUpdateAdjustment,
  onRemoveAdjustment,
  onExpandAdjustmentSection,
  showAdjustmentTable,
  tableFooterLabel,
}) => {
  const adjustmentTable = (
    <FieldGroup label="Add adjustments or roundings">
      {
        <MatchTransactionAdjustments
          onAddAccount={onAddAccount}
          onAddJob={onAddJob}
          onAddAdjustment={onAddAdjustment}
          onUpdateAdjustment={onUpdateAdjustment}
          onRemoveAdjustment={onRemoveAdjustment}
        />
      }
    </FieldGroup>
  );

  const addAdjustmentButton = (
    <Button
      className={styles.adjustmentButton}
      type="link"
      icon={<Icons.Add />}
      onClick={onExpandAdjustmentSection}
    >
      Add adjustment
    </Button>
  );

  return (
    <>
      <MatchTransactionOptions
        renderMatchTransactionContactCombobox={
          renderMatchTransactionContactCombobox
        }
        onUpdateMatchTransactionOptions={onUpdateMatchTransactionOptions}
        onResetMatchTransactionOptions={onResetMatchTransactionOptions}
      />
      <MatchTransactionTable
        onSortMatchTransactions={onSortMatchTransactions}
        onToggleSelectAllState={onToggleSelectAllState}
        onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
        onUpdateSelectedTransactionDetails={onUpdateSelectedTransactionDetails}
      />
      <div className={styles.tableFooter}>
        <div>{tableFooterLabel}</div>
        {!showAdjustmentTable && addAdjustmentButton}
      </div>
      {showAdjustmentTable && adjustmentTable}
      <MatchTransactionTotals />
    </>
  );
};

const mapStateToProps = (state) => ({
  showAdjustmentTable: getShowAdjustmentTable(state),
  tableFooterLabel: getSelectedText(state),
});

export default connect(mapStateToProps)(MatchTransactionBody);
