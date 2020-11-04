import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const PreviousStepModal = ({
  onGoBack,
  onDiscard,
  title = 'Discard pay run?',
  description = 'This unfinished pay run will be lost if you continue. Go back if you want to save your changes.',
}) => (
  <Modal title={title} size="small" onCancel={onGoBack}>
    <Modal.Body>{description}</Modal.Body>
    <Modal.Footer>
      <Button name="goBack" type="secondary" onClick={onGoBack}>
        Go back
      </Button>
      <Button name="discard" type="delete" onClick={onDiscard}>
        Discard
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PreviousStepModal;
