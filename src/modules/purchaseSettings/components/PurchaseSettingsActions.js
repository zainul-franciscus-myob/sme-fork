import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const PurchaseSettingsActions = ({ onSaveButtonClick }) => (
  <ButtonRow
    primary={[
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick}>
        Save
      </Button>,
    ]}
  />
);

export default PurchaseSettingsActions;
