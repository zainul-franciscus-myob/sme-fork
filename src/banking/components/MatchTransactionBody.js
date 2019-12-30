import {
  Button, FieldGroup, Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getShowAdjustmentTable } from '../bankingSelectors/matchTransactionSelectors';
import MatchTransactionAdjustments from './MatchTransactionAdjustments';
import MatchTransactionOptions from './MatchTransactionOptions';
import MatchTransactionTable from './MatchTransactionTable';
import MatchTransactionTotals from './MatchTransactionTotals';
import styles from './MatchTransactionBody.module.css';

const MatchTransactionBody = ({
  onApplyMatchTransactionOptions,
  onUpdateMatchTransactionOptions,
  onSortMatchTransactions,
  onUpdateMatchTransactionSelection,
  onUpdateSelectedTransactionDetails,
  onToggleSelectAllState,
  onAddAdjustment,
  onUpdateAdjustment,
  onRemoveAdjustment,
  onExpandAdjustmentSection,
  showAdjustmentTable,
}) => {
  const adjustmentTable = (
    <FieldGroup label="Add adjustments or roundings">
      {
        <MatchTransactionAdjustments
          onAddAdjustment={onAddAdjustment}
          onUpdateAdjustment={onUpdateAdjustment}
          onRemoveAdjustment={onRemoveAdjustment}
        />
      }
    </FieldGroup>
  );

  const addAdjustmentButton = (
    <div className={styles.adjustmentButton}>
      <Button type="link" icon={<Icons.Add />} onClick={onExpandAdjustmentSection}>Add adjustment</Button>
    </div>
  );

  return (
    <div className={styles.matchTransactionBody}>
      <FieldGroup label="Find and select existing matching transactions">
        <MatchTransactionOptions
          onApplyMatchTransactionOptions={onApplyMatchTransactionOptions}
          onUpdateMatchTransactionOptions={onUpdateMatchTransactionOptions}
        />
        <MatchTransactionTable
          onSortMatchTransactions={onSortMatchTransactions}
          onToggleSelectAllState={onToggleSelectAllState}
          onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
          onUpdateSelectedTransactionDetails={onUpdateSelectedTransactionDetails}
        />
      </FieldGroup>
      {
        showAdjustmentTable ? adjustmentTable : addAdjustmentButton
      }
      <MatchTransactionTotals />
    </div>
  );
};

const mapStateToProps = state => ({
  showAdjustmentTable: getShowAdjustmentTable(state),
});

export default connect(mapStateToProps)(MatchTransactionBody);
