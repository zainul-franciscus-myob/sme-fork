import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBlocking } from '../selectors/purchaseOrderSelectors';
import { getSaveAndDuplicateModalBody } from '../selectors/PurchaseOrderSaveSelectors';

const SaveAndDuplicateModal = ({
  onConfirmSaveAndDuplicateButtonClick,
  onCancel,
  isBlocking,
  modalBody,
}) => (
  <Modal title="Save and duplicate" size="small" onCancel={onCancel}>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isBlocking}>
        Go back
      </Button>
      <Button
        type="primary"
        onClick={onConfirmSaveAndDuplicateButtonClick}
        disabled={isBlocking}
      >
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  isBlocking: getIsBlocking(state),
  modalBody: getSaveAndDuplicateModalBody(state),
});

export default connect(mapStateToProps)(SaveAndDuplicateModal);
