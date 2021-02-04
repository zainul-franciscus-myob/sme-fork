import {
  Alert,
  Button,
  Card,
  FieldGroup,
  PageHead,
  Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBusinessOnboarded,
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import RecordPayRunActions from './RecordPayRunActions';
import getNumberOfSelected from '../RecordPayRunSelectors';
import styles from './RecordPayRunView.module.css';

const RecordPayRunView = ({
  numberOfSelected,
  recordPayments,
  stepNumber,
  payRunSteps,
  onViewPayrollVerifyReportClick,
  onPreviousButtonClick,
  isPaydayFilingEnabled,
  isBusinessOnboarded,
  onOpenPaydayFilingClick,
}) => (
  <>
    <PageHead title="Record and report" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <EmployeePayHeader />
    <Card>
      <FieldGroup
        label={`Record pay for ${numberOfSelected} ${
          numberOfSelected === 1 ? 'employee' : 'employees'
        }?`}
        testid="testFieldGroup"
      >
        <div className={styles.withPaddingBottom}>
          View the payroll verification report to check everything is correct.
        </div>

        {isPaydayFilingEnabled && !isBusinessOnboarded && (
          <Alert type="info">
            <div className={styles.alertWithLinkButton}>
              This business is not connected to Payday filing. To submit
              employment information to Inland Revenue,
              <Button
                className={styles.withPaddingRight}
                type="link"
                testid="paydayFilingReportButton"
                onClick={onOpenPaydayFilingClick}
              >
                save pay run and connect to Payday filing
              </Button>
              <b className={styles.withPaddingRight}>before</b> recording this
              pay run.
            </div>
          </Alert>
        )}
      </FieldGroup>
    </Card>
    <RecordPayRunActions
      onRecordButtonClick={recordPayments}
      onViewPayrollVerifyReportClick={onViewPayrollVerifyReportClick}
      onPreviousButtonClick={onPreviousButtonClick}
      isBusinessOnboarded={isBusinessOnboarded}
      isPaydayFilingEnabled={isPaydayFilingEnabled}
    />
  </>
);

const mapStateToProps = (state) => ({
  numberOfSelected: getNumberOfSelected(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
  isBusinessOnboarded: getIsBusinessOnboarded(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
