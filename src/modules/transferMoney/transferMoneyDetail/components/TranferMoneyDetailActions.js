import { Button, ButtonRow } from '@myob/myob-widgets';
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
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type={isCreating ? 'secondary' : 'primary'} onClick={onCancel} disabled={isActionsDisabled}>
        { isCreating ? 'Cancel' : 'Go back'}
      </Button>,
      isCreating && (
        <Button key="save" name="save" type="primary" onClick={onSave} disabled={isActionsDisabled}>
          Record
        </Button>
      ),
    ]}
    secondary={[
      !isCreating && (
        <Button key="delete" name="delete" type="secondary" onClick={onDelete} disabled={isActionsDisabled}>
          Delete
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailActions);
