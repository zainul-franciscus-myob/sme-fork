import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import EmployeeLearnImage from './EmployeeLearnImage';
import LearnComponent from '../../../components/LearnTemplate/LearnComponent';
import baseStyles from '../../../components/LearnTemplate/LearnComponent.module.css';
import styles from './LearnEmployeeModule.module.css';

export default class LearnEmployeeModule {
  constructor({ setRootView, learnEmployeeCompleted }) {
    this.setRootView = setRootView;
    this.learnEmployeeCompleted = learnEmployeeCompleted;
  }

  onClick = (region, businessId) => {
    this.learnEmployeeCompleted();
    window.location.href = `/#/${region}/${businessId}/employee/new?mainTab=contactDetails&appcue=-M0zEQRdUJQxH8iquMVt`;
  }

  render = (region, businessId) => this.setRootView(
    <LearnComponent
      title="A handy checklist for creating employees"
      media={(
        <EmployeeLearnImage className={styles.learnImage} />
      )}
    >
      <h3>Like life, payroll success is all in the preparation</h3>
      <p>
      You&apos;ll be entering your employee&apos;s personal,
      tax and pay information so PAYG and super are calculated
      correctly. Don&apos;t worry, we&apos;ll walk you through it.
      </p>
      <h3>Before you start, make sure you have each employee&apos;s:</h3>
      <ol className={styles.checklist}>
        <li>1. Tax file number declaration form</li>
        <li>2. Super choice form</li>
        <li>3. Employee contract, including salary and wage details</li>
        <li>
            4. Any forms for variations or exemptions
            (for example, Medicare levy variation&nbsp;declaration)
        </li>
      </ol>
      <div className={baseStyles.buttonContainer}>
        <ButtonRow
          secondary={[
            <Button type="primary" key="gotIt" onClick={() => this.onClick(region, businessId)}>Got it</Button>,
          ]}
        />
      </div>
    </LearnComponent>,
  )

  run = (context) => {
    const { region, businessId } = context;
    this.render(region, businessId);
  };

  resetState = () => {};

  unsubscribeFromStore = () => {};
}
