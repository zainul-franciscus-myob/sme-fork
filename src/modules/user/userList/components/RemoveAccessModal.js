import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRemoveAccessModalBody } from '../userListSelectors';

const RemoveAccessModal = ({ onCancel, onConfirm, modalBody }) => (
  <Modal title="Remove access?" size="small" onCancel={onCancel}>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button type="delete" onClick={onConfirm}>
        Remove
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state, props) => ({
  modalBody: getRemoveAccessModalBody(state, props),
});

export default connect(mapStateToProps)(RemoveAccessModal);
