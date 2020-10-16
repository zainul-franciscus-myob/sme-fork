import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCanDelete,
  getIsActionsDisabled,
  getIsCreating,
  getIsRemittanceAdviceEnabled,
} from '../BillPaymentDetailSelectors';

const BillPaymentActions = ({
  onSaveButtonClick,
  onRemittanceAdviceClick,
  isRemittanceAdviceEnabled,
  onCancelButtonClick,
  onDeleteButtonClick,
  isActionsDisabled,
  canDelete,
  isCreating,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={isActionsDisabled}
      >
        Cancel
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        onClick={onSaveButtonClick}
        disabled={isActionsDisabled}
      >
        Save
      </Button>,
    ]}
    secondary={[
      canDelete && (
        <Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isActionsDisabled}
        >
          Delete
        </Button>
      ),
      isRemittanceAdviceEnabled && !isCreating && (
        <Button
          key="sendRemittanceAdviceEmail"
          name="sendRemittanceAdvice"
          type="secondary"
          onClick={onRemittanceAdviceClick}
        >
          Send Remittance
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = (state) => ({
  isActionsDisabled: getIsActionsDisabled(state),
  canDelete: getCanDelete(state),
  isCreating: getIsCreating(state),
  isRemittanceAdviceEnabled: getIsRemittanceAdviceEnabled(state),
});

export default connect(mapStateToProps)(BillPaymentActions);
