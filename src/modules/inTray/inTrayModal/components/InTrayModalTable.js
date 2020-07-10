import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableLoading,
  getIsUploadAllowed,
  getOrder,
} from '../InTrayModalSelectors';
import InTrayDropZone from './InTrayDropZone';
import InTrayListTableBody from './InTrayModalTableBody';
import TableView from '../../../../components/TableView/TableView';
import styles from './InTrayModalTable.module.css';

const tableConfig = {
  radioButton: { width: '3.7rem', cellRole: 'checkbox', valign: 'middle' },
  thumbnail: { width: '8rem', valign: 'middle' },
  uploadedDate: {
    columnName: 'Date uploaded',
    width: '14rem',
    valign: 'middle',
  },
  invoiceNumber: {
    columnName: 'Supplier invoice no.',
    width: 'flex-1',
    valign: 'middle',
  },
  issuedDate: { columnName: 'Issue date', width: '11rem', valign: 'middle' },
  amount: {
    columnName: 'Amount ($)',
    width: '13.5rem',
    valign: 'middle',
    align: 'right',
  },
  action: { width: '7rem', valign: 'middle' },
};

const InTrayModalTable = ({
  isTableLoading,
  isUploadAllowed,
  order,
  onSort,
  onUpload,
  onView,
  onSelect,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.radioButton} />
      <Table.HeaderItem {...tableConfig.thumbnail}></Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.uploadedDate}>
        <HeaderSort
          title="Date uploaded"
          sortName="ReceivedOn"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceNumber}>
        <HeaderSort
          title="Supplier invoice no"
          sortName="InvoiceNumber"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.issuedDate}>
        <HeaderSort
          title="Issue date"
          sortName="InvoiceDate"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort
          title="Amount ($)"
          sortName="InvoiceAmount"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.action} />
    </Table.Header>
  );

  const dropZone = <InTrayDropZone onUpload={onUpload} />;

  const tableBody = (
    <InTrayListTableBody
      tableConfig={tableConfig}
      onUpload={onUpload}
      onView={onView}
      onSelect={onSelect}
    />
  );

  return (
    <TableView
      hasActions
      className={styles.inTrayTable}
      header={header}
      isLoading={isTableLoading}
      // This prop is necessary to enable certain styling for the Table component in mobile view
      // for when the table has a checkbox/radio button, or any actionable item for each row.
      onRowSelect={() => {}}
    >
      {isUploadAllowed && dropZone}
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isUploadAllowed: getIsUploadAllowed(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(InTrayModalTable);
