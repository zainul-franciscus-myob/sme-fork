import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadMoreButtonStatus,
  getLoadingState,
} from '../EmployeeListNzSelector';
import EmployeeListNzFilterOptions from './EmployeeListNzFilterOptions';
import EmployeeListNzTable from './EmployeeListNzTable';
import PageView from '../../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../../components/PaginatedListTemplate/PaginatedListTemplate';

const EmployeeListNzView = ({
  loadingState,
  alert,
  onDismissAlert,
  onEmployeeCreateButtonClick,
  loadMoreButtonStatus,
  onLoadMoreButtonClick,
  onUpdateFilterBarOptions,
  onResetFilterBarOptions,
  onSort,
}) => {
  const pageHead = (
    <PageHead title="Employees">
      <Button name="createEmployee" onClick={onEmployeeCreateButtonClick}>
        Create employee
      </Button>
    </PageHead>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <EmployeeListNzFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onResetFilterBarOptions={onResetFilterBarOptions}
    />
  );

  const employeeListNzTable = <EmployeeListNzTable onSort={onSort} />;

  const view = (
    <PaginatedListTemplate
      alert={alertComponent}
      pageHead={pageHead}
      listTable={employeeListNzTable}
      filterBar={filterBar}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
});

export default connect(mapStateToProps)(EmployeeListNzView);
