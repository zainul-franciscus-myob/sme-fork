import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../transferMoneyDetailSelectors';

const TransferMoneyDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSave,
  onCancel,
  onDelete,
}) => (
  <ButtonRow>
    {!isCreating && (
      <Button name="delete" type="secondary" onClick={onDelete} disabled={isActionsDisabled}>
        Delete
      </Button>
    )}
    <Button name="cancel" type="secondary" onClick={onCancel} disabled={isActionsDisabled}>
      Cancel
    </Button>
    {isCreating && (
      <Button name="save" type="primary" onClick={onSave} disabled={isActionsDisabled}>
        Save
      </Button>
    )}
  </ButtonRow>
);

TransferMoneyDetailActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isActionsDisabled: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailActions);
