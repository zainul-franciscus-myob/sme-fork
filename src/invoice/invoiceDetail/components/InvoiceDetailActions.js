import {
  Button, ButtonRow, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled, getIsCreating } from '../selectors/invoiceDetailSelectors';
import SaveActionType from '../SaveActionType';

const InvoiceDetailActions = ({
  isCreating,
  isActionsDisabled,
  listeners: {
    onSaveButtonClick,
    onSaveAndButtonClick,
    onSaveAndEmailButtonClick,
    onPayInvoiceButtonClick,
    onExportPdfButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
  },
}) => {
  const recordPaymentButton = (
    <Button
      key="payInvoice"
      name="payInvoice"
      type="secondary"
      onClick={onPayInvoiceButtonClick}
      disabled={isActionsDisabled}
    >
      Record payment
    </Button>
  );

  const exportPdfButton = (
    <Button
      key="exportPdf"
      name="exportPdf"
      type="secondary"
      onClick={onExportPdfButtonClick}
      disabled={isActionsDisabled}
    >
      Export PDF
    </Button>
  );

  const saveAndEmailButton = (
    <Button
      key="saveAndEmail"
      name="saveAndEmail"
      type="secondary"
      onClick={onSaveAndEmailButtonClick}
      disabled={isActionsDisabled}
    >
    Record and email
    </Button>
  );

  const separator = (<Separator key="separator" direction="vertical" />);

  const dropdownActionItems = [
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_CREATE_NEW}
      label="Record and create new"
      value={SaveActionType.SAVE_AND_CREATE_NEW}
    />,
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_DUPLICATE}
      label="Record and duplicate"
      value={SaveActionType.SAVE_AND_DUPLICATE}
    />,
  ];

  const saveAndButton = (
    <Dropdown
      key="saveAnd"
      onSelect={onSaveAndButtonClick}
      toggle={(
        <Dropdown.Toggle disabled={isActionsDisabled}>
            Record and...
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
      disabled={isActionsDisabled}
    >
    Record
    </Button>
  );

  const cancelButton = (
    <Button
      key="cancel"
      name="cancel"
      type="secondary"
      onClick={onCancelButtonClick}
      disabled={isActionsDisabled}
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
      disabled={isActionsDisabled}
    >
      Delete
    </Button>
  );

  return (
    <ButtonRow
      primary={[
        recordPaymentButton,
        exportPdfButton,
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
