import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadMoreButtonStatus,
  getLoadingState,
} from '../EmployeeListNzSelector';
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

  const employeeListNzTable = <EmployeeListNzTable />;

  const view = (
    <PaginatedListTemplate
      alert={alertComponent}
      pageHead={pageHead}
      listTable={employeeListNzTable}
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
