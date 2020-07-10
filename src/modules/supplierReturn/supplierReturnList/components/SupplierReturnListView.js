import { Alert, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
} from '../selectors/SupplierReturnListSelectors';
import { responsiveWidths, tableConfig } from './TableConfig';
import PageView from '../../../../components/PageView/PageView';
import StandardTemplate from '../../../../components/Feelix/StandardTemplate/StandardTemplate';
import SupplierReturnListFilterOptions from './SupplierReturnListFilterOptions';
import SupplierReturnListTable from './SupplierReturnListTable';
import SupplierReturnListTableHeader from './SupplierReturnListTableHeader';

const SupplierReturnListView = ({
  alert,
  loadingState,
  onSort,
  onUpdateFilterBarOptions,
  onDismissAlert,
  onCreateRefundClick,
  onCreatePurchaseClick,
}) => {
  const pageHead = <PageHead title="Purchase returns and debits" />;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <SupplierReturnListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
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

  return <PageView loadingState={loadingState} view={supplierReturnListView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(SupplierReturnListView);
