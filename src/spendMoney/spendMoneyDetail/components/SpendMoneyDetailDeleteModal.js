import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteModal = ({ onCancel, onConfirm }) => (
  <Modal
    title="Delete transaction"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      Are you sure you want delete this spend money transaction?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>No, go back</Button>
      <Button type="delete" onClick={onConfirm}>Yes, Delete</Button>
    </Modal.Footer>
  </Modal>
);

DeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteModal;
