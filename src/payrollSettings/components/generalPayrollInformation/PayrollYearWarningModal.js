import { Button, Modal } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const PayrollYearWarningModal = ({
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
      <Button type="secondary" onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm}>Save</Button>
    </Modal.Footer>
  </Modal>
);

PayrollYearWarningModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PayrollYearWarningModal;
