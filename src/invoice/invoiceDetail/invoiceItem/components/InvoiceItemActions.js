import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAreButtonsDisabled, getIsCreating } from '../invoiceItemSelectors';

const InvoiceItemActions = ({
  isCreating,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  areButtonsDisabled,
}) => {
  const cancelButton = (
    <Button
      key="cancel"
      name="cancel"
      type="secondary"
      onClick={onCancelButtonClick}
      disabled={areButtonsDisabled}
    >
    Cancel
    </Button>
  );

  const saveButton = (
    <Button
      key="save"
      name="save"
      type="primary"
      onClick={onSaveButtonClick}
      disabled={areButtonsDisabled}
    >
    Save
    </Button>
  );

  const deleteButton = (
    <Button
      key="delete"
      name="delete"
      type="secondary"
      onClick={onDeleteButtonClick}
      disabled={areButtonsDisabled}
    >
      Delete
    </Button>
  );

  return (
    <ButtonRow
      primary={[cancelButton, saveButton]}
      secondary={[!isCreating && deleteButton]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  areButtonsDisabled: getAreButtonsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceItemActions);
