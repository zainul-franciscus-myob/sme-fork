import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const onConfirmClick = (handler, payItemId) => () => {
  handler(payItemId);
};

const PayrollLeaveDetailModal = ({
  payItem: { payItemId, name },
  onCancel,
  onConfirm,
}) => (
  <Modal title="Remove pay item" size="small" onCancel={onCancel}>
    <Modal.Body>
      <p>{`You are about to remove '${name}' from this employee. All 'Carry over', 'Year-to-date' and 'Totals', will be re-set to zero.`}</p>
      <p>Are you sure you want to remove it?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="delete" onClick={onConfirmClick(onConfirm, payItemId)}>
        Remove
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PayrollLeaveDetailModal;
