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

const getInvoiceRowItem = (ocrStatus, value) => {
  if (ocrStatus === 'Completed') {
    return value;
  }

  if (ocrStatus === 'InProgress') {
    return '';
  }

  return (
    <Tooltip triggerContent={<Icons.Info />}>
        Information not available
    </Tooltip>
  );
};

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
          {getInvoiceRowItem(ocrStatus, invoiceNumber)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.issuedDate}>
          {getInvoiceRowItem(ocrStatus, issuedDate)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.totalAmount}>
          {getInvoiceRowItem(ocrStatus, totalAmount)}
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
