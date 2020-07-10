import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating, getIsSubmitting } from '../receiveRefundSelectors';

const ReceiveRefundActions = ({
  isCreating,
  isSubmitting,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onGoBackButtonClick,
}) => {
  const goBackButton = (
    <Button
      key="goBack"
      name="goBack"
      type="primary"
      onClick={onGoBackButtonClick}
      disabled={isSubmitting}
    >
      Go back
    </Button>
  );

  const cancelButton = (
    <Button
      key="cancel"
      name="cancel"
      type="secondary"
      onClick={onCancelButtonClick}
      disabled={isSubmitting}
    >
      Cancel
    </Button>
  );

  const saveButton = (
    <Button
      key="save"
      name="save"
      type="primary"
      onClick={onSaveButtonClick}
      disabled={isSubmitting}
    >
      Record
    </Button>
  );

  const deleteButton = (
    <Button
      key="delete"
      name="delete"
      type="secondary"
      onClick={onDeleteButtonClick}
      disabled={isSubmitting}
    >
      Delete
    </Button>
  );

  return (
    <ButtonRow
      primary={isCreating ? [cancelButton, saveButton] : [goBackButton]}
      secondary={[isCreating ? undefined : deleteButton]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(ReceiveRefundActions);
