import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState } from '../EmployeeListNzSelector';
import EmployeeListNzTable from './EmployeeListNzTable';
import PageView from '../../../../../components/PageView/PageView';

const EmployeeListNzView = ({
  loadingState,
  alert,
  onDismissAlert,
  onEmployeeCreateButtonClick,
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

  const employeeListNzTable = <EmployeeListNzTable />;

  const view = (
    <StandardTemplate pageHead={pageHead} alert={alertComponent}>
      {employeeListNzTable}
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(EmployeeListNzView);
