import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const CancelModal = ({
  onCancel, onConfirm, title, description,
}) => (
  <Modal
    title={title}
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="delete" onClick={onConfirm}>Discard</Button>
    </Modal.Footer>
  </Modal>
);

CancelModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CancelModal;
