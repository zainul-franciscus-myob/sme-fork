import { PageHead } from '@myob/myob-widgets';
import React from 'react';

import EmployeePayHeader from './EmployeePayHeader';
import EmployeePayTable from './EmployeePayTable';
import PayRunActions from '../../components/PayRunActions';

const PayRunListEmployees = ({
  onSelectRow,
  onSelectAllRows,
  onPreviousButtonClick,
}) => (
  <React.Fragment>
    <PageHead title="Calculate pays" />
    <EmployeePayHeader />
    <EmployeePayTable onSelectRow={onSelectRow} onSelectAllRows={onSelectAllRows} />
    <PayRunActions
      onNextButtonClick={() => {}}
      onPreviousButtonClick={onPreviousButtonClick}
    />
  </React.Fragment>
);

export default PayRunListEmployees;
