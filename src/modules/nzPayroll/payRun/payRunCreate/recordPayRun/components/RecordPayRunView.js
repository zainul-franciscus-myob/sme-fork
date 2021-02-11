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
  displayRecordPayRunIRFileModal,
  getIsBusinessAndUserOnboarded,
  getIsBusinessOnboarded,
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import MainActionType from './RecordPayRunMainActionType';
import RecordPayRunActions from './RecordPayRunActions';
import RecordPayRunWithIRFilingModal from './RecordPayRunWithIRFilingModal';
import getNumberOfSelected from '../RecordPayRunSelectors';
import styles from './RecordPayRunView.module.css';

const RecordPayRunView = ({
  numberOfSelected,
  onNext,
  recordPayments,
  stepNumber,
  payRunSteps,
  onViewPayrollVerifyReportClick,
  onPreviousButtonClick,
  isPaydayFilingEnabled,
  isBusinessOnboarded,
  isBusinessAndUserOnboarded,
  onOpenPaydayFilingClick,
  isDisplayRecordPayRunIRFileModal,
  onCloseRecordPayRunIRFileModal,
}) => {
  let recordPayRunWithIRFilingModal;
  let message =
    'View the payroll verification report to check everything is correct.';
  let mainActionType = MainActionType.RECORD;
  let onRecordButtonClick = recordPayments;

  if (isPaydayFilingEnabled) {
    if (isDisplayRecordPayRunIRFileModal) {
      recordPayRunWithIRFilingModal = (
        <RecordPayRunWithIRFilingModal
          onGoBack={onCloseRecordPayRunIRFileModal}
          onRecordAndFile={recordPayments}
        />
      );
    }

    if (isBusinessAndUserOnboarded) {
      onRecordButtonClick = onNext;
      mainActionType = MainActionType.NEXT;
      message =
        'View the payroll verification report to check everything is correct. Once you’ve recorded these payments, the information is sent to Inland Revenue as part of Payday Filing.';
    } else if (!isBusinessOnboarded) {
      mainActionType = MainActionType.RECORD_WITHOUT_FILING;
    }
  }

  return (
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
          <div className={styles.withPaddingBottom}>{message}</div>

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
        mainActionType={mainActionType}
        onMainActionButtonClick={onRecordButtonClick}
        onViewPayrollVerifyReportClick={onViewPayrollVerifyReportClick}
        onPreviousButtonClick={onPreviousButtonClick}
        isPaydayFilingEnabled={isPaydayFilingEnabled}
      />
      {recordPayRunWithIRFilingModal}
    </>
  );
};

const mapStateToProps = (state) => ({
  numberOfSelected: getNumberOfSelected(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
  isBusinessOnboarded: getIsBusinessOnboarded(state),
  isDisplayRecordPayRunIRFileModal: displayRecordPayRunIRFileModal(state),
  isBusinessAndUserOnboarded: getIsBusinessAndUserOnboarded(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
