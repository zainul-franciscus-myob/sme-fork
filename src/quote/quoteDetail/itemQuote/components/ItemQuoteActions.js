import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCalculating, getIsCreating, getIsSubmitting } from '../ItemQuoteSelectors';

const ItemQuoteActions = ({
  isCreating,
  isSubmitting,
  isCalculating,
  onSaveButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={isSubmitting || isCalculating}
      >
        Cancel
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        onClick={onSaveButtonClick}
        disabled={isSubmitting || isCalculating}
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
        disabled={isSubmitting || isCalculating}
      >
          Delete
      </Button>
      ),
    ]}
  />
);

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(ItemQuoteActions);
