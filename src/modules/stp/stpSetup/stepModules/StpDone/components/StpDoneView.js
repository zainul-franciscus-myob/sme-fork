import { Button, ButtonRow, Card } from '@myob/myob-widgets';
import React from 'react';

const StpDoneView = ({ onDoneButtonClick }) => (
  <div>
    <Card header={<h2>Done!</h2>}>
      <p>
        Nice one, you’ve finished setting up Single Touch Payroll reporting.
      </p>
    </Card>
    <ButtonRow
      primary={[
        <Button type="primary" onClick={onDoneButtonClick} key="doneButton">
          Go to STP reporting
        </Button>,
      ]}
    />
  </div>
);

export default StpDoneView;
