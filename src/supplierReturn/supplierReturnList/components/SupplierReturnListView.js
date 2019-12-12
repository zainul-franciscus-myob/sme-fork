import {
  Alert,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../selectors/SupplierReturnListSelectors';
import { responsiveWidths, tableConfig } from './TableConfig';
import PageView from '../../../components/PageView/PageView';
import SupplierReturnListFilterOptions from './SupplierReturnListFilterOptions';
import SupplierReturnListTable from './SupplierReturnListTable';
import SupplierReturnListTableHeader from './SupplierReturnListTableHeader';

const SupplierReturnListView = ({
  alert,
  isLoading,
  onSort,
  onUpdateFilterBarOptions,
  onApplyFilter,
  onDismissAlert,
  onCreateRefundClick,
  onCreatePurchaseClick,
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
      tableConfig={tableConfig}
      onSort={onSort}
      onCreateRefundClick={onCreateRefundClick}
      onCreatePurchaseClick={onCreatePurchaseClick}
    />
  );

  const header = (
    <SupplierReturnListTableHeader
      tableConfig={tableConfig}
      onSort={onSort}
      responsiveWidths={responsiveWidths}
    />
  );

  const supplierReturnListView = (
    <StandardTemplate
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      tableHeader={header}
    >
      {table}
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={supplierReturnListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(SupplierReturnListView);
