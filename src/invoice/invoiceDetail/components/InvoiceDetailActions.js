import {
  Button, ButtonRow, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled, getIsCreating } from '../selectors/invoiceDetailSelectors';
import SaveActionType from '../SaveActionType';

const InvoiceDetailActions = ({
  isCreating,
  areButtonsDisabled,
  listeners: {
    onSaveButtonClick,
    onSaveAndButtonClick,
    onSaveAndEmailButtonClick,
    onPayInvoiceButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
  },
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

  const separator = (<Separator key="separator" direction="vertical" />);

  const dropdownActionItems = [
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_CREATE_NEW}
      label="Save and create new"
      value={SaveActionType.SAVE_AND_CREATE_NEW}
    />,
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_DUPLICATE}
      label="Save and duplicate"
      value={SaveActionType.SAVE_AND_DUPLICATE}
    />,
  ];

  const saveAndButton = (
    <Dropdown
      key="saveAnd"
      onSelect={onSaveAndButtonClick}
      toggle={(
        <Dropdown.Toggle>
            Save and...
          <Icons.Caret />
        </Dropdown.Toggle>
        )}
      items={dropdownActionItems}
    />
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
      primary={[
        recordPaymentButton,
        saveAndEmailButton,
        separator,
        cancelButton,
        saveAndButton,
        saveButton,
      ]}
      secondary={[!isCreating && deleteButton]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceDetailActions);
