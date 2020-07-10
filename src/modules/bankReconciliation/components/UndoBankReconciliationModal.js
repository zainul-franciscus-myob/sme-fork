import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UndoBankReconciliationModal = ({ onCancel, onConfirm }) => (
  <Modal title="Undo last reconciliation?" size="small" onCancel={onCancel}>
    <Modal.Body>
      <p>
        By undoing, all transactions for that period return to an unreconciled
        status.
      </p>
      <p>
        This cannot be undone. Do you want to undo the last reconciliation for
        this account?
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        No, keep
      </Button>
      <Button type="delete" onClick={onConfirm}>
        Yes, undo reconciliation
      </Button>
    </Modal.Footer>
  </Modal>
);

export default UndoBankReconciliationModal;
