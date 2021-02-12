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
  getIsPreConversion,
  getIsReadOnly,
  getShowExportPdfButton,
} from '../selectors/billSelectors';
import { getShowPrefillRecurringButton } from '../selectors/recurringBillSelectors';
import SaveActionType from '../types/SaveActionType';

const BillActions = ({
  isCreating,
  isBlocking,
  isReadOnly,
  isForeignCurrency,
  showExportPdfButton,
  showPrefillRecurringButton,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onExportPdfButtonClick,
  onRecordPaymentClick,
  onPrefillFromRecurringButtonClick,
  isPreConversion,
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

  const recordPaymentButton = (
    <Button
      key="recordPayment"
      name="recordPayment"
      type="secondary"
      onClick={onRecordPaymentClick}
      disabled={isBlocking}
    >
      Record payment
    </Button>
  );

  const prefillButton = (
    <Button
      key="prefill"
      name="prefill"
      type="secondary"
      onClick={onPrefillFromRecurringButtonClick}
      disabled={isBlocking}
    >
      Prefill from recurring
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
          !isCreating && !isForeignCurrency && recordPaymentButton,
          showExportPdfButton && exportPdfButton,
        ]}
      />
    );
  }

  if (isPreConversion) {
    return (
      <ButtonRow
        primary={[cancelButton, saveButton]}
        secondary={[
          !isCreating && deleteButton,
          !isCreating && separator,
          !isCreating && recordPaymentButton,
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
        !isCreating && recordPaymentButton,
        exportPdfButton,
        showPrefillRecurringButton && prefillButton,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
  isForeignCurrency: getIsForeignCurrency(state),
  showExportPdfButton: getShowExportPdfButton(state),
  isPreConversion: getIsPreConversion(state),
  showPrefillRecurringButton: getShowPrefillRecurringButton(state),
});

export default connect(mapStateToProps)(BillActions);
