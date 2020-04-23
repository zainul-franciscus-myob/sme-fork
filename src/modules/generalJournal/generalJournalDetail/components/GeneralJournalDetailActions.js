import {
  Button, ButtonRow, Dropdown, Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
} from '../generalJournalDetailSelectors';
import SaveActionType from '../SaveActionType';

const GeneralJournalDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
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
        <Dropdown
          key="saveAnd"
          onSelect={onSaveAndButtonClick}
          toggle={(
            <Dropdown.Toggle disabled={isActionsDisabled}>
              Record and new
              <Icons.Caret />
            </Dropdown.Toggle>
          )}
          items={dropdownActionItems}
        />,
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
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailActions);
