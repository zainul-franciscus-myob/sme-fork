import { Button, ButtonRow, Card, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import PaySlipEmployeesView from './PaySlipEmployeesView';
import styles from './PreparePaySlipsView.module.css';

const PreparePaySlipsView = ({ stepNumber, payRunSteps, onNextClick }) => {
  const employeeCard = (
    <Card>
      <PaySlipEmployeesView />
    </Card>
  );

  return (
    <>
      <PageHead title="Prepare pay slips" />
      <div className={styles.stepper}>
        <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
      </div>
      <EmployeePayHeader />
      {employeeCard}
      <ButtonRow
        primary={[
          <Button name="next" key="next" onClick={onNextClick}>
            Next
          </Button>,
        ]}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(PreparePaySlipsView);
