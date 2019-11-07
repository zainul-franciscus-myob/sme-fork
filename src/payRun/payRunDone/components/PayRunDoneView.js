import {
  Button, ButtonRow, PageHead, Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

// import Jordan's Stepper from ''
import EmployeePayHeader from '../../components/EmployeePayHeader';
import FormCard from '../../../components/FormCard/FormCard';
import payRunDoneImage from './PayRunDone.svg';
import styles from './PayRunDoneView.module.css';

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
    type: 'complete',
  },
  {
    number: '4',
    title: 'Prepare pay slips',
    type: 'complete',
  },
  {
    number: '5',
    title: 'Done!',
    type: 'incomplete',
  },
];

const PayRunDoneView = ({ onCloseButtonClick }) => (
  <React.Fragment>
    <PageHead title="Pay run done!" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber="5" steps={PayRunSteps} />
    </div>
    <EmployeePayHeader />
    <FormCard>
      <div align="center" vertical-align="middle">
        <h3><img src={payRunDoneImage} alt="Pay Run Finished!" /></h3>
        <h3>Well done! This pay run is finished!</h3>
        <p>Make sure your employees are paid by DATEOFPAYMENT.</p>
        <p>
          <a href="localhost">Pay employees via bank file</a>
          <a href="localhost">Payroll reporting (STP)</a>
        </p>
      </div>
    </FormCard>
    <ButtonRow
      primary={[
        <Button key="close" name="close" type="primary" onClick={onCloseButtonClick}>
            Close
        </Button>,
      ]}
    />
  </React.Fragment>
);

export default connect()(PayRunDoneView);
