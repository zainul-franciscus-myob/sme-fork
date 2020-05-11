import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const ImportConfirmModal = ({
  onCancelImportData,
  onConfirmImportData,
  deleteUnusedAccounts,
}) => {
  const modalBody = deleteUnusedAccounts
    ? 'This import cannot be undone. Existing accounts that haven\'t been used in transactions will be deleted.'
    : 'The import cannot be undone. Are you sure you want to import?';

  return (
    <Modal
      title="Import data?"
      size="small"
      onCancel={onCancelImportData}
    >
      <Modal.Body>
        {modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancelImportData}>Go back</Button>
        <Button type="primary" onClick={onConfirmImportData}>Import</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportConfirmModal;
