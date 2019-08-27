import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAreButtonsDisabled, getIsCreating } from '../invoiceItemSelectors';

const InvoiceItemActions = ({
  isCreating,
  onSaveButtonClick,
  onSaveAndEmailButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  areButtonsDisabled,
  onPayInvoiceButtonClick,
}) => {
  const recordPaymentButton = (
    <Button key="payInvoice" name="payInvoice" type="secondary" onClick={onPayInvoiceButtonClick}>
      Record payment
    </Button>
  );

  const saveAndEmailButton = (
    <Button
      key="saveAndEmail"
      name="saveAndEmail"
      type="secondary"
      onClick={onSaveAndEmailButtonClick}
      disabled={areButtonsDisabled}
    >
    Save and email
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
      primary={[!isCreating && recordPaymentButton, saveAndEmailButton, cancelButton, saveButton]}
      secondary={[!isCreating && deleteButton]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  areButtonsDisabled: getAreButtonsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceItemActions);
