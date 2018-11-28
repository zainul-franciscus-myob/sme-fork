import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const CancelModal = ({ onCancel, onConfirm }) => (
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

CancelModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CancelModal;
