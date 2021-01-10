import { Card, HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmail,
  getIsConfirmingEmailGeneration,
  getUploadOptionsAlert,
} from '../selectors/UploadOptionsSelectors';
import {
  getIsDetailShown,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../selectors/InTrayListSelectors';
import {
  getIsUploadPopoverOpen,
  getRegion,
} from '../selectors/InTraySelectors';
import InTrayEmptyStateView from '../../inTrayEmptyState/InTrayEmptyStateView';
import InTrayListTableBody from './InTrayListTableBody';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
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
    columnName: 'Supplier invoice no',
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
  email,
  emptyStateListeners,
  handleActionSelect,
  isConfirmingEmailGeneration,
  isTableEmpty,
  isTableLoading,
  isUploadPopoverOpen,
  onRowSelect,
  onSort,
  onUpload,
  order,
  region,
  showSplitView,
  uploadOptionsAlert,
}) => {
  let tableBodyView;

  if (isTableLoading) {
    tableBodyView = <LoadingPageState size="medium" />;
  } else if (isTableEmpty) {
    tableBodyView = (
      <InTrayEmptyStateView
        email={email}
        emptyStateListeners={emptyStateListeners}
        isConfirmingEmailGeneration={isConfirmingEmailGeneration}
        isUploadPopoverOpen={isUploadPopoverOpen}
        region={region}
        uploadOptionsAlert={uploadOptionsAlert}
      />
    );
  } else {
    tableBodyView = (
      <InTrayListTableBody
        handleActionSelect={handleActionSelect}
        onRowSelect={onRowSelect}
        onUpload={onUpload}
        tableConfig={tableConfig}
      />
    );
  }

  const getColumnName = (rowConfig) =>
    showSplitView && rowConfig.splitViewColumnName
      ? rowConfig.splitViewColumnName
      : rowConfig.columnName;

  return (
    <Card classes={[styles.cardWrapper]}>
      <Table hasActions>
        {isTableEmpty ? null : (
          <Table.Header>
            <Table.HeaderItem
              {...tableConfig.thumbnail}
              columnName="thumbnail"
            />
            <Table.HeaderItem {...tableConfig.uploadedDate}>
              <HeaderSort
                title={getColumnName(tableConfig.uploadedDate)}
                sortName="ReceivedOn"
                activeSort={order}
                onSort={onSort}
              />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.invoiceNumber}>
              <HeaderSort
                title={getColumnName(tableConfig.invoiceNumber)}
                sortName="InvoiceNumber"
                activeSort={order}
                onSort={onSort}
              />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.issuedDate}>
              <HeaderSort
                title={getColumnName(tableConfig.issuedDate)}
                sortName="InvoiceDate"
                activeSort={order}
                onSort={onSort}
              />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.totalAmount}>
              <HeaderSort
                title={getColumnName(tableConfig.totalAmount)}
                sortName="InvoiceAmount"
                activeSort={order}
                onSort={onSort}
              />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.action} />
          </Table.Header>
        )}
        {tableBodyView}
      </Table>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  email: getEmail(state),
  isConfirmingEmailGeneration: getIsConfirmingEmailGeneration(state),
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  isUploadPopoverOpen: getIsUploadPopoverOpen(state),
  order: getOrder(state),
  region: getRegion(state),
  showSplitView: getIsDetailShown(state),
  uploadOptionsAlert: getUploadOptionsAlert(state),
});

export default connect(mapStateToProps)(InTrayListTable);
