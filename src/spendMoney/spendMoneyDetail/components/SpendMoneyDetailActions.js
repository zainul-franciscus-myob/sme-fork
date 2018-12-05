import {
  Button, ButtonRow,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';

const SpendMoneyDetailActions = ({
  onSave,
  onCancel,
  isActionsDisabled,
}) => (
  <ButtonRow>
    <Button name="cancel" type="secondary" onClick={onCancel} disabled={isActionsDisabled}>
      Cancel
    </Button>
    <Button name="save" type="primary" onClick={onSave} disabled={isActionsDisabled}>
      Save
    </Button>
  </ButtonRow>
);

SpendMoneyDetailActions.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isActionsDisabled: PropTypes.bool.isRequired,
};

export default SpendMoneyDetailActions;
