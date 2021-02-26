import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getModalTitle } from '../taxCombineSelectors';

const TaxCombineModal = ({ onCancel, onConfirm, title }) => (
  <Modal title={title} size="small" onCancel={onCancel}>
    <Modal.Body>This can’t be undone, or recovered later.</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button onClick={onConfirm}>Combine</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  title: getModalTitle(state),
});

export default connect(mapStateToProps)(TaxCombineModal);
