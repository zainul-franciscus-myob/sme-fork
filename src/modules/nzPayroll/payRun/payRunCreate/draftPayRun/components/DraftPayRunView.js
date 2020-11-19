import { PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayActions from './EmployeePayActions';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import EmployeesPayTable from './EmployeesPayTable';
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
  onDaysPaidBlur,
  onAddHolidayAndLeaveClick,
  onAddHolidaysOrLeaveModalCancel,
  onAddHolidaysOrLeaveModalContinue,
  featureToggles,
}) => (
  <React.Fragment>
    <PageHead title="Calculate pays" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <EmployeePayHeader />
    <EmployeesPayTable
      onSelectRow={onSelectRow}
      onSelectAllRows={onSelectAllRows}
      onEmployeePayLineChange={onEmployeePayLineChange}
      onEmployeePayLineBlur={onEmployeePayLineBlur}
      onDaysPaidChange={onDaysPaidChange}
      onDaysPaidBlur={onDaysPaidBlur}
      onAddHolidayAndLeaveClick={onAddHolidayAndLeaveClick}
      onAddHolidaysOrLeaveModalCancel={onAddHolidaysOrLeaveModalCancel}
      onAddHolidaysOrLeaveModalContinue={onAddHolidaysOrLeaveModalContinue}
      featureToggles={featureToggles}
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
