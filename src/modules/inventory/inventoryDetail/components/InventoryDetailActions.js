import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
} from '../inventoryDetailSelectors';

const InventoryDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
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
  isActionsDisabled: getIsActionsDisabled(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(InventoryDetailActions);
