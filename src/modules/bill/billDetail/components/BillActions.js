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
  getIsBlocking,
  getIsCreating,
  getIsReadOnly,
  getShowExportPdfButton,
} from '../selectors/billSelectors';
import SaveActionType from '../types/SaveActionType';

const BillActions = ({
  isCreating,
  isBlocking,
  isReadOnly,
  showExportPdfButton,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onExportPdfButtonClick,
  onCreatePaymentClick,
}) => {
  const exportPdfButton = (
    <Button
      key="exportPdf"
      name="exportPdf"
      type="secondary"
      onClick={onExportPdfButtonClick}
      disabled={isBlocking}
    >
      View PDF
    </Button>
  );

  const separator = <Separator key="separator" direction="vertical" />;

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
        <Dropdown.Toggle disabled={isBlocking}>
          Save and new
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
      disabled={isBlocking}
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
      disabled={isBlocking}
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
      disabled={isBlocking}
    >
      Delete
    </Button>
  );

  const createPaymentButton = (
    <Button
      key="createPayment"
      name="createPayment"
      type="secondary"
      onClick={onCreatePaymentClick}
      disabled={isBlocking}
    >
      Create payment
    </Button>
  );

  const backButton = (
    <Button
      key="back"
      name="back"
      type="primary"
      onClick={onCancelButtonClick}
      disabled={isBlocking}
    >
      Go back
    </Button>
  );

  if (isReadOnly) {
    return (
      <ButtonRow
        primary={[backButton]}
        secondary={[
          !isCreating && createPaymentButton,
          showExportPdfButton && exportPdfButton,
        ]}
      />
    );
  }

  return (
    <ButtonRow
      primary={[cancelButton, saveAndButton, saveButton]}
      secondary={[
        !isCreating && deleteButton,
        !isCreating && separator,
        !isCreating && createPaymentButton,
        exportPdfButton,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
  showExportPdfButton: getShowExportPdfButton(state),
});

export default connect(mapStateToProps)(BillActions);
