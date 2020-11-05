import { Card, FieldGroup, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import RecordPayRunActions from './RecordPayRunActions';
import getNumberOfSelected from '../RecordPayRunSelectors';
import styles from './RecordPayRunView.module.css';

const RecordPayRunView = ({
  numberOfSelected,
  recordPayments,
  stepNumber,
  payRunSteps,
  onPreviousButtonClick,
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
        Once you’ve recorded these payments, you&apos;ll need to authorise MYOB
        to send this information to Inland Revenue (IR) as part of Payday
        Filing.
      </FieldGroup>
    </Card>
    <RecordPayRunActions
      onRecordButtonClick={recordPayments}
      onPreviousButtonClick={onPreviousButtonClick}
    />
  </>
);

const mapStateToProps = (state) => ({
  numberOfSelected: getNumberOfSelected(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
