import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const InvalidAbnModal = ({ onCancel, title, body }) => (
  <Modal title={title} size="small" onCancel={onCancel} canClose={false}>
    <Modal.Body>{body || 'Invalid or empty ABN'}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default InvalidAbnModal;
