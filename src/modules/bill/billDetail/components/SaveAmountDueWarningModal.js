import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBlocking } from '../selectors/billSelectors';
import { getSaveAmountDueWarningModalBody } from '../selectors/BillSaveSelectors';

const SaveAmountDueWarningModal = ({
  isBlocking,
  onConfirm,
  onCancel,
  modalBody,
}) => (
  <Modal title="Save bill?" size="small" onCancel={onCancel}>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isBlocking}>
        Go back
      </Button>
      <Button type="primary" onClick={onConfirm} disabled={isBlocking}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  modalBody: getSaveAmountDueWarningModalBody(state),
  isBlocking: getIsBlocking(state),
});

export default connect(mapStateToProps)(SaveAmountDueWarningModal);
