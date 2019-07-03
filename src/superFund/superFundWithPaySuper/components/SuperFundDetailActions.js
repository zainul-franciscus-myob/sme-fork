import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAbnLoading,
  getIsCreating,
  getIsSubmitting,
} from '../SuperFundWithPaySuperSelectors';

const SuperFundActions = ({
  listeners: {
    onSaveButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
  },
  isSubmitting,
  isCreating,
  isAbnLoading,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isSubmitting}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting || isAbnLoading}>
        Save
      </Button>,
    ]}
    secondary={[
      !isCreating && (
        <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isSubmitting}>
          Delete
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
  isCreating: getIsCreating(state),
  isAbnLoading: getIsAbnLoading(state),
});

export default connect(mapStateToProps)(SuperFundActions);
