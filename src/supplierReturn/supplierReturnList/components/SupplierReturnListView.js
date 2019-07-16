import {
  Alert,
  PageHead,
  Spinner,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../supplierReturnListSelectors';
import SupplierReturnListFilterOptions from './SupplierReturnListFilterOptions';
import SupplierReturnListTable from './SupplierReturnListTable';
import style from './SupplierReturnListView.module.css';

const SupplierReturnListView = ({
  isLoading,
  onUpdateFilterBarOptions,
  onApplyFilter,
  alert,
  onDismissAlert,
  onSort,
  onCreateRefundClick,
  onCreatePurchaseClick,
}) => {
  const pageHead = (
    <PageHead title="Supplier returns" />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <SupplierReturnListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const supplierReturnListView = (
    <StandardTemplate alert={alertComponent} sticky="none" pageHead={pageHead} filterBar={filterBar}>

      <div className={style.list}>
        <SupplierReturnListTable
          onSort={onSort}
          onCreateRefundClick={onCreateRefundClick}
          onCreatePurchaseClick={onCreatePurchaseClick}
        />
      </div>

    </StandardTemplate>
  );

  return isLoading ? <Spinner /> : supplierReturnListView;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(SupplierReturnListView);
