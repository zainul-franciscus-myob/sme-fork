import {
  Button, ButtonRow, Dropdown, Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../transferMoneyDetailSelectors';
import SaveActionType from '../../SaveActionType';

const TransferMoneyDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSave,
  onSaveAnd,
  onCancel,
  onDelete,
}) => {
  const dropdownActionItems = [
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_CREATE_NEW}
      label="Record and create new"
      value={SaveActionType.SAVE_AND_CREATE_NEW}
    />,
    <Dropdown.Item
      key={SaveActionType.SAVE_AND_DUPLICATE}
      label="Record and duplicate"
      value={SaveActionType.SAVE_AND_DUPLICATE}
    />,
  ];

  const saveAndButton = (
    <Dropdown
      key="saveAnd"
      onSelect={onSaveAnd}
      toggle={(
        <Dropdown.Toggle disabled={isActionsDisabled}>
          Record and new
          <Icons.Caret />
        </Dropdown.Toggle>
      )}
      items={dropdownActionItems}
    />
  );

  return (
    <ButtonRow
      primary={[
        <Button key="cancel" name="cancel" type={isCreating ? 'secondary' : 'primary'} onClick={onCancel} disabled={isActionsDisabled}>
          { isCreating ? 'Cancel' : 'Go back'}
        </Button>,
        isCreating && saveAndButton,
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
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailActions);
