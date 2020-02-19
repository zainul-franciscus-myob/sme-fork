import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import LearnComponent from '../../../components/LearnTemplate/LearnComponent';
import WistiaVideoPlayer from '../../../components/WistiaVideoPlayer/WistiaVideoPlayer';

export default class LearnPayrollModule {
  constructor({
    setRootView, globalCallbacks,
  }) {
    this.setRootView = setRootView;
    this.globalCallbacks = globalCallbacks;
  }

  onClick = (region, businessId) => {
    this.globalCallbacks.learnPayrollCompleted();
    window.location.href = `/#/${region}/${businessId}/payrollSettings?tab=general`;
  };

  resetState = () => {};

  unsubscribeFromStore = () => {};

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  run = (context) => {
    const { region, businessId } = context;
    this.render(region, businessId);
  };

  render = (region, businessId) => {
    this.setRootView(
      <LearnComponent
        title="Get to know payroll"
        description={(
          <>
            <h3>Easy payroll for your growing business</h3>

            <p>
              Payroll that grows with your business, from employee #1 and beyond.
              <br />
              Simple, fast, and always on the ATO&apos;s good side
            </p>

            <h3>How does it work?</h3>

            <ol>
              <li>Set up payroll settings</li>
              <li>Add your employees</li>
              <li>Get set up for Single Touch Payroll Reporting</li>
              <li>Run a pay run</li>
            </ol>

            <ButtonRow
              secondary={[
                <Button type="primary" key="setupPayroll" onClick={() => this.onClick(region, businessId)}>Set up payroll settings</Button>,
              ]}
            />
          </>
        )}
        media={<WistiaVideoPlayer hashedId="" />}
      />,
    );
  }
}
