import {
  Button,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

import ModalType from '../ModalType';

const RecordAndCreateFileModal = ({
  modal: { type = '' },
  onCancelButtonClick,
  onRecordButtonClick,
  onContinueButtonClick,
}) => {
  if (type === ModalType.DATE_MISMATCH) {
    return (
      <Modal title="Date of payment" onCancel={onCancelButtonClick}>
        <Modal.Body>
          The date of payment specified is not today&#39;s date.
          Your bank will have strict guidelines on processing payments dated
          in the future or the past and may reject this payment.
          Do you want to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button
            key="modal-go-back-btn"
            id="modal-go-back-btn"
            type="secondary"
            onClick={onCancelButtonClick}
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
  }
  return (
    <Modal title="Record transaction &amp; create bank file" onCancel={onCancelButtonClick}>
      <Modal.Body>
        This transaction will be recorded immediately, and the bank file created.
      </Modal.Body>
      <Modal.Footer>
        <Button
          key="modal-cancel-btn"
          id="modal-cancel-btn"
          type="secondary"
          onClick={onCancelButtonClick}
        >
          Cancel
        </Button>
        <Button
          key="modal-record-btn"
          id="modal-record-btn"
          type="primary"
          onClick={onRecordButtonClick}
        >
          Record and download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RecordAndCreateFileModal;
