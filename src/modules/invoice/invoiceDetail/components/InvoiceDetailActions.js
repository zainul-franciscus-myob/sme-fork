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
  getIsCreating,
  getIsForeignCurrency,
  getIsPreConversion,
  getIsReadOnly,
  getIsSubmitting,
} from '../selectors/invoiceDetailSelectors';
import {
  getShouldShowSaveAsRecurring,
  getShowPrefillRecurringButton,
} from '../selectors/recurringInvoiceSelectors';
import { getShowEInvoiceButton } from '../selectors/eInvoiceSelectors';
import { getShowEmailButton } from '../selectors/emailSelectors';
import { getShowExportPdfButton } from '../selectors/exportPdfSelectors';
import SaveActionType from '../types/SaveActionType';
import styles from './InvoiceDetailActions.module.css';

const InvoiceDetailActions = ({
  isCreating,
  isSubmitting,
  isReadOnly,
  isPreConversion,
  showEmailButton,
  showEInvoiceButton,
  showExportPdfButton,
  showSaveAsRecurring,
  showPrefillRecurringButton,
  listeners: {
    onSaveButtonClick,
    onSaveAsRecurringButtonClick,
    onSaveAndButtonSelect,
    onSaveAndButtonClick,
    onSaveAndEmailButtonClick,
    onSaveAndSendEInvoiceClick,
    onPayInvoiceButtonClick,
    onExportPdfButtonClick,
    onPrefillButtonClick,
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

  const saveAndSendEInvoiceButton = (
    <Button
      key="saveAndSendEInvoice"
      name="saveAndSendEInvoice"
      type="secondary"
      onClick={onSaveAndSendEInvoiceClick}
      disabled={isSubmitting}
    >
      Send e-invoice
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
      name="saveAndDuplicate"
      label="Save and duplicate"
      value={SaveActionType.SAVE_AND_DUPLICATE}
    />,
  ];

  const saveAndButton = (
    <Dropdown
      key="saveAnd"
      onSelect={onSaveAndButtonSelect}
      toggle={
        <Dropdown.Toggle disabled={isSubmitting}>
          <button
            onClick={onSaveAndButtonClick}
            className={styles.buttonWrapper}
            type="button"
            name="saveAndAction"
          >
            Save and...
            <Icons.Caret />
          </button>
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
      disabled={isSubmitting}
    >
      Save
    </Button>
  );

  const saveAsRecurringButton = (
    <Button
      key="saveAsRecurring"
      name="saveAsRecurring"
      type="secondary"
      onClick={onSaveAsRecurringButtonClick}
      disabled={isSubmitting}
    >
      Save as recurring
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

  const prefillButton = (
    <Button
      key="prefill"
      name="prefill"
      type="secondary"
      onClick={onPrefillButtonClick}
      disabled={isSubmitting}
    >
      Prefill from recurring
    </Button>
  );

  const separator = <Separator direction="vertical" />;

  if (isReadOnly) {
    return (
      <ButtonRow
        primary={[backButton]}
        secondary={[
          recordPaymentButton && !getIsForeignCurrency,
          showExportPdfButton && exportPdfButton,
          showEmailButton && saveAndEmailButton,
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
        saveAndEmailButton,
        showEInvoiceButton && saveAndSendEInvoiceButton,
        showSaveAsRecurring && saveAsRecurringButton,
        showPrefillRecurringButton && prefillButton,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
  showEmailButton: getShowEmailButton(state),
  showExportPdfButton: getShowExportPdfButton(state),
  showSaveAsRecurring: getShouldShowSaveAsRecurring(state),
  isForeignCurrency: getIsForeignCurrency(state),
  showEInvoiceButton: getShowEInvoiceButton(state),
  showPrefillRecurringButton: getShowPrefillRecurringButton(state),
});

export default connect(mapStateToProps)(InvoiceDetailActions);
