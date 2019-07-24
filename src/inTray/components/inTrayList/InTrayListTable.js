import {
  Button, HeaderSort, Icons, Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../../selectors/InTrayListSelectors';
import InTrayListTableBody from './InTrayListTableBody';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import styles from './InTrayListTable.module.css';

const tableConfig = {
  thumbnail: { width: '8rem', valign: 'middle' },
  uploadedDate: { width: 'flex-1', valign: 'middle' },
  invoiceNumber: { width: 'flex-1', valign: 'middle' },
  issuedDate: { width: 'flex-1', valign: 'middle' },
  totalAmount: { width: 'flex-1', valign: 'middle', align: 'right' },
};

const emptyView = (
  <NoResultPageState
    title="Drag and drop, or browse for files to upload to the In Tray."
    actions={[<Button key={1} type="link" icon={<Icons.Add />}>Upload documents</Button>]}
    description="Only upload PDF, JPG, TIFF, and PNG files under 10MB."
  />
);

const spinnerView = (
  <div className={styles.spinner}>
    <Spinner size="medium" />
  </div>
);

const InTrayListTable = (props) => {
  const {
    isTableLoading,
    isTableEmpty,
    order,
    onSort,
  } = props;

  let tableBodyView;
  if (isTableLoading) {
    tableBodyView = spinnerView;
  } else if (isTableEmpty) {
    tableBodyView = emptyView;
  } else {
    tableBodyView = (<InTrayListTableBody tableConfig={tableConfig} />);
  }

  return (
    <div className={styles.list}>
      <Table>
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
        </Table.Header>
        {tableBodyView}
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(InTrayListTable);
