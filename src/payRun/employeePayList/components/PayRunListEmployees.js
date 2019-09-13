import { PageHead } from '@myob/myob-widgets';
import React from 'react';

import EmployeePayActions from './EmployeePayActions';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import EmployeePayTable from './EmployeePayTable';

const PayRunListEmployees = ({
  onSelectRow,
  onSelectAllRows,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onPreviousButtonClick,
  onNextButtonClick,
}) => (
  <React.Fragment>
    <PageHead title="Calculate pays" />
    <EmployeePayHeader />
    <EmployeePayTable
      onSelectRow={onSelectRow}
      onSelectAllRows={onSelectAllRows}
      onEmployeePayItemChange={onEmployeePayItemChange}
      onEmployeePayItemBlur={onEmployeePayItemBlur}
    />
    <EmployeePayActions
      onNextButtonClick={onNextButtonClick}
      onPreviousButtonClick={onPreviousButtonClick}
    />
  </React.Fragment>
);

export default PayRunListEmployees;
