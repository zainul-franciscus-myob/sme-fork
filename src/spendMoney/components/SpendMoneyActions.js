import {
  Button, ButtonRow,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';

const SpendMoneyActions = ({
  onSave,
  onCancel,
}) => (
  <ButtonRow>
    <Button name="cancel" type="secondary" onClick={onCancel}>
      Cancel
    </Button>
    <Button name="save" type="primary" onClick={onSave}>
      Save
    </Button>
  </ButtonRow>
);

SpendMoneyActions.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SpendMoneyActions;
