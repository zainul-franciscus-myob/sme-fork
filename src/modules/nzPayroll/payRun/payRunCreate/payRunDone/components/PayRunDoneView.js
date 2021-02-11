import {
  Button,
  ButtonRow,
  Card,
  PageHead,
  PageState,
  SignOutIcon,
  Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBusinessOnboarded,
  getIsUserOnboarded,
  getPayOnDate,
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import payRunDoneImage from './PayRunDone.svg';
import styles from './PayRunDoneView.module.css';

const PayRunDoneView = ({
  onCloseButtonClick,
  onOpenPaydayFilingClick,
  paymentDate,
  stepNumber,
  payRunSteps,
  isPaydayFilingEnabled,
  isBusinessOnboarded,
  isUserOnboarded,
}) => {
  const title =
    isPaydayFilingEnabled && isBusinessOnboarded && isUserOnboarded
      ? 'Pay run recorded and sent to Inland Revenue'
      : 'Well done! This pay run is finished!';

  return (
    <React.Fragment>
      <PageHead title="Pay run done!" />
      <div className={styles.stepper}>
        <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
      </div>
      <EmployeePayHeader />
      <Card>
        <PageState
          title={title}
          description={`Make sure your employees are paid by ${paymentDate}.`}
          image={<img src={payRunDoneImage} alt="Pay Run Finished!" />}
          actions={
            isPaydayFilingEnabled
              ? [
                  <Button
                    type="link"
                    testid="paydayFilingReportButton"
                    onClick={onOpenPaydayFilingClick}
                    icon={<SignOutIcon size="1.8rem" />}
                  >
                    Payday Filing
                  </Button>,
                ]
              : null
          }
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
  isBusinessOnboarded: getIsBusinessOnboarded(state),
  isUserOnboarded: getIsUserOnboarded(state),
});

export default connect(mapStateToProps)(PayRunDoneView);
