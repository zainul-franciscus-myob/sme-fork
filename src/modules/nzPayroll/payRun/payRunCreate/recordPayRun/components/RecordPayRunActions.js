import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const RecordPayRunActions = ({
  onPreviousButtonClick,
  onRecordButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="previous"
        name="previous"
        type="secondary"
        onClick={onPreviousButtonClick}
        testid="previousButton"
      >
        Previous
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        onClick={onRecordButtonClick}
        testid="saveButton"
      >
        Record
      </Button>,
    ]}
  />
);

export default RecordPayRunActions;
