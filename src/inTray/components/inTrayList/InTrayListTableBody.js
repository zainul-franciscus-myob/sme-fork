import {
  Icons, Spinner, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEntries } from '../../selectors/InTrayListSelectors';
import styles from './InTrayListTableBody.module.css';

const getThumbnail = (ocrStatus, thumbnailUri, alt) => (
  <div className={styles.thumbnail}>
    { ocrStatus === 'InProgress' && (
      <div className={styles.spinner}>
        <Spinner size="small" />
      </div>
    ) }
    <img src={thumbnailUri} alt={alt} />
  </div>
);

const getInvoiceRowItem = value => value || (
  <Tooltip triggerContent={<Icons.Info />}>
        Information not available
  </Tooltip>
);

const InTrayListTableBody = ({ tableConfig, entries }) => {
  const rows = entries.map((entry) => {
    const {
      id,
      thumbnailUri,
      ocrStatus,
      uploadedDate,
      invoiceNumber,
      issuedDate,
      totalAmount,
    } = entry;

    return (
      <Table.Row key={id}>
        <Table.RowItem {...tableConfig.thumbnail}>
          {getThumbnail(ocrStatus, thumbnailUri, uploadedDate)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.uploadedDate}>{uploadedDate}</Table.RowItem>
        <Table.RowItem {...tableConfig.invoiceNumber}>
          {getInvoiceRowItem(invoiceNumber)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.issuedDate}>
          {getInvoiceRowItem(issuedDate)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.totalAmount}>
          {getInvoiceRowItem(totalAmount)}
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getEntries(state),
});

export default connect(mapStateToProps)(InTrayListTableBody);
