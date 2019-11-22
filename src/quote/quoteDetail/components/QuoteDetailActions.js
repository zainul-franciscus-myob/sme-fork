import {
  Button, ButtonRow, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled, getIsCreating } from '../selectors/QuoteDetailSelectors';
import SaveActionType from '../SaveActionType';

const QuoteDetailActions = ({
  isCreating,
  isActionsDisabled,
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
        <Button
          key="exportPdf"
          name="exportPdf"
          type="secondary"
          onClick={onExportPdfButtonClick}
          disabled={isActionsDisabled}
        >
          Export PDF
        </Button>,
        <Button
          key="saveAndEmail"
          name="saveAndEmail"
          type="secondary"
          onClick={onSaveAndEmailButtonClick}
          disabled={isActionsDisabled}
        >
          Save and email
        </Button>,
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
            <Dropdown.Toggle disabled={isActionsDisabled}>
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

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(QuoteDetailActions);
