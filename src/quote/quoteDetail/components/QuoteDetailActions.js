import { Button, ButtonRow, Separator } from '@myob/myob-widgets';
import React from 'react';

const QuoteDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConvertToInvoiceButtonClick,
}) => (
  <ButtonRow
    primary={[
      !isCreating && (
        <Button
          key="convertToInvoice"
          name="convertToInvoice"
          type="secondary"
          onClick={onConvertToInvoiceButtonClick}
          disabled={isActionsDisabled}
        >
        Convert to invoice
        </Button>),
      !isCreating && (
        <Separator key="separator" direction="vertical" />
      ),
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={isActionsDisabled}
      >
        Cancel
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        onClick={onSaveButtonClick}
        disabled={isActionsDisabled}
      >
        Save
      </Button>,
    ]}
    secondary={[
      !isCreating && (
        <Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isActionsDisabled}
        >
          Delete
        </Button>
      ),
    ]}
  />
);

export default QuoteDetailActions;
