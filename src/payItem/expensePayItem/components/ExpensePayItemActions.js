import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating, getIsSubmitting } from '../ExpensePayItemSelectors';

const ExpensePayItemActions = ({
  isCreating,
  isSubmitting,
  onSaveButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={isSubmitting}
      >
        Cancel
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        onClick={onSaveButtonClick}
        disabled={isSubmitting}
      >
        Save
      </Button>,
    ]}
    secondary={!isCreating ? [
      <Button
        key="delete"
        name="delete"
        type="secondary"
        onClick={onDeleteButtonClick}
        disabled={isSubmitting}
      >
        Delete
      </Button>,
    ] : []}
  />
);

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(ExpensePayItemActions);
