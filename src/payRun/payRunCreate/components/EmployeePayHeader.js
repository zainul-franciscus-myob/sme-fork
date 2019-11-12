import { ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeHeader } from '../PayRunSelectors';
import FormCard from '../../../components/FormCard/FormCard';
import styles from './EmployeePayHeader.module.css';

const EmployeePayHeader = ({ employeeHeader }) => (
  <FormCard>
    <div className={styles.employeesHeader}>
      <ReadOnly label="Pay cycle" name="paymentFrequency">
        <h3 className={styles.noBottomMargin}>{employeeHeader.paymentFrequency}</h3>
      </ReadOnly>
      <ReadOnly label="Pay period start" name="payPeriodStart">
        <h3 className={styles.noBottomMargin}>{employeeHeader.payPeriodStart}</h3>
      </ReadOnly>
      <ReadOnly label="Pay period end" name="payPeriodEnd">
        <h3 className={styles.noBottomMargin}>{employeeHeader.payPeriodEnd}</h3>
      </ReadOnly>
      <ReadOnly label="Date of payment" name="paymentDate">
        <h3 className={styles.noBottomMargin}>{employeeHeader.paymentDate}</h3>
      </ReadOnly>
    </div>
  </FormCard>
);

const mapStateToProps = state => ({
  employeeHeader: getEmployeeHeader(state),
});

export default connect(mapStateToProps)(EmployeePayHeader);
