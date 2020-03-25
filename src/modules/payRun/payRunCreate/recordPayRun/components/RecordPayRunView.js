import { FieldGroup, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNumberOfSelected } from '../RecordPayRunSelectors';
import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import FormCard from '../../../../../components/FormCard/FormCard';
import RecordPayRunActions from './RecordPayRunActions';
import styles from './RecordPayRunView.module.css';

const RecordPayRunView = ({
  numberOfSelected,
  recordPayments,
  onPreviousButtonClick,
  onSaveAndCloseButtonClick,
  stepNumber,
  payRunSteps,
  onPreviewPayRunActivityClick,
  onPreviewPayDetailsClick,
}) => (
  <>
    <PageHead title="Record and report" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <EmployeePayHeader />
    <FormCard>
      <FieldGroup label={`Record pay for ${numberOfSelected} employees?`}>
        View the preview reports to check everything is correct.
        Once you’ve recorded these payments, you&apos;ll need to authorise MYOB to
        send this information to the ATO as part of Single Touch Payroll.
      </FieldGroup>
    </FormCard>
    <RecordPayRunActions
      onRecordButtonClick={recordPayments}
      onPreviousButtonClick={onPreviousButtonClick}
      onSaveAndCloseButtonClick={onSaveAndCloseButtonClick}
      onPreviewPayDetailsClick={onPreviewPayDetailsClick}
      onPreviewPayRunActivityClick={onPreviewPayRunActivityClick}
    />
  </>
);

const mapStateToProps = state => ({
  numberOfSelected: getNumberOfSelected(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
