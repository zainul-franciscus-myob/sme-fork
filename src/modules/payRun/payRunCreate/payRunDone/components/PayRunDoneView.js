import {
  Button,
  ButtonRow,
  Card,
  Icons,
  PageHead,
  PageState,
  Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getPayOnDate,
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import payRunDoneImage from './PayRunDone.svg';
import styles from './PayRunDoneView.module.css';

const PayRunDoneView = ({
  onCloseButtonClick,
  paymentDate,
  stepNumber,
  payRunSteps,
  onPayViaBankFileButtonClick,
  onStpReportingClick,
}) => {
  const actions = [
    <Button
      key={1}
      type="link"
      icon={<Icons.SignOut />}
      onClick={onPayViaBankFileButtonClick}
    >
      Pay employees via bank file
    </Button>,
    <Button
      key={2}
      type="link"
      icon={<Icons.SignOut />}
      onClick={onStpReportingClick}
    >
      Payroll reporting (STP)
    </Button>,
  ];

  return (
    <React.Fragment>
      <PageHead title="Pay run done!" />
      <div className={styles.stepper}>
        <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
      </div>
      <EmployeePayHeader />
      <Card>
        <PageState
          title="Well done! This pay run is finished!"
          actions={actions}
          description={`Make sure your employees are paid by ${paymentDate}.`}
          image={<img src={payRunDoneImage} alt="Pay Run Finished!" />}
        />
      </Card>
      <ButtonRow
        primary={[
          <Button
            key="close"
            name="close"
            type="primary"
            onClick={onCloseButtonClick}
            testid="closeButton"
          >
            Close
          </Button>,
        ]}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  paymentDate: getPayOnDate(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(PayRunDoneView);
