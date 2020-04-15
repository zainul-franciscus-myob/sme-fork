import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import LearnComponent from '../../../components/LearnTemplate/LearnComponent';
import WistiaVideoPlayer from '../../../components/WistiaVideoPlayer/WistiaVideoPlayer';
import styles from '../../../components/LearnTemplate/LearnComponent.module.css';

const STP = () => (
  <a
    href="https://www.myob.com/au/single-touch-payroll/Resources-and-help"
    target="_blank"
    rel="noopener noreferrer"
  >
    Single Touch Payroll (STP)
  </a>
);

export default class LearnPayrollModule {
  constructor({
    setRootView, globalCallbacks,
  }) {
    this.setRootView = setRootView;
    this.globalCallbacks = globalCallbacks;
  }

  onClick = (region, businessId) => {
    this.globalCallbacks.learnPayrollCompleted();
    window.location.href = `/#/${region}/${businessId}/payrollSettings?tab=general&appcue=-M0y1kf_l3LrPAMMzISp`;
  };

  resetState = () => {};

  unsubscribeFromStore = () => {};

  redirectToUrl = (url) => {
    if (url) window.location.href = url;
  };

  run = (context) => {
    const { region, businessId } = context;
    this.render(region, businessId);
  };

  render = (region, businessId) => {
    this.setRootView(
      <LearnComponent
        media={<WistiaVideoPlayer hashedId="5tbg16n8ps" />}
        title="Reclaim your time with simple, powerful payroll"
      >
        <h3>Accurate and efficient payroll at your fingertips</h3>

        <p>
          Payroll doesn’t have to be complicated.
          With MYOB’s payroll software, you can pay your employees easily, automate super
          contributions and report your payroll on time with MYOB’s expert <STP />.
        </p>

        <h3>How to set up payroll:</h3>

        <ol>
          <li>Confirm your payroll settings</li>
          <li>Add your employees</li>
          <li>Set up <STP /> reporting</li>
          <li>Process your first pay run and you’re ready to roll!</li>
        </ol>

        <div className={styles.buttonContainer}>
          <ButtonRow
            secondary={[
              <Button type="primary" key="setupPayroll" onClick={() => this.onClick(region, businessId)}>Confirm payroll settings</Button>,
            ]}
          />
        </div>
      </LearnComponent>,
    );
  }
}
