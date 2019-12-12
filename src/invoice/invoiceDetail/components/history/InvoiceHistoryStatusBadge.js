import {
  Badge,
} from '@myob/myob-widgets';
import React from 'react';

import InvoiceHistoryStatus from '../../InvoiceHistoryStatus';
import InvoiceHistoryStatusPretty from '../../InvoiceHistoryStatusPretty';
import styles from './InvoiceHistoryStatusBadge.module.css';


const statusColor = (status) => {
  switch (status) {
    case (InvoiceHistoryStatus.PAYMENT_DECLINED):
      return 'red';
    case (InvoiceHistoryStatus.BULK_PAYMENT_DECLINED):
      return 'red';
    case (InvoiceHistoryStatus.DELIVERY_FAILED):
      return 'red';
    case (InvoiceHistoryStatus.PAYMENT_RECEIVED):
      return 'green';
    default:
      return 'light-grey';
  }
};

const InvoiceHistoryStatusBadge = ({ status }) => (
  <div className={styles.badge}>
    <Badge color={statusColor(status)}>
      {InvoiceHistoryStatusPretty[status]}
    </Badge>
  </div>
);
export default InvoiceHistoryStatusBadge;
