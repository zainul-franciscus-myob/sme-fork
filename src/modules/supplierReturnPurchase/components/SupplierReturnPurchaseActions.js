import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getIsSubmitting,
} from '../SupplierReturnPurchaseSelector';

const SupplierReturnPurchaseActions = ({
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  isCreating,
  isSubmitting,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={isSubmitting}
      >
        Cancel
      </Button>,
      isCreating && (
        <Button
          key="save"
          name="save"
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isSubmitting}
        >
          Save
        </Button>
      ),
    ]}
    secondary={[
      !isCreating && (
        <Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isSubmitting}
        >
          Delete
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseActions);
