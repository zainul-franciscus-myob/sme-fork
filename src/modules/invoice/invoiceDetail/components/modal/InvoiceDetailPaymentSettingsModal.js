import { Alert, Button, Modal } from '@myob/myob-widgets';
import React from 'react';

import InvoiceOnlinePaymentOptions from '../InvoiceOnlinePaymentOptions';

const InvoiceDetailPaymentSettingsModal = ({
  alert,
  onCancel,
  onDismissAlert,
  onEditPreferences,
  onSetupPaymentOptions,
  onSubscribeNow,
}) => (
  <Modal title="Invoice payment options" onCancel={onCancel}>
    <Modal.Body>
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}

      <InvoiceOnlinePaymentOptions
        onEditPreferences={onEditPreferences}
        onSetupPaymentOptions={onSetupPaymentOptions}
        onSubscribeNow={onSubscribeNow}
      />
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
