import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getInvoiceHistoryTable } from '../../selectors/invoiceHistorySelectors';
import InvoiceHistoryStatus from '../../types/InvoiceHistoryStatus';
import InvoiceHistoryStatusPretty from '../../types/InvoiceHistoryStatusPretty';
import styles from './InvoiceHistoryTable.module.css';

const iconAndStatusClassName = (status) =>
  classNames({
    [styles.errorIcon]: [
      InvoiceHistoryStatus.PAYMENT_DECLINED,
      InvoiceHistoryStatus.BULK_PAYMENT_DECLINED,
      InvoiceHistoryStatus.DELIVERY_FAILED,
    ].includes(status),
    [styles.dollarIcon]: status === 'PAYMENT_RECEIVED',
  });

const icon = {
  [InvoiceHistoryStatus.CREATED]: <Icons.Invoice />,
  [InvoiceHistoryStatus.VIEWED_ONLINE]: <Icons.Show />,
  [InvoiceHistoryStatus.DOWNLOADED]: <Icons.Download />,
  [InvoiceHistoryStatus.PRINTED]: <Icons.PrintEd />,
  [InvoiceHistoryStatus.EXPORTED_TO_PDF]: <Icons.GenericDocument />,
  [InvoiceHistoryStatus.PAID_ONLINE]: <Icons.CashMoney />,
  [InvoiceHistoryStatus.PAID_IN_BULK_ONLINE]: <Icons.CashMoney />,
  [InvoiceHistoryStatus.PAYMENT_DECLINED]: <Icons.Error />,
  [InvoiceHistoryStatus.BULK_PAYMENT_DECLINED]: <Icons.Error />,
  [InvoiceHistoryStatus.PAYMENT_RECEIVED]: <Icons.Dollar />,
  [InvoiceHistoryStatus.CREDIT_APPLIED]: <Icons.Dollar />,
  [InvoiceHistoryStatus.INVOICE_REVERSED]: <Icons.Replied />,
  [InvoiceHistoryStatus.EMAILED]: <Icons.Mail />,
  [InvoiceHistoryStatus.DELIVERY_FAILED]: <Icons.Error />,
};

const InvoiceHistoryTable = ({ invoiceHistory, onClickOnRefNo }) => (
  <Table>
    <Table.Body>
      {invoiceHistory &&
        invoiceHistory.map((row) => (
          <Table.Row key={row.id}>
            <Table.RowItem
              width="25rem"
              title={InvoiceHistoryStatusPretty[row.status]}
              className={classNames(
                styles.icons,
                iconAndStatusClassName(row.status)
              )}
            >
              {icon[row.status]}
              <span>{InvoiceHistoryStatusPretty[row.status]}</span>
            </Table.RowItem>
            <Table.RowItem title={row.description} textWrap="wrap">
              {row.showLink && (
                <Button
                  type="link"
                  onClick={() => onClickOnRefNo(row)}
                  className={styles.refLink}
                >
                  {row.referenceNo}
                </Button>
              )}
              {row.description}
            </Table.RowItem>

            <Table.RowItem width="11rem" title={row.displayDate}>
              {row.displayDate}
            </Table.RowItem>
            <Table.RowItem width="9rem" align="right" title={row.displayTime}>
              {row.displayTime}
            </Table.RowItem>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

const mapStateToProps = (state) => ({
  invoiceHistory: getInvoiceHistoryTable(state),
});

export default connect(mapStateToProps)(InvoiceHistoryTable);
