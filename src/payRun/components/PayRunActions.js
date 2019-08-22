import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const PayRunActions = ({
  onNextButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button key="save" name="save" type="primary" onClick={onNextButtonClick}>
          Next
      </Button>,
    ]}

    secondary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={() => {}}>
          Cancel
      </Button>,
    ]}
  />
);

export default PayRunActions;
