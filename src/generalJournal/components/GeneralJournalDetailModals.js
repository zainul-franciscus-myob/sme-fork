import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

export const CancelModal = ({ onCancel, onConfirm }) => (
  <Modal
    title="Cancel general journal alterations"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      Are you sure you want to cancel the alterations in this general journal entry?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>No, go back</Button>
      <Button type="delete" onClick={onConfirm}>Yes, Cancel</Button>
    </Modal.Footer>
  </Modal>
);

export const DeleteModal = ({ onCancel, onConfirm }) => (
  <Modal
    title="Delete general journal entry"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      Are you sure you want to delete this general journal entry?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>No, cancel</Button>
      <Button type="delete" onClick={onConfirm}>Yes, Delete</Button>
    </Modal.Footer>
  </Modal>
);

CancelModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

DeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
