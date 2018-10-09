import {
  Button, ButtonRow,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';

const GeneralJournalDetailActions = ({
  isCreating,
  onSave,
  onCancel,
  onDelete,
}) => (
  <ButtonRow>
    {isCreating
        && (
        <Button name="delete" type="secondary" onClick={onDelete}>
          Delete
        </Button>
        )
    }
    <Button name="cancel" type="secondary" onClick={onCancel}>
      Cancel
    </Button>
    <Button name="save" type="primary" onClick={onSave}>
      Save
    </Button>
  </ButtonRow>
);

GeneralJournalDetailActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GeneralJournalDetailActions;
