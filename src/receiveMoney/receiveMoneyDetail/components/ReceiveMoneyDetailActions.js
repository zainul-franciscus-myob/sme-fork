import { Button } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';

const ReceiveMoneyDetailActions = ({
  onCancelButtonClick,
  onDeleteButtonClick,
}) => (
  <React.Fragment>
    { (
      <Button name="delete" type="secondary" onClick={onDeleteButtonClick}>
        Delete
      </Button>
    )}
    <Button name="cancel" type="secondary" onClick={onCancelButtonClick}>
      Cancel
    </Button>
    <Button name="save" type="primary">
      Save
    </Button>
  </React.Fragment>
);

ReceiveMoneyDetailActions.propTypes = {
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

export default ReceiveMoneyDetailActions;
