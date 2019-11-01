import {
  Button, ButtonRow, Dropdown, Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBlocking, getIsCreating } from '../selectors/billSelectors';
import SaveActionType from '../types/SaveActionType';

const BillActions = ({
  isCreating,
  isBlocking,
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

  const saveAndButton = (
    <Dropdown
      key="saveAnd"
      onSelect={onSaveAndButtonClick}
      toggle={(
        <Dropdown.Toggle disabled={isBlocking}>
              Record and new
          <Icons.Caret />
        </Dropdown.Toggle>
          )}
      items={dropdownActionItems}
    />
  );

  const saveButton = (
    <Button
      key="save"
      name="save"
      type="primary"
      onClick={onSaveButtonClick}
      disabled={isBlocking}
    >
      Record
    </Button>
  );

  const cancelButton = (
    <Button
      key="cancel"
      name="cancel"
      type="secondary"
      onClick={onCancelButtonClick}
      disabled={isBlocking}
    >
      Cancel
    </Button>
  );

  const deleteButton = (
    <Button
      key="delete"
      name="delete"
      type="secondary"
      onClick={onDeleteButtonClick}
      disabled={isBlocking}
    >
        Delete
    </Button>
  );

  return (
    <ButtonRow
      primary={[
        cancelButton,
        saveAndButton,
        saveButton,
      ]}
      secondary={[!isCreating && deleteButton]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
});

export default connect(mapStateToProps)(BillActions);
