import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const RecordPayRunActions = ({ onRecordButtonClick }) => (
  <ButtonRow
    primary={[
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
