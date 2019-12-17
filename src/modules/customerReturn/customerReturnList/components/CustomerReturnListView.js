import {
  Alert,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../CustomerReturnListSelectors';
import CustomerReturnListFilterOptions from './CustomerReturnListFilterOptions';
import CustomerReturnListTable from './CustomerReturnListTable';
import PageView from '../../../../components/PageView/PageView';
import style from './CustomerReturnListView.module.css';

const CustomerReturnListView = ({
  isLoading,
  onUpdateFilterBarOptions,
  onApplyFilter,
  alert,
  onDismissAlert,
  onSort,
  onCreateRefundClick,
  onCreateApplyToSaleClick,
}) => {
  const pageHead = (
    <PageHead title="Sale returns and credits" />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <CustomerReturnListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const customerReturnListView = (
    <StandardTemplate alert={alertComponent} sticky="none" pageHead={pageHead} filterBar={filterBar}>

      <div className={style.list}>
        <CustomerReturnListTable
          onSort={onSort}
          onCreateRefundClick={onCreateRefundClick}
          onCreateApplyToSaleClick={onCreateApplyToSaleClick}
        />
      </div>

    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={customerReturnListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(CustomerReturnListView);
