import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../invoiceListSelectors';
import InvoiceListFilterOptions from './InvoiceListFilterOptions';
import InvoiceListTable from './InvoiceListTable';
import PageView from '../../../components/PageView/PageView';
import style from './InvoiceListView.module.css';

const InvoiceListView = (props) => {
  const {
    alert,
    onApplyFilter,
    onUpdateFilter,
    onSort,
    isLoading,
    onCreateButtonClick,
    onDismissAlert,
  } = props;

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

  const invoiceListView = (
    <StandardTemplate sticky="none" alert={alertComponent} pageHead={pageHead} filterBar={filterBar}>
      <div className={style.list}>
        <InvoiceListTable onSort={onSort} />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={invoiceListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(InvoiceListView);
