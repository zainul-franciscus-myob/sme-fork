import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
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
    <Button
      key="delete"
      name="delete"
      type="secondary"
      onClick={onDeleteButtonClick}
      disabled={isActionsDisabled}
      testid="test_delete_button"
    >
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

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(EmployeeDetailActions);
