import {
  Card, HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDetailShown, getIsTableEmpty, getIsTableLoading, getOrder,
} from '../selectors/InTrayListSelectors';
import InTrayListTableBody from './InTrayListTableBody';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import styles from './InTrayListTable.module.css';

const tableConfig = {
  thumbnail: { width: '8rem', valign: 'middle' },
  uploadedDate: {
    width: 'flex-1',
    valign: 'middle',
    columnName: 'Date uploaded',
  },
  invoiceNumber: {
    width: 'flex-1',
    valign: 'middle',
    columnName: 'Supplier invoice no.',
    splitViewColumnName: 'Supplier inv no',
  },
  issuedDate: { width: 'flex-1', valign: 'middle', columnName: 'Issue date' },
  totalAmount: {
    width: 'flex-1',
    valign: 'middle',
    align: 'right',
    columnName: 'Total amount ($)',
    splitViewColumnName: 'Amount ($)',
  },
  action: { width: 'auto', valign: 'middle' },
};

const InTrayListTable = ({
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
  handleActionSelect,
  onRowSelect,
  onAddAttachments,
  showSplitView,
}) => {
  const emptyView = (
    <NoResultPageState
      title="Nothing in your In tray"
      description="Upload invoices and receipts to make it easier to create and pay bills, or track payments."
    />
  );

  let tableBodyView;
  if (isTableLoading) {
    tableBodyView = (<LoadingPageState size="medium" />);
  } else if (isTableEmpty) {
    tableBodyView = <>
      <InTrayListTableBody
        tableConfig={tableConfig}
        onRowSelect={onRowSelect}
        onAddAttachments={onAddAttachments}
        handleActionSelect={handleActionSelect}
      />
      {emptyView}
    </>;
  } else {
    tableBodyView = (
      <InTrayListTableBody
        tableConfig={tableConfig}
        onRowSelect={onRowSelect}
        onAddAttachments={onAddAttachments}
        handleActionSelect={handleActionSelect}
      />
    );
  }

  const getColumnName = rowConfig => (showSplitView && rowConfig.splitViewColumnName
    ? rowConfig.splitViewColumnName
    : rowConfig.columnName);

  return (
    <Card classes={[styles.cardWrapper]}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.thumbnail} columnName="thumbnail"></Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.uploadedDate}>
            <HeaderSort title={getColumnName(tableConfig.uploadedDate)} sortName="ReceivedOn" activeSort={order} onSort={onSort} />
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.invoiceNumber}>
            <HeaderSort title={getColumnName(tableConfig.invoiceNumber)} sortName="InvoiceNumber" activeSort={order} onSort={onSort} />
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.issuedDate}>
            <HeaderSort title={getColumnName(tableConfig.issuedDate)} sortName="InvoiceDate" activeSort={order} onSort={onSort} />
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.totalAmount}>
            <HeaderSort title={getColumnName(tableConfig.totalAmount)} sortName="InvoiceAmount" activeSort={order} onSort={onSort} />
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.action} />
        </Table.Header>
        {tableBodyView}
      </Table>
    </Card>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  showSplitView: getIsDetailShown(state),
});

export default connect(mapStateToProps)(InTrayListTable);
