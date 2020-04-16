import {
  Button, ButtonRow, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled, getIsCreating, getIsReadOnlyLayout } from '../selectors/QuoteDetailSelectors';
import SaveActionType from '../SaveActionType';

const QuoteDetailActions = ({
  isCreating,
  isReadOnlyLayout,
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

  const backButton = (
    <Button
      key="back"
      name="back"
      type="primary"
      onClick={onCancelButtonClick}
    >
      Go back
    </Button>
  );

  if (isReadOnlyLayout) {
    return (
      <ButtonRow
        primary={[
          backButton,
        ]}
      />);
  }

  return (
    <ButtonRow
      primary={[
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
        !isCreating && (
          <Separator key="separator" direction="vertical" />
        ),
        !isCreating && (
          <Button
            key="convertToInvoice"
            name="convertToInvoice"
            type="secondary"
            onClick={onConvertToInvoiceButtonClick}
            disabled={isActionsDisabled}
          >
            Convert to invoice
          </Button>
        ),
        <Button
          key="exportPdf"
          name="exportPdf"
          type="secondary"
          onClick={onExportPdfButtonClick}
          disabled={isActionsDisabled}
        >
          View PDF
        </Button>,
        <Button
          key="saveAndEmail"
          name="saveAndEmail"
          type="secondary"
          onClick={onSaveAndEmailButtonClick}
          disabled={isActionsDisabled}
        >
          Email quote
        </Button>,
      ]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(QuoteDetailActions);
