import { ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeHeader } from '../EmployeePayListSelectors';
import FormCard from '../../../components/FormCard/FormCard';
import styles from './EmployeePayHeader.module.css';

const EmployeePayHeader = ({ employeeHeader }) => (
  <FormCard>
    <div className={styles.employeesHeader}>
      <ReadOnly label="Pay cycle" name="paymentFrequency">
        {employeeHeader.paymentFrequency}
      </ReadOnly>
      <ReadOnly label="Pay period start" name="payPeriodStart">
        {employeeHeader.payPeriodStart}
      </ReadOnly>
      <ReadOnly label="Pay period end" name="payPeriodEnd">
        {employeeHeader.payPeriodEnd}
      </ReadOnly>
      <ReadOnly label="Date of payment" name="paymentDate">
        {employeeHeader.paymentDate}
      </ReadOnly>
    </div>
  </FormCard>
);

const mapStateToProps = state => ({
  employeeHeader: getEmployeeHeader(state),
});

export default connect(mapStateToProps)(EmployeePayHeader);
