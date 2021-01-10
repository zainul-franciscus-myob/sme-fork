import { Button, ButtonRow, Card, PageState } from '@myob/myob-widgets';
import React from 'react';

import successImage from './images/success.svg';

const DoneStepView = ({
  onCreateEmployeeClick,
  onCreatePayrunClick,
  onGoToPaydayFilingClick,
}) => {
  return (
    <div>
      <Card>
        <PageState
          title="You've successfully connected MYOB Essentials to payday filing"
          description="You're ready to send information to Inland Revenue when you process a pay."
          image={<img src={successImage} alt="success" />}
        />
      </Card>
      <ButtonRow
        primary={[
          <Button
            testid="createEmployeeButton"
            type="secondary"
            onClick={onCreateEmployeeClick}
          >
            Create employee
          </Button>,
          <Button
            testid="createPayrunButton"
            type="secondary"
            onClick={onCreatePayrunClick}
          >
            Create pay run
          </Button>,
          <Button
            testid="goToPaydayFilingButton"
            type="primary"
            onClick={onGoToPaydayFilingClick}
          >
            Go to payday filing
          </Button>,
        ]}
      />
    </div>
  );
};

export default DoneStepView;
