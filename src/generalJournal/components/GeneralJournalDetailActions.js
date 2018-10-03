import {
  Button, ButtonRow, Dropdown, Icons,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';


const items = [
  <Dropdown.Item key="saveCopy" label="Save & Copy" value="Save & Copy" />,
  <Dropdown.Item key="saveAdd" label="Save & Add" value="Save & Add" />,
];

const SaveDropDown = () => (
  <Dropdown
    items={items}
    buttons={[
      <Button
        key="save"
        type="primary"
      >
        Save
      </Button>,
    ]}
    toggle={(
      <Dropdown.Toggle type="primary">
        <Icons.Caret />
      </Dropdown.Toggle>
    )}
  />
);

const renderDeleteButton = isCreating => (
  isCreating ? (
    <Button type="secondary">
      Delete
    </Button>
  ) : null);


const GeneralJournalDetailActions = ({ isCreating }) => (
  <ButtonRow>
    {renderDeleteButton(isCreating)}
    <Button type="secondary">
         Cancel
    </Button>
    <SaveDropDown />
  </ButtonRow>
);

GeneralJournalDetailActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
};

export default GeneralJournalDetailActions;
