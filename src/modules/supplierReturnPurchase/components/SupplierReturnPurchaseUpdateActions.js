import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting } from '../SupplierReturnPurchaseSelector';

const SupplierReturnPurchaseUpdateActions = ({
  onCancelButtonClick,
  onDeleteButtonClick,
  isSubmitting,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="goBack"
        name="goBack"
        type="primary"
        onClick={onCancelButtonClick}
        disabled={isSubmitting}
      >
        Go back
      </Button>,
    ]}
    secondary={[
      <Button
        key="delete"
        name="delete"
        type="secondary"
        onClick={onDeleteButtonClick}
        disabled={isSubmitting}
      >
        Delete
      </Button>,
    ]}
  />
);

const mapStateToProps = (state) => ({
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseUpdateActions);
