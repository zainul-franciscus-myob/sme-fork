import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating, getIsSubmitting } from '../payRefundSelectors';

const PayRefundActions = ({
  isCreating,
  isSubmitting,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
}) => {
  const cancelButton = (
    <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isSubmitting}>
      Cancel
    </Button>
  );

  const saveButton = (
    <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting}>
    Save
    </Button>
  );

  const deleteButton = (
    <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isSubmitting}>
      Delete
    </Button>
  );

  return (
    <ButtonRow
      primary={[
        cancelButton,
        isCreating ? saveButton : undefined,
      ]}
      secondary={[
        isCreating ? undefined : deleteButton,
      ]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(PayRefundActions);
