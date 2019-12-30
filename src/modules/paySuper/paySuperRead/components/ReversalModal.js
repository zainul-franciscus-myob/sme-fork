import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const ReversalModal = ({
  onCancelButtonClick,
  onReverseButtonClick,
}) => (
  <Modal title="Authorise payment" onCancel={onCancelButtonClick}>
    <Modal.Body>
      <p>
        This will only reverse the transaction in MYOB.
        If it&apos;s already been authorised and processed,
        the funds will still be withdrawn from your account and
        deposited into your employees&apos; super funds.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-cancel-btn"
        id="modal-cancel-btn"
        type="secondary"
        testId="reversalCancelButton"
        onClick={onCancelButtonClick}
      >
        Cancel
      </Button>
      <Button
        key="modal-reverse-btn"
        id="modal-reverse-btn"
        type="primary"
        testId="reversalConfirmButton"
        onClick={onReverseButtonClick}
      >
        Reverse transaction
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ReversalModal;
