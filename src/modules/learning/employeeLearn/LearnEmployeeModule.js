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
  };

  render = (region, businessId) => this.setRootView(
    <LearnComponent
      title="Time to add the people who grow with your business"
      media={(
        <EmployeeLearnImage className={styles.learnImage} />
      )}
    >
      <h3>Before you start, you will need the following documents for each employee: </h3>

      <ol className={styles.checklist}>
        <li>Tax file number declaration form</li>
        <li>Superannuation choice form</li>
        <li>Employee contract which includes salary and wage details</li>
        <li>Any variation or exemption forms such as Medicare levy variation declaration</li>
      </ol>

      <p>
        For more information on employee forms, <a
          href="https://www.ato.gov.au/business/your-workers/employee---checklist/"
          target="_blank"
          rel="noopener noreferrer"
        >visit the ATO website.</a>
      </p>
      <div className={baseStyles.buttonContainer}>
        <ButtonRow
          secondary={[
            <Button type="primary" key="createNewEmployee" onClick={() => this.onClick(region, businessId)}>Create new employee</Button>,
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
