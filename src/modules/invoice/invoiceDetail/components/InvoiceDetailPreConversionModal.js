import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getConversionMonthYear } from '../selectors/invoiceDetailSelectors';

const InvoiceDetailPreConversionModal = ({
  onConfirm,
  onCancel,
  conversionMonthYear,
}) => (
  <Modal
    title="Convert to historical invoice?"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      <p>
        Invoice dated before your opening balance month will not automatically
        update account balances. Remember to include the invoice amount in the
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

export default connect(mapStateToProps)(InvoiceDetailPreConversionModal);
