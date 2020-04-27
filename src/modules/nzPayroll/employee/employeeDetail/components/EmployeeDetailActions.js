import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting } from '../EmployeeDetailNzSelectors';

const EmployeeDetailActions = ({
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  isActionsDisabled,
}) => (
    <ButtonRow
      primary={[
        <Button
          key="cancel"
          name="cancel"
          type="secondary"
          onClick={onCancelButtonClick}
          disabled={isActionsDisabled}
        >
        Cancel
        </Button>,
        <Button
          key="save"
          name="save"
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isActionsDisabled}
        >
        Save
        </Button>,
      ]}

      secondary={
        [<Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isActionsDisabled}
        >
        Delete
        </Button>]}
    />
);

const mapStateToProps = state => ({
  isActionsDisabled: getIsSubmitting(state),
});

export default connect(mapStateToProps)(EmployeeDetailActions);
