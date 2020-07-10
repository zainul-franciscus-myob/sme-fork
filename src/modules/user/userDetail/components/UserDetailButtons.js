import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled, getIsCreating } from '../userDetailSelectors';

const UserDetailButtons = ({
  onCancelButtonClick,
  onSaveButtonClick,
  isCreating,
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
        {isCreating ? 'Save and send invitation' : 'Save'}
      </Button>,
    ]}
    secondary={[
      !isCreating && (
        <Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isActionsDisabled}
        >
          Delete
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(UserDetailButtons);
