import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteModal = ({ onCancel, onConfirm, isButtonsDisabled }) => (
  <Modal
    title="Delete transaction"
    size="small"
    onCancel={onCancel}
    canClose={false}
  >
    <Modal.Body>
      Are you sure you want delete this spend money transaction?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isButtonsDisabled}>No, go back</Button>
      <Button type="delete" onClick={onConfirm} disabled={isButtonsDisabled}>Yes, Delete</Button>
    </Modal.Footer>
  </Modal>
);

DeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isButtonsDisabled: PropTypes.bool.isRequired,
};

export default DeleteModal;
