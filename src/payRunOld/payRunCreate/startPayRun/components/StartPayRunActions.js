import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const StartPayRunActions = ({
  onNextButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button key="save" name="save" type="primary" onClick={onNextButtonClick}>
          Next
      </Button>,
    ]}
  />
);

export default StartPayRunActions;
