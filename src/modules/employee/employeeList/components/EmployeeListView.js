import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadMoreButtonStatus,
  getLoadingState,
} from '../EmployeeListSelectors';
import EmployeeListFilterOptions from './EmployeeListFilterOptions';
import EmployeeListTable from './EmployeeListTable';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';
import style from './EmployeeListView.module.css';

const EmployeeListView = ({
  loadMoreButtonStatus,
  onEmployeeCreateButtonClick,
  onUpdateFilterBarOptions,
  onResetFilterBarOptions,
  loadingState,
  alert,
  onDismissAlert,
  onSort,
  onLoadMoreButtonClick,
}) => {
  const pageHead = (
    <PageHead title="Employees">
      <Button onClick={onEmployeeCreateButtonClick}>Create employee</Button>
    </PageHead>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <EmployeeListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onResetFilterBarOptions={onResetFilterBarOptions}
    />
  );

  const employeeListTable = (
    <div className={style.list}>
      <EmployeeListTable onSort={onSort} />
    </div>
  );

  const employeeListView = (
    <PaginatedListTemplate
      alert={alertComponent}
      pageHead={pageHead}
      filterBar={filterBar}
      listTable={employeeListTable}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );
  return <PageView loadingState={loadingState} view={employeeListView} />;
};

EmployeeListView.defaultProps = {
  alert: undefined,
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(EmployeeListView);
