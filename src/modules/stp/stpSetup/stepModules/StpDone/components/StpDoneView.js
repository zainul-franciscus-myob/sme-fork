import { Button, Card } from '@myob/myob-widgets';
import ButtonRow from '@myob/myob-widgets/lib/components/ButtonRow/ButtonRow';
import React from 'react';

const StpDoneView = ({
  onDoneButtonClick,
}) => (
  <div>
    <Card header={<h2>Single Touch Payroll seeting Done!</h2>}>
      <p>
          Nice one! You have finished! Click Done! to go to Single Touch Payroll Reporting Centre!
      </p>
    </Card>
    <ButtonRow
      primary={[
        <Button type="primary" onClick={onDoneButtonClick} key="doneButton">
          Done!
        </Button>,
      ]}
    />
  </div>
);

export default StpDoneView;
