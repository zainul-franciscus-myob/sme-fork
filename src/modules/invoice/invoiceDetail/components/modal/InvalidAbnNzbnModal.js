import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvalidAbnNzbnModalText } from '../../selectors/eInvoiceSelectors';

const InvalidAbnNzbnModal = ({ onCancel, title, body }) => (
  <Modal title={title} size="small" onCancel={onCancel} canClose={false}>
    <Modal.Body>{body || 'Invalid or empty ABN'}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  ...getInvalidAbnNzbnModalText(state),
});

export default connect(mapStateToProps)(InvalidAbnNzbnModal);
