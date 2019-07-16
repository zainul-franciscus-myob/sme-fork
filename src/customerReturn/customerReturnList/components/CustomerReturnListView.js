import {
  Alert,
  PageHead,
  Spinner,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAlert, getIsLoading } from '../CustomerReturnListSelectors';
import CustomerReturnListFilterOptions from './CustomerReturnListFilterOptions';
import CustomerReturnListTable from './CustomerReturnListTable';
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
    <PageHead title="Customer returns" />
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

  return isLoading ? <Spinner /> : customerReturnListView;
};

CustomerReturnListView.defaultProps = {
  alert: undefined,
};

CustomerReturnListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onUpdateFilterBarOptions: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  alert: PropTypes.shape(),
  onDismissAlert: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(CustomerReturnListView);
