import {
  Alert,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getLoadMoreButtonStatus } from '../selectors/SupplierReturnListSelectors';
import PageView from '../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../components/PaginatedListTemplate/PaginatedListTemplate';
import SupplierReturnListFilterOptions from './SupplierReturnListFilterOptions';
import SupplierReturnListTable from './SupplierReturnListTable';

const SupplierReturnListView = ({
  alert,
  isLoading,
  loadMoreButtonStatus,
  onSort,
  onUpdateFilterBarOptions,
  onApplyFilter,
  onDismissAlert,
  onCreateRefundClick,
  onCreatePurchaseClick,
  onLoadMoreButtonClick,
}) => {
  const pageHead = (
    <PageHead title="Purchase returns and debits" />
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

  const table = (
    <SupplierReturnListTable
      onSort={onSort}
      onCreateRefundClick={onCreateRefundClick}
      onCreatePurchaseClick={onCreatePurchaseClick}
    />
  );


  const supplierReturnListView = (
    <PaginatedListTemplate
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      listTable={table}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );

  return <PageView isLoading={isLoading} view={supplierReturnListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(SupplierReturnListView);
