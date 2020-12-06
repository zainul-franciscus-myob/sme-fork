import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getIsReadOnly,
  getIsSubmitting,
} from '../selectors/RecurringInvoiceSelectors';

const RecurringInvoiceActions = ({
  isCreating,
  isSubmitting,
  isReadOnly,
  listeners: { onSaveButtonClick, onCancelButtonClick, onDeleteButtonClick },
}) => {
  const saveButton = (
    <Button
      key="save"
      name="save"
      type="primary"
      onClick={onSaveButtonClick}
      disabled={isSubmitting}
    >
      Save
    </Button>
  );

  const cancelButton = (
    <Button
      key="cancel"
      name="cancel"
      type="secondary"
      onClick={onCancelButtonClick}
      disabled={isSubmitting}
    >
      Cancel
    </Button>
  );

  const backButton = (
    <Button
      key="back"
      name="back"
      type="primary"
      onClick={onCancelButtonClick}
      disabled={isSubmitting}
    >
      Go back
    </Button>
  );

  const deleteButton = (
    <Button
      key="delete"
      name="delete"
      type="secondary"
      onClick={onDeleteButtonClick}
      disabled={isSubmitting}
    >
      Delete
    </Button>
  );

  if (isReadOnly) {
    return <ButtonRow primary={[backButton]} />;
  }

  return (
    <ButtonRow
      primary={[cancelButton, saveButton]}
      secondary={[!isCreating && deleteButton]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(RecurringInvoiceActions);
