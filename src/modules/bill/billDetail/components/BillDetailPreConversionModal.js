import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getConversionMonthYear } from '../selectors/billSelectors';

const BillDetailPreConversionModal = ({
  onConfirm,
  onCancel,
  conversionMonthYear,
}) => (
  <Modal title="Convert to historical bill?" size="small" onCancel={onCancel}>
    <Modal.Body>
      <p>
        Bill dated before your opening balance month will not automatically
        update account balances. Remember to include the bill amount in the
        respective account&apos;s opening balance.
      </p>
      <p>
        Opening balance month: <strong>{conversionMonthYear}</strong>
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="primary" onClick={onConfirm}>
        Convert
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  conversionMonthYear: getConversionMonthYear(state),
});

export default connect(mapStateToProps)(BillDetailPreConversionModal);
