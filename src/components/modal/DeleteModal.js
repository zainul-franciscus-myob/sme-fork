import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteModal = ({
  onCancel, onConfirm, title, description,
}) => (
  <Modal
    title={title}
    size="small"
    onCancel={onCancel}
    canClose={false}
  >
    <Modal.Body>
      {description}
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DeleteModal;
