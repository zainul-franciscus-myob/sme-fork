import { Button, PageHead, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../EmployeeListNzSelector';
import EmployeeListNzTable from './EmployeeListNzTable';
import PageView from '../../../../../components/PageView/PageView';

const EmployeeListNzView = ({ loadingState }) => {
  const pageHead = (
    <PageHead title="Employees">
      <Button onClick={() => {}}>Create employee</Button>
    </PageHead>
  );

  const employeeListNzTable = <EmployeeListNzTable />;

  const view = (
    <StandardTemplate pageHead={pageHead}>
      {employeeListNzTable}
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(EmployeeListNzView);
