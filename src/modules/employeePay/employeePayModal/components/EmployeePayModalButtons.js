import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import DeleteButtonWithPopover from './DeleteButtonWithPopover';

const EmployeePayModalButtons = ({
  deletePopoverIsOpen,
  onDeletePopoverDelete,
  onDeletePopoverCancel,
  onDeleteButtonClick,
  onBackButtonClick,
  onReverseButtonClick,
  onRecordReversalButtonClick,
  onCancelReversalButtonClick,
  showReverse,
  loadingSuccess,
  isReversalPreview,
  isReadonly,
}) => {
  const reversalPreviewButtons = <ButtonRow primary={[
      <Button key="modal-record-reverse-back-btn" type="secondary" onClick={onCancelReversalButtonClick}>Cancel</Button>,
      <Button key="modal-record-reverse-btn" testid="modal-record-reverse-btn" onClick={onRecordReversalButtonClick}>Record reversal</Button>,
  ]}
  />;

  return (isReversalPreview ? reversalPreviewButtons
    : <ButtonRow
      secondary={[
        !isReadonly && loadingSuccess && showReverse && <Button
          key="modal-preview-reverse-btn"
          testid="modal-preview-reverse-btn"
          id="modal-reverse-btn"
          type="secondary"
          onClick={onReverseButtonClick}
        >
          Reverse Pay
        </Button>,
        !isReadonly && loadingSuccess && !showReverse && <DeleteButtonWithPopover
          key="delete"
          testid="employee-pay-modal-delete-btn"
          title="Delete employee's pay transaction"
          bodyText="This can't be undone, or recovered later."
          onDelete={onDeletePopoverDelete}
          onCancel={onDeletePopoverCancel}
          isOpen={deletePopoverIsOpen}
          openHandler={onDeleteButtonClick}
        />,
      ]}
      primary={[
        <Button
          key="modal-go-back-btn"
          id="modal-go-back-btn"
          type="secondary"
          onClick={onBackButtonClick}
        >
          Go back
        </Button>,
      ]}
    />
  );
};

export default EmployeePayModalButtons;
