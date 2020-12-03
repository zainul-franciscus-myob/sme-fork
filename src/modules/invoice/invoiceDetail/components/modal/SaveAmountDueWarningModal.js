import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting } from '../../selectors/invoiceDetailSelectors';
import { getSaveAmountDueWarningModalBody } from '../../selectors/invoiceSaveSelectors';

const SaveAmountDueWarningModal = ({
  onConfirm,
  onCancel,
  modalBody,
  isActionDisabled,
}) => (
  <Modal title="Save invoice?" size="small" onCancel={onCancel}>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>
        Go back
      </Button>
      <Button type="primary" onClick={onConfirm} disabled={isActionDisabled}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  modalBody: getSaveAmountDueWarningModalBody(state),
  isActionDisabled: getIsSubmitting(state),
});

export default connect(mapStateToProps)(SaveAmountDueWarningModal);
