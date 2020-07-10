import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAbnLoading,
  getIsCreating,
  getIsSMSFSuperFund,
  getIsSubmitting,
  getIsSuperFundEditable,
} from '../SuperFundWithPaySuperSelectors';

const SuperFundActions = ({
  listeners: { onSaveButtonClick, onCancelButtonClick, onDeleteButtonClick },
  isSubmitting,
  isCreating,
  isAbnLoading,
  isSuperFundEditable,
  isUpdateSMSFSuperFund,
}) => (
  <ButtonRow
    primary={[
      !isUpdateSMSFSuperFund && (
        <Button
          key="cancel"
          name="cancel"
          type="secondary"
          onClick={onCancelButtonClick}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      ),
      !isUpdateSMSFSuperFund && (
        <Button
          key="save"
          name="save"
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isSubmitting || isAbnLoading || !isSuperFundEditable}
        >
          Save
        </Button>
      ),
      isUpdateSMSFSuperFund && (
        <Button
          key="goback"
          name="goback"
          type="primary"
          onClick={onCancelButtonClick}
          disabled={isSubmitting}
        >
          Go back
        </Button>
      ),
    ]}
    secondary={[
      !isCreating && !isUpdateSMSFSuperFund && (
        <Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isSubmitting}
        >
          Delete
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = (state) => ({
  isSubmitting: getIsSubmitting(state),
  isCreating: getIsCreating(state),
  isAbnLoading: getIsAbnLoading(state),
  isSuperFundEditable: getIsSuperFundEditable(state),
  isUpdateSMSFSuperFund: getIsSMSFSuperFund(state) && !getIsCreating(state),
});

export default connect(mapStateToProps)(SuperFundActions);
