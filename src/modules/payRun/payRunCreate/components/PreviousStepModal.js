import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const PreviousStepModal = ({
  onCancel,
  onGoBack,
  title = 'Continue without saving?',
  description = 'Any changes you\'ve made on this page will be lost if you continue without saving. Go back if you want to save your changes.',
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
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="primary" onClick={onGoBack}>Continue without saving</Button>
    </Modal.Footer>
  </Modal>
);

export default PreviousStepModal;
