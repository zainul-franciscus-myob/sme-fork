import {
  Button, ButtonRow,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';

const GeneralJournalDetailActions = ({
  isCreating,
  isActionsDisabled,
  onSave,
  onCancel,
  onDelete,
}) => (
  <ButtonRow>
    {!isCreating
        && (
        <Button name="delete" type="secondary" onClick={onDelete} disabled={isActionsDisabled}>
          Delete
        </Button>
        )
    }
    <Button name="cancel" type="secondary" onClick={onCancel} disabled={isActionsDisabled}>
      Cancel
    </Button>
    <Button name="save" type="primary" onClick={onSave} disabled={isActionsDisabled}>
      Save
    </Button>
  </ButtonRow>
);

GeneralJournalDetailActions.defaultProps = {
  isActionsDisabled: false,
};

GeneralJournalDetailActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isActionsDisabled: PropTypes.bool,
};

export default GeneralJournalDetailActions;
