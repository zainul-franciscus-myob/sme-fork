import {
  Button, ButtonRow, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import React from 'react';

import SaveActionType from '../SaveActionType';

const QuoteDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConvertToInvoiceButtonClick,
  onExportPdfButtonClick,
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
    // @TODO temporarily hide export pdf button
    false && !isCreating
    && (
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_EXPORT_PDF}
      label="Save and export PDF"
      value={SaveActionType.SAVE_AND_EXPORT_PDF}
    />
    ),
  ];

  return (
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
        // @TODO temporarily hide export pdf button
        false && !isCreating && (
        <Button
          key="exportPdf"
          name="exportPdf"
          type="secondary"
          onClick={onExportPdfButtonClick}
          disabled={isActionsDisabled}
        >
          Export PDF
        </Button>
        ),
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
        />,
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
};

export default QuoteDetailActions;
