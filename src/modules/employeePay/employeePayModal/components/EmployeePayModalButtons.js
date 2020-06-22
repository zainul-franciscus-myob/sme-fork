import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import DeleteButtonWithPopover from './DeleteButtonWithPopover';

const EmployeePayModalButtons = ({
  deletePopoverIsOpen,
  onDeletePopoverDelete,
  onDeletePopoverCancel,
  onDeleteButtonClick,
  onBackButtonClick,
  showReverse,
  loadingSuccess,
}) => (
  <ButtonRow
    secondary={[
      loadingSuccess && showReverse && <Button
        key="modal-reverse-btn"
        id="modal-reverse-btn"
        type="secondary"
      >
        Reverse Pay
      </Button>,
      loadingSuccess && !showReverse && <DeleteButtonWithPopover
        key="delete"
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

export default EmployeePayModalButtons;
