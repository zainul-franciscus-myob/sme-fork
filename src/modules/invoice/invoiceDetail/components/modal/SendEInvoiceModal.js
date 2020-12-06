import { Alert, Modal, Separator, SubHeadingGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSendEInvoiceOptions } from '../../selectors/eInvoiceSelectors';
import Button from '../../../../../components/Button/Button';
import styles from './SendEInvoiceModal.module.css';

const SendEInvoiceModal = ({
  abn,
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
    <Alert type="info" className={styles.alertModal}>
      <h4>Just a few things you should know:</h4>
      <ul>
        <li>You can&apos;t edit e-invoices after sending.</li>
        <li>
          E-invoice delivery confirmation depends on your customer&apos;s system
          and won&apos;t be instant.
        </li>
      </ul>
    </Alert>
  );

  const invoiceDetails = (
    <div className={styles.subHeadingGroup}>
      <h3>Invoice details</h3>
      <div className={styles.subHeadingContainer}>
        <SubHeadingGroup size="md" subHeading="ABN">
          <p>{abn}</p>
        </SubHeadingGroup>
        <SubHeadingGroup
          size="md"
          subHeading="Customer"
          className={styles.customerName}
        >
          <p>{customerName}</p>
        </SubHeadingGroup>
        <SubHeadingGroup size="md" subHeading="Issue Date">
          <p>{issueDate}</p>
        </SubHeadingGroup>
        <SubHeadingGroup size="md" subHeading="Invoice No.">
          <p>{invoiceNumber}</p>
        </SubHeadingGroup>
        <SubHeadingGroup
          size="md"
          subHeading="Balance Due"
          className={styles.balanceDue}
        >
          <p>{amountDue}</p>
        </SubHeadingGroup>
      </div>
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
