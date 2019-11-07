import { FieldGroup, PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNumberOfSelected } from '../RecordPayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import FormCard from '../../../components/FormCard/FormCard';
import RecordPayRunActions from './RecordPayRunActions';
import styles from './RecordPayRunView.module.css';

const PayRunSteps = [
  {
    number: '1',
    title: 'Select pay period',
    type: 'complete',
  },
  {
    number: '2',
    title: 'Calculate pays',
    type: 'complete',
  },
  {
    number: '3',
    title: 'Record and report',
    type: 'incomplete',
  },
  {
    number: '4',
    title: 'Prepare pay slips',
    type: 'incomplete',
  },
  {
    number: '5',
    title: 'Done!',
    type: 'incomplete',
  },
];

const RecordPayRunView = ({
  numberOfSelected,
  onRecordButtonClick,
  onPreviousButtonClick,
}) => (
  <React.Fragment>
    <PageHead title="Record and report" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber="3" steps={PayRunSteps} />
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
  </React.Fragment>
);

const mapStateToProps = state => ({
  numberOfSelected: getNumberOfSelected(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
