import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const PreviousStepModal = ({
  onCancel,
  onGoBack,
  title = 'Confirmation',
  description = 'Are you sure you want to go to the previous step?',
}) => (
  <Modal
    title={title}
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Cancel</Button>
      <Button type="primary" onClick={onGoBack}>Go back</Button>
    </Modal.Footer>
  </Modal>
);

export default PreviousStepModal;
