import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const DateMismatchModal = ({ onGoBackButtonClick, onContinueButtonClick }) => (
  <Modal title="Date of payment" onCancel={onGoBackButtonClick}>
    <Modal.Body>
      The date of payment specified is not today&apos;s date. Your bank will
      have strict guidelines on processing payments dated in the future or the
      past and may reject this payment. Do you want to continue?
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-go-back-btn"
        id="modal-go-back-btn"
        type="secondary"
        onClick={onGoBackButtonClick}
      >
        Go back
      </Button>
      <Button
        key="modal-continue-btn"
        id="modal-continue-btn"
        type="primary"
        onClick={onContinueButtonClick}
      >
        Continue
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DateMismatchModal;
