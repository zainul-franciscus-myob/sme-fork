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
  onEmployeePayLineChange,
  onEmployeePayLineBlur,
  onNextButtonClick,
  onPreviousButtonClick,
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
      onEmployeePayLineChange={onEmployeePayLineChange}
      onEmployeePayLineBlur={onEmployeePayLineBlur}
      onDaysPaidChange={onDaysPaidChange}
    />
    <EmployeePayActions
      onPreviousButtonClick={onPreviousButtonClick}
      onNextButtonClick={onNextButtonClick}
    />
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(DraftPayRunView);
