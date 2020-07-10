import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsClassificationHeaderAccount,
} from '../accountDetailSelectors';

const AccountDetailActions = ({
  isCreating,
  isActionsDisabled,
  isClassificationHeaderAccount,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
}) => {
  const isDeleteButtonHidden = !isCreating && !isClassificationHeaderAccount;
  return (
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
      secondary={[
        isDeleteButtonHidden && (
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
};

const mapStateToProps = (state) => ({
  isActionsDisabled: getIsActionsDisabled(state),
  isClassificationHeaderAccount: getIsClassificationHeaderAccount(state),
});

export default connect(mapStateToProps)(AccountDetailActions);
