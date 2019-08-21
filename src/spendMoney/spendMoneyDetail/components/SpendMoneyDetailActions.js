import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../spendMoneyDetailSelectors';

const SpendMoneyDetailActions = ({
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  isActionsDisabled,
  isCreating,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isActionsDisabled}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isActionsDisabled}>
        Record
      </Button>,
    ]}
    secondary={[
      !isCreating && (
        <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isActionsDisabled}>
          Delete
        </Button>
      ),
    ]}
  />
);

SpendMoneyDetailActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  isActionsDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailActions);
