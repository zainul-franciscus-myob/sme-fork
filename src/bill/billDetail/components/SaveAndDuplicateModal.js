import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBlocking } from '../selectors/billSelectors';

const SaveAndDuplicateModal = ({
  onConfirmSaveAndDuplicateButtonClick,
  onCancel,
  isBlocking,
}) => (
  <Modal
    title="Save and duplicate"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      {"This will save your current bill and create a new bill with the same information. This means you'll no longer be able to change the supplier."}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isBlocking}>Go back</Button>
      <Button type="primary" onClick={onConfirmSaveAndDuplicateButtonClick} disabled={isBlocking}>Save</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  isBlocking: getIsBlocking(state),
});

export default connect(mapStateToProps)(SaveAndDuplicateModal);
