import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const InlandRevenueSettingsActions = ({
  onRemoveAuthorisationClick,
  onAuthoriseClick,
  isUserAuthorised,
}) => (
  <ButtonRow
    primary={[
      isUserAuthorised ? (
        <Button
          key="remove"
          name="remove"
          type="delete"
          onClick={onRemoveAuthorisationClick}
        >
          Remove authorisation
        </Button>
      ) : (
        <Button
          key="authorise"
          name="authorise"
          type="primary"
          onClick={onAuthoriseClick}
        >
          Authorise MYOB
        </Button>
      ),
    ]}
  />
);

export default InlandRevenueSettingsActions;
