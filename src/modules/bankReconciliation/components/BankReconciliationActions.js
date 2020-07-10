import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionDisabled } from '../BankReconciliationSelectors';

const BankReconciliationActions = ({
  isActionsDisabled,
  onReconcileButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="reconcile"
        name="reconcile"
        type="primary"
        onClick={onReconcileButtonClick}
        disabled={isActionsDisabled}
      >
        Reconcile
      </Button>,
    ]}
  />
);

const mapStateToProps = (state) => ({
  isActionsDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(BankReconciliationActions);
