import {
  Button, ButtonRow, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating, getIsPreConversion, getIsReadOnly, getIsSubmitting,
} from '../selectors/invoiceDetailSelectors';
import SaveActionType from '../types/SaveActionType';

const InvoiceDetailActions = ({
  isCreating,
  isSubmitting,
  isReadOnly,
  isPreConversion,
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
  const recordPaymentText = isCreating ? 'Record payment' : 'Create payment';
  const recordPaymentButton = (
    <Button
      key="payInvoice"
      name="payInvoice"
      type="secondary"
      onClick={onPayInvoiceButtonClick}
      disabled={isSubmitting}
    >
      {recordPaymentText}
    </Button>
  );

  const exportPdfButton = (
    <Button
      key="exportPdf"
      name="exportPdf"
      type="secondary"
      onClick={onExportPdfButtonClick}
      disabled={isSubmitting}
    >
      View PDF
    </Button>
  );

  const saveAndEmailButton = (
    <Button
      key="saveAndEmail"
      name="saveAndEmail"
      type="secondary"
      onClick={onSaveAndEmailButtonClick}
      disabled={isSubmitting}
    >
      Email invoice
    </Button>
  );

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
        <Dropdown.Toggle disabled={isSubmitting}>
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

  const separator = <Separator direction="vertical" />;

  if (isReadOnly) {
    return (
      <ButtonRow
        primary={[
          backButton,
        ]}
        secondary={[
          recordPaymentButton,
        ]}
      />);
  }

  if (isPreConversion) {
    return (
      <ButtonRow
        primary={[
          cancelButton,
          saveButton,
        ]}
        secondary={[
          !isCreating && deleteButton,
          !isCreating && separator,
          !isCreating && recordPaymentButton,
        ]}
      />);
  }

  return (
    <ButtonRow
      primary={[
        cancelButton,
        saveAndButton,
        saveButton,
      ]}
      secondary={[
        !isCreating && deleteButton,
        !isCreating && separator,
        !isCreating && recordPaymentButton,
        exportPdfButton,
        saveAndEmailButton,
      ]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(InvoiceDetailActions);
