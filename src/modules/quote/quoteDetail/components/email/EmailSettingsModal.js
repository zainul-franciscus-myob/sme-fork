import { Alert, Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const EmailSettingsModal = ({
  alert,
  title,
  description,
  onCancel,
  onConfirm,
  onDismissAlert,
}) => (
  <Modal title={title} size="small" onCancel={onCancel}>
    <Modal.Body>
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button type="primary" onClick={onConfirm}>
        Go to Invoice and quote settings
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EmailSettingsModal;
