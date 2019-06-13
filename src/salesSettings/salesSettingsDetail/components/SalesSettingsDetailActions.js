import { Button, ButtonRow } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const SalesSettingsDetailActions = ({
  onSaveButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick}>
          Save
      </Button>,
    ]}
  />
);

SalesSettingsDetailActions.propTypes = {
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default SalesSettingsDetailActions;
