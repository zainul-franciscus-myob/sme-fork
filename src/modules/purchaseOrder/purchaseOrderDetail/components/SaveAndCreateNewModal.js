import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBlocking } from '../selectors/purchaseOrderSelectors';
import { getSaveAndCreateNewModalBody } from '../selectors/PurchaseOrderSaveSelectors';

const SaveAndCreateNewModal = ({
  isBlocking,
  modalBody,
  onConfirmSaveAndCreateNewButtonClick,
  onCancel,
}) => (
  <Modal title="Save and create new" size="small" onCancel={onCancel}>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isBlocking}>
        Go back
      </Button>
      <Button
        type="primary"
        onClick={onConfirmSaveAndCreateNewButtonClick}
        disabled={isBlocking}
      >
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  isBlocking: getIsBlocking(state),
  modalBody: getSaveAndCreateNewModalBody(state),
});

export default connect(mapStateToProps)(SaveAndCreateNewModal);
