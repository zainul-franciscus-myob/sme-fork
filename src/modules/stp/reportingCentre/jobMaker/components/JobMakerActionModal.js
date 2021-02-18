import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const JobMakerActionModal = ({
  onCloseModal,
  onConfirmAction,
  title,
  actionButtonLabel,
  body,
}) => {
  return (
    <Modal title={title} onCancel={onCloseModal}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          testid="jobmaker-action-modal-cancel-btn"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          testid="jobmaker-action-modal-action-btn"
          onClick={onConfirmAction}
        >
          {actionButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobMakerActionModal;
