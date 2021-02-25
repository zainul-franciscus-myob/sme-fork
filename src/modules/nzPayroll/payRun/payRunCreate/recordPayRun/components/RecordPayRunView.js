import { Card, FieldGroup, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  displayRecordPayRunIRFileModal,
  getIsBusinessAndUserOnboarded,
  getIsBusinessOnboarded,
  getIsUserOnboarded,
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import MainActionType from './RecordPayRunMainActionType';
import RecordPayRunActions from './RecordPayRunActions';
import RecordPayRunIRFilingModal from './RecordPayRunIRFilingModal';
import RecordPayRunPaydayFilingAlert from './RecordPayRunPaydayFilingAlert';
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
  isUserOnboarded,
  isBusinessAndUserOnboarded,
  onOpenPaydayFilingClick,
  isDisplayRecordPayRunIRFileModal,
  onCloseRecordPayRunIRFileModal,
}) => {
  let recordPayRunIRFilingModal;
  let message =
    'View the payroll verification report to check everything is correct.';
  let mainActionType = MainActionType.RECORD;
  let onRecordButtonClick = recordPayments;

  if (isPaydayFilingEnabled) {
    if (isDisplayRecordPayRunIRFileModal) {
      recordPayRunIRFilingModal = (
        <RecordPayRunIRFilingModal
          onGoBack={onCloseRecordPayRunIRFileModal}
          onRecord={recordPayments}
          userOnboarded={isUserOnboarded}
        />
      );
    }

    if (isBusinessOnboarded) {
      onRecordButtonClick = onNext;
      mainActionType = MainActionType.NEXT;
      if (isBusinessAndUserOnboarded) {
        message =
          'View the payroll verification report to check everything is correct. Once you’ve recorded these payments, the information is sent to Inland Revenue as part of Payday Filing.';
      }
    } else {
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

          {isPaydayFilingEnabled && !isBusinessAndUserOnboarded && (
            <RecordPayRunPaydayFilingAlert
              isBusinessOnboarded={isBusinessOnboarded}
              isUserOnboarded={isUserOnboarded}
              onOpenPaydayFilingClick={onOpenPaydayFilingClick}
            />
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
      {recordPayRunIRFilingModal}
    </>
  );
};

const mapStateToProps = (state) => ({
  numberOfSelected: getNumberOfSelected(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
  isBusinessOnboarded: getIsBusinessOnboarded(state),
  isUserOnboarded: getIsUserOnboarded(state),
  isDisplayRecordPayRunIRFileModal: displayRecordPayRunIRFileModal(state),
  isBusinessAndUserOnboarded: getIsBusinessAndUserOnboarded(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
