import { Button, ButtonRow, Dropdown, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../spendMoneyDetailSelectors';
import SaveActionType from './SaveActionType';

const SpendMoneyDetailActions = ({
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  isActionsDisabled,
  isCreating,
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
      onSelect={onSaveAndButtonClick}
      toggle={
        <Dropdown.Toggle disabled={isActionsDisabled}>
          Record and new
          <Icons.Caret />
        </Dropdown.Toggle>
      }
      items={dropdownActionItems}
    />
  );

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
        saveAndButton,
        <Button
          key="save"
          name="save"
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isActionsDisabled}
        >
          Record
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
};

const mapStateToProps = (state) => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailActions);
