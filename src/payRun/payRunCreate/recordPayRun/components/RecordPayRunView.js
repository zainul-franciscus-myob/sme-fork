import { FieldGroup, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsRegisteredForStp,
  getIsStpDeclarationOpen,
  getNumberOfSelected,
} from '../RecordPayRunSelectors';
import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import FormCard from '../../../../components/FormCard/FormCard';
import RecordPayRunActions from './RecordPayRunActions';
import StpDeclarationModal from './StpDeclarationModal';
import styles from './RecordPayRunView.module.css';

const RecordPayRunView = ({
  numberOfSelected,
  recordPayments,
  openStpModal,
  onPreviousButtonClick,
  stepNumber,
  payRunSteps,
  isStpOpen,
  isStpRegistered,
  stpDeclarationListeners,
}) => {
  const onRecordButtonClick = () => (isStpRegistered ? openStpModal() : recordPayments());

  return (
    <>
      {isStpOpen && <StpDeclarationModal stpDeclarationListeners={stpDeclarationListeners} />}
      <PageHead title="Record and report" />
      <div className={styles.stepper}>
        <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
      </div>
      <EmployeePayHeader />
      <FormCard>
        <FieldGroup label={`Record pay for ${numberOfSelected} employees?`}>
          Once you&apos;ve recorded these payments, you&apos;ll need to authorise MYOB to send this
          information to the ATO as part of Single Touch Payroll.
        </FieldGroup>
      </FormCard>
      <RecordPayRunActions
        onRecordButtonClick={onRecordButtonClick}
        onPreviousButtonClick={onPreviousButtonClick}
      />
    </>
  );
};

const mapStateToProps = state => ({
  numberOfSelected: getNumberOfSelected(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
  isStpOpen: getIsStpDeclarationOpen(state),
  isStpRegistered: getIsRegisteredForStp(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
