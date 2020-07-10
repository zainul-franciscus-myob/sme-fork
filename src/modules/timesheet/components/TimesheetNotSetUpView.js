import { Button, Card, Icons } from '@myob/myob-widgets';
import React from 'react';

import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';

const TimesheetNotSetUpView = ({ onLinkClick }) => {
  const description = (
    <p>
      Do you pay employees for additional hours worked, like overtime?
      <br />
      Record these hours using timesheets
    </p>
  );
  return (
    <Card>
      <NoResultPageState
        title="Need to track employee hours?"
        description={description}
        actions={[
          <Button
            key="payrollSettingsLink"
            type="link"
            onClick={onLinkClick}
            testid="payrollSettingsLink"
            icon={<Icons.Settings />}
          >
            Open timesheet settings
          </Button>,
        ]}
      />
    </Card>
  );
};

export default TimesheetNotSetUpView;
