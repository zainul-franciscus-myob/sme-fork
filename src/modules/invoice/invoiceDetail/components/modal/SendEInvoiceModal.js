import { Alert, Modal, Separator, SubHeadingGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSendEInvoiceOptions } from '../../selectors/eInvoiceSelectors';
import Button from '../../../../../components/Button/Button';
import styles from './SendEInvoiceModal.module.css';

const SendEInvoiceModal = ({
  alert,
  amountDue,
  customerName,
  invoiceNumber,
  issueDate,
  onCloseModal,
  onDismissAlert,
  onSendEInvoice,
}) => {
  const infoBlock = (
    <Alert type="info">
      You can&apos;t edit e-invoices after sending.
      <br />
      E-invoice delivery confirmation depends on your customer&apos;s system and
      won&apos;t be instant.
    </Alert>
  );

  const invoiceDetails = (
    <div className={styles.subHeadingGroup}>
      <SubHeadingGroup size="md" subHeading="Issue Date">
        <p>{issueDate}</p>
      </SubHeadingGroup>
      <SubHeadingGroup size="md" subHeading="Invoice No.">
        <p>{invoiceNumber}</p>
      </SubHeadingGroup>
      <SubHeadingGroup size="md" subHeading="Customer">
        <p>{customerName}</p>
      </SubHeadingGroup>
      <SubHeadingGroup
        size="md"
        subHeading="Balance Due"
        className={styles.balanceDue}
      >
        <p>{amountDue}</p>
      </SubHeadingGroup>
    </div>
  );

  return (
    <Modal size="medium" title="Send e-invoice" onCancel={onCloseModal}>
      <Modal.Body>
        {alert && (
          <Alert type={alert.type} onDismiss={onDismissAlert}>
            {alert.message}
          </Alert>
        )}
        {infoBlock}
        {invoiceDetails}
        <Separator direction="horizontal" />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="primary" onClick={onSendEInvoice}>
          Send e-invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => getSendEInvoiceOptions(state);

export default connect(mapStateToProps)(SendEInvoiceModal);
