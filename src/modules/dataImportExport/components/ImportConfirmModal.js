import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const ImportConfirmModal = ({
  onCancelImportData,
  onConfirmImportData,
}) => (
  <Modal
    title="Import data?"
    size="small"
    onCancel={onCancelImportData}
  >
    <Modal.Body>
      The import cannot be undone. Are you sure you want to import?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancelImportData}>Go back</Button>
      <Button type="primary" onClick={onConfirmImportData}>Import</Button>
    </Modal.Footer>
  </Modal>
);

export default ImportConfirmModal;
