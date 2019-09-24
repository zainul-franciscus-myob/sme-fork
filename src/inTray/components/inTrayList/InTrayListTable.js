import {
  HeaderSort, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../../selectors/InTrayListSelectors';
import InTrayFileBrowser from '../InTrayFileBrowser';
import InTrayListTableBody from './InTrayListTableBody';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';

const tableConfig = {
  thumbnail: { width: '8rem', valign: 'middle' },
  uploadedDate: { width: 'flex-1', valign: 'middle' },
  invoiceNumber: { width: 'flex-1', valign: 'middle' },
  issuedDate: { width: 'flex-1', valign: 'middle' },
  totalAmount: { width: 'flex-1', valign: 'middle', align: 'right' },
  action: { width: 'auto', valign: 'middle' },
};

const InTrayListTable = ({
  isTableLoading,
  isTableEmpty,
  order,
  onSort,
  onUpload,
  onDownload,
  onDelete,
}) => {
  const emptyView = (
    <NoResultPageState
      title="You currently don't have any documents in your In Tray."
      actions={[
        <InTrayFileBrowser
          key={1}
          buttonType="link"
          buttonLabel={
            <>
              <Icons.Add />
              <span>&nbsp;Upload documents</span>
            </>
          }
          onFileSelected={onUpload}
        />]}
    />
  );

  let tableBodyView;
  if (isTableLoading) {
    tableBodyView = (<LoadingPageState size="medium" />);
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = (
      <InTrayListTableBody tableConfig={tableConfig} onDelete={onDelete} onDownload={onDownload} />
    );
  }

  return (
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.thumbnail} columnName="thumbnail"></Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.uploadedDate}>
          <HeaderSort title="Date uploaded" sortName="ReceivedOn" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.invoiceNumber}>
          <HeaderSort title="Supplier invoice no." sortName="InvoiceNumber" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.issuedDate}>
          <HeaderSort title="Issue date" sortName="InvoiceDate" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.totalAmount}>
          <HeaderSort title="Total amount ($)" sortName="InvoiceAmount" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.action} />
      </Table.Header>
      {tableBodyView}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(InTrayListTable);
