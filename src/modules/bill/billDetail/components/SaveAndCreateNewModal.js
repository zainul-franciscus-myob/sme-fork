import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBlocking } from '../selectors/billSelectors';

const SaveAndCreateNewModal = ({
  isBlocking,
  onConfirmSaveAndCreateNewButtonClick,
  onCancel,
}) => (
  <Modal
    title="Save and create new"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
This will save your current bill and create a new bill.
This means you will no longer be able to change the supplier.
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isBlocking}>Go back</Button>
      <Button type="primary" onClick={onConfirmSaveAndCreateNewButtonClick} disabled={isBlocking}>Save</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  isBlocking: getIsBlocking(state),
});

export default connect(mapStateToProps)(SaveAndCreateNewModal);
