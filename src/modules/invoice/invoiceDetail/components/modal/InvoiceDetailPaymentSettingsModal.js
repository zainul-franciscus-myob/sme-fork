import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const InvoiceDetailPaymentSettingsModal = ({ onCancel }) => (
  <Modal title="Default modal" onCancel={onCancel}>
    <Modal.Body>
      <h3>Table heading</h3>
      <p>
        Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies
        vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="primary" onClick={() => {}}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

export default InvoiceDetailPaymentSettingsModal;
