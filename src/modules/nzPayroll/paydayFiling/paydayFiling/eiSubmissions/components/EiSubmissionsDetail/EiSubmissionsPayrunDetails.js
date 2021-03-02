import { FormHorizontal, ReadOnly } from '@myob/myob-widgets';
import React from 'react';

const EiSubmissionsPayrunDetails = ({ payRun }) => {
  return (
    <div>
      <h3>Pay run</h3>
      <FormHorizontal>
        <ReadOnly label="Pay period" name="payPeriod">
          {payRun.payPeriod}
        </ReadOnly>
        <ReadOnly label="Pay on date" name="payOnDate">
          {payRun.payOnDate}
        </ReadOnly>
        <ReadOnly label="Date recorded" name="dateRecorded">
          {payRun.dateRecorded}
        </ReadOnly>
        <ReadOnly label="Employees" name="employeesCount">
          {payRun.employeeCount}
        </ReadOnly>
        <ReadOnly label="Gross payments ($)" name="totalGross">
          {payRun.totalGross}
        </ReadOnly>
        <ReadOnly label="PAYE and/or schedular tax ($)" name="totalPaye">
          {payRun.totalPaye}
        </ReadOnly>
      </FormHorizontal>
    </div>
  );
};

export default EiSubmissionsPayrunDetails;
