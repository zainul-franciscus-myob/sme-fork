import {
  Button, ButtonRow, Card, Icons, PageHead, PageState, Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import formatSlashDate from '../../../valueFormatters/formatDate/formatSlashDate';
import payRunDoneImage from './PayRunDone.svg';
import styles from './PayRunDoneView.module.css';

const actions = [
  <Button key={1} type="link" icon={<Icons.SignOut />}>Pay employees via bank file</Button>,
  <Button key={2} type="link" icon={<Icons.SignOut />}>Payroll reporting (STP)</Button>,
];

const PayRunDoneView = ({
  onCloseButtonClick,
  paymentDate,
  stepNumber,
  payRunSteps,
}) => (
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
        <Button key="close" name="close" type="primary" onClick={onCloseButtonClick}>
            Close
        </Button>,
      ]}
    />
  </React.Fragment>
);


const mapStateToProps = state => ({
  paymentDate: formatSlashDate(state.startPayRun.paymentDate),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});


export default connect(mapStateToProps)(PayRunDoneView);
