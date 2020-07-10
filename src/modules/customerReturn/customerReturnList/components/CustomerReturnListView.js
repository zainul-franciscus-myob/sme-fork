import { Alert, PageHead, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState } from '../CustomerReturnListSelectors';
import CustomerReturnListFilterOptions from './CustomerReturnListFilterOptions';
import CustomerReturnListTable from './CustomerReturnListTable';
import PageView from '../../../../components/PageView/PageView';
import style from './CustomerReturnListView.module.css';

const CustomerReturnListView = ({
  loadingState,
  onUpdateFilterBarOptions,
  alert,
  onDismissAlert,
  onSort,
  onCreateRefundClick,
  onCreateApplyToSaleClick,
}) => {
  const pageHead = <PageHead title="Sale returns and credits" />;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <CustomerReturnListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
    />
  );

  const customerReturnListView = (
    <StandardTemplate
      alert={alertComponent}
      sticky="none"
      pageHead={pageHead}
      filterBar={filterBar}
    >
      <div className={style.list}>
        <CustomerReturnListTable
          onSort={onSort}
          onCreateRefundClick={onCreateRefundClick}
          onCreateApplyToSaleClick={onCreateApplyToSaleClick}
        />
      </div>
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={customerReturnListView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(CustomerReturnListView);
