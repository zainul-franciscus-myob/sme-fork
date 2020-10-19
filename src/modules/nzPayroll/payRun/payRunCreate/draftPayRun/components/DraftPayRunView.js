import { PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayActions from './EmployeePayActions';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import EmployeePayTable from './EmployeesPayTable';
import styles from './DraftPayRunView.module.css';

const DraftPayRunView = ({
  onSelectRow,
  onSelectAllRows,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onNextButtonClick,
  stepNumber,
  payRunSteps,
  onDaysPaidChange,
}) => (
  <React.Fragment>
    <PageHead title="Calculate pays" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <EmployeePayHeader />
    <EmployeePayTable
      onSelectRow={onSelectRow}
      onSelectAllRows={onSelectAllRows}
      onEmployeePayItemChange={onEmployeePayItemChange}
      onEmployeePayItemBlur={onEmployeePayItemBlur}
      onDaysPaidChange={onDaysPaidChange}
    />
    <EmployeePayActions onNextButtonClick={onNextButtonClick} />
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(DraftPayRunView);
