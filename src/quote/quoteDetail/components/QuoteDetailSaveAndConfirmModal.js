import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const QuoteDetailSaveAndConfirmModal = ({
  title,
  description,
  onConfirmSave,
  onCancel,
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
      <Button type="primary" onClick={onConfirmSave}>Save</Button>
    </Modal.Footer>
  </Modal>
);

export default QuoteDetailSaveAndConfirmModal;
