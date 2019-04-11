import {
  Alert, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../invoiceListSelectors';
import InvoiceListFilterOptions from './InvoiceListFilterOptions';
import InvoiceListTable from './InvoiceListTable';
import style from './InvoiceListView.css';

const InvoiceListView = (props) => {
  const {
    alert,
    onApplyFilter,
    onUpdateFilter,
    onSort,
    isLoading,
  } = props;

  const filterBar = (
    <InvoiceListFilterOptions
      onApplyFilter={onApplyFilter}
      onUpdateFilter={onUpdateFilter}
    />
  );

  const pageHead = (
    <PageHead title="Invoices" />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={props.onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const invoiceListView = (
    <StandardTemplate sticky="none" alert={alertComponent} pageHead={pageHead} filterBar={filterBar}>
      <div className={style.list}>
        <InvoiceListTable onSort={onSort} />
      </div>
    </StandardTemplate>
  );

  const view = isLoading ? (<Spinner />) : invoiceListView;

  return view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(InvoiceListView);
