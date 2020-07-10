import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const LinkUserActions = ({ onLinkUser, onCancel }) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="link" name="link" type="primary" onClick={onLinkUser}>
        Link User ID and open file
      </Button>,
    ]}
  />
);

export default LinkUserActions;
