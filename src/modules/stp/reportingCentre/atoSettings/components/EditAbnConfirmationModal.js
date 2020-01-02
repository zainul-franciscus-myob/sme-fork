import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const EditAbnConfirmationModal = ({
  onCancel,
  onConfirm,
}) => (
  <Modal
    title="Edit STP business details?"
    size="medium"
    onCancel={onCancel}
  >
    <Modal.Body>
      To update your STP settings you&apos;ll need to go through the setup process again.
      Don&apos;t worry, nothing will be changed until you finish the process.
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="delete" onClick={onConfirm}>Edit STP business details</Button>
    </Modal.Footer>
  </Modal>
);

export default EditAbnConfirmationModal;
