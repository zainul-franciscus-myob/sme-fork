import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsActionsDisabled, getIsCreating } from '../EmployeeDetailSelectors';

const EmployeeDetailActions = ({
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  isCreating,
  isActionsDisabled,
}) => {
  const deleteButton = (
    <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isActionsDisabled}>
      Delete
    </Button>
  );

  const secondaryButtons = isCreating ? [] : [deleteButton];

  return (
    <ButtonRow
      primary={[
        <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isActionsDisabled}>
        Cancel
        </Button>,
        <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isActionsDisabled}>
        Save
        </Button>,
      ]}

      secondary={secondaryButtons}
    />
  );
};

EmployeeDetailActions.propTypes = {
  onCancelButtonClick: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isActionsDisabled: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(EmployeeDetailActions);
