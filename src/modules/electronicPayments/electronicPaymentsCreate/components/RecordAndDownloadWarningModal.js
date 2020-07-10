import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const RecordAndDownloadWarningModal = ({
  onCancelButtonClick,
  onRecordButtonClick,
}) => (
  <Modal title="Record and download" onCancel={onCancelButtonClick}>
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

export default RecordAndDownloadWarningModal;
