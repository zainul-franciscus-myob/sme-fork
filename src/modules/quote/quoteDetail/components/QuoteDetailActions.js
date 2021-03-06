import {
  Button,
  ButtonRow,
  Dropdown,
  Icons,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
  getIsReadOnly,
  getShowExportPdfButton,
} from '../selectors/QuoteDetailSelectors';
import { getShowEmailButton } from '../selectors/EmailSelectors';
import SaveActionType from '../SaveActionType';

const QuoteDetailActions = ({
  isCreating,
  isReadOnly,
  isActionsDisabled,
  showExportPdfButton,
  showEmailButton,
  listeners: {
    onSaveButtonClick,
    onSaveAndButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
    onConvertToInvoiceButtonClick,
    onExportPdfButtonClick,
    onSaveAndEmailButtonClick,
  },
}) => {
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
      toggle={
        <Dropdown.Toggle disabled={isActionsDisabled}>
          Save and...
          <Icons.Caret />
        </Dropdown.Toggle>
      }
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
      Save
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

  const backButton = (
    <Button key="back" name="back" type="primary" onClick={onCancelButtonClick}>
      Go back
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

  const convertToInvoiceButton = (
    <Button
      key="convertToInvoice"
      name="convertToInvoice"
      type="secondary"
      onClick={onConvertToInvoiceButtonClick}
      disabled={isActionsDisabled}
    >
      Convert to invoice
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
      View PDF
    </Button>
  );

  const emailButton = (
    <Button
      key="saveAndEmail"
      name="saveAndEmail"
      type="secondary"
      onClick={onSaveAndEmailButtonClick}
      disabled={isActionsDisabled}
    >
      Email quote
    </Button>
  );

  if (isReadOnly) {
    return (
      <ButtonRow
        primary={[backButton]}
        secondary={[
          showExportPdfButton && exportPdfButton,
          showEmailButton && emailButton,
        ]}
      />
    );
  }

  return (
    <ButtonRow
      primary={[cancelButton, saveAndButton, saveButton]}
      secondary={[
        !isCreating && deleteButton,
        !isCreating && <Separator key="separator" direction="vertical" />,
        !isCreating && convertToInvoiceButton,
        showExportPdfButton && exportPdfButton,
        showEmailButton && emailButton,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
  isReadOnly: getIsReadOnly(state),
  showExportPdfButton: getShowExportPdfButton(state),
  showEmailButton: getShowEmailButton(state),
});

export default connect(mapStateToProps)(QuoteDetailActions);
