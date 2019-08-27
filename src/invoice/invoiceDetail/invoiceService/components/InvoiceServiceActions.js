import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../invoiceServiceSelectors';


const InvoiceServiceActions = ({
  isCreating,
  isActionsDisabled,
  onCancelButtonClick,
  onSaveButtonClick,
  onSaveAndEmailButtonClick,
  onDeleteButtonClick,
  onPayInvoiceButtonClick,
}) => (
  <ButtonRow
    primary={[
      (!isCreating
        && (
        <Button key="payInvoice" name="payInvoice" type="secondary" onClick={onPayInvoiceButtonClick} disabled={isActionsDisabled}>
          Record payment
        </Button>
        )),
      <Button key="saveAndEmail" name="saveAndEmail" type="secondary" onClick={onSaveAndEmailButtonClick} disabled={isActionsDisabled}>
        Save and email
      </Button>,
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isActionsDisabled}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isActionsDisabled}>
        Save
      </Button>,
    ]}
    secondary={[
      !isCreating && (
        <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isActionsDisabled}>
          Delete
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceServiceActions);
