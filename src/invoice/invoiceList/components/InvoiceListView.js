import {
  Alert, Button, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getLoadMoreButtonStatus,
} from '../invoiceListSelectors';
import InvoiceListFilterOptions from './InvoiceListFilterOptions';
import InvoiceListTable from './InvoiceListTable';
import InvoiceListTableHeader from './InvoiceListTableHeader';
import PageView from '../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../components/PaginatedListTemplate/PaginatedListTemplate';
import style from './InvoiceListView.module.css';

const tableConfig = {
  dateIssued: { columnName: 'Issue date', valign: 'top' },
  number: { columnName: 'Invoice no', valign: 'top' },
  customer: { columnName: 'Customer', valign: 'top' },
  purchaseOrder: { columnName: 'Customer PO no', valign: 'top' },
  invoiceAmount: { columnName: 'Amount ($)', valign: 'top', align: 'right' },
  invoiceDue: { columnName: 'Balance due ($)', valign: 'top', align: 'right' },
  dateDue: { columnName: 'Due date', valign: 'top', align: 'left' },
  status: { columnName: 'Status', valign: 'middle', align: 'left' },
};

const InvoiceListView = ({
  alert,
  onApplyFilter,
  onUpdateFilter,
  onSort,
  isLoading,
  onCreateButtonClick,
  onDismissAlert,
  onLoadMoreButtonClick,
  loadMoreButtonStatus,
}) => {
  const filterBar = (
    <InvoiceListFilterOptions
      onApplyFilter={onApplyFilter}
      onUpdateFilter={onUpdateFilter}
    />
  );

  const pageHead = (
    <PageHead title="Invoices">
      <Button onClick={onCreateButtonClick}>Create invoice</Button>
    </PageHead>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const tableHeader = (
    <InvoiceListTableHeader tableConfig={tableConfig} onSort={onSort} />
  );

  const listTable = (
    <div className={style.list}>
      <InvoiceListTable tableConfig={tableConfig} onCreateButtonClick={onCreateButtonClick} />
    </div>
  );

  const invoiceListView = (
    <PaginatedListTemplate
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      tableHeader={tableHeader}
      listTable={listTable}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );

  return <PageView isLoading={isLoading} view={invoiceListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(InvoiceListView);
