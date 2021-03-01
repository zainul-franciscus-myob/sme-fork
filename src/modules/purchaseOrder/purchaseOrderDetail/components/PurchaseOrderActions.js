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
  getIsForeignCurrency,
  getIsReadOnly,
  getShowExportPdfButton,
} from '../selectors/purchaseOrderSelectors';
import { getShowEmailButton } from '../selectors/EmailSelectors';
import SaveActionType from '../types/SaveActionType';

const PurchaseOrderActions = ({
  isCreating,
  isBlocking,
  isReadOnly,
  isForeignCurrency,
  // eslint-disable-next-line no-unused-vars
  showEmailButton,
  showExportPdfButton,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onExportPdfButtonClick,
  onConvertToBillButtonClick,
  onSaveAndEmailButtonClick,
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

  const convertToBillButton = (
    <Button
      key="convertToBill"
      name="convertToBill"
      type="secondary"
      onClick={onConvertToBillButtonClick}
      disabled={false}
    >
      Convert to bill
    </Button>
  );

  // eslint-disable-next-line no-unused-vars
  const emailButton = (
    <Button
      key="saveAndEmail"
      name="saveAndEmail"
      type="secondary"
      onClick={onSaveAndEmailButtonClick}
      disabled={isBlocking}
    >
      Email purchase order
    </Button>
  );

  if (isReadOnly) {
    return (
      <ButtonRow
        primary={[backButton]}
        secondary={[
          !isCreating && !isForeignCurrency,
          showExportPdfButton && exportPdfButton,
          // TODO Enable email after ARL release; 2021.2
          // showEmailButton && emailButton,
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
        !isCreating && convertToBillButton,
        exportPdfButton,
        // TODO Enable email after ARL release; 2021.2
        // emailButton,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
  isForeignCurrency: getIsForeignCurrency(state),
  showEmailButton: getShowEmailButton(state),
  showExportPdfButton: getShowExportPdfButton(state),
});

export default connect(mapStateToProps)(PurchaseOrderActions);
