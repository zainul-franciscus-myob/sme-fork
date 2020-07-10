import { Button, ButtonRow, Card, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import PayRunEmployees from './PayRunEmployees';
import styles from './PreparePaySlipsView.module.css';

const PreparePaySlipsView = ({
  stepNumber,
  payRunSteps,
  onNextClick,
  onCancelClick,
  emailTabListeners,
  printTabListeners,
  emailPaySlipModal,
  setSelectedTab,
  exportPdf,
}) => {
  const employeeCard = (
    <Card>
      <PayRunEmployees
        setSelectedTab={setSelectedTab}
        emailTabListeners={emailTabListeners}
        printTabListeners={printTabListeners}
        exportPdf={exportPdf}
      />
    </Card>
  );
  return (
    <>
      {emailPaySlipModal}
      <PageHead title="Prepare pay slips" />
      <div className={styles.stepper}>
        <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
      </div>
      <EmployeePayHeader />
      {employeeCard}
      <ButtonRow
        primary={[
          <Button key="next" onClick={onNextClick}>
            Next
          </Button>,
        ]}
        secondary={[
          <Button key="cancel" type="secondary" onClick={onCancelClick}>
            Cancel
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
